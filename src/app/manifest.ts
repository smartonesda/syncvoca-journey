import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SyncVoca Journey",
    short_name: "SyncVoca",
    description:
      "Platform vokasi inklusif untuk journey ABK, evidence kompetensi, consent, validasi DUDI, dan dashboard pendampingan.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8faf7",
    theme_color: "#0b6f31",
    orientation: "portrait-primary",
    categories: ["education", "productivity"],
    icons: [
      {
        src: "/syncvoca-logo.png",
        sizes: "640x640",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/syncvoca-logo.png",
        sizes: "640x640",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
