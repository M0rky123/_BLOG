"use client";

import { useState } from "react";
import { login } from "../actions";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [loginMethod, setLoginMethod] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState<"password" | "text">("password");
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState<{ success: boolean; message: string; redirect?: string }>({
    success: false,
    message: "",
    redirect: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await login(loginMethod, password, remember);

    if (response.success) {
      router.push("/");
      return;
    }

    setMessage({ success: response.success, message: response.message });
    return;
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="loginMethod" className="sr-only">
            E-mailová adresa / Uživatelské jméno
          </label>
          <input
            id="loginMethod"
            name="loginMethod"
            type="text"
            autoComplete="email username"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-[--black] rounded-t-md focus:outline-none focus:ring-[--blue] focus:border-[--blue] focus:z-10 sm:text-sm"
            placeholder="E-mailová adresa / Uživatelské jméno"
            value={loginMethod}
            onChange={(e) => setLoginMethod(e.target.value)}
          />
        </div>
        <div className="relative">
          <label htmlFor="password" className="sr-only">
            Heslo
          </label>
          <input
            id="password"
            name="password"
            type={passwordType}
            autoComplete="current-password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-[--black] rounded-b-md focus:outline-none focus:ring-[--blue] focus:border-[--blue] focus:z-10 sm:text-sm"
            placeholder="Heslo"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setPasswordType(passwordType === "password" ? "text" : "password")}
            className="absolute top-0 right-2 z-10 mt-2 text-sm text-[--gray] hover:text-[--light-gray]"
          >
            {passwordType === "password" ? "Ukázat" : "Schovat"} heslo
          </button>
        </div>
        <div className="flex justify-end items-center text-sm pt-2 text-gray-500">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 accent-[--blue] rounded"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <label htmlFor="remember-me" className="ml-2 block ">
            Zapamatovat si mě
          </label>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[--blue] hover:bg-[--light-blue] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--blue]"
        >
          Přihlásit se
        </button>
      </div>
      {message.message && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex flex-col gap-4 bg-white text-[--black] p-6 rounded-md shadow-md w-80 text-left">
            {message.redirect ? (
              <>
                <h2 className="text-[--blue] font-bold text-lg">Přihlášení proběhlo úspěšně</h2>
                <p className="text-sm">{message.message}</p>
                <a
                  href={message.redirect}
                  autoFocus
                  className="w-fit place-self-end mt-2 px-3 py-2 border border-transparent text-base font-medium rounded-md text-white bg-[--blue] hover:bg-[--light-blue] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--blue]"
                >
                  Pokračovat
                </a>
              </>
            ) : (
              <>
                <h2 className="text-[--red] font-bold text-lg">Nastala chyba při registraci</h2>
                <p className="text-sm">{message.message}</p>
                <button
                  onClick={() => setMessage({ success: false, message: "", redirect: "" })}
                  autoFocus
                  className="w-fit place-self-end mt-2 px-3 py-2 border border-transparent text-base font-medium rounded-md text-white bg-[--red] hover:bg-[--light-red] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--red]"
                >
                  Zavřít
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </form>
  );
}
