import API_BASE_URL from "../config/api";

interface DeleteGoalRequest {
    goalId: string
    userId: string
}

export async function deleteGoal({ goalId, userId }: DeleteGoalRequest) {
    await fetch(`${API_BASE_URL}/goals/${goalId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
    })
}