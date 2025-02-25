"use server";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginForm from "@/components/LoginForm";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";

export default async function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[--background]">
      <div className="relative max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md">
        <h1 className="mt-10 text-center text-4xl font-extrabold text-[--blue]">Přihlásit se</h1>
        <LoginForm />
        <div className="absolute top-4 left-4 !mt-0 space-x-2 text-[--red] hover:text-[--light-red] group">
          <FontAwesomeIcon icon={faArrowLeft} className="group-hover:-translate-x-1 transition-transform duration-200" />
          <a href="/register" className="whitespace-nowrap group-hover:underline">
            Registrovat se
          </a>
        </div>
      </div>
    </div>
  );
}
