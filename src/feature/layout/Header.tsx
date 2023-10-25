import { getAuthSession } from "@/lib/auth";
import { ThemeToggle } from "@/src/theme/ThemeToggle";
import { LoginButton } from "./auth/LoginButton";
import { UserProfile } from "./auth/UserProfile";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/pro-solid-svg-icons";
import Link from "next/link";
import MainMenu from "@/src/feature/layout/header/MainMenu";
import BurgerMenu from "@/src/feature/layout/header/BurgerMenu";

export const Header = async () => {
  const session = await getAuthSession();
  //  Construction du menu
  const prefix = "/raconter-ses-memoires/";
  const links = [
    {
      url: prefix + "fonctionnement",
      name: "Fonctionnement",
    },
    { url: prefix + "tarifs", name: "Tarifs" },
    { url: prefix + "contact", name: "Contact" },
  ];
  //
  return (
    <header className=" z-20 w-full">
      <nav>
        <div>
          <Link href="/" className="logo">
            <span>
              <span>e</span>
              <span>koseon</span>
            </span>
          </Link>
          <div className="flex gap-x-2 md:order-2 items-center">
            <div className="flex items-center gap-x-2">
              <Link href="/raconter-ses-memoires/tarifs">
                <Button size="lg" variant="ghost">
                  <FontAwesomeIcon icon={faGift} className="mr-2" />
                  Acheter
                </Button>
              </Link>
              <div className="md:block hidden">
                {session?.user ? <UserProfile /> : <LoginButton />}
                </div>
              {/* <ThemeToggle /> */}
            </div>{" "}
            <BurgerMenu links={links} />
          </div>
          <MainMenu links={links} />
        </div>
      </nav>
    </header>
  );
};
