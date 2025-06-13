import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/context/AuthenticationContext";
import { Button } from "./ui/button";
import { useEmailAuth } from "@/authentication/useEmailAuth";

const SignUp: React.FC = () => {
  const {
    email,
    setEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
  } = useAuthContext();
  const { handleSignUp } = useEmailAuth();

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
        <Label htmlFor="first name">First Name</Label>
        <Input
          id="first name"
          type="text"
          placeholder="John"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="last name">Last Name</Label>
        <Input
          id="last name"
          type="text"
          placeholder="Doe"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="password">Confirm Password</Label>
        <Input
          id="confirm password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <Button
        type="submit"
        className="w-full"
        onClick={(e) => {
          e.preventDefault();
          handleSignUp();
        }}
      >
        Sign Up
      </Button>
    </>
  );
};

export default SignUp;
