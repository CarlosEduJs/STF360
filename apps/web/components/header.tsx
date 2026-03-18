"use client"

import Link from "next/link"
import Logo from "./logo"
import { HugeiconsIcon } from "@hugeicons/react"
import { Github, LookTopIcon } from "@hugeicons/core-free-icons"

export default function Header() {
    return (
        <header className="flex items-center justify-between padding-base-x padding-base-y">
            <Logo />
            <nav className="flex items-center gap-8">
                <Link href={"/sobre"} className="flex items-center gap-2 text-sm ">
                    <HugeiconsIcon icon={LookTopIcon} size={16} strokeWidth={2} />
                    Sobre
                </Link>
                <Link href={"https://github.com/carlosedujs/stf360"} className="flex items-center gap-2 text-sm ">
                    <HugeiconsIcon icon={Github} size={16} strokeWidth={2} />
                    Github
                </Link>
            </nav>
        </header>
    )
}