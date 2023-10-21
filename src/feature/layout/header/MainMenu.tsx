"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


export default function MainMenu() {
    const pathname = usePathname();
   
    return (
        <div
        className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-sticky">
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-slate-100 rounded-lg bg-slate-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-slate-800 md:dark:bg-slate-900 dark:border-slate-700 text-lg">
            <li>
                <Link
                    href="/raconter-ses-memoires/fonctionnement"
                    className={`${pathname == "/raconter-ses-memoires/fonctionnement" ? "special-uderline-active" : "text-slate-900 special-uderline"} nunderline  block py-2 pl-3 text-base pr-4  rounded hover:bg-slate-100 md:hover:bg-transparent md:hover:text-eko md:p-0 md:dark:hover:text-eko-500 dark:text-white dark:hover:bg-slate-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-slate-700`}>
                    Fonctionnement
                </Link>
            </li>
            <li>
                <Link
                    href="/raconter-ses-memoires/tarifs"
                    className={`${pathname == "/raconter-ses-memoires/tarifs" ? "special-uderline-active" : "text-slate-900 special-uderline"} nunderline  block py-2 pl-3 text-base pr-4  rounded hover:bg-slate-100 md:hover:bg-transparent md:hover:text-eko md:p-0 md:dark:hover:text-eko-500 dark:text-white dark:hover:bg-slate-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-slate-700`}>
                    Tarifs
                </Link>
            </li>
            <li>
                <Link
                    href="/raconter-ses-memoires/contact"
                    className={`${pathname == "/raconter-ses-memoires/contact" ? "special-uderline-active" : "text-slate-900 special-uderline"} nunderline  block py-2 pl-3 text-base pr-4  rounded hover:bg-slate-100 md:hover:bg-transparent md:hover:text-eko md:p-0 md:dark:hover:text-eko-500 dark:text-white dark:hover:bg-slate-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-slate-700`}>
                    Contact
                </Link>
            </li>
        </ul>
    </div>
    )
  }
  