import AdminContainer from "@/components/admin/AdminContainer";
import Slidebar from "@/components/admin/Slidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex">
      <Slidebar />
      <AdminContainer>{children}</AdminContainer>
    </main>
  );
}
