import Link from "next/link";
import {
  ClockIcon,
  DashboardIcon,
  LogoutIcon,
  MoneyIcon,
  PostIcon,
  PromoteIcon,
  RefundIcon,
  UserIcon,
} from "./Icons";
import LogoutBtn from "./LogoutBtn";

const dashLinks = [
  { name: "Dashboard", icon: <DashboardIcon />, url: "/dashboard" },
  { name: "Brands", icon: <UserIcon />, url: "/dashboard/brands" },
  { name: "Cars", icon: <PostIcon />, url: "/dashboard/cars" },
  { name: "Offers", icon: <PromoteIcon />, url: "/dashboard/offers" },
  // {
  //   name: "Earnings and taxes",
  //   icon: <MoneyIcon />,
  //   url: "/dashboard/earning",
  // },
  // { name: "Profile", icon: <UserIcon />, url: "/dashboard/profile" },
];

const Slidebar = () => {
  return (
    <nav className="bg-white shadow-lg h-screen top-0 sticky left-0 md:py-6 md:px-4 overflow-auto transition-all w-[50px] min-w-[50px] md:w-[250px] flex flex-col">
      <Link href="">
        <img
          src="/logo.png"
          alt="logo"
          className="w-[120px] mx-auto hidden md:inline-block"
        />
      </Link>

      <div className="mt-6">
        <h6 className="text-primary text-sm font-bold px-4 hidden md:block">
          Site Information
        </h6>
        <ul className="mt-3">
          {dashLinks.map((el) => (
            <li key={el.name}>
              <Link
                href={el.url}
                className="text-dark hover:text-primary text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all gap-2"
              >
                {el.icon}
                <span className="hidden md:inline-block">{el.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto">
        <Link
          href="/"
          className="text-dark hover:text-primary text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all gap-2 mt-auto"
        >
          <UserIcon />
          <span className="hidden md:inline-block">Home</span>
        </Link>
        <LogoutBtn />
      </div>
    </nav>
  );
};

export default Slidebar;
