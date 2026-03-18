import { Geist, Geist_Mono, Inter, Urbanist, Libre_Franklin, JetBrains_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils"

import Header from "@/components/header"
import Footer from "@/components/footer"

const jetbrainsMono = JetBrains_Mono({subsets:['greek','cyrillic','cyrillic-ext','latin','latin-ext','vietnamese'],weight:['100','200','300','400','500','600','700','800'],variable:'--font-jetbrains-mono'});

const libreFranklin = Libre_Franklin({subsets:['vietnamese','cyrillic','cyrillic-ext','latin','latin-ext','vietnamese'],weight:['100','200','300','400','500','600','700','800','900'],variable:'--font-libre-franklin'});

const urbanist = Urbanist({subsets:['latin','latin-ext'],weight:['100','200','300','400','500','600','700','800','900'],variable:'--font-urbanist'});

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-br"
      suppressHydrationWarning
      className={cn(
              "antialiased",
              fontMono.variable,
              inter.variable
            , "font-urbanist", "font-libre-franklin", "font-jetbrains-mono", urbanist.variable, libreFranklin.variable, jetbrainsMono.variable)}
    >
      <body>
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
