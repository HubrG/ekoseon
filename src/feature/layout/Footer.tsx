import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import MotionShow from "@/src/feature/layout/effects/Show";

export const Footer = async () => {
  return (
    <footer className="bg-app-50 dark:bg-slate-900  shadow-t-sm border-t-4 border-app-200 dark:border-app-800 ">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="logo">
              <span>
                <span>e</span>
                <span>koseon</span>
              </span>
            </Link>
          </div>
          <div className="grid gap-3 grid-cols-2">
            <div className="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-1">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-app-900 uppercase dark:text-white">
                  Navigation
                </h2>
                <ul className="text-app-500 dark:text-app-400 flex flex-col gap-y-3 font-normal">
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
                      href="/blog"
                      prefetch={true}
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
            </div>
            <div className="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-1">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-app-900 uppercase dark:text-white">
                  ACTIONS
                </h2>
                <ul className="text-app-500 dark:text-app-400 flex flex-col gap-y-3 font-normal">
                  <li>
                    <Link
                      href="/raconter-ses-memoires/tarifs"
                      className="hover:underline">
                      Acheter
                    </Link>
                  </li>
                  <li>
                    <Link href="/connexion" className="hover:underline">
                      Connexion
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* <hr className="my-6 border-app-200 rounded-lg sm:mx-auto dark:border-app-700 lg:my-8" /> */}
        <div className="px-4 py-6 mt-8 bg-app-100 rounded-lg text-app-500 dark:text-slate-300 dark:bg-slate-950  md:flex md:items-center md:justify-between">
          <span className="text-sm  sm:text-center font-semibold">
            © 2023 <Link href="/">Ekoseon</Link>. Tous droits réservés
          </span>
          <div className="flex mt-4 space-x-5 sm:justify-center md:mt-0 text-sm">
            <Link
              href="/mentions-legales"
              prefetch={true}
              className="subFooterLink">
              Mentions légale
            </Link>
            <Link
              href="/politique-de-confidentialite"
              prefetch={true}
              className="subFooterLink">
              Politique de confidentialité
            </Link>
            <Link
              href="/conditions-generales-de-vente"
              prefetch={true}
              className=" subFooterLink">
              CGV
            </Link>
          </div>
          <div className="flex mt-4 space-x-5  sm:justify-center md:mt-0">
            <ul className="mt-8 flex justify-center gap-6 sm:mt-0 lg:justify-end">
              <li>
                <a
                  href="https://www.facebook.com/ekoseon/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-slate-700 hover:text-app-700 dark:hover:text-app-600 transition hover:opacity-75">
                  <span className="sr-only">Facebook</span>
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>

              <li>
                <a
                  href="https://www.instagram.com/ekos.eon/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-slate-700 hover:text-app-700 dark:hover:text-app-600 transition hover:opacity-75">
                  <span className="sr-only">Instagram</span>
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>

              <li>
                <a
                  href="https://twitter.com/ekoseon"
                  rel="noreferrer"
                  target="_blank"
                  className="text-slate-700 hover:text-app-700 dark:hover:text-app-600 transition hover:opacity-75">
                  <span className="sr-only">Twitter</span>
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>

              {/* <li>
                  <a
                    href="/"
                    rel="noreferrer"
                    target="_blank"
                    className="text-slate-700 hover:text-app-700 dark:hover:text-app-600 transition hover:opacity-75">
                    <span className="sr-only">YouTube</span>

                    <FontAwesomeIcon icon={faYoutube} />
                  </a>
                </li> */}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
