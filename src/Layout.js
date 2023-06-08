import React from "react"
import { Outlet } from "react-router-dom"

import Links from "./components/Links"
import Login from "./components/Login"

export default function Layout() {
    return (
        <>
        <Login/>
            <Links />
           <Outlet />
        </>
    )
}