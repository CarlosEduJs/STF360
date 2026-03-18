"use client"

import Logo from "./logo"

export default function Footer() {
    return (
        <footer className="flex flex-col gap-6 justify-center padding-base-x padding-base-y">
            <Logo />
            <div className="grid grid-cols-2 gap-2">
                <span className="text-xs font-medium">
                    Dados oficiais do STF
                </span>
                <span className="text-xs font-medium">
                    Noticias via Google News
                </span>
                <span className="text-xs font-medium">
                    Nenhuma Filiação com o STF ou partidos políticos
                </span>
                <span className="text-xs font-medium">
                    Projeto Open Source - Licença MIT
                </span>
            </div>
            <p className="text-xs text-muted-foreground font-semibold">© {new Date().getFullYear()} STF360. Todos os direitos reservados.</p>
        </footer>
    )
}