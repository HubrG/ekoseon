/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400", // Cache la page d'accueil pendant 1 heure
          },
        ],
      },
      {
        source: "/profil",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400", // Cache la page d'accueil pendant 1 heure
          },
        ],
      },
      {
        source: "/raconter-ses-memoires/fonctionnement",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400", // Cache la page d'accueil pendant 1 heure
          },
        ],
      },
      {
        source: "/raconter-ses-memoires/tarifs",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400", // Cache la page d'accueil pendant 1 heure
          },
        ],
      },
      {
        source: "/raconter-ses-memoires/contact",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400", // Cache la page d'accueil pendant 1 heure
          },
        ],
      },
      {
        source: "/foire-aux-questions",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400", // Cache la page d'accueil pendant 1 heure
          },
        ],
      },
      {
        source: "/conditions-generales-de-vente",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400", // Cache la page d'accueil pendant 1 heure
          },
        ],
      },
      {
        source: "/politique-de-confidentialite",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400", // Cache la page d'accueil pendant 1 heure
          },
        ],
      },
      {
        source: "/mentions-legales",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400", // Cache la page d'accueil pendant 1 heure
          },
        ],
      },

    ];
  },
};

module.exports = nextConfig;
