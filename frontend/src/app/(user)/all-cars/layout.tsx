import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Fillteration from "@/components/ui/Fillteration";
import React from "react";

export const metadata: Metadata = {
  title: "All Cars",
  description: "All cars in one place | Rent Your Car Here",
};

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Container>
        <Fillteration />
      </Container>
      {children}
    </>
  );
};

export default layout;
