
import { getAuthSession } from '@/lib/auth';

export const User = async () => {
  const session = await getAuthSession();

  return (
    <>
        {session?.user.name ?? ''}
       </>
  );
};