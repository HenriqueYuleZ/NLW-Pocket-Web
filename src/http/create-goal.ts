import API_BASE_URL from "../config/api";

interface CreateGoalRequest {
    title: string
    desiredWeeklyFrequency: number,
    userId: string
}

export async function createGoal({ title, desiredWeeklyFrequency, userId }: CreateGoalRequest) {
    await fetch(`${API_BASE_URL}/goals`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, desiredWeeklyFrequency, userId })
    })
}