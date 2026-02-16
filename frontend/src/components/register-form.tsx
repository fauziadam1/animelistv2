"use client";

import z from "zod";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { PasswordInput } from "./ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordValidation } from "@/lib/password-validation";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "./ui/form";
import { Button } from "./ui/button";

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
      password_confirmation: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      await api.get("/sanctum/csrf-cookie");
      await new Promise((resolve) => setTimeout(resolve, 100));
      await api.post("/api/register", data);

      toast.success("Registrasi berhasil");
      router.push("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message = err?.response?.message ?? err.message ?? "Sign Up failed";
      toast.error(message);
    }
  };

  return (
    <div className="w-110 border px-10 py-10 rounded-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-2xl">Sign Up</h1>
            <p className="text-xs text-gray-500">Welcome to AnimeList</p>
          </div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormDescription>This is your public name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormDescription>
                    Must be 6 characters. Must contain letters, numbers, and
                    special characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormDescription>Dont forger your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitted}>
              Sign Up
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
