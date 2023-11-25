import { useState } from "react";
import React from "react";
import { Doughnut } from "react-chartjs-2";

type props = {
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string;
      borderWidth: number;
    }[];
  };
};
export function DoughnutChart({ chartData }: props) {
  return (
    <div className="chart-container" style={{ width: "462px" }}>
      <Doughnut
        style={{ marginTop: "20px" }}
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: `Sơ đồ tỉ lệ số lượng vé đã bán trên tổng (Đơn vị: %)`,
            },
          },
        }}
      />
    </div>
  );
}
