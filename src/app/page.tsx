import HomePage from "@/Components/HomePage";
import Image from "next/image";
import img2 from "@/images/img2.jpg";
import waves1 from "@/images/waves1.svg";
import wave from "@/images/wave-blue.png";
import points from "@/images/points.webp";

export default function Home() {
  return (
      <div>
        <div className="relative p-11 bg-color-2 -z-10">
          <div className="bg-color-1 w-72 h-96 absolute -z-10 left-0 bottom-0"></div>
          <div className="h-96 flex items-center ">
            <h1 className=" text-7xl font-bold text-center text-fuchsia-900 italic uppercase ">
              cars store <br /> M#
            </h1>
          </div>
          <Image
            className="absolute top-0 right-0 drop-shadow-2xl rounded-md"
            src={img2}
            alt={"img2"}
            width={700}
            height={500}
          />
          <Image src={points} alt="points" />
          <Image className="absolute right-1/3 bottom-10 w-40" src={waves1} alt="points" />
          <Image className="absolute right-6 bottom-10 w-40" src={wave} alt="points" />
        </div>
        <HomePage />
      </div>
  );
}
