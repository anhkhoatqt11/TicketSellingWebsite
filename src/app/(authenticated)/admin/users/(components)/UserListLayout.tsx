'use client';

import React, { useState } from "react";
import UserList from './UserList';
import UserListSearch from "./UserListSearch";

export function UserListLayout() {
    const [searchWord, setSearchWord] = useState("");

    return (
        <div>
            <UserListSearch setSearchWord={setSearchWord} />
            <UserList props={searchWord} />
        </div>
    )
}

