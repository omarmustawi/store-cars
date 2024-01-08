"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { api_root } from "@/utlities/apis";
import Cookies from "universal-cookie";
import Loading from "./Loading";
import Product from "./Product";
import { useProducts } from "@/context/products";
import { ProductData } from "@/utlities/interface";

export default function HomePage() {
  const cookie = new Cookies();
  const router = useRouter();

  const { products, setProducts } = useProducts();
  const [productsList, setProductsList] = useState<ProductData[]>([]);
  const [searchWord, setSearchWord] = useState("");
  const [filter, setFilter] = useState<"rate" | "title">("title");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cookie.get("token")) {
      router.push("/auth/login");
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${api_root}/products`, {
          headers: {
            Authorization: `Bearer ${cookie.get("token")}`,
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
    };

    fetchProducts();
  }, []);

  const filterSearch = () => {
    switch (filter) {
      // case 'all':
      //   setProductsList(products);
      //   break;
      case "rate":
        setProductsList(
          products.filter(
            (product: ProductData) =>
              Math.floor(product.rate) === Number(searchWord)
          )
        );
        break;
      case "title":
        setProductsList(
          products.filter((product: ProductData) =>
            product.title.toLowerCase().includes(searchWord.toLowerCase())
          )
        );
        break;
      default:
        setProductsList(products);
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
