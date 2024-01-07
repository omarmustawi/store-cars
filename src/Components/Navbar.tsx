import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export default function Navbar() {
  const cookie = new Cookies();
  let token = cookie.get("token");
  const [updateCookie, setUpdateCookie] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    token = cookie.get("token");
    console.log("token", token);
  }, [updateCookie]);

  return (
    <nav className="fixed w-screen z-20  bg-slate-50/90 text-fuchsia-900 text-lg p-4">
      <ul className="flex justify-center space-x-9 ">
        <li className="group relative">
          <Link href="/" className="nav-item ">
            Home
          </Link>
        </li>
        <li className="group relative">
          <Link href="/orders" className="nav-item">
            Orders
          </Link>
        </li>
        <li className="relative">
          {token ? (
            <>
              <span
                onClick={() => {
                  cookie.remove("token");
                  cookie.remove("name");
                  setUpdateCookie(!updateCookie);
                }}
                className="nav-item cursor-pointer "
              >
                Logout
              </span>
            </>
          ) : (
            <>
              <span className="group relative  ">
                <Link href="/auth/login" className="nav-item ">
                  Log In
                </Link>
              </span>
              |
              <span className="group relative ">
                <Link href="/auth/register" className="nav-item ">
                  Sign Up
                </Link>
              </span>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}
