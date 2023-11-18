import { useState } from "react";
import React from "react";
import { Line } from "react-chartjs-2";

type props = {
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      fill: boolean;
      tension: number;
    }[];
  };
};
export function LineChart({ chartData }: props) {
  return (
    <div className="chart-container" style={{ width: "1000px" }}>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: `Sơ đồ tăng giảm số lượng vé đã bán theo ngày (Đơn vị: Số lượng)`,
            },
          },
        }}
      />
    </div>
  );
}
