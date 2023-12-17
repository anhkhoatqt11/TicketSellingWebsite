import React from "react";
import UserList from "./(components)/UserList";
import UserItemCard from "./(components)/UserItemCard";
import { UserListLayout } from "./(components)/UserListLayout";




export default async function page() {
    return (
        <div className="p-4">
            <UserListLayout />
        </div>
    )
}

