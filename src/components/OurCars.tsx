import BrandCard from "./ui/BrandCard";
import Title from "./ui/Title";
import Link from "next/link";
import { fetchBrands } from "@/utils/fetchData";

const OurCars = async () => {
  const data = await fetchBrands("brands");
  return (
    <section className="px-3">
      <Title>What we have</Title>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.map(
          (el: any, idx: number) =>
            idx < 6 && (
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
            )
        )}
      </div>
      <Link
        href={"/brand"}
        className="mx-auto text-center bg-primary block w-fit py-2  my-3 mt-10 text-light px-10 rounded-full hover:bg-mid transition-colors"
      >
        See More
      </Link>
    </section>
  );
};

export default OurCars;
