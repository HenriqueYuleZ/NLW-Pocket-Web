type PendingGoalsResponse = {
    pendingGoals: {
        id: string;
        userId: string;
        title: string;
        desiredWeeklyFrequency: number;
        completitionCount: number;
    }[];
}

export async function getPendingGoals(userId: string): Promise<PendingGoalsResponse> {
    const response = await fetch(`http://localhost:3333/pending-goals?userId=${userId}`)
    const data = await response.json()

    return data.pendingGoals
}