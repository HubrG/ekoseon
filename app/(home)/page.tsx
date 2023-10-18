import { getAuthSession } from "@/lib/auth";

export default async function Home() {
    const session = await getAuthSession();
    //  throw new Error('Ceci est une erreur !');
  return (
      <div>Home {session?.user.email}</div>
  )
}
