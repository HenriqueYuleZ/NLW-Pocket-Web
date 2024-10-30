import React, { useState } from 'react';
import logo from "../assets/logo-in-task.png";
import { DoorOpenIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLogin, userRegister } from "../http/login";
import { useQueryClient } from '@tanstack/react-query';

const loginForm = z.object({
    username: z.string().min(1, 'Informe o nome de usuário'),
    password: z.string().min(1, 'Informe a senha'),
})
const registerForm = z.object({
    usernameRegister: z.string().min(1, 'Informe o nome de usuário'),
    passwordRegister: z.string().min(1, 'Informe a senha'),
})

type LoginForm = z.infer<typeof loginForm>;
type RegisterForm = z.infer<typeof registerForm>;

interface LoginProps {
    onLoginSuccess: () => void;
}

export function Login({ onLoginSuccess }: LoginProps) {
    const queryClient = useQueryClient()

    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertRegister, setAlertRegister] = useState<string | null>(null);

    const { register, handleSubmit, formState, reset } = useForm<LoginForm>({
        resolver: zodResolver(loginForm)
    })

    const { register: registerRegister, handleSubmit: handleSubmitRegister, formState: formStateRegister } = useForm<RegisterForm>({
        resolver: zodResolver(registerForm)
    })

    async function handleLogin(data: LoginForm) {
        try {
            const response = await userLogin({
                username: data.username,
                password: data.password,
            });

            if (response) {
                onLoginSuccess();
            }
        } catch (error) {
            setAlertMessage((error as Error).message || "Erro ao tentar fazer login. Tente novamente mais tarde.");
        }

        queryClient.invalidateQueries({ queryKey: ['summary'] })
        queryClient.invalidateQueries({ queryKey: ['pending-goals'] })

        reset();
    }

    async function handleRegister(data: RegisterForm) {
        try {
            const response = await userRegister({
                username: data.usernameRegister,
                password: data.passwordRegister,
            });

            if (response) {
                handleLogin({ username: data.usernameRegister, password: data.passwordRegister });
                onLoginSuccess();
            }
        } catch (error) {
            setAlertRegister((error as Error).message || "Erro ao tentar cadastrar usuário. Tente novamente mais tarde.");
        }

        queryClient.invalidateQueries({ queryKey: ['summary'] })
        queryClient.invalidateQueries({ queryKey: ['pending-goals'] })

        reset();
    }

    return (
        <div>
            <div className="pt-5 flex flex-col items-center">
                <img src={logo} alt="in.task" />
            </div>
            <div className="flex xl:flex-row justify-center gap-16 flex-col xl:pt-40 pt-20">
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="flex flex-col items-center justify-center gap-8">
                        <h1 className="text-4xl font-bold">Login</h1>
                        <p className="text-zinc-300 leading-relaxed max-w-100 text-center">Faça login para começar a cadastrar suas metas.</p>
                        {alertMessage && (
                            <div className="bg-red-500 mt-4 text-white p-2 rounded">
                                {alertMessage}
                            </div>
                        )}

                        <div className="flex flex-col leading-relaxed sm:w-full max-w-md">
                            <Label className="text-xl pb-2 text-center">Nome de usuário</Label>
                            <Input className="w-full px-4" type="text" placeholder="nome de usuário..."
                                {...register('username')} />

                            {formState.errors.username && (
                                <p className="text-red-400 text-sm">{formState.errors.username.message}</p>
                            )}
                            <Label className="text-xl pt-4 pb-2 text-center">Senha</Label>
                            <Input className="w-full" type="password" placeholder="senha..."
                                {...register('password')} />
                            {formState.errors.password && (
                                <p className="text-red-400 text-sm">{formState.errors.password.message}</p>
                            )}
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
                <form onSubmit={handleSubmitRegister(handleRegister)}>
                    <div className="flex flex-col items-center justify-center gap-8 pb-8">
                        <h1 className="text-4xl font-bold">Cadastro</h1>
                        <p className="text-zinc-300 leading-relaxed max-w-100 text-center">Cadastre-se para começar a usar o in.task.</p>
                        {alertRegister && (
                            <div className="bg-red-500 mt-4 text-white p-2 rounded">
                                {alertRegister}
                            </div>
                        )}
                        <div className="flex flex-col leading-relaxed sm:w-full max-w-md">
                            <Label className="text-xl pb-2 text-center">Nome de usuário</Label>
                            <Input className="w-full px-4" type="text" placeholder="nome de usuário..."
                                {...registerRegister('usernameRegister')} />

                            {formStateRegister.errors.usernameRegister && (
                                <p className="text-red-400 text-sm">{formStateRegister.errors.usernameRegister.message}</p>
                            )}
                            <Label className="text-xl pt-4 pb-2 text-center">Senha</Label>
                            <Input className="w-full" type="password" placeholder="senha..."
                                {...registerRegister('passwordRegister')} />

                            {formStateRegister.errors.passwordRegister && (
                                <p className="text-red-400 text-sm">{formStateRegister.errors.passwordRegister.message}</p>
                            )}
                        </div>
                        <Button className="bg-blue-500">
                            <DoorOpenIcon className="size-4" />
                            Cadastrar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}