import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
} from "firebase/auth";

import { auth } from "./firebase";
import { toast } from "sonner";

export enum AuthProviderName {
  GOOGLE = "google",
  FACEBOOK = "facebook",
  GITHUB = "github",
  APPLE = "apple",
}

export const signInWithProvider = async (providerName: AuthProviderName) => {
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
    toast(`Hi, ${result.user.displayName}`, {
      description: `You have successfully signed in with ${providerName}`,
    });

    return console.log(
      `User signed in with ${providerName}:`,
      result.user
    );
  } catch (error: unknown) {
    toast("Sign In Failed", { description: (error as Error).message });
    throw new Error(`Sign in with ${providerName} failed: ${(error as Error).message}`);
  }
};
