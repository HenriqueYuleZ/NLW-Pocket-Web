export async function authenticate({ token }: { token: string }) {
    if (!token) {
        throw new Error('Usuário não autenticado');
    }

    const response = await fetch('http://localhost:3333/protected', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Usuário não autenticado');
    }

    return await response.json();
}