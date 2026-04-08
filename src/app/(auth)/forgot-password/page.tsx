"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/lib/validations";
import { OceanLogo } from "@/components/auth/ocean-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(data: ForgotPasswordInput) {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const body = await res.json();

      if (!res.ok) {
        throw new Error(body.error || "Error al restablecer la contraseña");
      }

      setSuccess(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error al restablecer la contraseña";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  const PageContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-[#1e3a5f] via-[#2c7a94] to-[#3d99b8] relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      {children}
    </div>
  );

  if (success) {
    return (
      <PageContainer>
        <Card className="w-full max-w-md bg-white/80 rounded-2xl p-8 shadow-2xl relative z-10">
          <CardHeader className="text-center mb-8">
            <OceanLogo size="md" />
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-2">
              Contraseña restablecida
            </h2>
            <p className="text-gray-600 text-sm">
              Tu contraseña ha sido actualizada exitosamente. Ya puedes iniciar
              sesión con tu nueva contraseña.
            </p>
          </CardContent>
          <CardFooter className="justify-center mt-6">
            <Link
              href="/login"
              className="text-sm text-[#2c7a94] hover:text-[#1e3a5f] font-semibold transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Ir a iniciar sesión
            </Link>
          </CardFooter>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Card className="w-full max-w-md bg-white/80 rounded-2xl p-8 shadow-2xl relative z-10">
        <CardHeader className="text-center mb-8">
          <OceanLogo size="md" />
          <p className="text-gray-600 text-sm">
            Ingresa tu email y tu nueva contraseña
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="correo@ejemplo.com"
                        type="email"
                        {...field}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c7a94] focus:border-transparent transition-all"
                      />
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
                    <FormLabel>Nueva contraseña</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Mínimo 6 caracteres"
                        type="password"
                        {...field}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c7a94] focus:border-transparent transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar contraseña</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Repite tu nueva contraseña"
                        type="password"
                        {...field}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c7a94] focus:border-transparent transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#1e3a5f] to-[#2c7a94] text-white py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Restablecer contraseña
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-center mt-6">
          <Link
            href="/login"
            className="text-sm text-[#2c7a94] hover:text-[#1e3a5f] font-semibold transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio de sesión
          </Link>
        </CardFooter>
      </Card>
    </PageContainer>
  );
}