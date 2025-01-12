import { Form } from "@/components/ui/form";
import React from "react";
import { useLocation } from "react-router";

const AuthForm = ({
  children,
  form,
}: {
  children: React.ReactNode;
  form: any;
}) => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="flex flex-col items-start justify-center mx-auto shadow-inner dark:shadow-neutral-600 shadow-neutral-300 p-4 md:rounded-xl sm:rounded-lg gap-3 dark:bg-black max-w-sm w-full">
      <div className="flex flex-col items-center justify-center w-full my-4">
        <h1 className="font-bold text-xl">
          Welcome {path === "/auth/login" ? "Back" : ""} to{" "}
          <span className="text-sky-600">Social Networks</span>
        </h1>
        <p className="text-sm text-neutral-500">
          {path === "/auth/login" ? "Login to " : "Register "} your account and
          start building your network
        </p>
      </div>
      <Form {...form}>{children}</Form>
    </div>
  );
};

export default AuthForm;
