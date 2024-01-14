"use client";

import React, { useEffect } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { getRequest } from "@/lib/fetch";
import { Input } from "@/components/ui/input";
import DialogCustom from "@/components/ui/dialogCustom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import "./test.css";
import { hover_color, main_color } from "../../../../../public/color";
export const SelectAddress = ({ addressValue, setAddressValue }) => {
  const [selectedProvince, setSelectedProvince] = React.useState(new Set([]));
  const [selectedDistrict, setSelectedDistrict] = React.useState(new Set([]));
  const [selectedWard, setSelectedWard] = React.useState(new Set([]));

  const [diaChiTouched, setDiaChiTouched] = React.useState(false);
  const [provinceTouched, setProvinceTouched] = React.useState(false);
  const [districtTouched, setDistrictTouched] = React.useState(false);
  const [wardTouched, setWardTouched] = React.useState(false);

  const [isLoadingProvince, setIsLoadingProvince] = React.useState(false);
  const [isLoadingDistrict, setIsLoadingDistrict] = React.useState(false);
  const [isLoadingWard, setIsLoadingWard] = React.useState(false);

  const [provinces, setProvince] = React.useState([]);
  const [districts, setDistrict] = React.useState([]);
  const [wards, setWard] = React.useState([]);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [locationValue, setLocationValue] = React.useState("");

  useEffect(() => {
    async function getProvince() {
      setIsLoadingProvince(true);
      const res = await getRequest({
        endPoint: "https://provinces.open-api.vn/api/p/",
      });

      setProvince(res);
      setIsLoadingProvince(false);
    }
    getProvince();
  }, []);
  useEffect(() => {
    setDistrict([]);
    setWard([]);
    async function getDistrict() {
      if (selectedProvince.size > 0) {
        setIsLoadingDistrict(true);
        const valuesArray = Array.from(selectedProvince);
        const provinceCode = valuesArray[0];
        const res = await getRequest({
          endPoint: `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`,
        });
        setDistrict(res?.districts);
        setIsLoadingDistrict(false);
      }
    }
    getDistrict();
  }, [selectedProvince]);
  useEffect(() => {
    async function getWard() {
      if (selectedDistrict.size > 0) {
        setIsLoadingWard(true);
        const valuesArray = Array.from(selectedDistrict);
        const districtCode = valuesArray[0];
        const res = await getRequest({
          endPoint: `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`,
        });
        setWard(res?.wards);
        setIsLoadingWard(false);
      }
    }

    getWard();
  }, [selectedDistrict]);
  const isProvinceValid = selectedProvince.size > 0;
  const isDistrictValid = selectedDistrict.size > 0;
  const isWardValid = selectedWard.size > 0;

  const onSubmit = () => {
    const valuesArrayProvince = Array.from(selectedProvince);
    const provinceCode = valuesArrayProvince[0];
    const provinceValue = provinces.find(
      (province) => province.code == provinceCode
    )?.name;

    const valuesArrayDistrict = Array.from(selectedDistrict);
    const districtCode = valuesArrayDistrict[0];
    const districtValue = districts.find(
      (district) => district.code == districtCode
    )?.name;

    const valuesArrayWard = Array.from(selectedWard);
    const wardCode = valuesArrayWard[0];
    const wardValue = wards.find((ward) => ward.code == wardCode)?.name;
    setAddressValue(
      `${locationValue}, ${wardValue}, ${districtValue}, ${provinceValue}`
    );
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-col w-full gap-2">
      {isModalOpen ? (
        <DialogCustom
          // onClose={() => {
          //   setIsModalOpen(false);
          //   setDiaChiTouched(true);
          // }}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          className="w-[50%] "
          isChild={true}
        >
          <div className="flex flex-col gap-y-6 w-full px-1">
            <Select
              key={"province"}
              radius={"sm"}
              variant="bordered"
              label="Thành phố, tỉnh thành"
              isInvalid={isProvinceValid || !provinceTouched ? false : true}
              errorMessage={
                isProvinceValid || !provinceTouched
                  ? ""
                  : "Vui lòng chọn thành phố, tỉnh thành"
              }
              autoFocus={false}
              placeholder="Chọn thành phố, tỉnh thành"
              selectedKeys={selectedProvince}
              isLoading={isLoadingProvince}
              onSelectionChange={setSelectedProvince}
              className="w-full rounded-sm shadow"
              onClose={() => setProvinceTouched(true)}
            >
              {provinces?.map((province) => (
                <SelectItem key={province.code} value={province.code}>
                  {province.name}
                </SelectItem>
              ))}
            </Select>
            <Select
              key={"district"}
              radius={"sm"}
              label="Quận, huyện"
              variant="bordered"
              isInvalid={isDistrictValid || !districtTouched ? false : true}
              errorMessage={
                isDistrictValid || !districtTouched
                  ? ""
                  : "Vui lòng chọn quận, huyện"
              }
              autoFocus={false}
              placeholder="Chọn quận, huyện"
              selectedKeys={selectedDistrict}
              isLoading={isLoadingDistrict}
              onSelectionChange={setSelectedDistrict}
              className="w-full rounded-sm shadow"
              onClose={() => setDistrictTouched(true)}
            >
              {districts?.map((district) => (
                <SelectItem key={district.code} value={district.code}>
                  {district.name}
                </SelectItem>
              ))}
            </Select>
            <Select
              key={"ward"}
              radius={"sm"}
              label="Xã, phường"
              variant="bordered"
              isInvalid={isWardValid || !wardTouched ? false : true}
              errorMessage={
                isWardValid || !wardTouched ? "" : "Vui lòng chọn xã, phường"
              }
              autoFocus={false}
              placeholder="Chọn xã, phường"
              selectedKeys={selectedWard}
              isLoading={isLoadingWard}
              onSelectionChange={setSelectedWard}
              className="w-full rounded-sm shadow"
              onClose={() => setWardTouched(true)}
            >
              {wards?.map((ward) => (
                <SelectItem key={ward.code} value={ward.code}>
                  {ward.name}
                </SelectItem>
              ))}
            </Select>

            <Input
              value={locationValue}
              onChange={(e) => {
                setLocationValue(e.target.value);
              }}
              className="w-full "
              placeholder="Địa chỉ"
            />
            <div className="w-full flex items-center justify-center">
              <Button
                disabled={
                  !isProvinceValid ||
                  !isDistrictValid ||
                  !isWardValid ||
                  !locationValue
                }
                onClick={onSubmit}
                className={`w-full bg-[#3BE1AA] hover:bg-[#2DD196] text-black`}
              >
                Xác nhận
              </Button>
            </div>
          </div>
        </DialogCustom>
      ) : null}

      {/* <Input
        className="w-full lg:w-[50%]"
        placeholder="Địa chỉ"
        onClick={() => {
          setIsModalOpen(true);
        }}
        onFocus={() => {
          setIsModalOpen(true);
        }}
      /> */}
      <Label className="font-bold text-sm">
        Địa chỉ <span className="text-red-500">*</span>
      </Label>
      <Select
        isOpen={false}
        label="Địa chỉ"
        variant="bordered"
        placeholder="Chọn địa chỉ"
        selectedKeys={addressValue !== "" ? [addressValue] : null}
        isInvalid={addressValue !== "" || !diaChiTouched ? false : true}
        errorMessage={
          addressValue !== "" || !diaChiTouched ? "" : "Vui lòng chọn địa chỉ"
        }
        className="w-full shadow rounded-sm"
        radius="sm"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <SelectItem key={addressValue} value={addressValue}>
          {addressValue}
        </SelectItem>
      </Select>
    </div>
  );
};
