import React from 'react'
import PageTransition from '@/src/feature/layout/effects/PageTransition'
import { redirect } from 'next/navigation';
import { getAuthSession } from "@/lib/auth";
import { CreatePost } from '../../../src/feature/layout/blog/admin/CreatePost';



export default async function Blog() {
    const session = await getAuthSession();
    if (!session) {
        redirect('/connexion');
    }
    if (session.user.role !== "ADMIN") {
      redirect('/')
    }


  
  return (
    <>
   
    <PageTransition>
    <div className="content">
     <CreatePost />
    </div>
      </PageTransition>
      </>
  )
}
