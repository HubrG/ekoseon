import { getAuthSession } from "@/lib/auth";
import { ThemeToggle } from "@/src/theme/ThemeToggle";
import { LoginButton } from "./auth/LoginButton";
import { UserProfile } from "./auth/UserProfile";
import { Button } from "@/components/ui/button";
import { headers } from 'next/headers';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGift } from "@fortawesome/pro-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import MainMenu from '@/src/feature/layout/header/MainMenu';



export const Header = async () => {
	const session = await getAuthSession();
	return (
		<header className=" z-20 py-5 bg-background w-full">
			<nav className="bg-white dark:bg-slate-900 fixed w-full z-20 top-0 left-0 border-b-2 border-eko-200 border-dashed  dark:border-slate-800">
				<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
					<Link href="/" className="flex items-center nunderline  gap-x-3 ">
						<span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white font-display">
							<span className="text-eko">e</span>
							<span className="text-slate-800  dark:text-slate-50">koseon</span>
						</span>
					</Link>
					<div className="flex gap-x-2 md:order-2">
						<div className="flex items-center gap-x-2">
							<Link href="/raconter-ses-memoires/tarifs">
							<Button size="lg" variant="outline">
								<FontAwesomeIcon icon={faGift} className="mr-2 text-eko" />
								Acheter
							</Button>
							</Link>
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
					<MainMenu />
				</div>
			</nav>
		</header>
	);
};
