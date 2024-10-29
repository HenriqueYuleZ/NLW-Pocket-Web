import { Dialog } from './components/ui/dialog'
import { CreateGoal } from './components/create-goal'
import { Summary } from './components/summary'
import { useState } from 'react';
import { EmptyGoals } from './components/empty-goals'
import { useQuery } from '@tanstack/react-query';
import { getSummary } from './http/get-summary';
import { Login } from './components/login';
import { authenticate } from './http/authenticate';
import { LogOut, User } from 'lucide-react';

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

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  }

  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const userId = user ? user.user.id : '';
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: () => getSummary({ userId: userId }),
    staleTime: 1000 * 60, // 60 seconds
    enabled: isLoggedIn, // Só faz a query se o usuário estiver logado
  });

  return (
    <Dialog>
      {!isLoggedIn ? (
        <Login onLoginSuccess={async () => await validateToken()} />
      ) : (
        <>
          <div className="flex justify-end m-2 mr-6">
            <span className='mr-2 flex font-medium leading-relaxed text-center'>
              <User className='ml-2' />
              {user?.user.username}
            </span>
            <span className='mx-2'>|</span>
            <button type='button' className='flex hover:text-blue-500' onClick={logout}>
              <LogOut className='ml-2' />
              Sair
            </button>
          </div>
          {data && data.total > 0 ? <Summary /> : <EmptyGoals />}
          <CreateGoal />
        </>
      )}
    </Dialog>
  );
}
