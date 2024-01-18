/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Image from "next/image";
import { api_root } from "@/utlities/apis";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Loading from "@/Components/Loading";
import { GoStarFill } from "react-icons/go";
import Comment from "@/Components/Comment";
import { ProductDetail, CommentType } from "@/utlities/interface";
import Cookies from "universal-cookie";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/context/authToken";

interface ProductPageProps {}

const ProductPage: React.FC<ProductPageProps> = () => {
  const pathname = usePathname();
  const propertyId = pathname.split("/").pop();
  const [productDetail, setProductDetail] = useState<ProductDetail | undefined>();
  const [rating, setRating] = useState<number | undefined>();
  const [loading, setLoading] = useState(true);
  const [hoveredRating, setHoveredRating] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cookie = new Cookies();
  const { token, setToken, logout } = useAuth();

  function loadingToast() {
    return toast.loading("Loading");
  }
  const success = (msg: string) => toast.success(msg);
  const error = (msg: string) => toast.error(msg);

  // Memoize the fetchProductDetail function using useCallback
  const fetchProductDetail = useCallback(async () => {
    try {
      const res = await axios.get(`${api_root}/products/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setProductDetail(res.data.data);
        setRating(res.data.data.rate);
      } else {
        postMessage(res.data.message);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      postMessage("Error fetching data");
    } finally {
      setLoading(false);
    }
  }, [propertyId, setProductDetail, setRating, setLoading, token]); // Include 'token' in the dependency array

  useEffect(() => {
    fetchProductDetail();
  }, [fetchProductDetail]);

  // Handle the rating change (you might want to send it to the server, etc.)
  const handleRatingChange = async (newRating: number) => {
    try {
      loadingToast();
      const response = await axios.post(
        `${api_root}/rate`,
        {
          product_id: productDetail.id,
          rate: hoveredRating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.dismiss();
      if (response.data.success) {
        success(response.data.message);
      } else {
        error(response.data.message);
      }
    } catch (err) {
      error("There is an error");
    }
    setRating(newRating);
  };

  return (
    <>
      <Toaster toastOptions={{ duration: 3000 }} />
      {loading ? (
        <Loading />
      ) : (
        <section className="p-24 xl:px-48">
          <div className="bg-gray-100 p-8 rounded-md">
            <div>
              <p className="text-fuchsia-900 text-4xl">
                {productDetail?.title}
              </p>
              <Image
                className="w-full my-2"
                src={`${productDetail?.image}`}
                alt={`${productDetail?.title}`}
                width={500}
                height={500}
              />
              <p className="my-3 text-gray-700">{productDetail?.description}</p>
              <div className="flex justify-between mt-4">
                <p className="text-gray-400 flex">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <GoStarFill
                      key={value}
                      className={`cursor-pointer ${
                        value <= (rating || hoveredRating)
                          ? "text-yellow-500"
                          : ""
                      }`}
                      size={20}
                      onMouseEnter={() => setHoveredRating(value)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => handleRatingChange(value)}
                    />
                  ))}
                </p>
                <p className="text-gray-400">
                  {new Date(productDetail?.created_at).toLocaleString()}
                </p>
              </div>
            </div>
            <section className="my-6">
              {productDetail?.comments.map((comment: CommentType) => (
                <Comment comment={comment} key={comment.id} />
              ))}
            </section>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductPage;
