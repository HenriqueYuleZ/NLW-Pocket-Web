import API_BASE_URL from "../config/api";

type SummaryResponse = {
    completed: number;
    total: number;
    goalsPerDay: Record<string, {
        id: string;
        title: string;
        completedAt: string;
    }[]>;
}

export async function getSummary({ userId }: { userId: string }): Promise<SummaryResponse> {
    const response = await fetch(`${API_BASE_URL}/summary?userId=${userId}`)
    const data = await response.json()

    return data.summary
}