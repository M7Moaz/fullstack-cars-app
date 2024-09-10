"use client";
import Link from "next/link";
import Container from "./ui/Container";
import MenuIcon, { ArrowIcon, CloseIcon } from "./ui/Icons";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import links from "../utils/data";
import { BrandProps } from "@/utils/props";
import { fetchBrands } from "@/utils/fetchData";

const useCateg = () => {
  const [brand, setBrands] = useState<BrandProps[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchBrands("brands");

        setBrands(res);
      } catch (error) {
        return error;
      }
    };

    fetchData();
  }, []);

  return brand;
};

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const categ = useCateg();

  return (
    <div className="border-b relative z-50">
      <Container>
        <div className="flex items-center">
          <ul className="hidden md:flex items-center">
            {links.menu.map((link) => (
              <li
                className="hover:bg-primary hover:text-light transition-colors py-2 px-3"
                key={link.title}
              >
                <Link href={link.href}>{link.title}</Link>
              </li>
            ))}
            {/* Brand Menu */}
            <ul className="flex items-center">
              <li className="group">
                <div className="flex items-center group cursor-pointer hover:bg-primary hover:text-light transition-colors py-2 px-3">
                  <span>Brands</span>
                  <ArrowIcon customClass="group-hover:text-light" />
                </div>
                <div className="hidden group-hover:flex flex-col absolute">
                  {categ?.map((el) => (
                    <div
                      key={el.href}
                      className="h-full block bg-primary text-light shadow-sm"
                    >
                      <Link
                        className="hover:bg-mid hover:text-light px-2 py-2 w-full block"
                        key={el.title}
                        href={el.href}
                      >
                        {el.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </li>
            </ul>
            {/* Brand Menu */}
          </ul>
          <span className="block md:hidden py-2" onClick={() => setOpen(true)}>
            <MenuIcon />
          </span>
          <Link className="ms-auto" href={"/"}>
            <Image
              src={"/logo.png"}
              alt="logo"
              width={70}
              height={70}
              priority
            />
          </Link>
          <Link
            className="ms-3 bg-primary hover:bg-mid px-4 py-2 text-light "
            href={"/dashboard"}
          >
            dashboard
          </Link>
          <AnimatePresence>
            {open && <MobileMenu click={setOpen} />}
          </AnimatePresence>
        </div>
      </Container>
    </div>
  );
};

const MobileMenu: React.FC<{ click: (open: boolean) => void }> = ({
  click,
}) => {
  const categ = useCateg();

  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.ul
      initial={{ width: "0" }}
      animate={{ width: "250px" }}
      exit={{
        width: "0",
        transition: {
          delay: 0.5,
          type: "inertia",
        },
      }}
      className="fixed block md:hidden bg-gray-800 text-light p-3 top-0 left-0 h-full  overflow-y-scroll"
    >
      <motion.li
        exit={{ display: "none", transition: { delay: 0 } }}
        className="cursor-pointer hover:bg-gray-700 py-1"
        onClick={() => click(false)}
      >
        <CloseIcon customClass="text-light mx-auto " />
      </motion.li>
      {links.menu.map((link, idx) => (
        <motion.li
          className="hover:bg-gray-700 p-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2 * idx } }}
          exit={{ display: "none", transition: { delay: 0 } }}
          key={idx}
        >
          <Link onClick={() => click(false)} href={link.href}>
            {link.title}
          </Link>
        </motion.li>
      ))}

      {/* Brand Menu */}
      <motion.div
        key={2}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.8 } }}
        exit={{ display: "none", transition: { delay: 0 } }}
      >
        <h3
          onClick={() => setIsOpen((prev) => !prev)}
          className="hover:bg-gray-700 p-2 cursor-pointer flex items-center"
        >
          <span>Brands</span>
          <ArrowIcon customClass="text-light" />
        </h3>
        <div
          className={`${isOpen ? "flex" : "hidden"} flex-col ms-2`}
          onClick={() => click(false)}
        >
          {categ?.map((el) => (
            <Link
              key={el.title}
              className="hover:bg-gray-700 p-1"
              href={el.href}
            >
              {el.title}
            </Link>
          ))}
        </div>
      </motion.div>
      {/* Brand Menu */}
    </motion.ul>
  );
};
export default Navbar;
