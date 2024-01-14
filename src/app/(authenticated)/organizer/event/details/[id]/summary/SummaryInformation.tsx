"use client";

import { useEventOrganizer } from "@/hooks/useEventOrganizer";
import { CircularProgress, Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FcSportsMode } from "react-icons/fc";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { LineChart } from "@/app/(authenticated)/organizer/(components)/(chart)/LineChart";
import { DoughnutChart } from "@/app/(authenticated)/organizer/(components)/(chart)/DoughnutChart";
import { currencyFormat, prismaDateToNextDate } from "@/lib/utils";
import LiveMusic from "@/components/livemusic";
import NightLifeIcon from "@/components/nightlife";
import StageIcon from "@/components/stage";
import ConferenceIcon from "@/components/conference";
import CourseIcon from "@/components/course";
import TourismIcon from "@/components/tourism";
import SportIcon from "@/components/sport";
import OutsideIcon from "@/components/outside";
import { main_color } from "../../../../../../../../public/color";
Chart.register(CategoryScale);

type propsLineDate = {
  label: string;
  data: number[];
  borderColor: string;
  fill: boolean;
  tension: number;
};
const getIconById = (id) => {
  switch (id) {
    case 1:
      return <OutsideIcon className={"mt-1 w-4 h-4"} />;
    case 2:
      return <LiveMusic className={"mt-1 w-4 h-4"} />;
    case 3:
      return <StageIcon className={"mt-1 w-4 h-4"} />;
    case 4:
      return <NightLifeIcon className={"mt-1 w-4 h-4"} />;
    case 5:
      return <ConferenceIcon className={"mt-1 w-4 h-4"} />;
    case 6:
      return <CourseIcon className={"mt-1 w-4 h-4"} />;
    case 7:
      return <TourismIcon className={"mt-1 w-4 h-4"} />;
    case 8:
      return <SportIcon className={"mt-1 w-4 h-4"} />;
    default:
      return null;
  }
};
export function SummaryInformation({ session, id }) {
  const userId = session?.user?.id;
  const [eventName, setEventName] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const [type, setType] = useState("");
  const [typeId, setTypeId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [ticketNumber, setTickerNumber] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const { fetchSummary } = useEventOrganizer();

  const [chartDataDoughnut, setChartDataDoughnut] = useState({
    labels: ["Decal", "Băng rôn", "Bảng hiệu", "Khác"],
    datasets: [
      {
        label: "Tổng thu",
        data: [100203020, 405064640, 24024241, 42423425],
        backgroundColor: [
          "rgb(255, 182, 150)",
          "rgb(19, 241, 164)",
          "rgb(252, 143, 156)",
          "rgb(6, 217, 225)",
        ],
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  });

  const [chartDataLine, setChartDataLine] = useState({
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Decal",
        data: [2, 1, 4, 7, 4, 6, 3, 2, 8, 9, 12, 6],
        borderColor: "rgb(255, 182, 150)",
        fill: false,
        tension: 0.4,
      },
      {
        label: "Băng rôn",
        data: [6, 4, 3, 6, 3, 7, 8, 3, 5, 2, 9, 6],
        borderColor: "rgb(19, 241, 164)",
        fill: false,
        tension: 0.4,
      },
      {
        label: "Bảng hiệu",
        data: [6, 4, 3, 4, 3, 6, 7, 8, 3, 5, 7, 5],
        borderColor: "rgb(252, 143, 156)",
        fill: false,
        tension: 0.4,
      },
      {
        label: "Khác",
        data: [6, 4, 3, 2, 4, 6, 7, 4, 6, 3, 2, 7],
        borderColor: "rgb(6, 217, 225)",
        fill: false,
        tension: 0.4,
      },
    ],
  });
  useEffect(() => {
    const fetchSum = async () => {
      await fetchSummary(id).then((res) => {
        console.log(res);
        //doughnut chart
        let labelArray: string[] = [];
        let colorArray: string[] = [];
        let percentOfType: number[] = [];
        const totalTicket = res?.ticketNum?._sum?.soLuong;
        const ticketList = res?.event?.ves;
        const chartData = res?.doughnutChartData;
        ticketList?.map((item, index) => {
          labelArray.push(item.name);
          const data = chartData.filter((i) => i.veId === item.id);
          percentOfType.push(
            data.length !== 0 ? (data[0]?._sum?.soLuong * 100) / totalTicket : 0
          );
          colorArray.push(
            index < colorBoard.length ? colorBoard[index] : randomColor()
          );
        });
        setChartDataDoughnut({
          labels: labelArray,
          datasets: [
            {
              label: "Lượng vé đã bán (%)",
              data: percentOfType,
              backgroundColor: colorArray,
              borderColor: "white",
              borderWidth: 2,
            },
          ],
        });

        // lineChart
        const lineData = res?.lineChartDate;
        let max = 0;
        let dataArray: propsLineDate[] = [];
        ticketList?.map((item, index) => {
          const soNgay =
            (prismaDateToNextDate(item.ngayKetThuc).getTime() / 1000 -
              prismaDateToNextDate(item.ngayBan).getTime() / 1000) /
            86400;
          if (max < soNgay) max = soNgay;
          let amountArray: number[] = [];
          fillZero(amountArray, soNgay);
          const listDataItem = lineData.filter((i) => i.veId === item.id);
          listDataItem?.map((item2) => {
            const index =
              (prismaDateToNextDate(item2?.hoaDon?.ngayDatHang).getTime() /
                1000 -
                prismaDateToNextDate(item?.ngayBan).getTime() / 1000) /
              86400;
            if (!amountArray[index]) {
              amountArray[index] = item2?.soLuong;
            } else amountArray[index] += item2?.soLuong;
          });
          console.log(amountArray);
          dataArray.push({
            label: item?.name,
            data: amountArray,
            borderColor:
              index < ticketList.length ? colorBoard[index] : randomColor(),
            fill: false,
            tension: 0.4,
          });
        });
        setChartDataLine({
          labels: labelCreator(max),
          datasets: dataArray,
        });
        setEventName(res.event?.name);
        setAddressValue(res.event?.diaChi);
        setType(res?.event?.ChuDe?.name);
        setTypeId(res?.event?.ChuDe?.id);
        setTickerNumber(totalTicket);
        setTotalIncome(res?.income?._sum?.tongGia);
      });
    };
    fetchSum();
  }, []);

  return (
    <>
      <div className="relative min-h-[1032px]">
        <div className="mt-6">
          <h1 className="font-semibold text-2xl">{eventName}</h1>
          <h1 className="text-gray-600">{addressValue}</h1>
          <h1
            className={`text-base text-[#2DD196] font-medium mt-1 flex flex-row gap-2`}
          >
            {getIconById(typeId)}
            {type}
          </h1>
          <Divider className="my-4 mt-6" />
        </div>
        <h1 className="w-full text-center my-2 text-xl font-medium">
          Tổng kết sự kiện
        </h1>
        <div className="flex flex-row w-full gap-3">
          <div
            className="basis-1/2 flex flex-col  h-[120px] rounded-[5px] transition ease-in-out hover:scale-105"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(254, 148, 102), rgb(255, 182, 150))",
            }}
          >
            <h4 className="text-white text-[24px] mt-[10px] ms-[10px]">
              {ticketNumber} *
            </h4>
            <div className="flex flex-row justify-between">
              <h6
                className="text-white text-[14px] mt-[-2px] ms-[10px]"
                style={{ fontFamily: "sans-serif" }}
              >
                Số vé đã bán
              </h6>
            </div>
            <Divider className="bg-white" />
            <h6
              className="text-white text-[14px] mt-[14px] ml-[10px]"
              style={{ fontFamily: "sans-serif" }}
            >
              🕛 Update: {new Date().getMonth() + 1}-{new Date().getFullYear()}
            </h6>
          </div>
          <div
            className="basis-1/2 flex flex-col  h-[120px] rounded-[5px] transition ease-in-out hover:scale-105"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(6, 197, 133), rgb(19, 241, 164))",
            }}
          >
            <h4 className="text-white text-[24px] mt-[10px] ml-[10px]">
              {currencyFormat(totalIncome)}
            </h4>
            <div className="flex flex-row justify-between">
              <h6
                className="text-white text-[14px] mt-[-2px] ml-[10px]"
                style={{ fontFamily: "sans-serif" }}
              >
                Tổng thu
              </h6>
            </div>
            <Divider className="bg-white" />
            <h6
              className="text-white text-[14px] mt-[14px] ml-[10px]"
              style={{ fontFamily: "sans-serif" }}
            >
              🕛 Update: {new Date().getMonth() + 1}-{new Date().getFullYear()}
            </h6>
          </div>
        </div>
        <div className="w-full flex justify-center my-6 p-6 rounded-md shadow-md bg-white border-1 border-gray-400">
          <DoughnutChart chartData={chartDataDoughnut} />
        </div>
        <div className="rounded-md shadow-md bg-white border-1 border-gray-400 p-6">
          <LineChart chartData={chartDataLine} />
        </div>
        {isLoading ? (
          <div className="w-full h-full flex justify-center bg-gray-200 z-10 absolute top-0">
            <CircularProgress
              color="success"
              aria-label="Loading..."
              classNames={{
                svg: "w-20 h-20 text-gray-600",
              }}
            />
          </div>
        ) : null}
      </div>
    </>
  );
}

export const colorBoard = [
  "rgb(255, 182, 150)",
  "rgb(19, 241, 164)",
  "rgb(252, 143, 156)",
  "rgb(6, 217, 225)",
  "#FFCA79",
  "#FFE379",
  "#C7FF79",
  "#9EFF79",
  "#79FF93",
  "#79FFCD",
  "#79FFFB",
  "#79DCFF",
  "#79A8FF",
  "#7F79FF",
  "#AA79FF",
  "#D279FF",
  "#FC79FF",
  "#FF79B8",
  "#FF798A",
  "#FFA179",
];

const randomColor = () => {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return "rgb(" + r + "," + g + "," + b + ")";
};

const fillZero = (arr, y) => {
  for (let i = 0; i < y; i++) {
    arr[i] = 0;
  }
};

const labelCreator = (value) => {
  let arr: string[] = [];
  for (let i = 0; i < value; i++) {
    arr[i] = (i + 1).toString();
  }
  return arr;
};
