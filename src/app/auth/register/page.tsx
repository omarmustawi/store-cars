"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { BsPersonCircle } from "react-icons/bs";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "universal-cookie";
import toast, { Toaster } from "react-hot-toast";
import { api_root } from "@/utlities/apis";

interface LoginResponse {
  success: boolean;
  data: {
    name: string;
    token: string;
  };
  message: string;
}

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");

  //  for Alert
  const [message, setMessage] = useState("");
  const [onClickSubmit, setOnClickSubmit] = useState(false);
  const notify = () => toast(message);

  const cookie = new Cookies();
  const router = useRouter();

  // HANDLE REGISTER
  const handleSubmit = async (e: React.FormEvent) => {
    setOnClickSubmit(!onClickSubmit);
    e.preventDefault();
    try {
      const response = await axios.post<LoginResponse>(`${api_root}/login`, {
        name,
        email,
        password,
        c_password,
      });

      if (response.data.success) {
        cookie.set("name", response.data.data.name);
        cookie.set("token", response.data.data.token);
        setMessage(response.data.message);
        router.push("/");
      } else {
        setMessage("There is an error, re-fill the fields, please");
      }
    } catch (err) {
      setMessage("There is an error, re-fill the fields, please");
    }
  };

  useEffect(() => {
    if (message) {
      notify();
      setMessage("");
    }
  }, [message, onClickSubmit]);

  return (
    <>
      <Toaster />
      <section className="bg-slate-100 text-fuchsia-900 w-screen h-screen">
        <div className="w-96 bg-white p-7 rounded-2xl shadow-xl fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
          <h1 className="text-center text-xl">Welcome</h1>
          <BsPersonCircle className="m-auto" size={40} />
          <form className="flex flex-col gap-3">
            <label htmlFor="name"> Name </label>
            <input
              className="rounded-input"
              type="text"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              required
            />
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
            <label htmlFor="confirmPassword">Repeat Password: </label>
            <input
              className="rounded-input"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={(e) => setC_password(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-fuchsia-700 text-white rounded-lg p-3  hover:bg-fuchsia-900/50"
            >
              Create
            </button>
            <Link className="text-blue-500 underline" href="/auth/login">
              Create an account
            </Link>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;