"use client";
import { DeleteIcon, EditIcon } from "./Icons";
import DeleteBrandModal from "./DeleteBrandModal";
import { useState } from "react";
import BrandForm from "./BrandForm";
import Image from "next/image";
import SuccessModal from "./SuccessModal";

const AdminBrand = ({ data }: { data: any }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [updated, isUpdated] = useState(false);

  return (
    <>
      <tr className="hover:bg-gray-50 text-sm">
        <td className="p-3">{data.title}</td>
        <td className="p-3">
          <Image src={`/${data.logo}`} alt="logo" width={50} height={50} />
        </td>
        <td className="p-3">
          <Image src={`/${data.image}`} alt="image" width={50} height={50} />
        </td>
        <td className="flex gap-5  p-3">
          <button className="text-mid" onClick={() => setFormModal(true)}>
            <EditIcon />
          </button>
          <button className="text-red-600" onClick={() => setDeleteModal(true)}>
            <DeleteIcon />
          </button>
        </td>
      </tr>
      {deleteModal && (
        <DeleteBrandModal setDeleteModal={setDeleteModal} id={data.id} />
      )}
      {formModal && (
        <BrandForm
          setFormModal={setFormModal}
          id={data.id}
          isUpdated={isUpdated}
        />
      )}
      {updated && <SuccessModal isUpdated={isUpdated} />}
    </>
  );
};

export default AdminBrand;
