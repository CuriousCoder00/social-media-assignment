import {
  userLoginSchema,
  UserLoginInput,
} from "@/lib/validations/user.validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthForm from "./auth-form";
import { AuthInput } from "./auth-input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useState } from "react";
import { AuthPasswordInput } from "./password-input";
import { Spinner } from "../percept-ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/lib/services/auth.actions";

const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const form = useForm<UserLoginInput>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: UserLoginInput) => {
    setLoading(true);
    const res = await login(data.email, data.password);
    console.log(res);
    toast({
      title: res.data.message,
      variant: res.status === 200 ? "default" : "destructive",
    });
    setLoading(false);
  };

  return (
    <AuthForm form={form}>
      <form
        className="flex flex-col w-full gap-4 my-4"
        onSubmit={form.handleSubmit(handleLogin)}
      >
        <AuthInput
          form={form}
          label="Email Address"
          name="email"
          disabled={loading}
          placeholder="john.doe@gmail.com"
        />
        <AuthPasswordInput
          form={form}
          label="Password"
          name="password"
          disabled={loading}
          placeholder="******"
        />
        <p className="text-xs text-end">
          <Link to="/auth/register" className="text-sky-600">
            Forgot Password?
          </Link>
        </p>
        <Button disabled={loading} type="submit" className="w-full">
          {loading ? <Spinner /> : "Login"}
        </Button>
        <div>
          <p className="text-sm text-end">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-sky-600">
              Register
            </Link>
          </p>
        </div>
      </form>
    </AuthForm>
  );
};

export default LoginForm;
