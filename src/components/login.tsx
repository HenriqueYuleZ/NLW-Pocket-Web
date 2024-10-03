import logo from "../assets/logo-in-task.png";

import { DoorOpenIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function Login() {

    function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            username: formData.get('username'),
            password: formData.get('password')
        };
        console.log(data);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            username: formData.get('username'),
            password: formData.get('password')
        };
        console.log(data);
    };

    return (
        <div>
            <div className="pt-5 flex flex-col items-center">
                <img src={logo} alt="in.task" />
            </div>
            <div className="flex xl:flex-row justify-center gap-16 flex-col xl:pt-40 pt-20">
                <form onSubmit={handleLogin}>
                    <div className="flex flex-col items-center justify-center gap-8">
                        <h1 className="text-4xl font-bold">Login</h1>
                        <p className="text-zinc-300 leading-relaxed max-w-100 text-center">Faça login para começar a cadastrar suas metas.</p>
                        <div className="flex flex-col leading-relaxed sm:w-full max-w-md">
                            <Label className="text-xl pb-2 text-center">Nome de usuário</Label>
                            <Input className="w-full px-4" type="text" name="username" placeholder="nome de usuário..." />
                            <Label className="text-xl pt-4 pb-2 text-center">Senha</Label>
                            <Input className="w-full" type="password" name="password" placeholder="senha..." />
                        </div>
                        <Button>
                            <DoorOpenIcon className="size-4" />
                            Login
                        </Button>
                    </div>
                </form>
                <div className="flex items-center xl:hidden">
                    <div className="border-t border-gray-300 w-full my-8 mx-8">
                    </div>
                </div>
                <div className="hidden xl:flex items-center">
                    <div className="border-l border-gray-300 h-full mx-8">
                    </div>
                </div>
                <form className="flex flex-col items-center justify-center gap-8 pb-8" onSubmit={handleSubmit}>
                    <h1 className="text-4xl font-bold">Cadastro</h1>
                    <p className="text-zinc-300 leading-relaxed max-w-100 text-center">Cadastre-se para começar a usar o in.task.</p>
                    <div className="flex flex-col leading-relaxed sm:w-full max-w-md">
                        <Label className="text-xl pb-2 text-center">Nome de usuário</Label>
                        <Input className="w-full px-4" type="text" name="username" placeholder="nome de usuário..." />
                        <Label className="text-xl pt-4 pb-2 text-center">Senha</Label>
                        <Input className="w-full" type="password" name="password" placeholder="senha..." />
                    </div>
                    <Button className="bg-blue-500" type="submit">
                        <DoorOpenIcon className="size-4" />
                        Cadastrar
                    </Button>
                </form>
            </div>
        </div>
    )
}