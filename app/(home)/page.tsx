"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import MotionHover from "@/src/feature/layout/effects/Hover";
import MotionLevitation from "@/src/feature/layout/effects/Levitation";
import MotionParallax from "@/src/feature/layout/effects/Parallax";
import MotionShow from "@/src/feature/layout/effects/Show";
import Hero from "@/src/feature/layout/home/Hero";
import { useNavbarObserver } from "@/src/feature/layout/home/useNavbarObserver";
import {
  faPeople,
  faRocket,
  faSolarSystem,
  faVoicemail,
} from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { faGift } from "@fortawesome/pro-solid-svg-icons";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  useNavbarObserver();

  return (
    <>
      <Hero />
      <div className="z-50 home-page">
        {/* SECTION : First sec. */}
        <section className="story-section shadow-t-3xl first-section -mt-1 border-b border-dashed  border-app-300">
          <div>
            <div className="w-full">
              <MotionShow
                threshold={0}
                animation="BottomToTop"
                triggerOnce={true}
                duration={0.5}>
                <h2 className="max-md:-mt-8">
                  Immortalisez vos souvenirs dans un{" "}
                  <span className="rounded box-decoration-slice bg-gradient-to-r from-app-700 to-app-800 text-app-50 font-serif py-2 px-2">
                    podcast
                  </span>
                  , et dans un{" "}
                  <span className="rounded box-decoration-slice bg-gradient-to-r from-app-700 to-app-800 text-app-50 font-serif py-2 px-2">
                    livre
                  </span>{" "}
                  !
                </h2>
                <p className="pt-0">
                  Ekoseon transforme votre histoire personnelle en{" "}
                  <strong className="">expériences captivantes</strong> grâce à
                  nos services de création de podcasts et d’écriture de livres
                  biographiques. Imprégnez ces formats de votre essence pour
                  offrir à vos proches un morceau de votre vie, enrichi par une
                  touche personnelle inoubliable.
                </p>
              </MotionShow>
            </div>
            <Separator className="bg-transparent border border-dashed rounded-full my-10" />
            <div className="w-full">
              <div className="flex flex-col gap-5 mt-5">
                <div className="w-full">
                  <ul className="no-home">
                    <li>
                      <MotionShow
                        threshold={0.3}
                        animation="slideInFromBottom"
                        triggerOnce={true}
                        duration={0.5}>
                        <div>
                          <FontAwesomeIcon icon={faVoicemail} />
                        </div>
                        <div>
                          <h3>Authenticité de la voix</h3>
                          <p>
                            Vos passions, vos rires et vos réflexions entrent
                            dans une nouvelle dimension en s&apos;encrant dans
                            un enregistrement audio de grande qualité,{" "}
                            <span className="font-semibold">
                              même à distance
                            </span>{" "}
                            !
                          </p>
                        </div>
                      </MotionShow>
                    </li>
                    <li>
                      <MotionShow
                        threshold={0.2}
                        animation="slideInFromBottom"
                        triggerOnce={true}
                        duration={0.5}>
                        <div>
                          <FontAwesomeIcon icon={faPeople} />
                        </div>
                        <div>
                          <h3>Connexion émotionnelle</h3>
                          <p>
                            Provoquez une résonance émotionnelle chez vos
                            auditeurs, qui se sentiront comme à vos côtés.
                          </p>
                        </div>
                      </MotionShow>
                    </li>
                  </ul>
                </div>
                <div className="w-full">
                  <ul className="no-home">
                    <li>
                      <MotionShow
                        threshold={0.4}
                        animation="slideInFromBottom"
                        triggerOnce={true}
                        duration={0.5}>
                        <div>
                          <FontAwesomeIcon icon={faVoicemail} />
                        </div>
                        <div>
                          <h3>Expérience Personnalisée :</h3>
                          <p>
                            Nous adaptons le récit en fonction de vos
                            préférences, pour que chaque souvenir reflète
                            fidèlement votre individualité.
                          </p>
                        </div>
                      </MotionShow>
                    </li>
                    <li>
                      <MotionShow
                        threshold={0.5}
                        animation="slideInFromBottom"
                        triggerOnce={true}
                        duration={0.5}>
                        <div>
                          <FontAwesomeIcon icon={faVoicemail} />
                        </div>
                        <div>
                          <h3>Transmission des Valeurs :</h3>
                          <p>
                            Partagez vos expériences de vie et votre sagesse,
                            fixées dans l&apos;oralité ou dans les mots.
                          </p>
                        </div>
                      </MotionShow>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex max-md:flex-col justify-center  gap-5 mt-12 ">
              <Link
                href="/raconter-ses-memoires/fonctionnement"
                className="btn btn-outline">
                <FontAwesomeIcon spin icon={faSolarSystem} />
                En savoir plus sur notre méthode
              </Link>
              <Link href="/raconter-ses-memoires/tarifs" className="btn ">
                <FontAwesomeIcon icon={faRocket} />
                Je commence mes mémoires
              </Link>
            </div>
          </div>
        </section>
        {/* SECTION: Podcast */}
        <section className="podcast-section  home-section">
          <div className="content  flex md:flex-row flex-col items-center">
            <div className="absolute md:opacity-40 opacity-60 box-border  bottom-0 z-0 inset-0 backdrop-brightness-80 h-full">
              <Image
                priority={false}
                src="/img/home/podcast-bg.webp"
                alt="Podcast - image de fond"
                fill
                className="object-center object-cover brightness-150 select-none"
              />
            </div>
            <div className="md:w-1/2 w-full z-10">
              <h2>Podcast biographique : donner voix à votre vie</h2>
              <p>
                Opter pour un podcast biographique, c&apos;est choisir de vibrer
                au rythme de votre propre voix, de partager l&apos;intimité de
                vos souvenirs en tonalités. Chez Ekoseon, nous capturons la
                quintessence de vos expériences dans un format audio riche,
                créant ainsi un véritable feuilleton de votre vie. Vos
                anecdotes, vos rires, et les inflexions de votre voix
                s&apos;entremêlent pour donner naissance à un tableau sonore qui
                transcende le temps et touche les cœurs de façon unique.
              </p>
            </div>
            <div className="flex justify-center w-full md:w-1/2">
              <Suspense
                fallback={
                  <Image
                    src="/img/home/podcast-photo-no-video.webp"
                    alt="Podcast - exemple"
                    fill
                    className="object-center object-cover brightness-150 select-none"
                  />
                }>
                <video autoPlay loop muted playsInline className="w-2/3">
                  <source
                    src="https://res.cloudinary.com/dxdwu31ry/video/upload/v1701942278/Ekoseon/Home/ezgif-3-844257ce98_iajzga.mp4"
                    type="video/mp4"
                  />
                </video>
              </Suspense>
            </div>
          </div>
        </section>
        {/* SECTION: Biographie */}
        <section id="yourStory" className="story-section home-section">
          <div className="content flex md:flex-row flex-col items-center pb-10">
            <div className="absolute opacity-10  box-border background-hero bottom-0 z-0 inset-0 backdrop-brightness-80 h-full">
              <Image
                priority={false}
                src="/img/home/biographie-bg.webp"
                alt="Biographie - image de fond"
                fill
                className="object-top object-cover brightness-150"
              />
            </div>
            {/* Section optionnelle pour la biographie écrite */}
            <div className="md:w-1/2  w-full z-0  -mt-5 mb-14 relative flex justify-center ">
              <MotionLevitation
                className="absolute flex justify-center"
                duration={10}
                amp={5}>
                <Image
                  src={"/img/home/biographie-photo.webp"}
                  alt="Biographie - Exemple de livre"
                  className="max-md:w-1/2"
                  width={250}
                  height={300}
                />
              </MotionLevitation>
              <MotionHover type="grow" shadow="none">
                <MotionLevitation
                  duration={10}
                  amp={10}
                  className=" flex justify-center ml-24 -mt-5">
                  <Image
                    className="max-md:w-1/2 grayscale contrast-125"
                    src={"/img/home/biographie-photo-2.webp"}
                    alt="Biographie - Deuxième exemple de livre"
                    width={200}
                    height={300}
                  />
                </MotionLevitation>
              </MotionHover>
            </div>
            <div className="written-biography-option max-md:order-first max-md:mb-10 z-10 md:w-1/2 w-full">
              <h2>Laisser une trace écrite: un héritage indélébile</h2>
              <p>
                Si vous optez pour une biographie écrite, Ekoseon vous
                accompagne dans la création d&apos;un livre-mémoire qui
                traversera les âges, tout comme les mythes et légendes ont
                survécu grâce à leur transcription.
              </p>
            </div>
          </div>
        </section>
        {/* SECTION: Coffret numérique et goodies */}
        <section
          id="digital-box"
          className="digital-box-section   home-section">
          <div className="content">
            <h2>
              Votre coffret numérique : Souvenirs préservés, accès facilité
            </h2>
            <p>
              Toutes vos créations - podcasts & livres - soigneusement
              conservées dans votre espace privé sécurisé.
            </p>
          </div>
        </section>
        {/* SECTION: Cadeau */}
        <section className="perfect-gift-section  home-section ">
          <div className="content">
            <h2>Un cadeau parfait, pour soi ou pour un proche</h2>
            <p>
              Marquez les esprits avec un présent personnalisé : immortalisez
              les histoires qui vous tiennent à cœur dans un podcast unique et
              une biographie illustrée.
            </p>
          </div>
        </section>
        {/* SECTION: Pourquoi consigner */}
        <section className="memories-section   home-section ">
          <div className="content">
            <h2>Pourquoi consigner ses mémoires ?</h2>
            <p>
              La transmission de nos récits est un pont entre les générations,
              un moyen d&apos;apprendre, de partager et de se souvenir.
            </p>
          </div>
        </section>
        {/* SECTION: Âge */}
        <section className="timeless-memories-section  -mt-10 section-gradient  ">
          <div className="content">
            <h2>
              Pourquoi partager ses mémoires n&apos;est pas une question
              d&apos;âge ?
            </h2>
            <p>
              Que vous soyez dans la fleur de l&apos;âge ou que vous ayez
              accumulé une sagesse plus mûre, chaque histoire a sa valeur. Des
              premières expériences aux moments marquants, vos récits
              enrichissent le tissu de notre mémoire collective.
            </p>
            <p>
              Ces partages sont aussi une façon de se libérer, d&apos;offrir ses
              leçons apprises à autrui et même parfois d&apos;alléger son cœur
              en immortalisant des souvenirs qui nous tiennent à cœur.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
