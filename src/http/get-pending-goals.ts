import API_BASE_URL from "../config/api";

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
    const response = await fetch(`${API_BASE_URL}/pending-goals?userId=${userId}`)
    const data = await response.json()

    return data.pendingGoals
}