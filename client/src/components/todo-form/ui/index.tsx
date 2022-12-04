import React from 'react'
import { observer } from 'mobx-react'

import './index.scss'
import useTodoForm from '../model'
import rootStore from 'stores/root-store'

interface PropsType {
  getTodos(): void
}

const TodoForm: React.FC<PropsType> = ({ getTodos }) => {
  const todolistStore = rootStore.todolistStore
  const handleAdd = (title: string) => {
    todolistStore.addOne(title)
    getTodos()
  }

  const { title, handleChange, handleSubmit, handleKey } =
    useTodoForm(handleAdd)

  return (
    <form className='todo-form' onSubmit={handleSubmit}>
      <textarea
        className='todo-form__input'
        name='title'
        value={title}
        onChange={handleChange}
        onKeyUp={handleKey}
        autoFocus
      />
      <button className='todo-form__button' type='submit'>
        Add
      </button>
    </form>
  )
}

export default observer(TodoForm)
