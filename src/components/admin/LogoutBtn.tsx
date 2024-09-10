"use client";

import { logout } from "@/utils/fetchData";
import { LogoutIcon } from "./Icons";
import { useRouter } from "next/navigation";

const LogoutBtn = () => {
  const router = useRouter();
  const handleLogout = async () => {
    const log = await logout();

    router.push("/login");
  };
  return (
    <button
      className="text-dark hover:text-primary text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all gap-2 mt-auto w-full"
      onClick={handleLogout}
    >
      <LogoutIcon />
      <span className="hidden md:inline-block">Logout</span>
    </button>
  );
};

export default LogoutBtn;
