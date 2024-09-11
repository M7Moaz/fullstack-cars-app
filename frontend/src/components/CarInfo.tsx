import Image from "next/image";
import { StarIcon } from "./ui/Icons";
import CarImages from "./ui/CarImages";

interface CarDataProps {
  data: {
    _id: string;
    title: string;
    brand: number;
    model: number;
    year: number;
    colors: number;
    price: number;
    rate: number;
    hasOffer: boolean;
    offerPrice: number;
    category: string;
    mileage: string;
    engine: string;
    transmission: string;
    location: string;
    images: {
      url: string;
    }[];
  };
}

const CarInfo: React.FC<CarDataProps> = ({ data }) => {
  return (
    <div className="p-4">
      <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6 rounded-lg">
        <CarImages images={data.images} />

        <div className="lg:col-span-2">
          <h2 className="text-2xl font-extrabold text-gray-800">
            {data.title} | {data.year}
          </h2>

          <div className="flex space-x-2 mt-4">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon
                key={i}
                customClass={`w-5 ${
                  data.rate > i + 1 ? "fill-[#facc15]" : "fill-[#eee]"
                }`}
              />
            ))}
          </div>

          {data.hasOffer ? (
            <div className="flex flex-wrap gap-4 mt-8">
              <p className="text-gray-800 text-3xl font-bold">
                ${data.offerPrice}
              </p>
              <del className="text-red-500 text-base">
                <strong>${data.price}</strong>
              </del>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 mt-8">
              <p className="text-gray-800 text-3xl font-bold">${data.price}</p>
            </div>
          )}

          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800">
              Colors avalibale
            </h3>
            <div className="flex flex-wrap gap-3 mt-4">
              {Array.from({ length: data.colors }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`w-10 h-10 ${
                    i === 0 ? "bg-primary" : "bg-gray-300"
                  } border-2 border-white hover:border-gray-200 rounded-full transition-all`}
                ></button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-12">
            <button
              type="button"
              className="min-w-[200px] px-4 py-3 bg-primary hover:bg-mid text-white text-sm font-semibold rounded transition-colors"
            >
              Rent this car
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
        <h3 className="text-xl font-bold text-dark">Car information</h3>
        <ul className="mt-4 space-y-6 text-dark">
          <li className="text-sm">
            Brand <span className="ml-4 float-right">{data.brand}</span>
          </li>
          <li className="text-sm">
            Model <span className="ml-4 float-right">{data.model}</span>
          </li>
          <li className="text-sm">
            Year <span className="ml-4 float-right">{data.year}</span>
          </li>
          <li className="text-sm">
            Colors <span className="ml-4 float-right">{data.colors}</span>
          </li>
          <li className="text-sm">
            With Offer ?{" "}
            <span className="ml-4 float-right">
              {data.hasOffer ? "YES" : "NO"}
            </span>
          </li>
          <li className="text-sm">
            category <span className="ml-4 float-right">{data.category}</span>
          </li>
          <li className="text-sm">
            mileage <span className="ml-4 float-right">{data.mileage} KM</span>
          </li>
          <li className="text-sm">
            engine <span className="ml-4 float-right">{data.engine}</span>
          </li>
          <li className="text-sm">
            transmission{" "}
            <span className="ml-4 float-right">{data.transmission}</span>
          </li>
          <li className="text-sm">
            location <span className="ml-4 float-right">{data.location}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CarInfo;
