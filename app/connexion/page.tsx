import LoginPage from '@/src/feature/layout/auth/AuthForm';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation'

const Auth = async () => {
  const session = await getAuthSession();
  if (session) {
    redirect('/')
  }
 
  return (
    <LoginPage />
  );
};

export default Auth;
