'use client';


import React from 'react'
import { Card, Button, Progress, CardBody, CardHeader } from "@nextui-org/react";

const Popular = () => {
    return (
        <div className='mr-auto'>
            <Card
                isFooterBlurred
                radius="lg"
                className="border-none w-full h-[350px] md:w-[270px]">
                <CardHeader>
                    <p className="font-bold text-xl">Chủ đề nổi bật</p>
                </CardHeader>
                <CardBody className="p-5">
                </CardBody>
            </Card>
        </div>
    )
}

export default Popular