import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/Select";
import { Button } from "./ui/button";

const PartidaFormModal = ({
    open,
    onOpenChange,
    form,
    setForm,
    onSave,
    onCancel,
    disableSave
}) => {



    return (
        <Dialog open={open} onOpenChange={onOpenChange} >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nueva Partida</DialogTitle>
                    <DialogDescription>Descripción de la partida</DialogDescription>
                </DialogHeader>

                {/* INPUT Jugador */}
                <div className="grid gap-4">
                    <Label htmlFor="jugador">Jugador</Label>
                    <Input
                        id="jugador"
                        type="text"
                        placeholder="Jugador"
                        value={form.jugador}
                        onChange={e => setForm((prev) => ({ ...prev, jugador: e.target.value }))}
                    ></Input>

                </div>
                {/* INPUT JUEGO */}
                <div className="grid gap-6">
                    <Label htmlFor="juego" >Juego</Label>
                    <Input
                        id="juego"
                        type="text"
                        placeholder="Mictlán Runner"
                        value={form.juego}
                        onChange={e => setForm((prev) => ({ ...prev, juego: e.target.value }))}
                    />
                </div>

                {/* INPUT Nivel */}
                <div className="grid gap-6">
                    <Label htmlFor="nivel">Nivel</Label>
                    <Select id="nivel" value={form.nivel} onValueChange={(nivelSeleccionado) => setForm((prev) => ({ ...prev, nivel: nivelSeleccionado }))}  >
                        <SelectTrigger>
                            <SelectValue placeholder="Nivel" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Fácil">Fácil</SelectItem>
                                <SelectItem value="Medio">Medio</SelectItem>
                                <SelectItem value="Difícil">Difícil</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* INPUT Fecha */}
                <div className="grid gap-6">
                    <Label htmlFor="fecha">Fecha</Label>
                    <Input
                        id="fecha"
                        type="date"
                        value={form.fecha}
                        placeholder="Fecha de la Partida"
                        onChange={e => setForm((prev) => ({ ...prev, fecha: e.target.value }))}
                    >
                    </Input>
                </div>

                {/* INPUT Puntaje */}
                <div className="grid gap-4">
                    <Label htmlFor="puntaje" >Puntaje</Label>
                    <Input id="puntaje" placeholder="ej. 3000" value={form.puntaje} onChange={e => setForm((prev) => ({ ...prev, puntaje: Number(e.target.value) }))}  >
                    </Input>
                </div>

                {/* Botón  Guardar Partida */}
                <div className="flex gap-4 ">
                    <Button className="bg-green-500 w-[200px]" onClick={onSave} disabled={disableSave} >Guardar</Button>
                    <Button className="bg-red-500 w-[200px]" onClick={onCancel} >Cancelar</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}


export default PartidaFormModal;