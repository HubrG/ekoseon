import { getAuthSession } from "@/lib/auth";
import { ThemeToggle } from "@/src/theme/ThemeToggle";
import { LoginButton } from "./auth/LoginButton";
import { UserProfile } from "./auth/UserProfile";
import { Button } from "@/components/ui/button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGift } from "@fortawesome/pro-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

export const Header = async () => {
  const session = await getAuthSession();

  return (
    <header className=" z-20 py-5 bg-background w-full">
      <nav className="bg-white dark:bg-slate-900 fixed w-full z-20 top-0 left-0 border-b border-fuchsia-200 border-dashed  dark:border-slate-800">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center gap-x-3 ">
            <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white font-display">
              <span className="text-fuchsia-500">e</span>
              <span className="text-slate-800  dark:text-slate-50">koseon</span>
            </span>
          </Link>
          <div className="flex gap-x-2 md:order-2">
            <div className="flex items-center gap-x-2">
              <Button size="lg" variant="outline">
                <FontAwesomeIcon icon={faGift} className="mr-2" />
                Acheter
              </Button>
              <div className="md:block hidden">
                {session?.user ? <UserProfile /> : <LoginButton />}
              </div>
              {/* <ThemeToggle /> */}
            </div>{" "}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-slate-500 rounded-lg md:hidden hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:text-slate-400 dark:hover:bg-slate-700 dark:focus:ring-slate-600"
              aria-controls="navbar-sticky"
              aria-expanded="false">
              <span className="sr-only">Ouvrir le menu principal</span>
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-slate-100 rounded-lg bg-slate-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-slate-800 md:dark:bg-slate-900 dark:border-slate-700 text-lg">
              <li>
                <Link
                  href="#"
                  className="special-uderline block py-2 pl-3 pr-4 text-slate-900 rounded hover:bg-slate-100 md:hover:bg-transparent md:hover:text-fuchsia-700 md:p-0 md:dark:hover:text-fuchsia-500 dark:text-white dark:hover:bg-slate-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-slate-700">
                  Fonctionnement
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="special-uderline block py-2 pl-3 pr-4 text-slate-900 rounded hover:bg-slate-100 md:hover:bg-transparent md:hover:text-fuchsia-700 md:p-0 md:dark:hover:text-fuchsia-500 dark:text-white dark:hover:bg-slate-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-slate-700">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="special-uderline block py-2 pl-3 pr-4 text-slate-900 rounded hover:bg-slate-100 md:hover:bg-transparent md:hover:text-fuchsia-700 md:p-0 md:dark:hover:text-fuchsia-500 dark:text-white dark:hover:bg-slate-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-slate-700">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
