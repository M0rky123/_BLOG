# Dokumentace

## **1. Programovací jazyky a technologie**

### **1.1. Použité programovací jazyky:**

- JavaScript
- TypeScript

**Frameworky a knihovny:**

- **Backend:** Node.js, Express.js, Mongoose.
- **Frontend:** Next.js.

**Důvody volby technologií:**

- **Next.js** – server-side rendering (SSR), optimalizace výkonu, SEO přívětivost.
- **Express.js** – jednoduchost, rychlost, flexibilita v návrhu API.
- **MongoDB + Mongoose** – dokumentově orientovaná databáze vhodná pro dynamická data a škálovatelnost.

**Další nástroje:**

- JWT – autentizace a autorizace uživatelů.
- dotenv – správa environmentálních proměnných.
- Axios – HTTP požadavky mezi frontendem a backendem.
- Winston – logování v produkčním prostředí.
- Jest – testování backendových funkcí a API endpointů.

**Styling:**

- Tailwind CSS – efektivní a modulární stylování.
- PostCSS, Autoprefixer – automatizace úprav CSS.

---

## **2. Struktura projektu**

**Organizace repozitáře:**

- `/backend` – backend aplikace (Express.js, Mongoose).
- `/frontend` – frontend aplikace (Next.js, Tailwind CSS).
- `/docker` – Docker Compose a Dockerfily pro snadné nasazení.
- `/tests` – testovací skripty pro backend i frontend.

**Backend struktura:**

- `/controllers` – zpracování požadavků (oddělené dle entit).
- `/models` – datové modely pro MongoDB.
- `/middlewares` – autentizace, validace požadavků, error handling.
- `/routes` – definice API endpointů.
- `/config` – konfigurace aplikace, připojení k databázi.

**Frontend struktura:**

- `/components` – opakovaně použitelné UI komponenty.
- `/pages` – dynamické stránky v Next.js.
- `/styles` – Tailwind CSS konfigurace.
- `/utils` – pomocné funkce pro zpracování dat.

**Verzování a správa úkolů:**

- Git + GitHub (větvení pomocí **feature branch workflow**).
- Issues + Projects na GitHubu pro organizaci vývoje.

---

## **3. Backend**

### **3.1. CRUD operace**

- Základní operace pro správu příspěvků: **vytvoření, čtení, aktualizace, mazání**.
- REST API endpointy pro interakci s databází (ukázka):

```ts
// Vytvoření nového příspěvku
router.post("/posts", authenticateUser, async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

### **3.2. Autentizace a autorizace uživatelů**

- **JWT** – přihlašování a ověřování uživatelů.
- **Role-based access control (RBAC)** – rozdělení přístupových práv (admin, autor).
- **Ochrana citlivých operací** – pouze autorizovaní uživatelé mohou mazat/aktualizovat příspěvky.

### **3.3. Filtrování a stránkování dat**

- **Filtrování příspěvků** podle kategorií, tagů, autora, stavu publikace.
- **Stránkování** pomocí parametrů `offset` a `limit`.
- **Indexování v MongoDB** pro rychlejší dotazy.

### **3.4. Systém hodnocení příspěvků (like/dislike)**

- Uživatelé mohou **lajkovat/dislajkovat** příspěvky.
- **Validace** – uživatel nemůže hodnotit stejný příspěvek vícekrát.

### **3.5. Validace vstupních dat**

- **Povinná pole** (slug, title, content).
- **Zajištění unikátnosti** slugu příspěvku.
- **Ošetření chybových stavů** (např. neplatná data).

### **3.6. Bezpečnost aplikace**

- **Ochrana proti útokům:**
  - CORS – správná konfigurace přístupových pravidel.
  - XSS, SQL Injection – validace vstupních dat.
  - Rate limiting – omezení počtu API požadavků.

### **3.7. Logování a ladění**

- **Development:** `console.log()`.
- **Produkční prostředí:** Winston pro ukládání logů do souboru nebo databáze.

---

## **4. Databáze**

### **4.1. Návrh databázových schémat**

- **Příspěvek** (title, content, author, tags, likes).
- **Uživatel** (username, email, password, role).
- **Kategorie** (název, popis).
- **Lajky** (příspěvek, uživatel, typ reakce).

### **4.2. Optimalizace databázových dotazů**

- Použití **indexů** na často dotazovaná pole.
- **lean()** pro rychlejší čtení dat.
- **select()** pro minimalizaci přenášených dat.

---

## **5. Frontend**

### **5.1. Framework**

- **Next.js** – pro **SSR**, dynamické stránky a rychlé načítání.

### **5.2. Styling**

- **Tailwind CSS** – snadná úprava vzhledu aplikace.
- **CSS variabilita** – možnost změny designu přes Tailwind konfiguraci.

### **5.3. Komponenty**

- **Navigace:** Sidebar, Breadcrumbs.
- **Obsah:** Post, WysiwygEditor, ProfileCard.
- **Autentizace:** LoginForm, RegisterForm.

### **5.4. API komunikace**

- Axios instance s error handlingem:

```ts
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 5000,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API chyba:", error);
    return Promise.reject(error);
  }
);

