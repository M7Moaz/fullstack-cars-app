import MotionDiv from "@/utils/Motions";
import Image from "next/image";
import Link from "next/link";

interface LinkProp {
  link: {
    id: number;
    title: string;
    href: string;
    logo: string;
    image: string;
  };
}

const fadeTop = (delay?: number) => {
  return {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: delay || 0,
        duration: 0.3,
        stiffness: 100,
        type: "spring",
      },
    },
  };
};

const BrandCard = ({ link }: LinkProp) => {
  return (
    <MotionDiv
      variants={fadeTop(0.2)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex-shrink-0 relative overflow-hidden bg-primary rounded-lg shadow-lg group flex flex-col"
    >
      <svg
        className="absolute opacity-[0.1] bottom-0 left-0 mb-8 scale-150 group-hover:scale-[1.65] duration-1000 transition-transform"
        viewBox="0 0 375 283"
        fill="none"
      >
        <rect
          x="159.52"
          y="175"
          width="152"
          height="152"
          rx="8"
          transform="rotate(-45 159.52 175)"
          fill="white"
        />
        <rect
          y="107.48"
          width="152"
          height="152"
          rx="8"
          transform="rotate(-45 0 107.48)"
          fill="white"
        />
      </svg>
      <div className="relative pt-10 px-10 flex items-center justify-center group-hover:scale-110 duration-500 transition-transform flex-1">
        <div
          className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
          style={{
            background: "radial-gradient(black, transparent 60%)",
            transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
            opacity: 0.2,
          }}
        ></div>
        <Image
          width={400}
          height={400}
          className="relative w-50"
          src={`/${link.image}`}
          alt=""
        />
      </div>
      <div className="relative text-white px-6 pb-6 mt-6">
        <span className="block opacity-75 -mb-1">Modern</span>
        <div className="flex justify-between">
          <span className="block font-semibold text-xl">{link.title}</span>
          <Link
            href={link.href}
            className="bg-white rounded-full text-primary text-sm px-3 py-2 leading-none flex items-center"
          >
            {link.title.split(" ").length > 1
              ? link.title.split(" ")[0][0] + link.title.split(" ")[1][0]
              : link.title}{" "}
            Cars
          </Link>
        </div>
      </div>{" "}
    </MotionDiv>
  );
};

export default BrandCard;
