"use client";

import { useAuth } from "@/context/authToken";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export default function Navbar() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const [token, setToken] = useState(false);
  
  const { token, setToken, logout } = useAuth();
  useEffect(() => {
    const cookie = new Cookies();
    if (window) setToken(cookie.get("token"));
  }, [setToken]);

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
        {token ? (
          <li className="relative">
            <span onClick={logout} className="nav-item cursor-pointer">
              Logout
            </span>
          </li>
        ) : (
          <li className="relative">
            <span className="group relative">
              <Link href="/auth/login" className="nav-item">
                Log In
              </Link>
              {/* </span> */}|{/* <span className="group relative"> */}
              <Link href="/auth/register" className="nav-item">
                Sign Up
              </Link>
            </span>
            {/* </span> */}
          </li>
        )}
      </ul>
    </nav>
  );
}
