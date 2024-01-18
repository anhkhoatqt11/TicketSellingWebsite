import React from "react";
import { UserListLayout } from "./(components)/UserListLayout";


export default async function page() {
    return (
        <div className="p-4">
            <UserListLayout />
        </div>
    )
}

