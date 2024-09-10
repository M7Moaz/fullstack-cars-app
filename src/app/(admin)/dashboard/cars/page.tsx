import AddFormBtn from "@/components/admin/AddFormBtn";
import AdminCars from "@/components/admin/AdminCars";
import AdminCarsFilter from "@/components/admin/AdminCarsFilter";
import { Pagination } from "@/components/ui/Pagination";
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
  const { brand, price, year, page = "1", limit = "9" } = searchParams;
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

  const data = await fetchFilteredCars(query.toString(), {
    page,
    limit,
  });
  const navPages = await fetchFilteredCars(query.toString(), {
    page: "",
    limit: "",
  });
  const totalPages = Math.ceil(navPages.length / +limit);

  return (
    <section>
      <AddFormBtn />
      <AdminCarsFilter />
      <div className="flex flex-col gap-2">
        {data.map((el: any) => (
          <AdminCars
            key={el.title}
            carsData={{
              id: el._id,
              title: el.title,
              img: el.images[0].url,
              price: el.price,
            }}
          />
        ))}
      </div>
      {navPages.length > 9 && (
        <Pagination totalPages={totalPages} page={page} limit={limit} />
      )}
    </section>
  );
};

export default page;
