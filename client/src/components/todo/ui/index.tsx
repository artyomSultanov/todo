import React from 'react'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react'

import CustomCheckbox from 'components/custom-checkbox'
import { ITodo } from 'types/todo-type'

import './index.scss'
import rootStore from 'stores/root-store'

interface PropsType {
  todo: ITodo
  getTodos(): void
}

const Todo: React.FC<PropsType> = ({ todo, getTodos }) => {
  const todolistStore = rootStore.todolistStore

  const handleCheck = (id: string) => {
    todolistStore.markOne(id)
    getTodos()
  }
  const handleDelete = (id: string) => {
    todolistStore.deleteOne(id)
    getTodos()
  }

  return (
    <div className={`todo${todo.completed ? ' todo_completed' : ''}`}>
      <div className='todo__checkbox'>
        <CustomCheckbox
          isChecked={todo.completed}
          setChecked={() => handleCheck(todo.id)}
        />
      </div>
      <div className='todo__title'>{todo.title}</div>
      <FontAwesomeIcon
        className='todo__delete'
        icon={faTrash}
        onClick={() => handleDelete(todo.id)}
      />
    </div>
  )
}
export default observer(Todo)
