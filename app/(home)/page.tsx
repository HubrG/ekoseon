"use client";
import { Separator } from "@/components/ui/separator";
import MotionGradient from "@/src/feature/layout/effects/GradientBg";
import MotionHover from "@/src/feature/layout/effects/Hover";
import MotionLevitation from "@/src/feature/layout/effects/Levitation";
import MotionShow from "@/src/feature/layout/effects/Show";
import Hero from "@/src/feature/layout/home/Hero";
import { useNavbarObserver } from "@/src/feature/layout/home/useNavbarObserver";
import { useSocrateObserver } from "@/src/feature/layout/home/useSocrateObserver";
import {
  faAtom,
  faGalaxy,
  faHourglass,
  faMegaphone,
  faPeople,
  faPuzzle,
  faRocket,
  faSolarSystem,
  faSun,
  faVoicemail,
} from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  useNavbarObserver();
  useSocrateObserver();

  return (
    <>
      <Hero />
      <div className="z-50 home-page">
        {/* SECTION : First sec. */}
        <section className="story-section shadow-t-3xl first-section -mt-1 border-b border-dashed  border-app-200">
          <div>
            <div className="w-full">
              <MotionShow
                threshold={0}
                animation="BottomToTop"
                triggerOnce={true}
                duration={0.3}>
                <h2 className="max-md:-mt-8">
                  Immortalisez vos mémoires dans un{" "}
                  <MotionGradient
                    colors={["#701a75", "#75067b", "#a21caf", "#86198f"]}
                    className="inline font-serif underline">
                    podcast
                  </MotionGradient>
                  , ou dans un{" "}
                  <MotionGradient
                    colors={["#701a75", "#a00ea8", "#a21caf", "#86198f"]}
                    className="inline font-serif underline">
                    livre
                  </MotionGradient>{" "}
                  !
                </h2>
                <p className="pt-0">
                  Nous sublimons vos histoires personnelles au travers d&apos;
                  <strong>entretiens biographiques enregistrés</strong> de
                  grande qualité, montés, facilement diffusables et
                  soigneusement conservés. Et si ce n&apos;est pas suffisant,
                  nous transposons le contenu de ces entretiens dans{" "}
                  <strong>un véritable livre autobiographie</strong>{" "}
                  soigneusement rédigé, imprimé et relié dans une somptueuse
                  édition.
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
                        duration={0.3}>
                        <div>
                          <FontAwesomeIcon icon={faVoicemail} />
                        </div>
                        <div>
                          <h3>Qualité sonore</h3>
                          <p>
                            Votre voix, vos rires, vos trémolos et intonnations
                            entrent dans une nouvelle dimension en
                            s&apos;encrant dans un{" "}
                            <strong>
                              enregistrement audio de qualité studio
                            </strong>
                            , même à distance !
                          </p>
                        </div>
                      </MotionShow>
                    </li>
                    <li>
                      <MotionShow
                        threshold={0.2}
                        animation="slideInFromBottom"
                        triggerOnce={true}
                        duration={0.3}>
                        <div>
                          <FontAwesomeIcon icon={faPeople} />
                        </div>
                        <div>
                          <h3>Simplicité</h3>
                          <p>
                            Nous prenons les rênes et vous guidons à travers un
                            processus de création simple, non contraignant et
                            respectueux de votre rythme. Laissez-vous porter !
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
                        duration={0.3}>
                        <div>
                          <FontAwesomeIcon icon={faPuzzle} />
                        </div>
                        <div>
                          <h3>Respect narratif</h3>
                          <p>
                            Dans le montage audio comme à l&apos;écrit, nous
                            mettons un point d&apos;honneur à ne jamais
                            travestir vos souhaits de narration, votre ton,
                            votre personnalité.
                          </p>
                        </div>
                      </MotionShow>
                    </li>
                    <li>
                      <MotionShow
                        threshold={0.5}
                        animation="slideInFromBottom"
                        triggerOnce={true}
                        duration={0.3}>
                        <div>
                          <FontAwesomeIcon icon={faMegaphone} />
                        </div>
                        <div>
                          <h3>Liberté</h3>
                          <p>
                            Nous accordons une grande importance à la liberté
                            d&apos;expression de chacun. Vous êtes libre de vous
                            raconter comme vous le souhaitez.
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
        <section className="podcast-section  home-section  ">
          <div className="content  flex md:flex-row gap-x-5 flex-col items-center">
            <div className="absolute md:opacity-40 opacity-60 box-border inset-0 bottom-0 z-0  backdrop-brightness-80 h-full">
              <Image
                priority={false}
                src="/img/home/podcast-bg.webp"
                alt="Podcast - image de fond"
                fill
                className="object-center object-cover brightness-150 select-none"
              />
            </div>
            <div className="md:w-1/2 w-full z-10">
              <MotionShow
                threshold={0}
                animation="slideInFromLeft"
                triggerOnce={true}
                duration={0.3}>
                <h2>
                  Podcast biographique{" "}
                  <small className="block md:text-3xl text-2xl">
                    Retracez votre vie en une voix.
                  </small>
                </h2>
              </MotionShow>
              <MotionShow
                threshold={0}
                animation="slideInFromLeft"
                triggerOnce={true}
                duration={0.3}>
                <p>
                  Opter pour un podcast biographique, c&apos;est choisir de
                  vibrer au rythme de votre propre voix, de partager
                  l&apos;intimité de vos souvenirs en tonalités. Chez Ekoseon,
                  nous capturons la quintessence de vos expériences dans un
                  format audio riche, créant ainsi un véritable feuilleton de
                  votre vie. Vos anecdotes, vos rires, et les inflexions de
                  votre voix s&apos;entremêlent pour donner naissance à un
                  tableau sonore qui transcende le temps et touche les cœurs de
                  façon unique.
                </p>
              </MotionShow>
            </div>
            <MotionShow
              className="flex justify-center w-full md:w-1/2"
              threshold={0}
              animation="BottomToTop"
              triggerOnce={true}
              duration={0.3}>
              <Suspense
                fallback={
                  <Image
                    src="/img/home/podcast-photo-no-video.webp"
                    alt="Podcast - exemple"
                    fill
                    className="object-center object-cover brightness-150 select-none"
                  />
                }>
                <div className="w-2/3">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto"
                    poster="https://res.cloudinary.com/dxdwu31ry/image/upload/v1701947246/Ekoseon/Home/Pink_Brown_Modern_Mockup_Podcast_Instagram_Story_vpxhx1.png">
                    <source
                      src="/img/home/podcast-photo.webm"
                      type="video/webm"
                    />
                    {/* Ajoutez d'autres sources vidéo si nécessaire */}
                    Votre navigateur ne prend pas en charge la lecture de
                    vidéos.
                  </video>
                  {/* Image de secours si la vidéo ne peut pas être lue */}
                  <Image
                    src="https://res.cloudinary.com/dxdwu31ry/image/upload/v1701947246/Ekoseon/Home/Pink_Brown_Modern_Mockup_Podcast_Instagram_Story_vpxhx1.png"
                    alt="Image alternative"
                    width={600}
                    height={600}
                    className="w-full h-auto hidden"
                  />
                </div>
              </Suspense>
            </MotionShow>
          </div>
        </section>
        {/* SECTION: Biographie */}
        <section id="yourStory" className="story-section home-section ">
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
            <div className="md:w-1/2  w-full z-0  max-md:mt-20 md:pt-20 pt-10  relative flex justify-center items-center  ">
              <MotionShow
                className="absolute -top-20 "
                threshold={0}
                animation="bounceIn"
                triggerOnce={true}
                duration={0.3}>
                <MotionLevitation amp={10} duration={7}>
                  <Image
                    src="/img/home/biographie-photo-3.webp"
                    alt="Biographie - décoration de plumes"
                    className="brightness-125"
                    width={600}
                    height={300}
                  />
                </MotionLevitation>
              </MotionShow>
              <MotionHover
                type="shiftRight"
                scale={60}
                className="md:ml-24 ml-28 absolute"
                shadow="none">
                <MotionShow
                  className="w-full"
                  threshold={0}
                  animation="scaleUp"
                  triggerOnce={true}
                  duration={0.3}>
                  <MotionLevitation amp={2} duration={7}>
                    <Image
                      className="max-md:w-2/3 max-md:ml-10 "
                      src={"/img/home/biographie-photo-2.webp"}
                      alt="Biographie - Deuxième exemple de livre"
                      width={200}
                      height={300}
                    />
                  </MotionLevitation>
                </MotionShow>
              </MotionHover>
              <MotionHover
                type="grow"
                scale={1.1}
                className="md:-ml-24 "
                shadow="none">
                <MotionShow
                  className="w-full"
                  threshold={0}
                  animation="scaleUp"
                  triggerOnce={true}
                  duration={0.3}>
                  <MotionLevitation amp={2} duration={5}>
                    <Image
                      src={"/img/home/biographie-photo.webp"}
                      alt="Biographie - Exemple de livre"
                      className="max-md:w-2/3  select-none"
                      width={250}
                      height={300}
                    />
                  </MotionLevitation>
                </MotionShow>
              </MotionHover>
            </div>
            <div className="written-biography-option max-md:order-first max-md:mb-10 z-10 md:w-1/2 w-full">
              <h2>
                Livre biographique
                <small className="block md:text-3xl text-2xl">
                  Les souvenirs s&apos;envolent, les écrits demeurent.
                  Éternellement.
                </small>
              </h2>
              <p>
                Si vous optez pour une biographie écrite, Ekoseon vous
                accompagne dans la création d&apos;un livre-mémoire qui
                traversera les âges, tout comme les mythes et légendes ont
                survécu grâce à leur transcription.
              </p>
            </div>
          </div>
        </section>
        {/* SECTION: Pourquoi consigner */}
        <section className="memories-section  home-section relative">
          <div className="absolute md:opacity-30 opacity-60 box-border inset-0 bottom-0 z-0  backdrop-brightness-80 h-full">
            <Image
              priority={false}
              src="/img/home/pourquoi-bg.webp"
              alt="Coffre fort - image de fond"
              fill
              className="object-center object-cover brightness-200 opacity-20 select-none"
            />
          </div>
          <div className="content flex  gap-y-10 flex-col pb-10">
            <div className=" md:text-center text-left w-full">
              <h2>Pourquoi consigner ses mémoires ?</h2>
            </div>
            <ul className="no-home home-pourquoi">
              <li>
                <div className=" bg-fuchsia-500 mask mask-decagon">
                  <FontAwesomeIcon icon={faAtom} className="m-auto" />
                </div>
                <div>
                  <h3>Pour soi-même</h3>
                  <p>
                    Consigner <strong>un évènement</strong> singulier de son
                    existence, sinon <strong>sa vie entière</strong>, tant pour
                    ne rien oublier que pour s&apos;en libérer, est une
                    expérience grisante et salutaire. C&apos;est{" "}
                    <strong>
                      une noble manière de se reconnecter à soi-même
                    </strong>{" "}
                    et de se recentrer sur ce qui compte vraiment.
                  </p>
                </div>
              </li>
              <li>
                <div className=" bg-pink-500 mask mask-hexagon-2">
                  <FontAwesomeIcon icon={faGalaxy} className="m-auto" />
                </div>
                <div>
                  <h3>Pour nos proches</h3>
                  <p>
                    C&apos;est l&apos;assurance de laisser un{" "}
                    <strong>héritage immatériel de poids</strong> qui permettra
                    à vos proches comme à vos lointains de se souvenir de vous.
                    Mieux ! C&apos;est leur offrir de prendre de la hauteur, de
                    s&apos;identifier,{" "}
                    <strong>de s&apos;inscrire dans une généalogie</strong>.
                  </p>
                </div>
              </li>
              <li>
                <div className=" bg-orange-500">
                  <FontAwesomeIcon icon={faHourglass} className="m-auto" />
                </div>
                <div>
                  <h3>Pour l&apos;histoire</h3>
                  <p>
                    Notre vie reflète une partie de l&apos;histoire collective.
                    La consigner contribue à l&apos;édification de la mémoire de
                    votre commune, de votre région, de votre pays, et de proche
                    en proche, de l&apos;humanité. Les historiens saisissent
                    l&apos;esprit du temps à travers les récits de vie.
                  </p>
                </div>
              </li>
              <li>
                <div className=" bg-purple-500 mask mask-star-2">
                  <FontAwesomeIcon icon={faSun} className="m-auto" />
                </div>
                <div>
                  <h3>Par devoir moral</h3>
                  <p>
                    En consignant vos mémoires, vous enrichissez le patrimoine
                    commun de l&apos;humanité de vos expériences. C&apos;est un
                    acte altruiste qui offre à tous une fenêtre supplémentaire
                    pour mieux comprendre ce qui s&apos;articule en chacun de
                    nous, aidant les autres à apprendre de vos réussites,
                    échecs, difficultés et défis.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <section className=" home-section relative" id="socrate">
          <div className="flex flex-col justify-center h-[60vh]   mt-10">
            <MotionShow
              threshold={0}
              className="relative flex justify-center"
              animation="BottomToTop"
              triggerOnce={true}>
              <MotionShow
                threshold={0}
                className="absolute rounded-lg mx-auto z-10"
                animation="beatFade"
                duration={60}
                repeat={1}
                triggerOnce={false}>
                <Image
                  alt="Socrate"
                  src="/img/home/socrate-circle.webp"
                  width={350}
                  height={100}
                  className=""
                />
              </MotionShow>
              <Image
                id="Socrate"
                alt="Socrate"
                src="/img/home/socrate.webp"
                width={300}
                height={100}
                className="rounded-lg mx-auto z-20 brightness-150 "
              />
            </MotionShow>
            <blockquote className=" rounded-lg flex flex-row z-50">
              <div className="font-display  md:text-5xl flex items-center my-auto flex-col md:w-2/3 w-full mx-auto text-4xl mt-20 text-center ">
                “Parce qu&apos;un trésor de belles maximes est préférable à un
                amas de richesses.”
                <cite className="text-center block text-sm mt-2">
                  Une maxime du philosophe Socrate, qui ne nous serait jamais
                  parvenue si Platon ne l&apos;avait pas consignée par écrit il
                  y a 2400 ans.
                </cite>
              </div>
            </blockquote>
          </div>
        </section>
        {/* SECTION: Cadeau */}
        <section className="perfect-gift-section  relative home-section">
          <div className="absolute md:opacity-40 opacity-60 box-border inset-0 bottom-0 z-0  backdrop-brightness-80 h-full">
            <Image
              priority={false}
              src="/img/home/cadeau-bg.webp"
              alt="Coffre fort - image de fond"
              fill
              className="object-center object-cover brightness-150 opacity-20 select-none"
            />
          </div>
          <div className="content flex md:flex-row flex-col items-center pb-10">
            {" "}
            <div className="md:w-1/2 w-full"></div>
            <div className="md:w-1/2 w-full">
              <h2>
                Offrez des siècles d&apos;existence
                <small className="block md:text-3xl text-2xl">
                  À vous, à un proche, pour nous tous.
                </small>
              </h2>
              <p>
                Marquez les esprits avec un présent personnalisé : immortalisez
                les histoires qui vous tiennent à cœur dans un podcast unique et
                une biographie illustrée.
              </p>
            </div>
          </div>
        </section>
        {/* SECTION: Coffret numérique et goodies */}
        <section
          id="digital-box"
          className="digital-box-section relative home-section">
          <div className="absolute md:opacity-40 opacity-60 box-border inset-0 bottom-0 z-0  backdrop-brightness-80 h-full">
            <Image
              priority={false}
              src="/img/home/coffre-fort-bg.webp"
              alt="Coffre fort - image de fond"
              fill
              className="object-center object-contain brightness-150 opacity-20 select-none"
            />
          </div>
          <div className="content flex md:flex-row flex-col items-center pb-10">
            <div className="md:w-1/2 w-full">
              <h2>
                Coffre numérique
                <small className="block md:text-3xl text-2xl">
                  Vos mémoires bien au chaud, sécurisées et accessibles à tout
                  moment.
                </small>
              </h2>
              <p>
                Toutes vos créations - podcasts & livres - soigneusement
                conservées dans votre espace privé sécurisé. Ainsi, vous pouvez
                y accéder à tout moment, les partager avec vos proches, les
                éditer et en faire ce que vous voulez !
              </p>
            </div>
            <div className="md:w-1/2 w-full"></div>
          </div>
        </section>

        {/* SECTION: Âge */}
        <section className="memories-section   home-section relative">
          <div className="absolute md:opacity-40 opacity-60 box-border inset-0 bottom-0 z-0  backdrop-brightness-80 h-full">
            <Image
              priority={false}
              src="/img/home/age-bg.webp"
              alt="Coffre fort - image de fond"
              fill
              className="object-center object-contain brightness-60 opacity-20 select-none"
            />
          </div>
          <div className="content flex md:flex-row flex-col items-center pb-10">
            <div className="md:w-1/2 w-full"></div>
            <div className="md:w-1/2 w-full">
              <h2>
                Peu importe l&apos;âge
                <small className="block md:text-3xl text-2xl">
                  Nous avons tous une histoire à témoigner.
                </small>
              </h2>
              <p>
                Que vous soyez dans la fleur de l&apos;âge ou que vous ayez
                accumulé une sagesse plus mûre, chaque histoire a sa valeur. Des
                premières expériences aux moments marquants, vos récits
                enrichissent le tissu de notre mémoire collective.
                <br />
                Ces partages sont aussi une façon de se libérer, d&apos;offrir
                ses leçons apprises à autrui et même parfois d&apos;alléger son
                cœur en immortalisant des souvenirs qui nous tiennent à cœur.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
