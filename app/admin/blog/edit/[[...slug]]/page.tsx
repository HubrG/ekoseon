import React from 'react'
import PageTransition from '@/src/feature/layout/effects/PageTransition'
import { redirect } from 'next/navigation';
import { getAuthSession } from "@/lib/auth";
import dynamic from 'next/dynamic';
import { getPost, getBlogCategories, getBlogTagOnPost, getBlogTags } from '@/src/feature/layout/blog/admin/utils.server';

const EditPost = dynamic(() => import('@/src/feature/layout/blog/admin/EditPost'), {
  ssr: false, // Ne sera pas chargé côté serveur
  loading: () => <p>Chargement...</p> // Affiche un texte de chargement pendant que ReactQuill est en train de charger
});


export default async function Admin({ params }: { params: { slug: string } }) {

  const session = await getAuthSession();
    if (!session) {
        redirect('/connexion');
    }
    if (session.user.role !== "ADMIN") {
      redirect('/')
    }
  
  // On récupère le post 
  const post = await getPost(params.slug[0]);
  const categories = await getBlogCategories();
  const tagsOnPost = await getBlogTagOnPost(params.slug[0]);
  const tags = await getBlogTags();
  return (
    <>
   
    <PageTransition>
        <div className="content">
          {post && categories ? (
            <EditPost post={post} categories={categories} tagsOnPost={tagsOnPost?tagsOnPost : undefined} tags={tags?tags:undefined} />) : (<div>Ce post n&apos;existe pas</div>)
          }
    </div>
      </PageTransition>
      </>
  )
}
