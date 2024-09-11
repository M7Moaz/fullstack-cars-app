import BrandCard from "@/components/ui/BrandCard";
import Title from "@/components/ui/Title";
import { fetchBrands } from "@/utils/fetchData";

const page = async () => {
  const res = await fetchBrands("brands");

  const brandData = res;

  return (
    <section className="px-3 my-20">
      <Title>All Brands</Title>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {brandData.map((el: any, idx: number) => (
          <BrandCard
            key={idx}
            link={{
              id: idx,
              title: el.title,
              href: el.href,
              image: el.image,
              logo: el.logo,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default page;
