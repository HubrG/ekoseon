"use client";
import { Separator } from "@/components/ui/separator";
import MotionParallax from "@/src/feature/layout/effects/Parallax";
import MotionShow from "@/src/feature/layout/effects/Show";
import Hero from "@/src/feature/layout/home/Hero";
import { useNavbarObserver } from "@/src/feature/layout/home/useNavbarObserver";
import { faPeople, faVoicemail } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  useNavbarObserver();

  return (
    <>
      <Hero />
      <div className="z-50 home-page" >
        {/* SECTION : First sec. */}
        <section className="story-section shadow-t-3xl first-section -mt-1">
          <div>
            <div className="w-full">
              <MotionShow
                threshold={0}
                animation="BottomToTop"
                triggerOnce={true}
                duration={0.5}>
                <h2 className="max-md:-mt-8">
                  Immortalisez vos souvenirs dans un podcast, et dans un livre !
                </h2>
                <p className="pt-0">
                  Ekoseon transforme votre histoire personnelle en{" "}
                  <strong>expériences captivantes</strong> grâce à nos services
                  de création de podcasts et d’écriture de livres biographiques.
                  Imprégnez ces formats de votre essence pour offrir à vos
                  proches un morceau de votre vie, enrichi par une touche
                  personnelle inoubliable.
                </p>
              </MotionShow>
            </div>
            <Separator className="bg-transparent border border-dashed rounded-full my-10" />
            <div className="w-full">
              <div className="flex flex-col gap-5 mt-5">
                <div className="w-full">
                  <MotionShow
                    threshold={0.3}
                    animation="scaleUp"
                    triggerOnce={true}
                    duration={0.5}>
                    <ul className="no-home">
                      <li>
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
                      </li>
                      <li>
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
                      </li>
                    </ul>
                  </MotionShow>
                </div>
                <div className="w-full">
                  <MotionShow
                    threshold={0.3}
                    animation="scaleUp"
                    triggerOnce={true}
                    duration={0.5}>
                    <ul className="no-home">
                      <li>
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
                      </li>
                      <li>
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
                      </li>
                    </ul>
                  </MotionShow>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* SECTION: Podcast */}
        <section className="podcast-section -mt-10 section-gradient-opposite">
          <div className="content">
            <h2>Podcast Biographique : Votre Vie en Sonorités Envoûtantes</h2>
            <p>
              Opter pour un podcast biographique, c&apos;est choisir de vibrer
              au rythme de votre propre voix, de partager l&apos;intimité de vos
              souvenirs en tonalités. Chez Ekoseon, nous capturons la
              quintessence de vos expériences dans un format audio riche, créant
              ainsi un véritable feuilleton de votre vie. Vos anecdotes, vos
              rires, et les inflexions de votre voix s&apos;entremêlent pour
              donner naissance à un tableau sonore qui transcende le temps et
              touche les cœurs de façon unique.
            </p>
            <p>
              Nous mettons en scène vos récits avec une authenticité inégalable,
              orchestrant chaque détail sonore pour souligner l&apos;atmosphère
              de vos souvenirs. Que vos descendants découvrent vos exploits ou
              que vos amis se remémorent les moments partagés, chaque épisode
              podcasté est une fenêtre ouverte sur votre univers, accessible
              d&apos;un simple clic.
            </p>
          </div>
        </section>
        {/* SECTION: Biographie */}
        <section
          id="yourStory"
          className="story-section section-gradient -mt-10 ">
          <div className="content">
            {/* Section optionnelle pour la biographie écrite */}
            <div className="written-biography-option">
              <h2>Laisser une trace écrite: Un héritage indélébile</h2>
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
          className="digital-box-section  -mt-10 section-gradient-opposite ">
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
        <section className="perfect-gift-section  -mt-10 section-gradient ">
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
        <section className="memories-section  -mt-10 section-gradient-opposite ">
          <div className="content">
            <h2>Pourquoi consigner ses mémoires ?</h2>
            <p>
              La transmission de nos récits est un pont entre les générations,
              un moyen d&apos;apprendre, de partager et de se souvenir.
            </p>
          </div>
        </section>
        {/* SECTION: Âge */}
        <section className="timeless-memories-section  -mt-10 section-gradient ">
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
