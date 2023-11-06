"use client";
import { Button } from '@/components/ui/button';
import React from 'react'
import { createNewPost } from './utils.server';
import { Toastify } from '../../toastify/Toastify';
import { faSquarePlus } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    <>
    <Button  variant="ghost" className="flex flex-col shadow gap-y-2 h-auto py-2"  onClick={handleClick}>
    <FontAwesomeIcon icon={faSquarePlus} className="mx-4" />
      Créer un nouveau billet de blog
      </Button>
    </>
  )
}
