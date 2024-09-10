"use client";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CarImages = ({ images }: { images: any }) => {
  const [avtiveImg, setActiveImg] = useState(0);
  return (
    <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { delay: 0.3, duration: 0.4 },
          }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          key={avtiveImg}
          className="rounded-lg shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative"
        >
          <Image
            src={`/${images[avtiveImg].url}`}
            alt="Car Image"
            className="rounded object-cover w-full"
            width={600}
            height={600}
          />
          <button type="button" className="absolute top-4 right-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              fill="#ccc"
              className="mr-1 hover:fill-red-600"
              viewBox="0 0 64 64"
            >
              <path
                d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                data-original="#000000"
              ></path>
            </svg>
          </button>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
        {images.map((el: any, i: number) => (
          <div
            key={el.url}
            onClick={() => setActiveImg(i)}
            className="w-24 h-16 flex items-center justify-center rounded-lg shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] cursor-pointer"
          >
            <Image
              src={`/${el.url}`}
              alt="Car Img"
              className="w-full"
              width={300}
              height={300}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarImages;
