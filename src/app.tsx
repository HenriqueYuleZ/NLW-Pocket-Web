import { Dialog } from './components/ui/dialog'
import { CreateGoal } from './components/create-goal'
import { Summary } from './components/summary'
import { useState } from 'react';
import { EmptyGoals } from './components/empty-goals'
import { useQuery } from '@tanstack/react-query';
import { getSummary } from './http/get-summary';
import { Login } from './components/login';
import { authenticate } from './http/authenticate';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => !!localStorage.getItem("token"));

  async function validateToken() {
    const token = localStorage.getItem("token");
    try {
      const response = authenticate({ token: token as string });
      response.then((res) => {
        if (res.user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      });
    } catch (error) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    }
  }

  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 60 seconds
    enabled: isLoggedIn, // Só faz a query se o usuário estiver logado
  });

  return (
    <Dialog>
      {!isLoggedIn ? (
        <Login onLoginSuccess={async () => await validateToken()} />
      ) : (
        <>
          {data && data.total > 0 ? <Summary /> : <EmptyGoals />}
          <CreateGoal />
        </>
      )}
    </Dialog>
  );
}
