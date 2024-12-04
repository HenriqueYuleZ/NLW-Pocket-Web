import API_BASE_URL from "../config/api";
interface Login {
    username: string;
    password: string;
}

export async function userLogin({ username, password }: Login) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
        const { message, ...rest } = data;
        localStorage.setItem('user', JSON.stringify(rest)); // Armazena o usuário logado no localStorage como JSON
        localStorage.setItem('token', data.token); // Armazena o token JWT no localStorage como JSON
        return rest; // Retorna o usuário logado sem o atributo message
    }
    throw new Error(data.error || 'Erro ao fazer login');
}

export async function userRegister({ username, password }: Login) {
    const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
        return data;
    }
    throw new Error(data.error || 'Erro ao fazer cadastro');
}