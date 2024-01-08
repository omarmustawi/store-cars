"use client";
import { useState } from "react";
import Link from "next/link";
import { BsPersonCircle } from "react-icons/bs";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "universal-cookie";
import toast, { Toaster } from "react-hot-toast";
import { api_root } from "@/utlities/apis";
import { LoginResponse } from "@/utlities/interface";
import { useAuth } from "@/context/authToken";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = () => toast.loading("Loading");
  // const success = () => toast.success("Signed in");
  const error = (msg: string) => toast.error(msg);

  const cookie = new Cookies();
  const { setToken } = useAuth();
  const router = useRouter();

  // HANDLE REGISTER
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      loading();
      const response = await axios.post<LoginResponse>(`${api_root}/login`, {
        email,
        password,
      });
      toast.dismiss();
      if (response.data.success) {
        cookie.set("name", response.data.data.name);
        cookie.set("token", response.data.data.token);
        setToken(response.data.data.token)
        // success();
        router.push("/");
      } else {
        error("There is an error, re-fill the fields, please");
      }
    } catch (err) {
      // toast.dismiss();
      error("There is an error, re-fill the fields, please");
    }
  };

  return (
    <>
      <Toaster toastOptions={{ duration: 3000 }} />
      <section className="bg-slate-100 text-fuchsia-900 w-screen h-screen">
        <div className="w-96 bg-white p-7 rounded-2xl shadow-xl fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
          <h1 className="text-center text-xl">Welcome</h1>
          <BsPersonCircle className="m-auto" size={40} />
          <form className="flex flex-col gap-3">
            <label htmlFor="email"> Email </label>
            <input
              className="rounded-input"
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password"> Password:</label>
            <input
              className="rounded-input"
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-fuchsia-700 text-white rounded-lg p-3  hover:bg-fuchsia-900/50"
            >
              Create
            </button>
            <Link className="text-blue-500 underline" href="/auth/register">
              Create an account
            </Link>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
