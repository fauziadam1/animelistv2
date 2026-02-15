import z from "zod";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordValidation } from "@/lib/password-validation";

export function RegisterForm() {
  const router = useRouter();

  const formSchema = z
    .object({
      name: z.string().trim().min(1, "The name field is required"),
      username: z.string().trim().min(1, "The username field is required"),
      email: z.string().email(),
      password: PasswordValidation,
      password_confirmation: z
        .string()
        .trim()
        .min(1, "The confirm password field is required."),
    })
    .refine((values) => values.password === values.password_confirmation, {
      message: "The confirm password does not match.",
      path: ["password_confirmation"],
    });

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      await api.get("/sanctum/csrf-cookie");
      await new Promise((resolve) => setTimeout(resolve, 100));
      await api.post("/api/registrasi", data);

      toast.success("Registrasi berhasil");
      router.refresh();
      router.push("/login");
    } catch {}
  };
}
