"use server";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RegisterForm from "@/components/RegisterForm";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";

export default async function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[--background]">
      <div className="relative max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md">
        <h1 className="mt-10 text-center text-4xl font-extrabold text-[--red]">Registrace</h1>
        <RegisterForm />
        <div className="absolute top-4 left-4 !mt-0 space-x-2 text-[--blue] hover:text-[--light-blue] group">
          <FontAwesomeIcon icon={faArrowLeft} className="group-hover:-translate-x-1 transition-transform duration-200" />
          <a href="/login" className="whitespace-nowrap group-hover:underline">
            Přihlásit se
          </a>
        </div>
      </div>
    </div>
  );
}
