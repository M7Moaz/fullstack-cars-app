"use client";
import { useState } from "react";
import AddBrandForm from "./AddBrandForm";
import SuccessModal from "./SuccessModal";

const AddBrandBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [updated, isUpdated] = useState(false);
  return (
    <div className="mb-3">
      <button
        className="bg-primary text-light px-5 py-1.5 w-full rounded-full hover:bg-mid transition-colors"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Add New Brand
      </button>
      {isOpen && <AddBrandForm setIsOpen={setIsOpen} isUpdated={isUpdated} />}
      {updated && <SuccessModal add={1} isUpdated={isUpdated} />}
    </div>
  );
};

export default AddBrandBtn;
