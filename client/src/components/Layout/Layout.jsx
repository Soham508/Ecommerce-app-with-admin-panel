import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="h-screen w-full">
      <Header />

      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
