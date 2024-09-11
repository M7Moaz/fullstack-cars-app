import { useState } from "react";
import SucessToast from "./SucessToast";
import ReactDOM from "react-dom";
import { deleteBrand } from "@/utils/fetchData";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { CloseIcon } from "./Icons";

type SetDeleteModal = React.Dispatch<React.SetStateAction<boolean>>;
const DeleteBrandModal = ({
  setDeleteModal,
  id,
}: {
  setDeleteModal: SetDeleteModal;
  id: string;
}) => {
  const route = useRouter();
  const query = new URLSearchParams(window.location.search);
  const [deleted, setDeleted] = useState(false);
  const handleClose = () => {
    setDeleteModal(false);
  };
  const handleDelete = async () => {
    const res = await deleteBrand(id);

    if (res.status === 200) {
      setDeleted(true);
      query.set("_", `${new Date().getTime()}`);
      route.push(`?${query}`);
    } else {
      return;
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, transition: { duration: 0.4 } }}
        exit={{ scale: 0 }}
        className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative"
      >
        <span
          className="w-3.5 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 float-right"
          onClick={handleClose}
        >
          <CloseIcon />
        </span>

        <div className="my-4 text-center">
          {!deleted && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-14 fill-red-500 inline"
              viewBox="0 0 24 24"
            >
              <path
                d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                data-original="#000000"
              />
              <path
                d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                data-original="#000000"
              />
            </svg>
          )}
          {deleted && <SucessToast />}

          {!deleted && (
            <div>
              <h4 className="text-dark text-base font-semibold mt-4">
                Are you sure you want to delete this brand?
              </h4>

              <div className="text-center space-x-4 mt-8">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg text-dark text-sm bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg text-white text-sm bg-red-600 hover:bg-red-700 active:bg-red-600"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default DeleteBrandModal;
