"use client";
import AdminContainer from "@/components/admin/AdminContainer";
import Slidebar from "@/components/admin/Slidebar";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkToken } from "@/utils/fetchData";
import CustomLoading from "@/components/admin/CustomLoading";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  let token: string | null = null;

  useEffect(() => {
    token = localStorage.getItem("token");
    const main = async () => {
      if (!token) {
        router.push("/login");
      }
      if (token) {
        const res = await checkToken(token);
        if (res.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
        }

        setLoading(false);
      }
    };
    main();
  }, [token, loading]);

  if (loading) {
    return <CustomLoading />;
  }

  return (
    <main className="flex">
      <Slidebar />
      <AdminContainer>{children}</AdminContainer>
    </main>
  );
}
