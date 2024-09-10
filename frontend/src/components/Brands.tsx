"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchBrands } from "@/utils/fetchData";
import { SmallLoadingIcon } from "./admin/Icons";

interface brandProps {
  _id: string;
  title: string;
  href: string;
  logo: string | File;
  image: string | File;
}

const Brands = () => {
  const [brands, setBrands] = useState<brandProps[]>();

  useEffect(() => {
    const main = async () => {
      const data = await fetchBrands("brands");
      setBrands(data);
    };
    main();
  }, []);

  if (!brands) {
    return (
      <div className="flex justify-center items-center mx-auto py-5">
        <SmallLoadingIcon />
      </div>
    );
  }

  return (
    <div className="py-7 w-full overflow-x-hidden">
      <div className="flex gap-20 justify-evenly">
        {brands.map((el) => (
          <Image
            key={el._id}
            src={`/${el?.logo}`}
            alt="img"
            width={60}
            height={60}
          />
        ))}
      </div>
    </div>
  );
};

export default Brands;
