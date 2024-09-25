import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";
import { getPendingGoals } from "../http/get-pending-goals";
import { useQuery } from "@tanstack/react-query";

export function PendingGoals() {
    const { data } = useQuery({
        queryKey: ['pending-goals'],
        queryFn: getPendingGoals,
        staleTime: 1000 * 60 // 60 seconds
    })

    if (!data) return null;

    return (
        <div className="flex flex-wrap gap-3">
            {data.pendingGoals.map(goal => {
                return (
                    <OutlineButton key={goal.id} disabled={goal.completitionCount >= goal.desiredWeeklyFrequency}>
                        <Plus className="size-4 text-zinc-600" />
                        <span>{goal.title}</span>
                    </OutlineButton>
                )
            })}
        </div>
    )
}