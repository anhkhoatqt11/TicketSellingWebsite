'use client';

import React, { useState } from 'react'
import { QrReader } from 'react-qr-reader'


const QrScanner = () => {

    const [data, setData] = useState("No result");


    return (
        <div>
            <QrReader
                onResult={(result, error) => {
                    if (!!result) {
                        setData(result?.text);
                    }

                    if (!!error) {
                        console.info(error);
                    }

                }
                }
                //this is facing mode : "environment " it will open backcamera of the smartphone and if not found will 
                // open the front camera
                constraints={{ facingMode: "environment" }}
            />
            <p>{data}</p>
        </div>
    )
}

export default QrScanner