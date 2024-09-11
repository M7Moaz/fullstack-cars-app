"use client";
import { validateLogin } from "@/utils/fetchData";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [password, setPassword] = useState(true);
  const [userData, setUserData] = useState({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await validateLogin(userData);
    if (res.status === 200) {
      router.push("/dashboard");
      // window.location.reload();
    } else {
      alert(`${res.message}`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full min-h-screen p-4 mx-auto">
      <Image
        className="max-w-52 mb-10"
        src={"/logo.png"}
        alt="img"
        width={400}
        height={400}
      />
      <div className="max-w-lg  w-full mx-auto">
        <form
          className="bg-opacity-70 bg-white rounded-2xl p-6 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] w-full"
          onSubmit={handleSubmit}
        >
          <h3 className="text-primary text-3xl font-extrabold mb-12">
            Sign in
          </h3>

          <div className="relative flex items-center sm:w-96 w-full">
            <input
              name="email"
              type="email"
              required
              className="bg-transparent w-full min-w-72 text-sm text-dark border-b border-gray-400 focus:border-dark px-2 py-3 outline-none placeholder:text-dark"
              placeholder="Enter email"
              onChange={(e) => {
                setUserData((prev) => ({ ...prev, email: e.target.value }));
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#333"
              stroke="#333"
              className="w-[18px] h-[18px] absolute right-2"
              viewBox="0 0 682.667 682.667"
            >
              <defs>
                <clipPath id="a" clipPathUnits="userSpaceOnUse">
                  <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                </clipPath>
              </defs>
              <g
                clipPath="url(#a)"
                transform="matrix(1.33 0 0 -1.33 0 682.667)"
              >
                <path
                  fill="none"
                  strokeMiterlimit="10"
                  strokeWidth="40"
                  d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                  data-original="#000000"
                ></path>
                <path
                  d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                  data-original="#000000"
                ></path>
              </g>
            </svg>
          </div>

          <div className="relative flex items-center mt-6 w-full">
            <input
              name="password"
              type={`${password ? "password" : "text"}`}
              required
              className="bg-transparent w-full text-sm text-dark border-b border-gray-400 focus:border-dark px-2 py-3 outline-none placeholder:text-dark"
              placeholder="Enter password"
              onChange={(e) => {
                setUserData((prev) => ({ ...prev, password: e.target.value }));
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#333"
              stroke="#333"
              className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
              viewBox="0 0 128 128"
              onClick={() => setPassword((prev) => !prev)}
            >
              <path
                d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                data-original="#000000"
              ></path>
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 shrink-0 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-3 block text-sm text-dark"
              >
                Remember me
              </label>
            </div>
          </div>

          <div className="mt-12">
            <button
              type="submit"
              className="w-full py-2.5 px-4 text-sm font-semibold tracking-wider rounded-full text-white bg-primary hover:bg-mid focus:outline-none"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
      <Link
        href={"/"}
        className="absolute bottom-0 left-0 bg-primary text-light p-3 rounded-r-3xl hover:ps-7 transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Login;
