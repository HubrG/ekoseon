"use client";
import { Button } from '@/components/ui/button';
import React from 'react'
import { createNewPost } from './utils.server';
import { Toastify } from '../../toastify/Toastify';

export const CreatePost = () => {

  
  const handleClick = async () => {
    const res = await createNewPost();
    if (res && res.id) {
    window.location.href = `/admin/blog/edit/${res.id}/article`
    } else {
      Toastify({
        value: 'Une erreur est survenue',
        type: 'error'
      })
    }
  }
  return (
    <Button variant="link" onClick={handleClick}>Créer un post</Button>
  )
}
