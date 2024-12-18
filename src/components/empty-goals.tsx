import logo from "../assets/logo-in-task.png";
import letsStart from "../assets/illustration_lets-start.png";

import { Plus } from "lucide-react";
import { DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";

export function EmptyGoals() {
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-8">
            <img src={logo} alt="in.task" />
            <img src={letsStart} alt="in.task" />
            <p className="text-zinc-300 leading-relaxed max-w-80 text-center">Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?</p>

            <DialogTrigger asChild>
                <Button>
                    <Plus className="size-4" />
                    Cadastrar meta
                </Button>
            </DialogTrigger>
            <footer className="flex items-center justify-center mt-auto text-xs pb-32">
                <span>Desenvolvido por <a href="https://github.com/HenriqueYuleZ" target='_blank' className="font-bold hover:text-blue-600" rel="noreferrer">Henrique YZ</a></span>
            </footer>
        </div>
    )
}