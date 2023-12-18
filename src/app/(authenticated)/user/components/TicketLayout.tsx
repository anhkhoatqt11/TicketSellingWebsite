"use client";
import { useTicket } from "@/hooks/useUserTicket";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import TicketItem from "./TicketItem";
import Loader from "@/components/Loader";
import { Card, CardHeader, CardBody, Image, Divider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import QRCode from "react-qr-code";

interface Props {
  id: number;
}
const TicketLayout = ({ id }: Props) => {
  const [isLoaded, setIsLoaded] = React.useState(true);
  const { fetchTicketById } = useTicket();
  const { data } = useQuery({
    queryKey: ["ticket"],
    queryFn: () => {
      const res = fetchTicketById(id);
      return res;
    },
    onSuccess: () => {
      setIsLoaded(true);
    },
  });
  const [displayedTickets, setDisplayedTickets] = useState(2);
  const [selectedMaDatCho, setSelectedMaDatCho] = useState();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();


  const handleShowMore = () => {
    setDisplayedTickets((prev) => prev + 2);
  };
  return (
    <div>
      {!isLoaded ? (
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex flex-col p-4">
            <h1 className="text-2xl font-extrabold">Vé đã đặt</h1>
            {data &&
              data
                .slice(0, displayedTickets)
                .map((ticket, index) => (
                  <TicketItem key={index} ticketItem={ticket} onOpen={onOpen} setSelectedMaDatCho={setSelectedMaDatCho} />
                ))}
            {data && data.length > displayedTickets && (
              <div className="mt-3 flex justify-center">
                <button
                  className="btn w-[200px] text-white rounded-full bg-blue-700 hover:bg-blue-800"
                  onClick={handleShowMore}
                >
                  Hiển thị thêm
                </button>
              </div>
            )}
          </div>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Mã QR sự kiện</ModalHeader>
                  <ModalBody>
                    <QRCode size={256}
                      className="mb-4"
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                      value={selectedMaDatCho.toString()}
                      viewBox={`0 0 256 256`} />
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </div>
  );
};

export default TicketLayout;
