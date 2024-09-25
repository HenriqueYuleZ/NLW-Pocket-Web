import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";
import { getPendingGoals } from "../http/get-pending-goals";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createGoalCompletion } from "../http/create-goal-completion";

export function PendingGoals() {
    const queryClient = useQueryClient()

    const { data } = useQuery({
        queryKey: ['pending-goals'],
        queryFn: getPendingGoals,
        staleTime: 1000 * 60 // 60 seconds
    })

    if (!data) return null;

    async function handleCompleteGoal(goalId: string) {
        await createGoalCompletion(goalId)

        queryClient.invalidateQueries({ queryKey: ['summary'] })
        queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
    }

    return (
        <div className="flex flex-wrap gap-3">
            {data.pendingGoals.map(goal => {
                return (
                    <OutlineButton key={goal.id} disabled={goal.completitionCount >= goal.desiredWeeklyFrequency} onClick={() => handleCompleteGoal(goal.id)}>
                        <Plus className="size-4 text-zinc-600" />
                        <span>{goal.title}</span>
                    </OutlineButton>
                )
            })}
        </div>
    )
}