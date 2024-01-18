/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { api_root } from "@/utlities/apis";
import Cookies from "universal-cookie";
import Loading from "./Loading";
import Product from "./Product";
import { useProducts } from "@/context/products";
import { ProductData } from "@/utlities/interface";
import { useAuth } from "@/context/authToken";

export default function HomePage() {
  const cookie = new Cookies();
  const router = useRouter();
  const { token, setToken, logout } = useAuth();


  const { products, setProducts } = useProducts();
  const [productsList, setProductsList] = useState<ProductData[]>([]);
  const [searchWord, setSearchWord] = useState("");
  const [filter, setFilter] = useState<"rate" | "title">("title");
  const [loading, setLoading] = useState(true);

  // Memoize the fetchProducts function using useCallback
  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get(`${api_root}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setProducts(res.data.data);
        setProductsList(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }, [setProducts, setProductsList, cookie]); // Removed 'router' from the dependency array

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
      return;
    }

    fetchProducts();
  }, [fetchProducts, router, cookie]); // Added 'router' and 'cookie' to the dependency array

  const filterSearch = () => {
    switch (
      filter
      // ... (rest of the function remains the same)
    ) {
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="m-24">
          <input
            type="search"
            onChange={(e) => setSearchWord(e.target.value)}
            placeholder="Search"
            className="border-2 w-2/5 p-2 outline-none rounded-2xl m-auto flex focus:border-fuchsia-400"
          />
          <div className="flex gap-5 w-fit my-8 m-auto">
            <button
              onClick={() => setProductsList(products)}
              className="btn-filter"
            >
              {" "}
              all{" "}
            </button>
            <button onClick={() => setFilter("rate")} className="btn-filter">
              {" "}
              rate{" "}
            </button>
            <button onClick={() => setFilter("title")} className="btn-filter">
              {" "}
              title{" "}
            </button>
          </div>
          <button className="btn" onClick={filterSearch}>
            search
          </button>
          <section className="flex flex-wrap gap-5 justify-center my-9">
            {Array.isArray(products) &&
              productsList?.map((product: ProductData) => (
                <Product key={product.id} product={product} />
              ))}
          </section>
        </div>
      )}
    </>
  );
}
