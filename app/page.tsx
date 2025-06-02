import type { Metadata } from "next/types"
import ClientPage from "./clientpage"
import { Inter } from "next/font/google"

export const metadata: Metadata = {
  title: "Aqua Advantage - Pool & Spa Services in Burley, ID",
  description: "Expert pool maintenance, equipment repair, and premium hot tub sales. We keep your aquatic investment crystal clear and running smoothly year-round.",
}

const inter = Inter({ subsets: ["latin"] })

export default function HomePage() {
  return <ClientPage />
}
