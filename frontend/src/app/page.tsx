import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import ProductList from "@/app/components/ProductList";
import Footer from "@/app/components/Footer";
import FeaturedProducts from "./components/FeaturedProducts";

export default function Home() {
  return (
    <>
      {/* <Header /> */}
      <Hero />
      <FeaturedProducts />
      {/* <Footer /> */}
    </>
  );
}
