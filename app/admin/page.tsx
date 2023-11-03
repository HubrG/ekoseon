import PageTransition from '@/src/feature/layout/effects/PageTransition'
import { redirect } from 'next/navigation';
import React from 'react'
import { getAuthSession } from "@/lib/auth";

export default async function Admin() {
    const session = await getAuthSession();
    console.log(session)
    if (!session) {
        redirect('/connexion');
    }
    if (session.user.role !== "ADMIN") {
      redirect('/')
    }
  return (
    <PageTransition>
    <div className="content">Admin</div>
    </PageTransition>
  )
}
