import os
import logging
from typing import Optional
from fastapi import Header, HTTPException
import jwt
import firebase_admin
from firebase_admin import credentials, auth as firebase_auth

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Ensure FIREBASE_SERVICE_ACCOUNT_PATH is set in non-emulator mode
service_account_path = os.getenv("FIREBASE_SERVICE_ACCOUNT_PATH")

if not os.getenv("USE_FIREBASE_EMULATOR", "false").lower() == "true":
    if not service_account_path:
        raise RuntimeError("FIREBASE_SERVICE_ACCOUNT_PATH must be set in production.")
else:
    logger.info("Firebase emulator mode enabled. Skipping service account check.")

def initialize_firebase():
    """
    Initialize Firebase Admin SDK once using service account credentials.
    """
    if os.getenv("USE_FIREBASE_EMULATOR", "false").lower() == "true":
        logger.info("Skipping Firebase Admin SDK initialization (emulator mode).")
        return

    if not firebase_admin._apps:
        logger.info("Initializing Firebase Admin SDK")
        cred = credentials.Certificate(service_account_path)
        firebase_admin.initialize_app(cred)
        logger.info("Firebase initialized successfully")
    else:
        logger.info("Firebase already initialized")


def verify_firebase_token(authorization: Optional[str] = Header(None)) -> str:
    """
    Verifies Firebase JWT token sent via Authorization header.

    The frontend must send:
        Authorization: Bearer <id_token>

    In emulator mode, returns a fake UID (e.g., "test-uid").
    """
    emulator_mode = os.getenv("USE_FIREBASE_EMULATOR", "false").lower() == "true"
    fake_uid = os.getenv("DEV_FAKE_UID", "test-uid")

    if emulator_mode:
        logger.info("Running in Firebase Emulator mode — skipping token verification.")

        if not authorization:
            logger.warning("Authorization header missing in emulator mode.")
            raise HTTPException(status_code=401, detail="Missing auth header in emulator mode")

        if not authorization.startswith("Bearer "):
            logger.warning("Authorization header is malformed in emulator mode.")
            raise HTTPException(status_code=401, detail="Malformed auth header in emulator mode")

        try:
            token = authorization.split(" ")[1]
            logger.debug(f"Raw emulator token: {token}")

            decoded_token = jwt.decode(token, options={"verify_signature": False})
            logger.info(f"Decoded emulator token: {decoded_token}")

            uid = decoded_token.get("user_id") or decoded_token.get("uid")
            if not uid:
                logger.warning("Decoded emulator token missing 'user_id' or 'uid'")
                raise HTTPException(status_code=401, detail="Emulator token missing user_id")

            logger.info(f"Emulator authenticated UID: {uid}")
            return uid

        except Exception as e:
            logger.warning(f"Emulator JWT decoding failed: {e}")
            logger.info(f"Falling back to DEV_FAKE_UID: {fake_uid}")
            return fake_uid

    # Production mode: full Firebase token verification
    if not authorization or not authorization.startswith("Bearer "):
        logger.warning("Authorization header missing or malformed")
        raise HTTPException(status_code=401, detail="Invalid or missing Authorization header.")

    id_token = authorization.split(" ")[1]
    logger.info("Verifying Firebase token")

    try:
        decoded_token = firebase_auth.verify_id_token(id_token)
        uid = decoded_token["uid"]
        logger.info(f"Firebase token verified for UID: {uid}")
        return uid

    except Exception as e:
        logger.warning(f"JWT validation failed: {e}")
        raise HTTPException(status_code=401, detail="Invalid Firebase token.")
