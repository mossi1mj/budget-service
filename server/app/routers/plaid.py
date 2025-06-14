import os
import logging
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from plaid.api import plaid_api
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser
from plaid.model.products import Products
from plaid.model.country_code import CountryCode
from plaid.model.item_public_token_exchange_request import ItemPublicTokenExchangeRequest
from plaid.model.accounts_balance_get_request import AccountsBalanceGetRequest
from plaid.model.transactions_get_request import TransactionsGetRequest
from plaid.model.transactions_get_request_options import TransactionsGetRequestOptions
from plaid.model.accounts_get_request import AccountsGetRequest
from plaid.configuration import Configuration
from plaid.api_client import ApiClient

from app.database import get_db
from app.services.user import get_user_by_uid
from app.dependencies import verify_firebase_token  # You will create this

logger = logging.getLogger(__name__)
router = APIRouter()

# Setup Plaid configuration using environment variables
plaid_env = os.getenv("PLAID_ENV", "sandbox")
products_env = os.getenv("PLAID_PRODUCTS", "auth,transactions")
products_list = [p.strip() for p in products_env.split(",") if p.strip()]
configuration = Configuration(
    host=f"https://{plaid_env}.plaid.com",
    api_key={
        "clientId": os.getenv("PLAID_CLIENT_ID"),
        "secret": os.getenv("PLAID_SECRET"),
    }
)

api_client = ApiClient(configuration)
plaid_client = plaid_api.PlaidApi(api_client)

@router.post("/create_link_token")
def create_link_token(uid: str, current_uid: str = Depends(verify_firebase_token)):
    """
    Generate a new Plaid Link token using a Firebase UID.
    """
    logger.info(f"Generating link token for UID: {uid}")

    if uid != current_uid:
        logger.warning(f"UID mismatch: token={current_uid}, query={uid}")
        raise HTTPException(status_code=403, detail="UID mismatch")
    
    try:
        response = plaid_client.link_token_create({
            "user": {"client_user_id": uid},
            "client_name": "Your Budget App",
            "products": products_list,
            "country_codes": [code.strip() for code in os.getenv("PLAID_COUNTRY_CODES", "US").split(",")],
            "language": "en",
            # Add redirect_uri if you set it in env and not empty
            **({"redirect_uri": os.getenv("PLAID_REDIRECT_URI")} if os.getenv("PLAID_REDIRECT_URI") else {})
        })

        logger.info("Link token created successfully.")
        return {"link_token": response["link_token"]}
    except Exception as e:
        logger.error(f"Error creating link token: {e}")
        raise HTTPException(status_code=500, detail="Failed to create link token")
    

@router.post("/exchange_public_token")
def exchange_token(public_token: str, db: Session = Depends(get_db), uid: str = Depends(verify_firebase_token)):
    """
    Exchange a public token for an access token and save it to the user's record.
    """
    logger.info(f"Exchanging public token for UID: {uid}")

    try:
        exchange_request = ItemPublicTokenExchangeRequest(public_token=public_token)
        exchange_response = plaid_client.item_public_token_exchange(exchange_request)
        access_token = exchange_response['access_token']
        item_id = exchange_response['item_id']

        # Update user record
        user = get_user_by_uid(db, uid)
        if not user:
            logger.error(f"User with UID {uid} not found.")
            return {"error": "User not found."}
        user.access_token = access_token
        user.item_id = item_id
        db.commit()
        logger.info(f"Access token and item ID stored for user {uid}")

        return {"access_token": access_token, "item_id": item_id}

    except Exception as e:
        logger.error(f"Error exchanging token: {e}")
        raise HTTPException(status_code=500, detail="Token exchange failed")

@router.get("/accounts")
def get_accounts(db: Session = Depends(get_db), uid: str = Depends(verify_firebase_token)):
    logger.info(f"Fetching accounts for UID: {uid}")
    user = get_user_by_uid(db, uid)
    if not user or not user.access_token:
        logger.warning("Access token not found.")
        raise HTTPException(status_code=401, detail="User or access token not found.")

    try:
        request = AccountsGetRequest(access_token=user.access_token)
        response = plaid_client.accounts_get(request)
        return response.to_dict()
    except Exception as e:
        logger.error(f"Error fetching accounts: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch accounts")


@router.get("/balance")
def get_balance(db: Session = Depends(get_db), uid: str = Depends(verify_firebase_token)):
    logger.info(f"Fetching balances for UID: {uid}")
    user = get_user_by_uid(db, uid)
    if not user or not user.access_token:
        raise HTTPException(status_code=401, detail="User or access token not found.")

    try:
        request = AccountsBalanceGetRequest(access_token=user.access_token)
        response = plaid_client.accounts_balance_get(request)
        return response.to_dict()
    except Exception as e:
        logger.error(f"Error fetching balance: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch balance")


@router.get("/transactions")
def get_transactions(request: Request, db: Session = Depends(get_db), uid: str = Depends(verify_firebase_token)):
    print("Headers received:", request.headers)
    logger.info(f"Fetching transactions for UID: {uid}")
    user = get_user_by_uid(db, uid)
    if not user or not user.access_token:
        raise HTTPException(status_code=401, detail="User or access token not found.")

    try:
        start_date = (datetime.now() - timedelta(days=90)).date()
        end_date = datetime.now().date()

        request = TransactionsGetRequest(
            access_token=user.access_token,
            start_date=start_date,
            end_date=end_date,
            options=TransactionsGetRequestOptions(count=100)
        )
        response = plaid_client.transactions_get(request)
        return response.to_dict()
    except Exception as e:
        logger.error(f"Error fetching transactions: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch transactions")