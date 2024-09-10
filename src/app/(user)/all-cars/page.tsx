import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import { Pagination } from "@/components/ui/Pagination";
import Title from "@/components/ui/Title";
import { carsPagination, fetchCars } from "@/utils/fetchData";

const page = async ({
  searchParams,
}: {
  searchParams: { page: string; limit: string };
}) => {
  const { page = "1", limit = "6" } = searchParams;

  const data = await carsPagination({ page, limit });
  const dataPagination = await fetchCars();
  const totalPages = Math.ceil(dataPagination.length / +limit);

  return (
    <section>
      <Container>
        <Title>All Cars</Title>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.map((el: any) => (
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
        <Pagination totalPages={totalPages} page={page} limit={limit} />
      </Container>
    </section>
  );
};

export default page;
