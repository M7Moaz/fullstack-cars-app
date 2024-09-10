import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import { Pagination } from "@/components/ui/Pagination";
import Title from "@/components/ui/Title";
import { fetchFilteredCars } from "@/utils/fetchData";

const page = async ({
  searchParams,
}: {
  searchParams: {
    brand?: string;
    price?: string;
    year?: string;
    page?: string;
    limit?: string;
  };
}) => {
  const { brand, price, year, page = "1", limit = "6" } = searchParams;
  const query = new URLSearchParams();
  if (brand) {
    query.set("brand", brand);
  }
  if (price) {
    query.set("price", price);
  }
  if (year) {
    query.set("year", year);
  }

  const data = await fetchFilteredCars(query.toString(), { page, limit });
  const navPages = await fetchFilteredCars(query.toString(), {
    page: "",
    limit: "",
  });
  const totalPages = Math.ceil(navPages.length / +limit);

  return (
    <section>
      <Container>
        <Title>Filtered Cars</Title>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
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
        {navPages.length > 6 && (
          <Pagination totalPages={totalPages} page={page} limit={limit} />
        )}
      </Container>
    </section>
  );
};

export default page;
