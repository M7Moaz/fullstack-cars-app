import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex">{children}</main>;
}
