"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/context/AuthenticationContext";
import { useEmailAuth } from "@/authentication/useEmailAuth";
import { Button } from "./ui/button";

const Login: React.FC = () => {
  const { email, setEmail, password, setPassword } = useAuthContext();
  const { handleLogin, handleForgotPassword } = useEmailAuth();

  return (
    <>
      <div className="grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="grid gap-3">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleForgotPassword();
            }}
            className="ml-auto text-sm underline-offset-2 hover:underline"
          >
            Forgot your password?
          </a>
        </div>
        <Input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        type="submit"
        className="w-full"
        onClick={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        Login
      </Button>
    </>
  );
};

export default Login;
