import { useState } from "react";
import { CloseIcon, FileIcon } from "./Icons";
import Image from "next/image";

const UploadImg = ({
  isOpen,
  setAddedData,
  setImgPreview,
  imgPreview,
}: {
  isOpen: any;
  setAddedData?: any;
  imgPreview?: any;
  setImgPreview?: any;
}) => {
  const [imgData, setImgData] = useState<{ url: File }[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files;

    if (img) {
      Array.from(img).forEach((ig) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          setImgPreview((prev: any) => [
            ...prev,
            { url: reader.result as string },
          ]);
        };

        reader.readAsDataURL(ig);

        setImgData((prev) => [...prev, { url: ig }]);
      });
    }
  };

  const handleImport = () => {
    setAddedData((prev: any) => ({
      ...prev,
      images: [...(prev.images || []), ...imgData],
    }));

    isOpen(false);
  };

  const handleClose = () => {
    isOpen(false);

    if (imgPreview) {
      setImgPreview([]);
      setAddedData((prev: any) => ({
        ...prev,
        images: [],
      }));
    }
  };

  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
        <div className="flex items-center pb-3 border-b border-gray-200">
          <div className="flex-1">
            <h3 className="text-dark text-xl font-bold">Upload Images</h3>
            <p className="text-gray-600 text-xs mt-1">
              Upload images to this project
            </p>
          </div>

          <button onClick={handleClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="rounded-lg border-2 border-gray-200 border-dashed mt-6">
          <div className="p-4 min-h-[180px] flex flex-col items-center justify-center text-center cursor-pointer">
            <FileIcon />

            <h4 className="text-sm text-gray-600">
              Drag & Drop or{" "}
              <label
                htmlFor="chooseimage"
                className="text-primary cursor-pointer uppercase"
              >
                Choose images
              </label>{" "}
              to upload
            </h4>
            <input
              type="file"
              name="images"
              accept="image/*"
              id="chooseimage"
              multiple
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          {imgPreview &&
            imgPreview[0]?.url &&
            imgPreview.map((img: any) => (
              <Image
                key={img.url}
                src={`${img?.url}`}
                alt="img"
                width={100}
                height={100}
              />
            ))}
        </div>
        <div className="pt-6 flex justify-between gap-4 mt-6">
          <button
            type="button"
            className="w-full px-4 py-2 rounded-lg text-dark text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="w-full px-4 py-2 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-primary hover:bg-mid active:bg-primary"
            onClick={handleImport}
          >
            Import
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadImg;
