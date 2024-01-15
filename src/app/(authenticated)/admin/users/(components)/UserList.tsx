"use client";

import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Image,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { CiEdit } from "react-icons/ci";
import { CiLock, CiUnlock } from "react-icons/ci";
import { useAdmin } from "@/hooks/useAdmin";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useUser } from "@/hooks/useUser";
import { Pagination } from "@nextui-org/react";
import { VaiTroMap, LoaiHinhKinhDoanhMap } from "@/lib/constant";
import { main_color } from "../../../../../../public/color";

const statusColorMap = {
  dang_hoat_dong: "success",
  khoa_tai_khoan: "danger",
  vacation: "warning",
};

function convertUtcToGmtPlus7(utcString) {
  const utcDate = new Date(utcString);
  const gmtPlus7Offset = 7 * 60;
  const localDate = new Date(utcDate.getTime() + gmtPlus7Offset * 60 * 1000);
  const formattedDate = localDate
    .toISOString()
    .replace("T", " ")
    .replace(/\.\d+Z$/, "");
  return formattedDate;
}

export default function UserList({ props }) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { fetchAllUser } = useAdmin();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isModalLoading, setIsModalLoading] = React.useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [selectedVaiTro, setSelectedVaiTro] = React.useState(new Set([]));
  const [selectedLoaiHinhKinhDoanh, setSelectedLoaiHinhKinhDoanh] =
    React.useState(new Set([]));

  const [hoTen, setHoTen] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [dienThoai, setDienThoai] = React.useState("");
  const [diaChi, setDiaChi] = React.useState("");
  const [vaiTro, setVaiTro] = React.useState("");
  const [maSoDKKD, setMaSoDKKD] = React.useState("");
  const [noiCap, setNoiCap] = React.useState("");
  const [ngayCap, setNgayCap] = React.useState();
  const [loaiHinhKinhDoanh, setLoaiHinhKinhDoanh] = React.useState("");
  const [hoTenBTC, setHoTenBTC] = React.useState("");
  const [maSoThueCaNhan, setMaSoThueCaNhan] = React.useState("");
  const [hoTenDoanhNghiep, setHoTenDoanhNghiep] = React.useState("");

  const { fetchUserInfoById, updateUserInfo } = useUser();

  useEffect(() => {
    if (selectedVaiTro.size > 0) {
      const vaiTroValueArray = Array.from(selectedVaiTro);
      setVaiTro(vaiTroValueArray?.[0].split(",").map((role) => role.trim()));
    }
  }, [selectedVaiTro]);

  useEffect(() => {
    if (selectedLoaiHinhKinhDoanh.size > 0) {
      const loaiHinhKinhDoanhArray = Array.from(selectedLoaiHinhKinhDoanh);
      setLoaiHinhKinhDoanh(loaiHinhKinhDoanhArray?.[0]);
    }
  }, [selectedLoaiHinhKinhDoanh]);

  const { data, refetch } = useQuery({
    queryKey: [
      ["user", currentPage],
      ["name", props],
    ],
    queryFn: () => fetchAllUser(props, currentPage),
    staleTime: 60 * 1000 * 1,
    keepPreviousData: true,
    onSuccess: () => {
      setIsLoaded(true);
    },
  });

  const onPageChange = (page) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setCurrentPage(page);
  };

  const handleDetailsClick = async (userId) => {
    try {
      setSelectedUser(null);
      setIsModalLoading(true);
      onOpen();
      const response = await fetchUserInfoById(userId);
      setSelectedUser(response);
      setHoTen(response?.name);
      setEmail(response?.email);
      setDienThoai(response?.phoneNumber);
      setDiaChi(response?.diaChi);
      setVaiTro(response?.role.split(",").map((role) => role.trim()));
      setMaSoDKKD(response?.maSoDKKD);
      setNoiCap(response?.noiCap);
      setNgayCap(response?.ngayCap);
      if (response?.loaiHinhKinhDoanh != null) {
        setLoaiHinhKinhDoanh(response?.loaiHinhKinhDoanh.toString());
      }
      setHoTenBTC(response?.hoTenOrganizer);
      setMaSoThueCaNhan(response?.maSoThueCaNhan);
      setHoTenDoanhNghiep(response?.tenDoanhNghiep);
      setIsModalLoading(false);
    } catch (error) {

    }
  };

  const onSubmit = async () => {
    setIsSubmitting(true);

    const userInfo = {
      id: selectedUser?.id,
      name: hoTen,
      phoneNumber: dienThoai,
      diaChi: diaChi,
      role: vaiTro.toString(),
      loaiHinhKinhDoanh: parseInt(loaiHinhKinhDoanh),
      hoTenOrganizer: hoTenBTC,
      maSoThueCaNhan: maSoThueCaNhan,
      tenDoanhNghiep: hoTenDoanhNghiep,
      maSoDKKD: maSoDKKD,
      noiCap: noiCap,
      ngayCap: ngayCap,
    };

    const success = await updateUserInfo(userInfo);
    if (success) {
      setIsSubmitting(true);
    }
  };

  const lockUser = async (userId) => {
    setIsSubmitting(true);

    const userInfo = {
      id: userId,
      trangThai: "khoa_tai_khoan",
    };

    const success = await updateUserInfo(userInfo);
    if (success) {
      setIsSubmitting(true);
      refetch();
    }
  };

  const unlockUser = async (userId) => {
    setIsSubmitting(true);

    const userInfo = {
      id: userId,
      trangThai: "dang_hoat_dong",
    };

    const success = await updateUserInfo(userInfo);
    if (success) {
      setIsSubmitting(true);
      refetch();
    }
  };

  const renderCell = React.useCallback(
    (user, columnKey) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
        case "name":
          return (
            <TableCell>
              <div className="flex flex-row items-center gap-3">
                <Image
                  src={user.avatar}
                  width="32px"
                  height="32px"
                  className="rounded-full hidden md:block"
                />
                {cellValue}
              </div>
            </TableCell>
          );
        case "createdAt":
          const formattedDate = convertUtcToGmtPlus7(cellValue);
          return <TableCell>{formattedDate}</TableCell>;
        case "role":
          return (
            <TableCell>
              {cellValue === "admin" ? (
                <span>Quản trị viên</span>
              ) : cellValue === "organizer" ? (
                <span>Nhà tổ chức</span>
              ) : (
                <span>Người dùng</span>
              )}
            </TableCell>
          );
        case "trangThai":
          return (
            <TableCell>
              <Chip
                color={statusColorMap[cellValue]}
                size="sm"
                variant="flat"
                className="p-3"
              >
                {cellValue === "dang_hoat_dong" ? (
                  <span>Đang hoạt động</span>
                ) : cellValue === "khoa_tai_khoan" ? (
                  <span>Khoá tài khoản</span>
                ) : (
                  <span>Không rõ</span>
                )}
              </Chip>
            </TableCell>
          );
        case "actions":
          return (
            <TableCell align="center">
              <div className="relative flex items-center gap-3">
                <Tooltip content="Sửa thông tin">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <CiEdit
                      className="w-6 h-6 text-blue-400"
                      onClick={() => handleDetailsClick(user.id)}
                    />
                  </span>
                </Tooltip>
                {user.trangThai === "khoa_tai_khoan" ? (
                  <Tooltip color="primary" content="Mở khoá người dùng">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <CiUnlock
                        className="w-6 h-6 text-emerald-400"
                        onClick={() => unlockUser(user.id)}
                      />
                    </span>
                  </Tooltip>
                ) : (
                  <Tooltip color="danger" content="Khoá người dùng">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <CiLock
                        className="w-6 h-6 text-red-400"
                        onClick={() => lockUser(user.id)}
                      />
                    </span>
                  </Tooltip>
                )}
              </div>
            </TableCell>
          );
        default:
          return <TableCell>{cellValue}</TableCell>;
      }
    },
    [handleDetailsClick]
  );

  const columns = [
    { name: "ID", uid: "id" },
    { name: "Email", uid: "email" },
    { name: "Họ và tên", uid: "name" },
    { name: "Ngày khởi tạo", uid: "createdAt" },
    { name: "Vai trò", uid: "role" },
    { name: "Trạng thái", uid: "trangThai" },
    { name: "Hành động", uid: "actions" },
  ];

  if (isLoaded === false) {
    return (
      <div className="w-full flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Table className="rounded-sm mt-4" aria-label="User table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={data?.data || []}
          emptyContent={"Người dùng tìm kiếm không tồn tại."}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => renderCell(item, columnKey)}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-center p-6">
        <Pagination
          showControls
          total={data?.totalPages}
          initialPage={1}
          onChange={(page) => {
            onPageChange(page);
          }}
          page={currentPage}
        />
      </div>
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={vaiTro.includes("organizer") ? "5xl" : "md"}
      >
        {isModalLoading ? (
          <ModalContent className="w-full flex h-screen pt-4 pb-4 items-center justify-center">
            <Loader />
          </ModalContent>
        ) : (
          <ModalContent className="p-3">
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Chi tiết người dùng
                </ModalHeader>
                <ModalBody>
                  {selectedUser && (
                    <div
                      className={
                        vaiTro.includes("organizer")
                          ? "grid grid-cols-2 gap-12"
                          : ""
                      }
                    >
                      {/* Single Column for User, Two Columns for Organizer */}
                      <div>
                        <div className="flex items-center justify-center mb-4">
                          <Image
                            src={selectedUser?.avatar}
                            width="120px"
                            height="120px"
                            className="rounded-full w-[120px] h-[120px]"
                          />
                        </div>

                        <div className="grid grid-cols gap-4">
                          <Input
                            variant="bordered"
                            label="Họ và tên"
                            labelPlacement="outside"
                            placeholder="Nhập họ và tên"
                            value={hoTen}
                            onChange={(e) => setHoTen(e.target.value)}
                          ></Input>
                          <Input
                            variant="bordered"
                            label="Email"
                            labelPlacement="outside"
                            placeholder="Nhập email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled
                          ></Input>
                          <Input
                            variant="bordered"
                            label="Điện thoại"
                            labelPlacement="outside"
                            placeholder="Nhập số điện thoại"
                            value={dienThoai}
                            onChange={(e) => setDienThoai(e.target.value)}
                          ></Input>
                          <Input
                            variant="bordered"
                            label="Địa chỉ"
                            labelPlacement="outside"
                            placeholder="Nhập địa chỉ"
                            value={diaChi}
                            onChange={(e) => setDiaChi(e.target.value)}
                          ></Input>
                          <Select
                            className="w-full mt-4"
                            label="Vai trò"
                            variant="bordered"
                            labelPlacement="outside"
                            selectedKeys={vaiTro}
                            onSelectionChange={setSelectedVaiTro}
                          >
                            {VaiTroMap?.map((role) => (
                              <SelectItem key={role.name} value={role.value}>
                                {role.value.toString()}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                      </div>

                      {/* Organizer Info (if role is "organizer") */}
                      {vaiTro.includes("organizer") && (
                        <div>
                          <Select
                            className="w-full"
                            label="Loại hình kinh doanh"
                            variant="bordered"
                            labelPlacement="outside"
                            selectedKeys={loaiHinhKinhDoanh.toString()}
                            onSelectionChange={setSelectedLoaiHinhKinhDoanh}
                          >
                            {LoaiHinhKinhDoanhMap?.map((loaiHinh) => (
                              <SelectItem
                                key={loaiHinh.name}
                                value={loaiHinh.value}
                              >
                                {loaiHinh.value.toString()}
                              </SelectItem>
                            ))}
                          </Select>
                          {loaiHinhKinhDoanh === "1" && (
                            <div className="grid grid-cols gap-4 mt-4">
                              <Input
                                variant="bordered"
                                label="Tên tổ chức"
                                labelPlacement="outside"
                                placeholder="Nhập tên tổ chức"
                                value={hoTenBTC}
                                onChange={(e) => setHoTenBTC(e.target.value)}
                              ></Input>
                              <Input
                                variant="bordered"
                                label="Mã số thuế cá nhân"
                                labelPlacement="outside"
                                placeholder="Nhập mã số thuế cá nhân"
                                value={maSoThueCaNhan}
                                onChange={(e) =>
                                  setMaSoThueCaNhan(e.target.value)
                                }
                              ></Input>
                            </div>
                          )}
                          {loaiHinhKinhDoanh === "2" && (
                            <div className="grid grid-cols gap-4 mt-4">
                              <Input
                                variant="bordered"
                                label="Tên doanh nghiệp"
                                labelPlacement="outside"
                                placeholder="Nhập tên doanh nghiệp"
                                value={hoTenDoanhNghiep}
                                onChange={(e) =>
                                  setHoTenDoanhNghiep(e.target.value)
                                }
                              ></Input>
                              <Input
                                variant="bordered"
                                label="Mã số đăng ký kinh doanh"
                                labelPlacement="outside"
                                placeholder="Nhập mã số đăng ký kinh doanh"
                                value={maSoDKKD}
                                onChange={(e) => setMaSoDKKD(e.target.value)}
                              ></Input>
                              <Input
                                variant="bordered"
                                label="Nơi cấp"
                                labelPlacement="outside"
                                placeholder="Nhập nơi cấp"
                                value={noiCap}
                                onChange={(e) => setNoiCap(e.target.value)}
                              ></Input>
                              <Input
                                isInvalid={ngayCap !== "" ? false : true}
                                errorMessage={`${
                                  ngayCap !== "" ? "" : "Vui lòng chọn ngày cấp"
                                }`}
                                type="date"
                                variant="bordered"
                                label="Ngày cấp"
                                labelPlacement="outside"
                                placeholder="Chọn ngày cấp"
                                radius="sm"
                                className="max-w-xs lg:max-w-2xl h-[52px]"
                                value={ngayCap}
                                onChange={(e) => {
                                  setNgayCap(e.target.value);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}
                      <Button
                        className={`w-full col-span-full bg-[#3BE1AA] text-black hover:bg-[#2DD196] transition ease-in-out hover:scale-105 active:scale-[0.96] mt-0`}
                        disabled={isSubmitting}
                        onClick={() => {
                          onSubmit();
                        }}
                      >
                        Xác nhận
                      </Button>
                    </div>
                  )}
                </ModalBody>
              </>
            )}
          </ModalContent>
        )}
      </Modal>
    </div>
  );
}
