"use client";
import { useState } from "react";
import AddCarForm from "./AddCarForm";
import SuccessModal from "./SuccessModal";

const AddFormBtn = () => {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [isAdded, setIsAdedd] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpenAddForm(true)}
        className="bg-primary py-1.5 text-light px-4 w-full mb-3 rounded-full"
      >
        Add New Car
      </button>
      {openAddForm && (
        <AddCarForm setIsAdedd={setIsAdedd} setOpenAddForm={setOpenAddForm} />
      )}
      {isAdded && <SuccessModal add={1} isUpdated={setIsAdedd} />}
    </div>
  );
};

export default AddFormBtn;
