interface Login {
    username: string;
    password: string;
}

export async function userLogin({ username, password }: Login) {
    const response = await fetch('http://localhost:3333/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem('token', data.token); // Armazena o token JWT no localStorage
        return data.user; // Retorna o usuário logado
    }
    throw new Error(data.error || 'Erro ao fazer login');
}