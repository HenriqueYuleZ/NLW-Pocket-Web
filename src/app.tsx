import { Plus, X } from 'lucide-react'

import logo from './assets/logo-in-task.png'
import letsStart from './assets/illustration_lets-start.png'
import { Button } from './components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from './components/ui/dialog'

export function App() {

  return (
    <Dialog>
      <div className="h-screen flex flex-col items-center justify-center gap-8">
        <img src={logo} alt="in.task" />
        <img src={letsStart} alt="in.task" />
        <p className="text-zinc-300 leading-relaxed max-w-80 text-center">Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?</p>

        <DialogTrigger asChild>
          <Button>
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Cadastrar meta</h1>
          <DialogClose>
            <X className="size-5 text-zinc-600" />
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
