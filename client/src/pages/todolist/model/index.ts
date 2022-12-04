import { ChangeEvent, useState } from 'react'

import rootStore from 'stores/root-store'

const useTodolist = () => {
  const todolistStore = rootStore.todolistStore
  const [active, setActive] = useState(false)
  const [filter, setFilter] = useState('all')

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value)
  }

  const handleAdd = (title: string) => {
    todolistStore.addOne(title)
    todolistStore.getAll(filter)
  }
  const handleSolve = (id: string) => {
    todolistStore.markOne(id)
    todolistStore.getAll(filter)
  }
  const handleDelete = (id: string) => {
    todolistStore.deleteOne(id)
    todolistStore.getAll(filter)
  }

  return {
    active,
    setActive,
    filter,
    handleChange,
    handleAdd,
    handleSolve,
    handleDelete,
  }
}

export default useTodolist
