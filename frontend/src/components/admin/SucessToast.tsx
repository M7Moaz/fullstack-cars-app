const SucessToast = () => {
  return (
    <div
      className="bg-green-500 text-white font-semibold tracking-wide flex items-center  max-w-sm p-4 rounded-md shadow-md shadow-green-200 mx-auto mt-4 w-full"
      role="alert"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-[18px] shrink-0 fill-white inline mr-3"
        viewBox="0 0 512 512"
      >
        <ellipse
          cx="256"
          cy="256"
          fill="#fff"
          data-original="#fff"
          rx="256"
          ry="255.832"
        />
        <path
          className="fill-green-500"
          d="m235.472 392.08-121.04-94.296 34.416-44.168 74.328 57.904 122.672-177.016 46.032 31.888z"
          data-original="#ffffff"
        />
      </svg>

      <span className="block sm:inline text-sm mr-3">Deleted successfully</span>
    </div>
  );
};

export default SucessToast;
