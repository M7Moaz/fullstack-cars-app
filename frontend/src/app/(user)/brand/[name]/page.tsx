import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Title from "@/components/ui/Title";
import { fetchCars } from "@/utils/fetchData";

const page = async ({ params }: any) => {
  const data = await fetchCars();
  const { name } = params;
  const carName = name.split("-").join(" ");

  const filteredCars = data.filter(
    (el: any) => carName === el.brand.toLowerCase()
  );

  return (
    <section className="mb-20">
      <Container>
        <Title>{carName} Cars</Title>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredCars.map((el: any) => (
            <Card
              key={el._id}
              data={{
                id: el._id,
                title: el.title,
                hasOver: el.hasOffer,
                oldPrice: el.price,
                newPrice: el.offerPrice,
                brand: el.brand,
                colors: el.colors,
                rate: el.rate,
                image: el.images[0].url,
              }}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default page;
