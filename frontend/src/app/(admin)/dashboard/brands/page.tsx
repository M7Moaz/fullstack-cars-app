import AddBrandBtn from "@/components/admin/AddBrandBtn";
import AdminBrand from "@/components/admin/AdminBrand";
import { fetchBrands } from "@/utils/fetchData";

const page = async () => {
  const data = await fetchBrands(`brands`);

  return (
    <div className="overflow-x-auto">
      <AddBrandBtn />
      <table className="min-w-full bg-white shadow-md">
        <thead className="bg-gray-100">
          <tr className="text-sm">
            <th className="text-start p-3">Name</th>
            <th className="text-start p-3">Logo</th>
            <th className="text-start p-3">Image</th>
            <th className="text-start p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el: any) => (
            <AdminBrand
              key={el._id}
              data={{
                title: el.title,
                id: el._id,
                logo: el.logo,
                image: el.image,
              }}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default page;
