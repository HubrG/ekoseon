"use client";
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
  import Link from 'next/link';
import { DropdownMenuItemLogout } from './LogoutButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/pro-duotone-svg-icons";


interface MenuProps {
  user: string;
}
export const UserProfile =  (props:MenuProps) => {

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button size="lg" variant="ghost">
        <FontAwesomeIcon icon={faUser} className="mr-2 h-4 w-4" />
          <span className='lg:block md:hidden block'>{props.user}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        <DropdownMenuItem className="w-full" asChild >
          <Link href="/profil/mes-commandes" className="nunderline">
          <FontAwesomeIcon icon={faUser} className="mr-2 h-4 w-4" />
            Mes commandes
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItemLogout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};