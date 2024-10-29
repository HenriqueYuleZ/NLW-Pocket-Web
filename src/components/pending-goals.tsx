import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";
import { getPendingGoals } from "../http/get-pending-goals";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createGoalCompletion } from "../http/create-goal-completion";

export function PendingGoals() {
    const queryClient = useQueryClient()

    const userId = JSON.parse(localStorage.getItem('user') || 'null').user.id;

    const { data } = useQuery({
        queryKey: ['pending-goals', userId],
        queryFn: () => getPendingGoals(userId),
        staleTime: 1000 * 60 // 60 seconds
    })

    if (!data) return null;

    async function handleCompleteGoal(goalId: string) {
        const userId = JSON.parse(localStorage.getItem('user') || 'null').user.id;
        await createGoalCompletion(goalId, userId);

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