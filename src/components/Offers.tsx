import { fetchCars } from "@/utils/fetchData";
import Card from "./ui/Card";
import Container from "./ui/Container";
import Title from "./ui/Title";

const Offers = async () => {
  const data = await fetchCars();

  const carHasOffer = data.filter((car: any) => car.hasOffer === true);
  return (
    <section>
      <Title>Latest offers</Title>
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {carHasOffer.map((el: any) => (
            <Card
              key={el._id}
              data={{
                id: el._id,
                title: el.title,
                oldPrice: el.price,
                newPrice: el.offerPrice,
                colors: el.colors,
                rate: el.rate,
                brand: el.brand,
                image: el.images[0].url,
              }}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Offers;
