import { CheckCircle2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "../http/get-summary";
import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";
import { PendingGoals } from "./pending-goals";
import logo from "../assets/logo-task.png";

dayjs.locale(ptBr);

interface SummaryResponse {
    token: string;
    user: {
        id: string;
        username: string;
    }
}


export function Summary() {
    const user = JSON.parse(localStorage.getItem('user') || 'null') as SummaryResponse | null;
    let userId = '';
    if (user) {
        userId = user.user.id
    }

    const { data } = useQuery({
        queryKey: ['summary', user],
        queryFn: () => getSummary({ userId: userId }),
        staleTime: 1000 * 60 // 60 seconds
    })
    if (!data) return;

    const firstDayOfWeek = dayjs().startOf('week').format('D [de] MMMM');
    const lastDayOfWeek = dayjs().endOf('week').format('D [de] MMMM');

    const completedPercentage = Math.round(data.completed / data.total * 100);

    return (
        <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6 min-h-screen">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src={logo} alt="in.task" width={30} />

                    <span className="text-lg font-semibold capitalize">{firstDayOfWeek}<br />{lastDayOfWeek}</span>
                </div>

                <DialogTrigger asChild>
                    <Button size="sm">
                        <Plus className="size-4" />
                        Cadastrar meta
                    </Button>
                </DialogTrigger>
            </div>

            <div className="flex flex-col gap-3">
                <Progress value={8} max={15}>
                    <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
                </Progress>

                <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>
                        Você completou{' '}
                        <span className="text-zinc-100">{data?.completed}</span> de{' '}
                        <span className="text-zinc-100">{data?.total}</span> metas nessa
                        semana.
                    </span>
                    <span>{completedPercentage}%</span>
                </div>
            </div>

            <Separator />

            <PendingGoals />

            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-medium">Sua semana</h2>

                {Object.entries(data.goalsPerDay ? data.goalsPerDay : []).map(([day, goals]) => {
                    const weekDay = dayjs(day).format('dddd');
                    const formatedDate = dayjs(day).format('D [de] MMMM');

                    return (
                        <div key={day} className="flex flex-col gap-4">
                            <h3 className="font-medium"><span className="capitalize">{weekDay}</span>{' '} <span className="text-zinc-400 text-xs">({formatedDate})</span></h3>
                            <ul className="flex flex-col gap-3">
                                {goals.map(goal => {
                                    const time = dayjs(goal.completedAt).format('HH:mm');

                                    return (
                                        <li key={goal.id} className="flex items-center gap-2">
                                            <CheckCircle2 className="size-4 text-pink-500" />
                                            <span className="text-sm text-zinc-400">Você completou "<span className="text-zinc-100">{goal.title}</span>" às <span className="text-zinc-100">{time}h</span></span>
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        </div>
                    )
                })}
            </div>
            <footer className="flex items-center justify-center mt-auto text-xs pb-16">
                <span>Desenvolvido por <a href="https://github.com/HenriqueYuleZ" target='_blank' className="font-bold hover:text-blue-600" rel="noreferrer">Henrique YZ</a></span>
            </footer>
        </div>
    )
}