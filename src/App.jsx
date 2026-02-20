import { Button } from "@/components/ui/button"
import PartidasPage from "@/components/PartidasPage"
export default function App() {
  return (
    <div className="min-h-screen relative bg-zinc-950 text-zinc-100">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/fondo.png')" }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="flex items-center justify-between gap-8">
        <PartidasPage></PartidasPage>
      </div>
    </div>
  )
}

