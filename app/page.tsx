import Navbar from "@/components/Navbar";
import ScrollyTelling from "@/components/ScrollyTelling";
import FeaturedCategories from "@/components/sections/FeaturedCategories";
import SignatureCollections from "@/components/sections/SignatureCollections";
import ConfiguratorPromo from "@/components/sections/ConfiguratorPromo";
import Craftsmanship from "@/components/sections/Craftsmanship";
import ShopTheLook from "@/components/sections/ShopTheLook";
import TradeProgram from "@/components/sections/TradeProgram";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      {/* Hero — scroll-driven canvas sequence (unchanged) */}
      <ScrollyTelling />

      {/* 1 — Bento grid of the four core categories */}
      <FeaturedCategories />

      {/* 2 — Best sellers with material swatches + quick view */}
      <SignatureCollections />

      {/* 3 — Modular & custom configurator promo */}
      <ConfiguratorPromo />

      {/* 4 — Craftsmanship & material library */}
      <Craftsmanship />

      {/* 5 — Shop the look inspiration gallery */}
      <ShopTheLook />

      {/* 6 — B2B / trade program */}
      <TradeProgram />

      {/* 7 — Footer with newsletter + resources */}
      <Footer />
    </main>
  );
}
