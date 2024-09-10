"use client";
import { useEffect, useState } from "react";
import { fetchBrands } from "@/utils/fetchData";
import { BrandProps } from "@/utils/props";
import { useRouter } from "next/navigation";
const AdminCarsFilter = () => {
  const router = useRouter();
  const [brands, setBrands] = useState<BrandProps[]>([]);

  useEffect(() => {
    const main = async () => {
      const res = await fetchBrands("brands");
      setBrands(res);
    };
    main();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const query = new URLSearchParams(window.location.search);
    if (name === "brand") {
      query.set("brand", value);
      if (query.get("page")) {
        query.set("page", "1");
      }
    }
    if (name === "year") {
      query.set("year", value);
      if (query.get("page")) {
        query.set("page", "1");
      }
    }
    if (name === "price") {
      query.set("price", value);
    }

    router.push(`?${query.toString()}`);
  };

  return (
    <section className="mb-3 p-2 shadow-md rounded-md text-xs">
      <div className="flex gap-2 flex-wrap justify-center">
        <select
          className="appearance-none px-4 bg-white border border-gray-300 rounded-lg p-2 text-primary shadow-sm focus:outline-none transition ease-in-out duration-150 "
          name="brand"
          id=""
          onChange={(e) => handleChange(e)}
          defaultValue={"placeholder"}
        >
          <option value="placeholder" disabled>
            Select Brand
          </option>
          <option value="">All</option>
          {brands.map((el) => (
            <option className="" key={el._id} value={el.title}>
              {el.title}
            </option>
          ))}
        </select>
        <select
          className="appearance-none px-4 bg-white border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none transition ease-in-out duration-150 text-primary"
          name="price"
          id=""
          onChange={(e) => handleChange(e)}
          defaultValue={"placeholder"}
        >
          <option disabled value="placeholder">
            Sort By Price
          </option>
          <option value="min">Low to high</option>
          <option value="max">High to low</option>
        </select>
        <select
          className="appearance-none px-4 bg-white border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none transition ease-in-out duration-150 text-primary"
          name="year"
          id="year"
          onChange={(e) => handleChange(e)}
          defaultValue={"placeholder"}
        >
          <option disabled value="placeholder">
            Model
          </option>
          <option value="">All</option>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={2024 - i}>
              {2024 - i}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};

export default AdminCarsFilter;
