"use client";
import Image from "next/image";
import { DeleteIcon, EditIcon } from "./Icons";
import DeleteModal from "./DeleteModal";
import { useState } from "react";
import EditForm from "./EditForm";
import UpdatedSuccess from "./SuccessModal";
interface CarsDataProps {
  id: string;
  title: string;
  img: string;
  price: number;
}
const AdminCars = ({ carsData }: { carsData: CarsDataProps }) => {
  const [open, isOpen] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [updated, setUpdated] = useState(false);
  const handleClick = () => {
    isOpen(true);
  };
  const handleEdit = () => {
    setEditForm(true);
  };

  return (
    <div className="bg-gray-100 p-3 gap-3 sm:flex items-center">
      <Image
        src={`/${carsData.img}`}
        alt="img"
        width={200}
        height={200}
        className="w-full sm:w-16"
      />
      <div className="flex gap-3 justify-between mt-2 sm:mt-0">
        <h2>{carsData.title}</h2>
        <p>${carsData.price}</p>
      </div>
      <div className="flex gap-2 ms-auto mt-2 justify-between sm:mt-0">
        <button onClick={handleEdit} className="text-mid">
          <EditIcon />
        </button>
        <button onClick={handleClick} className="text-red-600">
          <DeleteIcon />
        </button>
      </div>
      {updated && <UpdatedSuccess isUpdated={setUpdated} />}
      {editForm && (
        <EditForm
          isOpen={setEditForm}
          isUpdated={setUpdated}
          carId={carsData.id}
        />
      )}
      {open && <DeleteModal isOpen={isOpen} carId={carsData.id} />}
    </div>
  );
};

export default AdminCars;
