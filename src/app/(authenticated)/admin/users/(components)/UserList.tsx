'use client';

import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Image, Input, Select, SelectItem } from "@nextui-org/react";
import { EditIcon, DeleteIcon, EyeIcon } from "lucide-react";
import { useAdmin } from '@/hooks/useAdmin';
import { useQuery } from '@tanstack/react-query';
import Loader from "@/components/Loader";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useUser } from '@/hooks/useUser';
import { Pagination } from "@nextui-org/react";
import { VaiTroMap } from '@/lib/constant';

const statusColorMap = {
    dang_hoat_dong: "success",
    khoa_tai_khoan: "danger",
    vacation: "warning",
};


function convertUtcToGmtPlus7(utcString) {
    const utcDate = new Date(utcString);
    const gmtPlus7Offset = 7 * 60;
    const localDate = new Date(utcDate.getTime() + gmtPlus7Offset * 60 * 1000);
    const formattedDate = localDate.toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');
    return formattedDate;
}

export default function UserList({ props }) {
    const [currentPage, setCurrentPage] = React.useState(1);
    const { fetchAllUser } = useAdmin();
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [isModalLoading, setIsModalLoading] = React.useState(true); // State to track if modal is loading or not
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedUser, setSelectedUser] = React.useState(null); // State to store selected user information
    const { fetchUserInfoById } = useUser(); // Destructure the fetchUserInfoById function

    const { data } = useQuery({
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
            setIsModalLoading(false); 
            console.log(selectedUser.role);
        } catch (error) {
            console.error('Error fetching user information:', error);
        }
    };


    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <TableCell>
                        <div className='flex flex-row items-center gap-3'><Image
                            src={user.avatar}
                            width="32px"
                            height="32px"
                            className="rounded-full" />
                            {cellValue}
                        </div>
                    </TableCell>
                );
            case "createdAt":
                const formattedDate = convertUtcToGmtPlus7(cellValue);
                return (
                    <TableCell>
                        {formattedDate}
                    </TableCell>
                );
            case "role":
                return (
                    <TableCell>
                        {cellValue === "admin" ? <span>Quản trị viên</span> : cellValue === "organizer" ? <span>Nhà tổ chức</span> : <span>Người dùng</span>}
                    </TableCell>
                );
            case "trangThai":
                return (
                    <TableCell>
                        <Chip color={statusColorMap[cellValue]} size="sm" variant="flat">
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
                        <div className="relative flex items-center gap-2">
                            <Tooltip content="Details">
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                    <EyeIcon onClick={() => handleDetailsClick(user.id)} />
                                </span>
                            </Tooltip>
                            <Tooltip content="Edit user">
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                    <EditIcon />
                                </span>
                            </Tooltip>
                            <Tooltip color="danger" content="Delete user">
                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                    <DeleteIcon />
                                </span>
                            </Tooltip>
                        </div>
                    </TableCell>
                );
            default:
                return <TableCell>{cellValue}</TableCell>;
        }
    }, [handleDetailsClick]);




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
        )
    }

    return (
        <div>
            <Table className='rounded-sm mt-4' aria-label="User table">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={data?.data || []}>
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
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                {isModalLoading ? (
                    <ModalContent className="w-full flex h-screen items-center justify-center">
                        <Loader />
                    </ModalContent>
                ) : (
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Chi tiết người dùng</ModalHeader>
                                <ModalBody>
                                    {/* Display user information in the modal */}
                                    {selectedUser && (
                                        <div>
                                            <div className="flex items-center justify-center mb-4">
                                                <Image src={selectedUser.avatar} width="120px" height="120px" className="rounded-full" />
                                            </div>

                                            <div className='grid grid-cols gap-4'>
                                                <Input variant='bordered' label='Họ và tên' labelPlacement='outside' placeholder='Nhập họ và tên' value={selectedUser?.name}></Input>
                                                <Input variant='bordered' label='Email' labelPlacement='outside' placeholder='Nhập email' value={selectedUser?.email} disabled></Input>
                                                <Input variant='bordered' label='Điện thoại' labelPlacement='outside' placeholder='Nhập số điện thoại' value={selectedUser?.phoneNumber}></Input>
                                                <Input variant='bordered' label='Địa chỉ' labelPlacement='outside' placeholder='Nhập địa chỉ' value={selectedUser.diaChi}></Input>
                                                <Select
                                                    className='w-full mt-4'
                                                    label='Vai trò'
                                                    variant='bordered'
                                                    labelPlacement='outside'
                                                    selectedKeys={selectedUser.role.toString()}>
                                                    {VaiTroMap?.map((role) => (
                                                        <SelectItem key={role.name} value={role.value}>{role.value.toString()}</SelectItem>
                                                    ))}
                                                </Select>
                                            </div>
                                        </div>
                                    )}
                                </ModalBody>
                                {/* ... other modal code */}
                            </>
                        )}
                    </ModalContent>
                )}
            </Modal>

        </div>
    );
}
