import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import { useAdmin } from '@/hooks/useAdmin';
import toast from 'react-hot-toast';

const BannerItem = ({ banner, refetch }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: banner.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const {deletedBanner} = useAdmin();

    const Delete = async () => {
        await deletedBanner(banner.id);
        refetch();
        toast.success('Xoá banner thành công');
    }


    return (
        <Card {...attributes} {...listeners} ref={setNodeRef}  isFooterBlurred radius='sm' className='border-none mb-10' style={style}>
            <Image
                alt='Example Image'
                src={banner.suKien.hinhAnhSuKien}
                style={{
                    objectFit: 'cover',
                }}
                width={1920}
                height={360}
            />

            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white/80">{banner.position}. {banner.suKien.name}</p>
                <Button onClick={() => Delete()} className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                    Xoá
                </Button>
            </CardFooter>
        </Card>
    );
};

export default BannerItem;