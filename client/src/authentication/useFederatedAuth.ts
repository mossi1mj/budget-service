"use client";

import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
} from "firebase/auth";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UsersService } from "@/lib/openapi";
import { useUserContext } from "@/context/UserContext";
import { auth } from "./firebase";

export enum AuthProviderName {
  GOOGLE = "google",
  FACEBOOK = "facebook",
  GITHUB = "github",
  APPLE = "apple",
}

export const useSignInWithProvider = () => {
  const router = useRouter();
  const { setUser } = useUserContext();

  const signIn = async (providerName: AuthProviderName) => {
    let provider;

    switch (providerName) {
      case "google":
        provider = new GoogleAuthProvider();
        break;
      case "facebook":
        provider = new FacebookAuthProvider();
        break;
      case "apple":
        provider = new OAuthProvider("apple.com");
        break;
      default:
        throw new Error("Unsupported provider");
    }

    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      toast(`Hi, ${firebaseUser.displayName}`, {
        description: `Signed in with ${providerName}`,
      });

      console.log(firebaseUser);

      const uid = firebaseUser.uid;
      const email = firebaseUser.email || "";
      const [first_name, last_name] = (firebaseUser.displayName || " ").split(
        " "
      );

      // Try to fetch user
      let user;
      try {
        user = await UsersService.fetchUserUsersUidGet(uid);
      } catch (error: unknown) {
        if ((error as { status?: number })?.status === 404) {
          user = await UsersService.registerUserUsersPost({
            uid,
            email,
            first_name,
            last_name,
          });
        } else {
          throw error;
        }
      }

      const firebaseUserWithDetails = {
        ...user,
        photoURL: firebaseUser.photoURL || null,
        isAuthenticated: true,
      };

      setUser(firebaseUserWithDetails);
      console.log(`User signed in & loaded:`, firebaseUserWithDetails);
      router.push("/");
    } catch (error: unknown) {
      toast("Sign In Failed", { description: (error as Error).message });
      console.error(error);
    }
  };

  return { signIn };
};
