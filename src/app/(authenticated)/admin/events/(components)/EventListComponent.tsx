"use client";

import React, { useEffect } from "react";
import { useState } from "react";
// import { RealEstateCard } from './RealEstateCard';
// import { useBaiVietDoiTac } from '@/hooks/useBaiVietDoiTac';
import { useQuery } from "@tanstack/react-query";
// import { useBatDongSan } from "@/hooks/useBatDongSan";
// import { searchType } from './RealEstateListLayout';
import { Pagination } from "@nextui-org/react";
import Loader from "@/components/Loader";
import EventListItemComponent from "./EventListItemComponent";
import { useEventOrganizer } from "@/hooks/useEventOrganizer";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
} from "@nextui-org/react";
import Image from "next/image";
import { TrangThaiSuKienMap } from "@/lib/constant";
import { useAdmin } from "@/hooks/useAdmin";
import toast from "react-hot-toast";
import { main_color } from "../../../../../../public/color";

function EventListComponent({ props }) {
  const userId = 1;
  const [currentPage, setCurrentPage] = useState(1);
  const { fetchEventOfOrganizer } = useEventOrganizer();
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [selectedItem, setSelectedItem] = React.useState();
  let [trangThai, setTrangThai] = React.useState("");

  const { updateEvent } = useAdmin();

  const [selectedTrangThai, setSelectedTrangThai] = React.useState(new Set([]));

  const { data, refetch } = useQuery({
    queryKey: [
      ["event", currentPage],
      ["name", props],
    ],
    queryFn: () => fetchEventOfOrganizer(props, currentPage, userId),
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (selectedTrangThai.size > 0) {
      const trangThaiArray = Array.from(selectedTrangThai);

      setTrangThai(
        trangThaiArray?.[0].split(",").map((trangThai) => trangThai.trim())
      );
    }
  }, [selectedTrangThai]);

  const updateTrangThai = async () => {
    const data = {
      trangThai: trangThai.toString(),
    };

    const res = await updateEvent(data, selectedItem?.id);
    if (res) {
      toast.success("Cập nhật trạng thái thành công");
    } else {
      toast.error("Cập nhật trạng thái thất bại");
    }
    refetch();
  };

  return (
    <div>
      {!isLoaded ? (
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Chỉnh sửa trạng thái sự kiện
                  </ModalHeader>
                  <ModalBody>
                    <div className="grid grid-cols-1 gap-6">
                      <Image
                        src={selectedItem?.hinhAnhSuKien}
                        alt="Picture of the author"
                        width={500}
                        height={500}
                      />
                      <p className="font-bold text-lg">{selectedItem?.name}</p>
                      <Select
                        items={TrangThaiSuKienMap}
                        label="Trạng thái"
                        variant="bordered"
                        placeholder="Lựa chọn trạng thái"
                        className="w-full !box-border shadow"
                        selectedKeys={trangThai}
                        onSelectionChange={setSelectedTrangThai}
                      >
                        {(trangThai) => (
                          <SelectItem key={trangThai.value}>
                            {trangThai.value}
                          </SelectItem>
                        )}
                      </Select>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="light"
                      radius="sm"
                      onPress={onClose}
                    >
                      Đóng
                    </Button>
                    <Button
                      className={`font-semibold bg-emerald-400 hover:bg-emerald-500 text-white`}
                      onClick={() => {
                        updateTrangThai();
                      }}
                      onPress={onClose}
                    >
                      Cập nhật
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          <div className="mr-6 mt-4 bg-slate-50">
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mt-6">
              {data?.data.map((item) => (
                <EventListItemComponent
                  item={item}
                  key={`event-${item.id}`}
                  onOpen={onOpen}
                  setSelectedItem={setSelectedItem}
                  setTrangThai={setTrangThai}
                />
              ))}
            </div>
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
          </div>
        </>
      )}
    </div>
  );
}

export default EventListComponent;
