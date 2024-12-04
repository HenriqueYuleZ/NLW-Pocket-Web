import API_BASE_URL from "../config/api";

export async function authenticate({ token }: { token: string }) {
    if (!token) {
        throw new Error('Usuário não autenticado');
    }

    const response = await fetch(`${API_BASE_URL}/protected`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Usuário não autenticado');
    }

    return await response.json();
}