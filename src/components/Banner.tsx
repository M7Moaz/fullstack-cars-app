import MotionDiv, { MotionH2, MotionLi, MotionP } from "@/utils/Motions";
import Image from "next/image";
import Link from "next/link";
import { MailIcon, PhoneIcon } from "./ui/Icons";

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

const Banner = () => {
  return (
    <div className="relative shadow-md mt-20 mx-auto rounded overflow-hidden">
      <div className="grid md:grid-cols-2 max-sm:gap-6">
        <div className="text-center p-6 flex flex-col justify-center items-center">
          <MotionH2
            variants={scaleOut(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-extrabold text-5xl text-primary leading-tight"
          >
            <span className="text-dark">Special</span> Offer
          </MotionH2>
          <MotionP
            variants={scaleOut(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg text-dark mt-4"
          >
            Discover amazing discounts, for limited time
          </MotionP>

          <Link
            href="/contact"
            type="button"
            className="bg-primary hover:bg-mid text-white tracking-wide font-semibold text-sm py-3 px-6 rounded-xl mt-8"
          >
            Get your offer
          </Link>

          <ul className="flex flex-wrap justify-center gap-6 mt-8">
            <MotionLi
              variants={toTop(0.3)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center"
            >
              <PhoneIcon customClass="fill-primary" />
              <a href="#" className="text-primary text-sm ml-2">
                +972-548-2588
              </a>
            </MotionLi>
            <MotionLi
              variants={toTop(0.4)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center"
            >
              <MailIcon customClass="fill-primary" />
              <a href="#" className="text-primary text-sm ml-2">
                contact@carmastery.com
              </a>
            </MotionLi>
          </ul>
        </div>

        <div className="flex justify-end items-center p-2 bg-gradient-to-b from-primary to-mid rounded-bl-[230px] w-full h-full">
          <MotionDiv
            initial={{ scale: 0, rotate: 180 }}
            whileInView={{
              scale: 1,
              rotate: 0,
              transition: {
                delay: 0.2,
                duration: 1,
                type: "spring",
                stiffness: 50,
              },
            }}
            viewport={{ once: true }}
            className="h-72 w-72 rounded-full bg-gradient-to-tr from-primary to-mid p-5 lg:me-20 xl:me-32"
          >
            <Image
              src="/of-1.png"
              className="w-full h-full rounded-full object-cover border-8 border-white"
              alt="img"
              width={300}
              height={300}
            />
          </MotionDiv>
        </div>
      </div>

      <div className="absolute -top-[50px] -left-[50px] w-28 h-28 rounded-full bg-primary opacity-40 shadow-lg"></div>
      <div className="absolute -top-10 -left-10 w-28 h-28 rounded-full bg-primary opacity-40 shadow-lg"></div>
    </div>
  );
};

export default Banner;
