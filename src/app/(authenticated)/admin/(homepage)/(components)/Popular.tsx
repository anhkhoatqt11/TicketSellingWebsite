import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useCategory } from '@/hooks/useCategory';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Popular() {
    const { fetchAllCategories } = useCategory();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetchAllCategories();
            setCategories(res);
        };

        fetchData();
    }, []);

    const data = {
        labels: categories.map(category => category.name),
        datasets: [{
            data: categories.map(category => category.suKienCount),
            backgroundColor: [
                '#f43f5e',
                '#8b5cf6',
                '#3b82f6',
                '#06b6d4',
                '#22c55e',
                '#f97316',
                '#737373',
                '#64748b'
                // Add more colors as needed
            ],
            // hoverBackgroundColor: [
            //     '#FF6384',
            //     '#36A2EB',
            //     '#FFCE56',
            //     // Add more colors as needed
            // ]
        }]
    };

    const options = {
        plugins: {
            legend: {
                position: 'bottom',
                align: 'start',
            },
        },
    };

    return (
        <div className='block ml-auto relative w-full md:w-[270px]'>
            <Card
                isFooterBlurred
                radius="lg"
                className="border-none w-full h-[350px] mt-10 md:mt-0 md:w-[270px] overflow-hidden">
                <CardHeader>
                    <p className="font-bold text-xl">Chủ đề nổi bật</p>
                </CardHeader>
                <CardBody className="p-5 justify-center items-center">
                    <Pie className='overflow-hidden' data={data} options={options}/>
                </CardBody>
            </Card>
        </div>
    );
}
