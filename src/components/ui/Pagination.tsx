"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export const Pagination = ({
  totalPages,
  page,
  limit,
}: {
  totalPages: number;
  page: string;
  limit: string;
}) => {
  const route = useRouter();

  const [visibleRange, setVisibleRange] = useState(3);
  const [skip, setSkip] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1280) {
        setVisibleRange(18 > totalPages ? totalPages : 18);
      } else if (window.innerWidth > 768) {
        setVisibleRange(10 > totalPages ? totalPages : 10);
      } else if (window.innerWidth > 640) {
        setVisibleRange(6 > totalPages ? totalPages : 6);
      } else {
        setVisibleRange(3 > totalPages ? totalPages : 3);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const prevBtn = () => {
    if (skip !== 0) {
      setSkip((prev) => prev - 1);
    }
  };
  const nextBtn = () => {
    if (visibleRange + skip < totalPages) {
      setSkip((prev) => prev + 1);
    }
  };

  const getFilteredQuery = () => {
    const urlParams = new URLSearchParams(window.location.search);

    const filteredParams = new URLSearchParams();

    urlParams.forEach((value, key) => {
      if (key !== "page" && key !== "limit") {
        filteredParams.set(key, value);
      }
    });

    return filteredParams.toString();
  };

  return (
    <ul className="flex space-x-4 justify-center my-10 select-none">
      <li
        onClick={prevBtn}
        aria-label="Previous page"
        className={`${
          skip === 0
            ? "bg-blue-300"
            : "cursor-pointer border-2 border-mid hover:bg-mid transition-colors"
        } flex items-center group justify-center shrink-0 w-10 h-10 rounded-lg`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 ${
            skip === 0 ? "fill-light" : "fill-mid group-hover:fill-light"
          }`}
          viewBox="0 0 55.753 55.753"
        >
          <path
            d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
            data-original="#000000"
          />
        </svg>
      </li>
      {Array.from({ length: visibleRange }, (_, index) => (
        <li
          key={index}
          className={`${
            index + 1 + skip === +page
              ? "bg-primary text-light"
              : "bg-light text-primary"
          } flex items-center justify-center shrink-0 border border-primary hover:bg-primary hover:text-light transition-colors cursor-pointer text-base font-bold w-10 h-10 rounded-lg`}
          onClick={() => {
            route.push(
              `?page=${index + 1 + skip}&limit=${limit}&${getFilteredQuery()}`
            );
          }}
        >
          {index + 1 + skip}
        </li>
      ))}

      <li
        onClick={nextBtn}
        aria-label="Next page"
        className={`${
          totalPages <= visibleRange + skip
            ? "bg-blue-300"
            : "border-2 border-mid cursor-pointer hover:bg-mid"
        } flex items-center group justify-center shrink-0 transition-colors  w-10 h-10 rounded-lg`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${
            totalPages <= visibleRange + skip ? "fill-light" : "fill-mid"
          } w-4 rotate-180 group-hover:fill-light`}
          viewBox="0 0 55.753 55.753"
        >
          <path
            d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
            data-original="#000000"
          />
        </svg>
      </li>
    </ul>
  );
};
