import { BerandaLanding } from "@/components/landing/beranda-landing";
import { JsonLd } from "@/components/seo/json-ld";
import { buildLandingJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <JsonLd data={buildLandingJsonLd()} />
      <BerandaLanding />
    </>
  );
}
