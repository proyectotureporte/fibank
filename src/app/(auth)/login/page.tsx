"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { loginSchema, type LoginInput } from "@/lib/validations";
import { Loader2, Shield, ChevronRight, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: LoginInput) {
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setError("Credenciales inválidas");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  const features = [
    {
      title: "Seguridad Avanzada",
      description: "Protección de última generación con cifrado bancario",
    },
    {
      title: "Disponibilidad 24/7",
      description: "Accede a tus cuentas en cualquier momento y lugar",
    },
    {
      title: "Transacciones Instantáneas",
      description: "Transferencias y pagos en tiempo real",
    },
  ];

  return (
    <div className="min-h-screen flex relative">

      {/* Mobile — Form with background */}
      <div className="lg:hidden relative w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dtljonz0f/image/upload/c_auto,ar_4:3,w_3840,g_auto/f_auto/q_auto/v1/The%20Shard%20non-editorial?_a=BAVAZGDY0')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f] via-[#2c7a94] to-[#3d99b8] opacity-90 z-10" />
        <div className="relative z-20 flex flex-col p-8 items-center">
          <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl">
            <img
              src="/logo.png"
              alt="FiduExpress Bank"
              className="h-32 sm:h-40 mb-8 w-auto mx-auto"
            />
            <h1 className="text-2xl sm:text-4xl font-bold text-[#1e3a5f] mb-2 text-center">
              Bienvenido a FiduExpress
            </h1>
            <p className="text-gray-600 mb-10 text-xl text-center">
              Ingresa a tu cuenta
            </p>

            {error && (
              <div className="flex items-center justify-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded-lg mb-6">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-xl font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="correo@ejemplo.com"
                  {...form.register("email")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c7a94] focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
                />
                {form.formState.errors.email && (
                  <p className="mt-1.5 text-sm text-red-500">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-xl font-semibold text-gray-700 mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  {...form.register("password")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c7a94] focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
                />
                {form.formState.errors.password && (
                  <p className="mt-1.5 text-sm text-red-500">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#2c7a94] hover:text-[#1e3a5f] font-semibold transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#1e3a5f] to-[#2c7a94] text-white py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:opacity-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Acceso"
                )}
              </button>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                  <Shield size={16} className="text-[#2c7a94]" />
                  <span>Conexión segura encriptada SSL/TLS</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Left — Form (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-white p-16">
        <div className="w-full max-w-md">
          <img
            src="/logo.png"
            alt="FiduExpress Bank"
            className="h-32 mb-8 w-auto mx-auto"
          />
          <h1 className="text-3xl font-bold text-[#1e3a5f] mb-2 text-center">
            Bienvenido a FiduExpress
          </h1>
          <p className="text-gray-600 mb-10 text-lg text-center">
            Ingresa a tu cuenta
          </p>

          {error && (
            <div className="flex items-center justify-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded-lg mb-6">
              <AlertCircle size={16} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label htmlFor="email-desktop" className="block text-base font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email-desktop"
                placeholder="correo@ejemplo.com"
                {...form.register("email")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c7a94] focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
              />
              {form.formState.errors.email && (
                <p className="mt-1.5 text-sm text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password-desktop" className="block text-base font-semibold text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password-desktop"
                placeholder="••••••••"
                {...form.register("password")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c7a94] focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
              />
              {form.formState.errors.password && (
                <p className="mt-1.5 text-sm text-red-500">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-[#2c7a94] hover:text-[#1e3a5f] font-semibold transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#1e3a5f] to-[#2c7a94] text-white py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:opacity-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Acceso"}
            </button>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                <Shield size={16} className="text-[#2c7a94]" />
                <span>Conexión segura encriptada SSL/TLS</span>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Right — Banner (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dtljonz0f/image/upload/c_auto,ar_4:3,w_3840,g_auto/f_auto/q_auto/v1/The%20Shard%20non-editorial?_a=BAVAZGDY0')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f] via-[#2c7a94] to-[#3d99b8] opacity-90 z-10" />
        <div className="relative z-20 flex flex-col justify-center p-16 text-white">
          <h2 className="text-4xl font-bold mb-6">
            Banca digital de<br />última generación
          </h2>
          <p className="text-xl text-white mb-12 leading-relaxed">
            Administra tus finanzas de forma segura, rápida y desde cualquier
            lugar con FiduExpress Bank.
          </p>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <ChevronRight className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-white">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-white/20">
            <p className="text-sm text-white mb-4">Regulado y supervisado por:</p>
            <div className="flex items-center gap-6">
              {["CNMV", "MIFID", "CYSEC"].map((badge) => (
                <div
                  key={badge}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
                >
                  <span className="text-xs font-semibold text-white">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl z-10" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl z-10" />
      </div>

    </div>
  );
}