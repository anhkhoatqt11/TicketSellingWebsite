"use client";

import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Table,
  TableRow,
  TableCell,
  TableColumn,
  TableHeader,
  TableBody,
  Checkbox,
} from "@nextui-org/react";
import { PlusCircle, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAdmin } from "@/hooks/useAdmin";
import toast from "react-hot-toast";
import { main_color } from "../../../../../../public/color";

const AddBannerModal = ({ refetch, banners }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { fetchEventOfOrganizerForBanner, addBanner } = useAdmin();
  const [searchWord, setSearchWord] = React.useState("");
  const [searchKey, setSearchKey] = React.useState("");

  const { data } = useQuery({
    queryKey: [["name", searchWord]],
    queryFn: () => fetchEventOfOrganizerForBanner(searchWord),
    staleTime: 60 * 1000 * 1,
    keepPreviousData: true,
    onSuccess: () => {},
  });

  // Extract suKienId values from the banners array
  const bannerSuKienIds = banners.map((banner) => banner.suKien.id);

  const filteredData = data
    ? data.filter((item) => {
        // console.log("item", item);
        return item && !bannerSuKienIds.includes(item.id);
      })
    : [];
  // console.log(bannerSuKienIds);
  // console.log("filteredData", filteredData);

  try {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") searchSubmit();
    });
  } catch (except) {}

  const searchSubmit = () => {
    setSearchWord(searchKey);
  };

  const columns = [
    { name: "Tên sự kiện", uid: "name" },
    { name: "Địa chỉ", uid: "diaChi" },
    { name: "Ngày bắt đầu", uid: "ngayBatDau" },
    { name: "Ngày kết thúc", uid: "ngayKetThuc" },
    { name: "Thêm sự kiện", uid: "addEvent" },
  ];

  const handleAddBanner = async (suKienId) => {
    const postion = bannerSuKienIds.length + 1;

    const data = {
      position: postion,
    };

    console.log(data);

    const res = await addBanner(data, suKienId);
    if (res) {
      toast.success("Thêm Banner thành công");
      refetch();
    }
  };

  const renderCell = React.useCallback((event, columnKey) => {
    const cellValue = event[columnKey];

    switch (columnKey) {
      case "addEvent":
        return (
          <TableCell>
            <Button
              className="bg-transparent hover:rotate-90 hover:scale-[1.26] transition ease-in-out rounded-full"
              onClick={() => {
                handleAddBanner(event.id);
              }}
            >
              <PlusCircle className={`w-6 h-6 text-[#2DD196]`} />
            </Button>
          </TableCell>
        );
      default:
        return <TableCell>{cellValue}</TableCell>;
    }
  }, []);

  return (
    <>
      <Button
        onPress={() => {
          onOpen();
          setSearchWord("");
        }}
        className={`mb-10 bg-transparent border-1 border-[#2DD196] text-[#2DD196] hover:bg-[#2DD196] hover:text-white hover:scale-105 transition ease-in-out shadow rounded-sm`}
      >
        Thêm banner mới
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"4xl"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Thêm banner mới
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  placeholder="Nhập tên sự kiện"
                  onChange={(e) => setSearchKey(e.target.value)}
                  startContent={
                    <Search className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                />
                <Table
                  className="rounded-sm mt-1"
                  aria-label="User table"
                  classNames={{
                    base: "max-h-[520px] overflow-scroll overflow-x-hidden overflow-y-hidden",
                    table: "min-h-[400px]",
                  }}
                >
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
                    items={filteredData || []}
                    emptyContent={"Sự kiện tìm kiếm không tồn tại."}
                  >
                    {(item) => (
                      <TableRow key={item.id}>
                        {(columnKey) => renderCell(item, columnKey)}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddBannerModal;
