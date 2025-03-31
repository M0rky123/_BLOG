"use client";

import { useState } from "react";
import api from "@/utils/axiosInstance";

export default function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState<"password" | "text">("password");
  const [passwordChecks, setPasswordChecks] = useState<{ length: boolean; number: boolean; uppercase: boolean; special: boolean }>({
    length: false,
    number: false,
    uppercase: false,
    special: false,
  });
  const [message, setMessage] = useState<{ success: boolean; message: string | React.ReactNode; redirect?: string }>({
    success: false,
    message: "",
    redirect: "",
  });
  const passwordCheckList = (
    <ul className="text-xs text-gray-500 mt-1 list-disc list-inside">
      <li className={passwordChecks.length ? "text-green-600" : "text-rose-600"}>Heslo musí mít alespoň 8 znaků</li>
      <li className={passwordChecks.number ? "text-green-600" : "text-rose-600"}>obsahovat číslo</li>
      <li className={passwordChecks.uppercase ? "text-green-600" : "text-rose-600"}>velké písmeno</li>
      <li className={passwordChecks.special ? "text-green-600" : "text-rose-600"}>speciální znak</li>
    </ul>
  );

  function checkPassword(password: string) {
    const length = password.length >= 8;
    const number = /\d/.test(password);
    const uppercase = /[A-Z]/.test(password);
    const special = /[!@#$%^&*]/.test(password);
    setPasswordChecks({ length, number, uppercase, special });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Pokud není zadané křestní jméno, vypiš chybovou hlášku
    if (!firstName) {
      setMessage({ success: false, message: "Zadejte křestní jméno." });
      return;
    }

    // Pokud není zadané příjmení, vypiš chybovou hlášku
    if (!lastName) {
      setMessage({ success: false, message: "Zadejte příjmení." });
      return;
    }

    // Pokud e-mail nesplňuje formát, vypiš chybovou hlášku
    const emailValidation = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailValidation.test(email)) {
      setMessage({ success: false, message: "Zadejte platný e-mail." });
      return;
    }

    // Pokud heslo nesplňuje požadavky, vypiš chybovou hlášku
    // Heslo musí mít alespoň 8 znaků, obsahovat alespoň jedno číslo, jedno velké písmeno a jeden speciální znak
    // Speciální znaky: !@#$%^&*
    const passwordValidation = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordValidation.test(password)) {
      setMessage({
        success: false,
        message: (
          <div>
            <p>Heslo musí splňovat následující požadavky:</p>
            {passwordCheckList}
          </div>
        ),
      });
      return;
    }

    const response = await api.post("/auth/register", {
      firstName,
      lastName,
      email,
      password,
      username,
    });
  
    const data = response.data;

    if (response.status !== 200) {
      setMessage({ success: false, message: data.message });
      return
    }

    setMessage({ success: data.success, message: data.message, redirect: data.redirect });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
      <div className="rounded-md shadow-sm -space-y-px">
        <div className="flex justify-between">
          <div>
            <label htmlFor="firstName" className="sr-only">
              Křestní jméno
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-tl-md focus:outline-none focus:ring-[--red] focus:border-[--red] focus:z-10 sm:text-sm"
              placeholder="Křestní jméno"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="sr-only">
              Příjmení
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-tr-md focus:outline-none focus:ring-[--red] focus:border-[--red] focus:z-10 sm:text-sm"
              placeholder="Příjmení"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="relative">
          <label htmlFor="username" className="sr-only">
            Uživatelské jméno (nepovinné)
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[--red] focus:border-[--red] focus:z-10 sm:text-sm"
            placeholder="Uživatelské jméno (nepovinné)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email webauthn"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[--red] focus:border-[--red] focus:z-10 sm:text-sm"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[--red] focus:border-[--red] focus:z-10 sm:text-sm"
            placeholder="Heslo"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onInput={(e) => checkPassword(e.currentTarget.value)}
          />
          <button
            type="button"
            onClick={() => setPasswordType(passwordType === "password" ? "text" : "password")}
            className="absolute top-0 right-2 z-10 mt-2 text-sm text-[--red] hover:text-[--light-red] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--red]"
          >
            {passwordType === "password" ? "Ukázat" : "Schovat"} heslo
          </button>
          {passwordCheckList}
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[--red] hover:bg-[--light-red] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--red]"
        >
          Zaregistrovat se
        </button>
      </div>
      {message.message && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex flex-col gap-4 bg-white text-[--black] p-6 rounded-md shadow-md w-80 text-left">
            {message.redirect ? (
              <>
                <h2 className="text-[--blue] font-bold text-lg">Registrace proběhla úspěšně</h2>
                {typeof message.message === "string" ? <p className="text-sm">{message.message}</p> : message.message}
                <a
                  href={message.redirect}
                  autoFocus
                  className="w-fit place-self-end mt-2 px-3 py-2 border border-transparent
                  text-base font-medium rounded-md text-white bg-[--blue] hover:bg-[--light-blue]
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--blue]"
                >
                  Pokračovat
                </a>
              </>
            ) : (
              <>
                <h2 className="text-[--red] font-bold text-lg">Nastala chyba při registraci</h2>
                {typeof message.message === "string" ? <p className="text-sm">{message.message}</p> : message.message}
                <button
                  onClick={() => setMessage({ success: false, message: "", redirect: "" })}
                  autoFocus
                  className="w-fit place-self-end mt-2 px-3 py-2 border border-transparent text-base
                  font-medium rounded-md text-white bg-[--red] hover:bg-[--light-red]
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--red]"
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
