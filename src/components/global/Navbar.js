import { Link } from "gatsby"
import * as React from "react"

export default function Navbar() {
    return (
        <header className="flex justify-between align-middle items-center container mx-auto bg-red-500 p-7">
            <Link to="/">
                <h1 className="text-lg font-bold">Logo</h1>
            </Link>

            <ul className="hidden md:flex flex-row gap-7">
                <li>
                    <Link>Home</Link>
                </li>
                <li>
                    <Link>Home</Link>
                </li>
                <li>
                    <Link>Home</Link>
                </li>
            </ul>
        </header>
    )
}