import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import { Pagination } from "@/components/ui/Pagination";
import Title from "@/components/ui/Title";
import { fetchNewCars } from "@/utils/fetchData";

const page = async () => {
  const newCars = await fetchNewCars();

  return (
    <section className="mb-10">
      <Container>
        <Title>New cars</Title>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {newCars.map((el: any) => (
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
        {/* <Pagination totalPages={totalPages} page={page} limit={limit} /> */}
      </Container>
    </section>
  );
};

export default page;
