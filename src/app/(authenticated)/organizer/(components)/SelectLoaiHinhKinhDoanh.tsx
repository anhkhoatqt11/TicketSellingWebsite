"use client";

import { Select, SelectItem } from "@nextui-org/react";
import React, { useEffect } from "react";

export const SelectLoaiHinhKinhDoanh = ({
  setLoaiHinhKinhDoanhValue,
  loaiHinhKinhDoanhValue,
}) => {
  const [selectedLoaiHinhKinhDoanh, setSelectedLoaiHinhKinhDoanh] =
    React.useState(new Set([]));
  const [loaiHinhKinhDoanhTouched, setLoaiHinhKinhDoanhTouched] =
    React.useState(false);

  const loaiHinhKinhDoanh = [
    {
      label: "Cá nhân",
      value: "canhan",
    },
    {
      label: "Doanh nghiệp/ Nhà tổ chức",
      value: "doanhnghiep",
    },
  ];

  useEffect(() => {
    if (selectedLoaiHinhKinhDoanh) {
      const organizerValueArray = Array.from(selectedLoaiHinhKinhDoanh);
      setLoaiHinhKinhDoanhValue(organizerValueArray?.[0]);
    }
  }, [selectedLoaiHinhKinhDoanh]);
  const isLoaiHinhKinhDoanhValid = selectedLoaiHinhKinhDoanh.size > 0;
  return (
    <div className="flex flex-col h-full gap-y-6 w-full">
      <div className="flex flex-row gap-2">
        <Select
          key={"loaihinhkinhdoanh"}
          radius={"sm"}
          label="Loại hình kinh doanh"
          variant="bordered"
          placeholder="Chọn loại hình kinh doanh"
          selectedKeys={loaiHinhKinhDoanhValue ? [loaiHinhKinhDoanhValue] : []}
          onSelectionChange={setSelectedLoaiHinhKinhDoanh}
          onClose={() => setLoaiHinhKinhDoanhTouched(true)}
          className="w-full rounded-sm shadow"
        >
          {loaiHinhKinhDoanh.map((loaikinhdoanh) => (
            <SelectItem key={loaikinhdoanh.value} value={loaikinhdoanh.value}>
              {loaikinhdoanh.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};
