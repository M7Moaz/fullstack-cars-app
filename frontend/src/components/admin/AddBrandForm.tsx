"use client";
import { SetStateAction, useState } from "react";
import { CloseIcon, FileIcon } from "./Icons";
import Image from "next/image";
import { addBrand } from "@/utils/fetchData";
interface brand {
  _id?: string;
  title?: string;
  href?: string;
  logo?: string | File;
  image?: string | File;
}
const AddBrandForm = ({
  setIsOpen,
  isUpdated,
}: {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  isUpdated: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [imgPreview, setImgPreview] = useState<brand>();
  const [brandData, setBrandData] = useState<brand>({
    title: "",
    logo: "",
    image: "",
  });
  const [warning, setWarning] = useState(false);

  const handelClose = () => {
    setIsOpen(false);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if (brandData?.title) formData.append("title", brandData.title);
    if (brandData?.logo) formData.append("logo", brandData.logo);
    if (brandData?.image) formData.append("image", brandData.image);

    if (!brandData.title && !brandData.logo && !brandData.image) {
      setWarning(true);
      return;
    }

    const res = await addBrand(formData);
    if (res.status === 200) {
      handelClose();
      isUpdated(true);
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWarning(false);
    const { id } = e.target;

    const img = e.target.files?.[0];

    if (img) {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (id === "car") {
          setImgPreview((prev) => ({
            ...prev,
            image: reader.result as string,
          }));
        } else {
          setImgPreview((prev) => ({ ...prev, logo: reader.result as string }));
        }
      };
      reader.readAsDataURL(img);

      if (id === "car") {
        setBrandData((prev) => ({
          ...prev,
          image: img,
        }));
      } else {
        setBrandData((prev) => ({
          ...prev,
          logo: img,
        }));
      }
    }
  };

  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 relative">
        <div className="flex items-center">
          <h3 className="text-primary text-xl font-bold flex-1">
            Add New Brand
          </h3>
          <button
            className="w-3 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
            onClick={handelClose}
          >
            <CloseIcon />
          </button>
        </div>
        {warning && <h2 className="mt-5 text-red-600">All data required</h2>}

        <form className="space-y-4 mt-8" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label className="text-dark text-sm mb-2 block">
              Name of the brand
            </label>
            <input
              type="text"
              placeholder="Enter brand name"
              className="px-4 py-3 bg-gray-100 w-full text-dark text-sm border-none focus:outline-primary focus:bg-transparent rounded-lg"
              required
              onChange={(e) => {
                setWarning(false);
                setBrandData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
            />
          </div>

          <div className="flex gap-3 flex-col md:flex-row">
            <div className="text-center w-full">
              <label
                htmlFor="logo"
                className="text-dark text-sm mb-2 block bg-gray-50  cursor-pointer border-dashed border-2 border-gray-300 p-5 py-10 rounded-lg"
              >
                <FileIcon customClass={""} />
                <p>
                  Upload <span className="text-mid">Logo</span> Image here
                </p>
              </label>
              <input
                id="logo"
                type="file"
                placeholder="Enter brand logo"
                accept="image/*"
                className="px-4 py-3 hidden bg-gray-100 w-full text-dark text-sm border-none focus:outline-primary focus:bg-transparent rounded-lg"
                multiple={false}
                onChange={handleImageChange}
              />
              {imgPreview?.logo && (
                <Image
                  className="mx-auto mt-3"
                  src={`${imgPreview?.logo}`}
                  alt="logo"
                  width={200}
                  height={200}
                />
              )}
            </div>

            <div className="text-center  w-full">
              <label
                htmlFor="car"
                className="text-dark text-sm mb-2 block bg-gray-50 cursor-pointer border-dashed border-2 border-gray-300 p-5 py-10 rounded-lg"
              >
                <FileIcon />
                <p>
                  Upload <span className="text-mid">Car</span> Image here
                </p>
              </label>

              <input
                id="car"
                type="file"
                placeholder="Enter car image"
                accept="image/*"
                className="px-4 py-3 hidden bg-gray-100 w-full text-dark text-sm border-none focus:outline-primary focus:bg-transparent rounded-lg"
                multiple={false}
                onChange={handleImageChange}
              />
              {imgPreview?.image && (
                <Image
                  className="mx-auto mt-3"
                  src={`${imgPreview?.image}`}
                  alt="car"
                  width={200}
                  height={200}
                />
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 !mt-8">
            <button
              type="button"
              className="px-6 py-3 rounded-lg text-dark text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300"
              onClick={handelClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBrandForm;
