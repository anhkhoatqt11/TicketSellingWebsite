'use client';

import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import BannerItem from './BannerItem';
import { useQuery } from '@tanstack/react-query';
import { useAdmin } from '@/hooks/useAdmin';
import toast from 'react-hot-toast';
import AddBannerModal from './AddBannerModal';
import Loader from '@/components/Loader';

const BannerDnD = () => {
  const [banners, setBanners] = React.useState([]);
  const { fetchAllBanner, updateBanner } = useAdmin();
  const [isLoading, setIsLoading] = React.useState(true);

  const { data, refetch } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await fetchAllBanner();
      setBanners(res.slice().sort((a, b) => a.position - b.position));
      setIsLoading(false);
      return res;
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  if (isLoading === true){
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <>
    <AddBannerModal refetch={refetch} banners={banners}/> 
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={banners} strategy={verticalListSortingStrategy}>
        {banners.map((banner) => (
          <BannerItem key={banner.id} banner={banner} refetch={refetch} />
        ))}
      </SortableContext>
    </DndContext>
    </>
  );

  async function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = banners.findIndex((banner) => banner.id === active.id);
      const newIndex = banners.findIndex((banner) => banner.id === over.id);

      const updatedBanners = arrayMove(banners, oldIndex, newIndex);
      setBanners(updatedBanners);
      await updateBannerPositions(updatedBanners);
    }
  }

  async function updateBannerPositions(updatedBanners) {
    const updatePromises = updatedBanners.map((banner, index) => {
      return updateBanner(banner.id, { position: index + 1 });

    });

    await Promise.all(updatePromises);

    refetch();
    toast.success('Cập nhật Banners thành công');
  }
};

export default BannerDnD;