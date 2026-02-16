import { Metadata } from "next";
import { RegisterForm } from "@/components/register-form";

export const metadata: Metadata = {
  title: "Register Page",
};

export default function Register() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <RegisterForm />
    </div>
  );
}
