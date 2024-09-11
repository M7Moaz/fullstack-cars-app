"use client";
import MotionDiv, { MotionBtn } from "@/utils/Motions";
import { MailIcon, PhoneIcon } from "./ui/Icons";
import Modal from "./Modal";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

const Contact = () => {
  const [open, setOpen] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-16 items-center relative overflow-hidden p-8 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-3xl mx-auto bg-white my-10 before:absolute before:right-0 before:w-[300px] before:bg-primary before:h-full max-lg:before:hidden">
      <MotionDiv
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      >
        <h2 className="text-dark text-3xl font-extrabold">Get In Touch</h2>
        <p className="text-sm text-gray-500 mt-4 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
          suscipit. Lorem ipsum dolor sit amet.
        </p>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="space-y-4 mt-8">
            <input
              type="text"
              placeholder="Full Name"
              className="px-2 py-3 bg-white w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
            />
            <div className="grid grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Country"
                className="px-2 py-3 bg-white w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
              />

              <input
                type="text"
                placeholder="City"
                className="px-2 py-3 bg-white w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
              />
            </div>
            <input
              type="number"
              placeholder="Phone No."
              className="px-2 no-spinner py-3 bg-white w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
            />

            <input
              type="email"
              placeholder="Email"
              className="px-2 py-3 bg-white w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
            />

            <textarea
              placeholder="Write Message"
              className="px-2 pt-3 bg-white w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
            ></textarea>
          </div>

          <MotionBtn
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="mt-8 flex items-center transition-colors justify-center text-sm w-full rounded-md px-6 py-3 bg-primary hover:bg-mid text-light"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16px"
              height="16px"
              fill="#fff"
              className="mr-2"
              viewBox="0 0 548.244 548.244"
            >
              <path
                fillRule="evenodd"
                d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
                clipRule="evenodd"
                data-original="#000000"
              />
            </svg>
            Send Message
          </MotionBtn>
        </form>

        <ul className="mt-4 flex flex-wrap justify-center gap-6">
          <li className="flex items-center text-mid">
            <MailIcon customClass="fill-mid" />
            <a href="#" className="text-sm ml-4">
              <strong>info@example.com</strong>
            </a>
          </li>
          <li className="flex items-center text-mid">
            <PhoneIcon customClass="fill-mid" />
            <a href="#" className="text-sm ml-4">
              <strong>+158 996 888</strong>
            </a>
          </li>
        </ul>
      </MotionDiv>
      <MotionDiv
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { delay: 0.2, duration: 0.5 },
        }}
        className="z-10 relative h-full max-md:min-h-[350px]"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14453.968066902517!2d55.1526300003868!3d25.085200994528147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b619e145ef3%3A0x13c3eb5bd03307cd!2sEmirates%20Hills%20-%20Emirates%20Hills%202%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2str!4v1725464675452!5m2!1sen!2str"
          className="left-0 top-0 h-full w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg"
        ></iframe>
      </MotionDiv>
      <AnimatePresence>{open && <Modal isOpen={setOpen} />}</AnimatePresence>
    </div>
  );
};

export default Contact;
