import { useEffect, useState } from "react";
import { CloseIcon, SmallLoadingIcon } from "./Icons";
import UploadImg from "./UploadImg";
import { fetchCarById, updateCar } from "@/utils/fetchData";

const editForm = [
  {
    label: "Car Name",
    name: "title",
    type: "text",
    placeholder: "Enter car name",
  },
  {
    label: "Car Brand",
    name: "brand",
    type: "text",
    placeholder: "Enter car brand",
  },
  {
    label: "Car model",
    name: "model",
    type: "text",
    placeholder: "Enter car model",
  },
  {
    label: "Car year",
    name: "year",
    type: "number",
    placeholder: "Enter car year",
  },
  {
    label: "Car colors",
    name: "colors",
    type: "number",
    placeholder: "Number of car colors",
  },
  {
    label: "Car rate",
    name: "rate",
    type: "number",
    placeholder: "Enter Car rate",
  },
  {
    label: "Car category",
    name: "category",
    type: "text",
    placeholder: "Enter Car category",
  },
  {
    label: "Car mileage",
    name: "mileage",
    type: "number",
    placeholder: "Enter Car mileage",
  },
  {
    label: "Car price",
    name: "price",
    type: "number",
    placeholder: "Enter Car price",
  },
  {
    label: "Car engine",
    name: "engine",
    type: "text",
    placeholder: "Enter Car engine",
  },
  {
    label: "Car transmission",
    name: "transmission",
    type: "text",
    placeholder: "Enter Car transmission",
  },
  {
    label: "Car location",
    name: "location",
    type: "text",
    placeholder: "Enter Car location",
  },
];

interface CarDataProps {
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
    length: number;
    url: string;
  };
  [key: string]: any;
}
const EditForm = ({
  isOpen,
  carId,
  isUpdated,
}: {
  isOpen: any;
  carId: string;
  isUpdated: any;
}) => {
  const [hasOffer, setHasOffer] = useState(false);
  const [imgPop, setImgPop] = useState(false);
  const [carData, setCarData] = useState<CarDataProps | undefined>();
  const [updatedData, setUpdatedData] = useState({});
  const [warning, setWarning] = useState(false);
  const [imgPreview, setImgPreview] = useState();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value === "hasOffer") {
      setHasOffer(true);
    } else {
      setHasOffer(false);
    }

    setUpdatedData((prev) => ({
      ...prev,
      hasOffer: !hasOffer,
    }));
  };

  useEffect(() => {
    const main = async () => {
      const data = await fetchCarById({ id: carId });
      setCarData(data);
      if (data) {
        if (data.hasOffer) {
          setHasOffer(true);
        }
      }
    };
    main();
  }, [carId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(updatedData).length === 0) {
      setWarning(true);
      return;
    }
    setWarning(false);
    const res = await updateCar(carId, updatedData);
    if (res.status === 200) {
      isUpdated(true);
      isOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setWarning(false);
  };

  if (!carData) {
    return <SmallLoadingIcon />;
  }

  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8 relative">
        <div className="flex items-center">
          <h3 className="text-primary text-xl font-bold flex-1">
            Edit Car Details
          </h3>
          <button onClick={() => isOpen(false)}>
            <CloseIcon />
          </button>
        </div>

        <form className="" onSubmit={(e) => handleSubmit(e)}>
          <div className="space-y-4 mt-8 grid md:grid-cols-2 gap-2">
            {editForm.map((el) => (
              <div key={el.name} style={{ margin: 0 }}>
                <label className="text-dark text-sm mb-2 block">
                  {el.label}
                </label>
                <input
                  type={el.type}
                  placeholder={el.placeholder}
                  name={el.name}
                  className="px-4 py-3 bg-gray-100 w-full text-dark text-sm border-none focus:outline-primary focus:bg-transparent rounded-lg"
                  required
                  defaultValue={carData[el.name] || ""}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            ))}
          </div>

          <div className="mt-3 gap-5 flex items-center">
            <div className="min-w-fit">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="offer"
                  value="hasOffer"
                  checked={hasOffer}
                  onChange={handleChange}
                />
                <span>Has Offer</span>
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="offer"
                  value="noOffer"
                  checked={!hasOffer}
                  onChange={handleChange}
                />
                <span>No Offer</span>
              </label>
            </div>
            {hasOffer && (
              <div className="m-0 w-full">
                <input
                  type="number"
                  placeholder="Offer Price"
                  name="offerPrice"
                  min={10}
                  className="px-4 py-3 bg-gray-100 w-full text-red-600 text-sm border-none focus:outline-primary focus:bg-transparent rounded-lg"
                  required
                  defaultValue={!hasOffer ? 0 : carData.offerPrice}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            )}
          </div>

          <div className="mt-5">
            {/* <button
              type="button"
              className="px-4 py-2 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-primary hover:bg-mid active:bg-primary"
              onClick={() => setImgPop(true)}
            >
              Change Images
            </button> */}
            {carData.images && carData.images?.length > 0 && (
              <span className="ms-2">
                {carData.images?.length} Images exsist
              </span>
            )}
          </div>
          {imgPop && (
            <UploadImg
              setImgPreview={setImgPreview}
              imgPreview={imgPreview}
              isOpen={setImgPop}
            />
          )}
          {warning && (
            <p className="text-red-600 mt-5">No Changes made to update</p>
          )}
          <div className="flex justify-end gap-4 !mt-8">
            <button
              onClick={() => isOpen(false)}
              type="button"
              className="px-6 py-3 rounded-lg text-dark text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-primary hover:bg-mid"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
