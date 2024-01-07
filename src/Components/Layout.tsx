import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }): React.JSX.Element {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
