import { useTransition } from "react";
import {
  createUserWithEmailAndPassword, sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";

// import { useUserContext } from "@/context/UserContext";
import { useAuthContext } from "@/context/AuthenticationContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useEmailAuth = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    firstName,
    lastName,
    confirmPassword,
    setConfirmPassword,
    setHasAccount,
    setError,
    setSuccess,
  } = useAuthContext();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleLogin = () => {
    startTransition(async () => {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);

        toast.success("Signed In", {
          description: `Welcome back, ${result.user.displayName || email}`,
        });
        router.push("/");
        console.log("router:", router);
        console.log("User signed in:", result.user);
        setSuccess("Successfully signed in.");
        setEmail("");
        setPassword("");
      } catch (err: unknown) {
        const errorMsg = (err as Error).message;

        toast.error("Sign In Failed", {
          description: errorMsg,
        });
        setError(errorMsg);
        setHasAccount(false);
      }
    });
  };

  const handleSignUp = () => {
    startTransition(async () => {
        try {
        if (!email || !password || !confirmPassword) {
            toast.info("Please fill in all fields");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(result.user, {
          displayName: `${firstName} ${lastName}`,
        });
        toast.success("Signed Up", {
          description: `Welcome, ${result.user.displayName || email}`,
        });
        console.log("User signed up:", result.user);

        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setSuccess("Successfully signed up.");

        } catch (err: unknown) {
          const errorMsg = (err as Error).message;
          toast.error("Sign Up Failed", {
            description: errorMsg,
          });
          setError(errorMsg);
          return;
        }
    });}

  const handleForgotPassword = async () => {
    if (!email) {
      toast.info("Enter your email first");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset Email Sent", {
        description: "Check your inbox for a reset link.",
      });
    } catch (err: unknown) {
      toast.error("Reset Failed", {
        description: (err as Error).message,
      });
    }
  };


  return {
    isPending,
    handleLogin,
    handleSignUp,
    handleForgotPassword,
  };
};