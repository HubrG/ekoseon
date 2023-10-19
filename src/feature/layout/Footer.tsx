
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-5xl">
            Venez vous faire interviewer
          </h2>

          <p className="mx-auto mt-4 max-w-sm text-gray-500">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum
            maiores ipsum eos temporibus ea nihil.
          </p>

          <Link
            href="#"
            className="mt-8 inline-block rounded-full border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500">
            Acheter
          </Link>
        </div>

        <div className="mt-16 border-t border-gray-100 pt-8 sm:flex sm:items-center sm:justify-between lg:mt-24">
          <ul className="flex flex-wrap justify-center gap-4 text-xs lg:justify-end">
            <li>
              <Link href="#" className="text-gray-500 transition hover:opacity-75">
                Mentions légales
              </Link>
            </li>

            <li>
              <Link href="#" className="text-gray-500 transition hover:opacity-75">
                Politique de confidentialité
              </Link>
            </li>

            <li>
              <a href="#" className="text-gray-500 transition hover:opacity-75">
                Cookies
              </a>
            </li>
          </ul>

          <ul className="mt-8 flex justify-center gap-6 sm:mt-0 lg:justify-end">
            <li>
              <a
                href="/"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75">
                <span className="sr-only">Facebook</span>
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </li>

            <li>
              <a
                href="/"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75">
                <span className="sr-only">Instagram</span>

                <FontAwesomeIcon icon={faInstagram} />

              </a>
            </li>

            <li>
              <a
                href="/"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75">
                <span className="sr-only">Twitter</span>

                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>

            <li>
              <a
                href="/"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75">
                <span className="sr-only">YouTube</span>

                <FontAwesomeIcon icon={faYoutube} />

              </a>
            </li>

            
          </ul>
        </div>
      </div>
    </footer>
  );
};
