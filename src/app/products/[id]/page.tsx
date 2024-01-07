/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Image from "next/image";
import { api_root } from "@/utlities/apis";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/Components/Loading";
import { GoStarFill } from "react-icons/go";
import Comment from "@/Components/Comment";
import { ProductDetail, CommentType } from "@/utlities/interface";
import Cookies from "universal-cookie";
import Layout from "@/Components/Layout";

interface ProductPageProps {}

const fetchProductDetail = async (
  propertyId: string,
  setProductDetail: React.Dispatch<React.SetStateAction<ProductDetail | undefined>>,
  setRating: React.Dispatch<React.SetStateAction<number | undefined>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  cookie: Cookies
) => {
  try {
    const res = await axios.get(`${api_root}/products/${propertyId}`, {
      headers: {
        Authorization: `Bearer ${cookie.get("token")}`,
      },
    });

    if (res.data.success) {
      setProductDetail(res.data.data);
      setRating(res.data.data.rate);
    } else {
      setMessage(res.data.message);
    }
  } catch (err) {
    console.error("Error fetching data:", err);
    setMessage("Error fetching data");
  } finally {
    setLoading(false);
  }
};

const ProductPage: React.FC<ProductPageProps> = () => {
  const pathname = usePathname();
  const propertyId = pathname.split("/").pop();
  const [productDetail, setProductDetail] = useState<ProductDetail | undefined>();
  const [rating, setRating] = useState<number | undefined>();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const cookie = new Cookies();

  useEffect(() => {
    fetchProductDetail(propertyId, setProductDetail, setRating, setLoading, setMessage, cookie);
  }, [propertyId]);

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <section className="p-24 xl:px-48">
          <div className="bg-gray-100 p-8 rounded-md">
            <div>
              <p className="text-fuchsia-900 text-4xl">{productDetail?.title}</p>
              <Image
                className="w-full my-2"
                src={productDetail?.image}
                alt={productDetail?.title}
                width={500}
                height={500}
              />
              <p className="my-3 text-gray-700">{productDetail?.description}</p>
              <div className="flex justify-between mt-4">
                <p className="text-gray-400 flex">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <GoStarFill
                      key={value}
                      className={`${value <= rating ? "text-yellow-500" : ""}`}
                      size={20}
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
          {message && <div>{message}</div>}
        </section>
      )}
    </Layout>
  );
};

export default ProductPage;
