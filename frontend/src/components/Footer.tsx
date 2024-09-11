import Link from "next/link";
import {
  AddressIcon,
  FacebookIcon,
  InstaIcon,
  MailIcon,
  PhoneIcon,
  TwitterIcon,
} from "./ui/Icons";

const Footer = () => {
  return (
    <footer className="bg-primary py-10 px-10 tracking-wide">
      <div className="max-w-2xl mx-auto text-center">
        <a href="#" className="inline-block">
          <img src="/logo.png" alt="logo" className="w-48" />
        </a>
        <p className="text-sm mt-8 text-gray-200">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          gravida, mi eu pulvinar cursus, sem elit interdum mauris dipiscing
          elit. Aenean gravida, mi eu pulvinar cursus.{" "}
        </p>

        <ul className="flex items-center justify-center flex-wrap gap-y-3 gap-x-6 mt-8">
          <li>
            <a href="#">
              <FacebookIcon />
            </a>
          </li>

          <li>
            <a href="#">
              <InstaIcon />
            </a>
          </li>

          <li>
            <a href="#">
              <TwitterIcon />
            </a>
          </li>
        </ul>
      </div>

      <ul className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-4 gap-12 mt-20">
        <li className="flex items-center">
          <div className="bg-dark h-10 w-10 rounded-full flex items-center justify-center shrink-0">
            <PhoneIcon customClass="fill-light" />
          </div>
          <a href="#" className="text-light text-sm ml-3">
            <small className="block">Tel</small>
            <strong>+972-548-2588</strong>
          </a>
        </li>
        <li className="flex items-center">
          <div className="bg-dark h-10 w-10 rounded-full flex items-center justify-center shrink-0">
            <MailIcon customClass="fill-light" />
          </div>
          <a href="#" className="text-light text-sm ml-3">
            <small className="block">Mail</small>
            <strong>contact@carmastery.com</strong>
          </a>
        </li>
        <li className="flex items-center">
          <div className="bg-dark h-10 w-10 rounded-full flex items-center justify-center shrink-0">
            <AddressIcon customClass="fill-light" />
          </div>
          <a href="#" className="text-light text-sm ml-3">
            <small className="block">Address</small>
            <strong>123 Main Street City, Country</strong>
          </a>
        </li>
      </ul>

      <hr className="my-10 border-light" />

      <div className="flex max-md:flex-col gap-4">
        <ul className="flex flex-wrap gap-4">
          <li className="text-sm">
            <a href="#" className="text-light font-semibold hover:underline">
              Terms of Service
            </a>
          </li>
          <li className="text-sm">
            <a href="#" className="text-light font-semibold hover:underline">
              Privacy Policy
            </a>
          </li>
          <li className="text-sm">
            <Link
              href="/contact"
              className="text-light font-semibold hover:underline"
            >
              Contact us
            </Link>
          </li>
        </ul>
        <p className="text-sm text-gray-200 md:ml-auto">
          RentcarMastery © 2024 All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
