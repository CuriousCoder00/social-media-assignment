import RegistrationForm from "@/components/auth/register-form";
import AuthLayout from "@/layouts/auth-layout";

const RegistrationPage = () => {
  return (
    <AuthLayout>
      <RegistrationForm />
    </AuthLayout>
  );
};

export default RegistrationPage;