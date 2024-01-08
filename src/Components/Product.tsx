import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoStarFill } from "react-icons/go";
import { ProductData } from "@/utlities/interface";
import axios from "axios";
import { api_root } from "@/utlities/apis";
import Cookies from "universal-cookie";
import toast, { Toaster } from "react-hot-toast";

export default function Product({ product }: { product: ProductData }) {
  const [rating, setRating] = useState(product.rate);
  const [hoveredRating, setHoveredRating] = useState(0);
  const cookie = new Cookies();
  const loading = () => toast.loading("Loading");
  const success = (msg: string) => toast.success(msg);
  const error = (msg: string) => toast.error(msg);

  // Handle the rating change (you might want to send it to the server, etc.)
  const handleRatingChange = async (newRating: number) => {
    try {
      loading();
      const response = await axios.post(
        `${api_root}/rate`,
        {
          product_id: product.id,
          rate: hoveredRating,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.get("token")}`,
          },
        }
      );
      toast.dismiss();

      if (response.data.success) {
        success(response.data.message);
      } else {
        error(response.data.message)
      }
    } catch (err) {
      error("There is an error");
    }
    setRating(newRating);
  };

  useEffect(() => {
    setRating(product.rate);
  }, [product.rate]);

  return (
    <>
      <Toaster toastOptions={{ duration: 3000 }} />
      <div key={product.id} className="product">
        <Link href={`/products/${product.id}`}>
          <Image
            className="rounded-t-xl hover:scale-125 transition-transform delay- ease-linear"
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
          />
          <div className="p-3 pt-6">
            <p className="text-2xl text-fuchsia-800 font-medium">
              {" "}
              title: {product.title}{" "}
            </p>
            <p className="text-gray-600">
              {" "}
              description: {product.description}{" "}
            </p>
          </div>
        </Link>

        {/* === */}
        <div className="flex justify-between p-3 ">
          <p className="text-gray-400 flex ">
            {[1, 2, 3, 4, 5].map((value) => (
              <GoStarFill
                key={value}
                className={`cursor-pointer ${
                  value <= (rating || hoveredRating) ? "text-yellow-500" : ""
                }`}
                size={20}
                onMouseEnter={() => setHoveredRating(value)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => handleRatingChange(value)}
              />
            ))}
          </p>
          <p className="text-gray-400"> {product.created_at} </p>
        </div>
        {/* ==== */}
      </div>
    </>
  );
}
