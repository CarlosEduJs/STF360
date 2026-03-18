import MinistersCards from "@/components/ministers-cards";

export default function Page() {
  return (
    <div className="flex flex-col min-h-svh gap-12 padding-base-x padding-base-y">
      <div className="flex flex-col gap-4 w-full justify-center">
        <h1 className="text-4xl font-semibold">Sua visão 360 do STF</h1>
        <p className="text-lg font-medium">Acompanhe o Supremo Tribunal Federal em tempo real. Decisões e noticias mais recentes e com fontes.</p>
      </div>
      <MinistersCards />
    </div>
  )
}