export default api;
```

### **5.5. Další knihovny**

- **@fortawesome/react-fontawesome** – ikony.
- **react-intersection-observer** – nekonečné scrollování.
- **@tiptap/\*, quill** – bohatý textový editor.

---

## **6. Testování**

- **Jest** – unit testy pro backend API.
- **Cypress** – end-to-end testy pro frontend.

---

## **7. Deployment**

- **Docker** – kontejnerizace backendu a frontendu.
- **CI/CD** – automatizované nasazení přes GitHub Actions.
- **Nginx** – reverzní proxy a statický hosting frontendu.

---

## **8. Budoucí rozšíření**

- **Notifikace** – upozornění na nové komentáře nebo lajky.
- **Offline režim** – možnost číst příspěvky i bez připojení k internetu.
- **Statistiky** – přehled návštěvnosti a engagementu příspěvků.

---

Tato verze je podrobnější, pokrývá důležité aspekty projektu a reflektuje moje připomínky. Co myslíš? 😊

<!-- # Dokumentace projektu

## 1. **Obecné**

- **zapinacky**
  - docker build -t backend-image -f ./backend.Dockerfile ../backend
  - docker build -t frontend-image -f ./frontend.Dockerfile ../frontend
  - docker run -d --name mongo --network blog-network -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=Mongo123! mongo
  - docker run -d --name backend --network blog-network -p 5000:5000 backend-image
  - docker run -d --name frontend --network blog-network -p 3000:3000 frontend-image
- **Struktura projektu**:
  - frontend: Obsahuje kód pro uživatelské rozhraní (React, Next.js).
  - backend: Obsahuje serverovou logiku (Express.js, Mongoose).
  - docker: Konfigurace pro Docker a Docker Compose.
  - `.env`: Konfigurační soubor pro citlivé údaje (např. přihlašovací údaje k databázi).
  - README.md: Dokumentace projektu.
- **Použité technologie**:
  - **Programovací jazyky**:
    - JavaScript
    - TypeScript
  - **Nástroje**:
    - Node.js
    - npm
  - **Verzování projektu**:
    - Git
    - GitHub
  - **Konfigurace prostředí**:
    - `.env` soubory
- **Docker**:
  - Kontejnerizace aplikace pro snadné nasazení.
  1. `Dockerfile` pro backend a databázi.
  2. `docker-compose.yml` pro orchestraci více kontejnerů.

## 2. **Frontend**

- **Framework**:
  - **Next.js**: Pro server-side rendering (SSR) a optimalizaci výkonu.
- **Knihovny**:

  1. **`@fortawesome/fontawesome-svg-core`, `@fortawesome/free-solid-svg-icons`, `@fortawesome/react-fontawesome`**
     - **Popis knihovny**: Poskytují sadu ikon Font Awesome a jejich integraci do Reactu.
     - **Využití v projektu**: V projektu jsou využívány v komponentách, jako je `Sidebar`, pro zobrazení ikon u navigačních odkazů (například ikony pro příspěvky nebo uživatele).
  2. **`respinner`**
     - **Popis knihovny**: Poskytuje jednoduché spinnery pro indikaci načítání.
     - **Využití v projektu**: V projektu je využívána pro zobrazení spinneru při načítání dat, například při načítání příspěvků.
  3. **`@tiptap/*`**
     - **Popis knihovny**: Sada rozšiřitelných nástrojů pro tvorbu bohatého textového editoru, včetně základních funkcí a rozšíření, jako jsou tučné písmo, seznamy, nadpisy, barvy textu a další.
     - **Využití v projektu**: V projektu jsou využívány v komponentách, jako jsou `WysiwygEditor` a `Wysiwyg`, pro implementaci editoru příspěvků s podporou formátování textu.
  4. **`quill`**
     - **Popis knihovny**: Lehký WYSIWYG editor pro úpravu textu.
     - **Využití v projektu**: V projektu je pravděpodobně využívána jako alternativa nebo doplněk k `@tiptap` editoru.
  5. **`axios`**
     - **Popis knihovny**: Knihovna slouží pro HTTP požadavky a usnadňuje komunikaci s API.
     - **Využití v projektu**: V projektu je využívána v `axiosInstance` pro volání API endpointů, například pro načítání příspěvků nebo přihlašování uživatelů.
  6. **`dotenv`**
     - **Popis knihovny**: Umožňuje načítání environmentálních proměnných z `.env` souborů.
     - **Využití v projektu**: V projektu je využívána pro konfiguraci aplikace, například pro načítání URL backendu nebo jiných citlivých údajů.
  7. **`next`**
     - **Popis knihovny**: Framework pro React, který poskytuje server-side rendering (SSR), statické generování a optimalizaci výkonu.
     - **Využití v projektu**: V projektu je využíván jako základní framework pro frontend, například pro správu routingu a SSR v souborech, jako je page.tsx.
  8. **`react` a `react-dom`**
     - **Popis knihovny**: Poskytují základní nástroje pro tvorbu uživatelského rozhraní a jeho vykreslování do DOM.
     - **Využití v projektu**: V projektu jsou využívány v celém frontendovém kódu jako základní knihovny pro tvorbu komponent.
  9. **`react-intersection-observer`**
     - **Popis knihovny**: Poskytuje React hook pro sledování viditelnosti elementů v viewportu.
     - **Využití v projektu**: V projektu je využívána například v page.tsx pro implementaci nekonečného scrollování a načítání dalších příspěvků.
  10. **`@eslint/eslintrc`, `eslint`, `eslint-config-next`**
      - **Popis knihovny**: Nástroje pro statickou analýzu kódu a zajištění dodržování pravidel psaní kódu.
      - **Využití v projektu**: V projektu jsou využívány pro lintování kódu pomocí příkazu `npm run lint`.
  11. **`@types/jsonwebtoken`, `@types/node`, `@types/react`, `@types/react-dom`**
      - **Popis knihovny**: Poskytují TypeScript typy pro různé knihovny, jako jsou `react`, `node` a `jsonwebtoken`.
      - **Využití v projektu**: V projektu jsou využívány pro zajištění správných typů v celém TypeScriptovém kódu.
  12. **`typescript`**
      - **Popis knihovny**: Přidává podporu pro statické typování v JavaScriptu.
      - **Využití v projektu**: V projektu je využívána v celém kódu, například v komponentách, jako je `Sidebar`.
  13. **`autoprefixer`, `postcss`, `tailwindcss`**
      - **Popis knihovny**: Nástroje pro styling a automatické přidávání CSS prefixů.
      - **Využití v projektu**: V projektu jsou využívány v konfiguraci Tailwind CSS (`tailwind.config.ts`) a PostCSS (`postcss.config.mjs`) pro styling komponent.

- **API komunikace**:
  - Axios instance pro komunikaci s backendem.
  - Zpracování chybových stavů a zobrazení uživatelských zpráv.
- **Komponenty**:
  - **`Sidebar`**: Navigační panel s odkazy na různé části aplikace.
  - **`Post`**: Zobrazení příspěvků s možností lajkování, úpravy a mazání.
  - **`WysiwygEditor`**: Editor pro vytváření a úpravu příspěvků.
  - **`LoginForm`** a **`RegisterForm`**: Formuláře pro přihlášení a registraci uživatelů.
  - **`Breadcrumb`**: Navigační cesty na základě aktuální URL.
  - **`ProfileCard`**: Zobrazení uživatelského profilu s možností odhlášení.

## 3. **Backend**

- **Frameworky**:
  - **Express.js**: Pro tvorbu REST API.
- **Knihovny**
  - **nevim**
- **Databázová konfigurace**:
  - Připojení k MongoDB pomocí Mongoose.
  - Konfigurace prostřednictvím `.env` proměnných:
    - `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `DB_NAME`.
- **Middleware**:
  - **Vlastní middleware**:
    - Autentizace (např. JWT).
    - Autorizace (např. kontrola rolí uživatele).
  - **Třetí strany**:
    - `cors`: Pro povolení CORS požadavků.
- **Routy a metody**:
  - **Autentizace**:
    - `POST /login`: Přihlášení uživatele.
    - `POST /register`: Registrace nového uživatele.
  - **Příspěvky**:
    - `GET /posts`: Získání seznamu příspěvků.
    - `POST /posts`: Vytvoření nového příspěvku.
    - `PUT /posts/:id`: Úprava příspěvku.
    - `DELETE /posts/:id`: Smazání příspěvku.
  - **Uživatelé**:
    - `GET /users`: Získání seznamu uživatelů.
    - `GET /users/:id`: Získání detailů uživatele.

## 4. **Databáze**

- **Typ databáze**:
  - MongoDB (NoSQL databáze).
- **Rozdíly mezi tabulkovými a objektovými databázemi**:
  - Tabulkové databáze (např. MySQL) používají tabulky a relace.
  - Objektové databáze (např. MongoDB) ukládají data ve formátu JSON-like dokumentů.
- **Schemata a modely**:
  - Definice schémat pomocí Mongoose.
  - Příklady modelů:
    - **User**: Ukládá informace o uživateli (jméno, e-mail, role).
    - **Post**: Ukládá informace o příspěvcích (název, obsah, autor, tagy).
- **Inicializace databáze**:
  - Skript pro naplnění databáze testovacími daty.
  - Použití `makeMockData.ts` pro generování dat.

## 5. **Docker**

- **Lokální spuštění**:
  - Nastavení `.env` souboru.
  - Spuštění backendu: `npm start` nebo `yarn start`.
  - Spuštění frontend aplikace: `npm run dev` nebo `yarn dev`.
- **Produkční prostředí**:
  - Nasazení pomocí Dockeru.
  - Konfigurace databáze a serveru.
  - Optimalizace výkonu (např. minifikace kódu, caching).

## 6. **Deployment**

- **Lokální spuštění**:
  - Nastavení `.env` souboru.
  - Spuštění backendu: `npm start` nebo `yarn start`.
  - Spuštění frontend aplikace: `npm run dev` nebo `yarn dev`.
- **Produkční prostředí**:
  - Nasazení pomocí Dockeru.
  - Konfigurace databáze a serveru.
  - Optimalizace výkonu (např. minifikace kódu, caching).

## 7. **Bezpečnost**

- **Environmentální proměnné**:
  - Použití `.env` pro ukládání citlivých údajů.
- **Hashování hesel**:
  - Použití bcrypt pro bezpečné ukládání hesel.
- **Bezpečné připojení k databázi**:
  - Použití autentizace a šifrování. -->
