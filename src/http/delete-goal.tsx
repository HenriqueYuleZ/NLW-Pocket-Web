interface DeleteGoalRequest {
    goalId: string
    userId: string
}

export async function deleteGoal({ goalId, userId }: DeleteGoalRequest) {
    await fetch(`http://localhost:3333/goals/${goalId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
    })
}