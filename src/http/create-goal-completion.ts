import API_BASE_URL from "../config/api";

export async function createGoalCompletion(goalId: string, userId: string) {
    await fetch(`${API_BASE_URL}/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ goalId, userId })
    })
}