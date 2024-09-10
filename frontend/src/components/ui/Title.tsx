import { MotionH1 } from "@/utils/Motions";

const Title = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <MotionH1
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.4, type: "spring" }}
      className="my-10 mt-20 uppercase text-center text-4xl md:text-5xl lg:text-7xl text-primary opacity-50"
    >
      {children}
    </MotionH1>
  );
};

export default Title;
