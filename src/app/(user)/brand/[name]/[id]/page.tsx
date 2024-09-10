import CarInfo from "@/components/CarInfo";
import Title from "@/components/ui/Title";
import { fetchCarById } from "@/utils/fetchData";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const res = await fetchCarById({ id });

  return (
    <section>
      <Title>Car Details</Title>
      <CarInfo data={res} />
    </section>
  );
};

export default page;
