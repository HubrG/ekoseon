import PageTransition from '@/src/feature/layout/effects/PageTransition'
import { redirect } from 'next/navigation';
import React from 'react'
import { getAuthSession } from "@/lib/auth";
import Link from 'next/link';

export default async function Admin() {
    const session = await getAuthSession();
    if (!session) {
        redirect('/connexion');
    }
    if (session.user.role !== "ADMIN") {
      redirect('/')
    }
  

  return (
    <PageTransition>
      <div className="content"><h1>Admin</h1>
        <div>
          <Link href="/admin/blog" prefetch={false}>Gérer le blog</Link>
        </div></div>
    </PageTransition>
  )
}
