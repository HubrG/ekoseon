'use client';

import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToArc } from "@fortawesome/pro-solid-svg-icons";
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

export const LoginButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      size="lg"
      variant="ghost"
      onClick={() => {
        startTransition(() => router.push("/connexion"));
      }}
    >
      {isPending ? (
        <Loader className="mr-2 h-4 w-4" />
      ) : (
        <FontAwesomeIcon className="mr-2 h-4 w-4" icon={faArrowRightToArc} />
      )}
      Me connecter
    </Button>
  );
};