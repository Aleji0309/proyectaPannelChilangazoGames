import { Button } from "@/components/ui/button"

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
      <div className="relative z-10 max-w-4xl mx-auto p-8">
        <div className="flex items-center justify-between gap-8">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">Chilangazo Games</h1>
            <p className="text-zinc-300">Presenta</p>
          </div>

          <Button>Nueva Partida</Button>
        </div>
      </div>
    </div>
  )
}

