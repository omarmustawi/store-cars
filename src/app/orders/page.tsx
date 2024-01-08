/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import img5 from "@/images/img5.jpg";
import Loading from "@/Components/Loading";
import { api_root } from "@/utlities/apis";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Table from "@/Components/Table";
import { useMyOrders } from "@/context/myOrder";
import Cookies from "universal-cookie";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function page() {
  const { myOrders, setMyOrders, removeOrder } = useMyOrders();
  const [loading, setLoading] = useState(true);
  const cookie = new Cookies();
  const router = useRouter();
  const loadingToast = () => toast.loading("Loading");
  const success = (msg: string) => toast.success(msg);
  const error = (msg: string) => toast.error(msg);

  useEffect(() => {
    if (!cookie.get("token")) {
      router.push("/auth/login");
      return;
    }
    const fetchData = async () => {
      try {
        let res: AxiosResponse<any> = await axios.get(`${api_root}/orders`, {
          headers: {
            Authorization: `Bearer ${cookie.get("token")}`,
          },
        });
        // setMessage(res.data.message);
        if (res.data.success) {
          setMyOrders(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        // setMessage("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const header = [
    {
      key: "id",
      name: "id_order",
    },
    {
      key: "status",
      name: "status",
    },
    {
      key: "image",
      name: "image",
    },
    {
      key: "title",
      name: "title",
    },
    {
      key: "created_at",
      name: "Date & Time",
    },
  ];

  async function deleteOrder(id: number) {
    try {
      loadingToast();
      const res: AxiosResponse<any> = await axios.delete(
        `${api_root}/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${cookie.get("token")}`,
          },
        }
      );
      toast.dismiss();
      if (res.data.success) {
        success(res.data.message);
        removeOrder(id);
      } else {
        error(res.data.message);
      }
    } catch (err) {
      error("Ooh! there is an error ");
    }
  }

  return (
    <>
      <Toaster toastOptions={{ duration: 3000 }} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="relative h-96 w-screen">
            <Image
              src={img5}
              alt={"img5"}
              className="fixed -z-10 bg-contain  h-96"
            />
            <div className="relative bg-fuchsia-800/40 z-10 top-0 w-screen h-96"></div>
          </div>
          <div className="bg-pink-50 min-h-screen py-8 ">
            <h1 className="text-5xl text-center  text-fuchsia-900 font-extrabold ">
              My Orders
            </h1>
            <section className="mx-32 my-10  bg-white p-5 rounded-md">
              {myOrders.length > 0 ? (
                <Table header={header} body={myOrders} delete={deleteOrder} />
              ) : (
                <p className="text-center text-gray-700">
                  There is not any order.
                </p>
              )}
            </section>
          </div>
        </>
      )}
    </>
  );
}
