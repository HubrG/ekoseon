import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='content'>
      <h2>Erreur 404</h2>
      <p>Nous ne trouvons pas la page demandée.</p>
      <Link href="/">Revenir sur la page d&apos;accueil</Link>
    </div>
  )
}