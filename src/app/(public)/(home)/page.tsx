'use client';

import React from 'react'
import ButtonTest from './component/ButtonTest';
import { Button } from '@/components/ui/button';
import DialogCustom from '@/components/ui/dialogCustom';

const page = () => {

    const [openPreview, setOpenPreview] = React.useState(false);

    return (
        <div>
            <Button
                className="rounded-full text-slate-50 bg-black w-[42px] h-[42px] text-[24px] p-0 hover:bg-black transition ease-in-out duration-200 hover:scale-[1.2]"
                onClick={() => {
                    setOpenPreview(true);
                }}>

            </Button>
            {openPreview ? (
                <DialogCustom className="w-full lg:w-[80%] h-[80%] lg:h-[95%] flex items-center justify-center"
                    setIsModalOpen={setOpenPreview}
                    isModalOpen={openPreview}
                    warningOnClose={true}>
                  
                </DialogCustom>
            ) : null}
        </div >
    )
}

export default page