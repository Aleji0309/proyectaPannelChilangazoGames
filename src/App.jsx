import { Button } from "@/components/ui/button"
export default function App() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <div className="bg-red-500 max-w-4xl mx-auto p-8">
        <div className="header flex gap-8 justify-between">
          <div className="header-content flex flex-col">
            <h1 className="text-3xl font-bold">Chilangazo Games</h1>
            <p>Presenta</p>
          </div>
          <Button>Nueva Partida</Button>
        </div>
      </div>
    </div>

  )
}
