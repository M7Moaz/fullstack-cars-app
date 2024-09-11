import Image from "next/image";
import { StarIcon } from "./Icons";
import Link from "next/link";
import MotionDiv from "@/utils/Motions";
interface CarProps {
  data: {
    id: number;
    title: string;
    hasOver?: boolean;
    oldPrice: number;
    newPrice: number;
    colors: number;
    rate: number;
    brand: string;
    image: string;
  };
}

const toTop = (delay: number) => {
  return {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay,
        duration: 0.2,
        ease: "easeInOut",
        type: "tween",
      },
    },
  };
};

const Card = ({ data }: CarProps) => {
  const { hasOver = true } = data;
  const setBrand = data.brand.split(" ").join("-").toLocaleLowerCase();
  return (
    <MotionDiv
      variants={toTop(data.id * 0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="shadow-md overflow-hidden rounded-lg cursor-pointer relative"
    >
      <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-3 right-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16px"
          className="fill-red-600 inline-block"
          viewBox="0 0 64 64"
        >
          <path
            d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
            data-original="#000000"
          ></path>
        </svg>
      </div>

      <Image
        src={`/${data.image}`}
        alt={data.title}
        className="w-full object-contain overflow-hidden"
        width={500}
        height={500}
      />

      <div className="p-4 bg-white flex justify-between">
        <div>
          <h2 className="text-lg font-bold text-dark">{data.title}</h2>
          {hasOver ? (
            <div>
              <del className="text-lg text-red-600 font-bold mt-2">
                ${data.oldPrice}
              </del>
              <span className="text-lg text-dark font-bold mt-2">
                {" "}
                - ${data.newPrice} / Daily
              </span>
            </div>
          ) : (
            <div>
              <span className="text-lg text-dark font-bold mt-2">
                ${data.oldPrice} / Daily
              </span>
            </div>
          )}
          <p className="text-gray-600 text-sm mt-2">
            {data.colors} diffrent colors available
          </p>

          <div className="flex space-x-2 mt-4">
            {Array.from({ length: 5 }, (_, idx) => (
              <StarIcon
                key={idx}
                customClass={`${
                  idx + 1 < data.rate ? "fill-[#facc15]" : "fill-[#eee]"
                }`}
              />
            ))}
          </div>
        </div>
        <Link
          href={`/brand/${setBrand}/${data.id}`}
          className="bg-primary text-light py-2 px-4 rounded-full hover:bg-mid transition-colors mt-auto"
        >
          Details
        </Link>
      </div>
    </MotionDiv>
  );
};

export default Card;
