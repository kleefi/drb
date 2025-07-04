"use client";
import Cards from "@/components/Cards";
import { getTempatWithKategori } from "@/utils/api/location";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function Home() {
  const [tempatList, setTempatList] = useState([]);
  const [openIndex, setOpenIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getTempatWithKategori();

      // Group by kategori
      const grouped = data.reduce((acc, item) => {
        if (!acc[item.kategori]) acc[item.kategori] = [];
        acc[item.kategori].push(item);
        return acc;
      }, {});

      setTempatList(grouped); // <- grouped object, bukan array lagi
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const warnaAcak = (index) => {
    const warna = ["blue", "green", "red"];
    return warna[index % warna.length];
  };
  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        {isLoading ? (
          <div className="flex justify-center my-8">
            <ClipLoader className="block" color="#3b82f6" size={35} />
          </div>
        ) : (
          <>
            <Image
              className="mx-auto"
              src="/assets/images/logo.png"
              alt="logo"
              width={120}
              height={50}
            />
            <p className="text-gray-500 text-sm">
              <span className="font-bold">Minuman sehat berkualitas</span>{" "}
              <br />
              (Made By Order)
            </p>
            {Object.entries(tempatList).map(([kategori, tempatArray], idx) => (
              <Cards
                key={kategori}
                namaMarket={kategori}
                namaWarna={warnaAcak(idx)}
                namaMallList={tempatArray}
                isOpen={openIndex === idx}
                onToggle={() => {
                  setOpenIndex(openIndex === idx ? null : idx); // toggle
                }}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
