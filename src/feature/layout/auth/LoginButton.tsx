'use client';

import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandWave } from "@fortawesome/pro-solid-svg-icons";
import { signIn } from 'next-auth/react';
import { useTransition } from 'react';

export const LoginButton = () => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      size="lg"
      variant="outline"
      onClick={() => {
        startTransition(() => signIn());
      }}
    >
      {isPending ? (
        <Loader className="mr-2 h-4 w-4" />
      ) : (
        <FontAwesomeIcon className="mr-2 h-4 w-4" icon={faHandWave} />
      )}
      Me connecter
    </Button>
  );
};