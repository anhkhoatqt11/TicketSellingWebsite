import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useCategory } from "@/hooks/useCategory";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Popular() {
  const { fetchAllCategories } = useCategory();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchAllCategories();
      setCategories(res);
    };

    fetchData();
  }, []);

  const data = {
    labels: categories.map((category) => category.name),
    datasets: [
      {
        data: categories.map((category) => category.suKienCount),
        backgroundColor: [
          "#4ade80",
          "#34d399",
          "#2dd4bf",
          "#fbbf24",
          "#f87171",
          "#c084fc",
          "#fb7185",
          "#831843",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        align: "start",
      },
    },
  };

  return (
    <div className="block ml-auto relative w-full md:w-[270px]">
      <Card
        isFooterBlurred
        radius="lg"
        className="border-none w-full h-[360px] mt-10 md:mt-0 md:w-[270px]"
      >
        <CardHeader>
          <p className="w-full text-center font-bold text-xl">Chủ đề nổi bật</p>
        </CardHeader>
        <CardBody className="pl-5 pr-5 pb-5 pt-0 m-0 justify-center items-center overflow-hidden">
          <Doughnut data={data} options={options} />
        </CardBody>
      </Card>
    </div>
  );
}
