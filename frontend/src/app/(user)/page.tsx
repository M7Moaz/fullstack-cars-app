import Hero from "@/components/Hero";
import Container from "../../components/ui/Container";
import OurCars from "@/components/OurCars";
import Offers from "@/components/Offers";
import Banner from "@/components/Banner";
import Brands from "@/components/Brands";

export default function Home() {
  return (
    <main className="">
      <Container>
        <Hero />
      </Container>
      <OurCars />
      <Offers />
      <Banner />
      <Brands />
    </main>
  );
}
