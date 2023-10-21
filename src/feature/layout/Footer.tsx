import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-eko-100 dark:bg-slate-900 mt-20">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center nunderline">
              <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white font-display">
                <span className="text-eko-500">e</span>
                <span className="text-slate-800  dark:text-slate-50">
                  koseon
                </span>
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-eko-900 uppercase dark:text-white">
                Navigation
              </h2>
              <ul className="text-eko-500 dark:text-eko-400 flex flex-col gap-y-3 font-normal">
                <li>
                  <Link href="/" className="hover:underline">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link
                    href="/raconter-ses-memoires/fonctionnement"
                    className="hover:underline">
                    Fonctionnement
                  </Link>
                </li>
                <li>
                  <Link
                    href="/raconter-ses-memoires/tarifs"
                    className="hover:underline">
                    Tarifs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/raconter-ses-memoires/contact"
                    className="hover:underline">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/raconter-ses-memoires/contact"
                    className="hover:underline">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/foire-aux-questions"
                    className="hover:underline">
                    Foire aux question
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-eko-900 uppercase dark:text-white">
                Follow us
              </h2>
              <ul className="text-eko-500 dark:text-eko-400 font-normal">
                <li className="mb-4">
                  <a
                    href="https://github.com/themesberg/flowbite"
                    className="hover:underline ">
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/4eeurUVvTy"
                    className="hover:underline">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-eko-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-eko-500 dark:text-eko-400 font-normal">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-eko-200 rounded-lg sm:mx-auto dark:border-eko-700 lg:my-8" />
        <div className="px-4 py-6 bg-eko-50 rounded-lg text-slate-500 dark:text-slate-300 dark:bg-slate-700 md:flex md:items-center md:justify-between">
          <span className="text-sm  sm:text-center font-semibold">
            © 2023 <a href="https://ekoseon.fr/">Ekoseon</a>. Tous droits
            réservés
          </span>
          <div className="flex mt-4 space-x-5 sm:justify-center md:mt-0 text-sm">
            <Link href="/mentions-legales">Mentions légale</Link>
            <Link href="/politique-de-confidentialite">
              Politique de confidentialité
            </Link>
            <Link href="/conditions-generales-de-vente">CGV</Link>
          </div>
          <div className="flex mt-4 space-x-5  sm:justify-center md:mt-0">
            <ul className="mt-8 flex justify-center gap-6 sm:mt-0 lg:justify-end">
              <li>
                <a
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-slate-700 hover:text-eko-700 transition hover:opacity-75">
                  <span className="sr-only">Facebook</span>
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>

              <li>
                <a
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-slate-700 hover:text-eko-700 transition hover:opacity-75">
                  <span className="sr-only">Instagram</span>

                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>

              <li>
                <a
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-slate-700 hover:text-eko-700 transition hover:opacity-75">
                  <span className="sr-only">Twitter</span>

                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>

              <li>
                <a
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-slate-700 hover:text-eko-700 transition hover:opacity-75">
                  <span className="sr-only">YouTube</span>

                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
