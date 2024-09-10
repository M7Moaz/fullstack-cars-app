import MotionDiv, { MotionBtn, MotionH1, MotionP } from "@/utils/Motions";
import Image from "next/image";
import Link from "next/link";

const toTop = (delay: number) => {
  return {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.2,
      },
    },
  };
};

const scaleOut = (delay: number) => {
  return {
    hidden: {
      scale: 0,
    },
    visible: {
      scale: 1,
      transition: {
        delay,
        duration: 0.5,
        type: "spring",
      },
    },
  };
};

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-5 pt-10 text-center lg:text-start">
      <div className="lg:w-1/2">
        <MotionH1
          variants={toTop(0)}
          initial="hidden"
          animate="visible"
          className="text-4xl text-primary"
        >
          Book Your Car Today
        </MotionH1>
        <MotionP
          variants={toTop(0.2)}
          initial="hidden"
          animate="visible"
          className="my-2"
        >
          Streamline your car rental expreince with our effortiess bokking
          process.
        </MotionP>
        <MotionBtn
          variants={toTop(0.4)}
          initial="hidden"
          animate="visible"
          className="bg-primary mt-3 text-light py-2 px-4 rounded-full hover:bg-mid transition-colors"
        >
          <Link href={"/all-cars"}>Explore Cars</Link>
        </MotionBtn>
      </div>

      <MotionDiv
        className="lg:w-1/2"
        variants={scaleOut(0.6)}
        initial="hidden"
        animate="visible"
      >
        <Image src={"/hero.png"} alt="car" width={600} height={600} priority />
      </MotionDiv>
    </div>
  );
};

export default Hero;
