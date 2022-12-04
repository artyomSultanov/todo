import React from 'react'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react'

import CustomCheckbox from 'components/custom-checkbox'
import { ITodo } from 'types/todo-type'

import './index.scss'

interface PropsType {
  todo: ITodo
  handleSolve(id: string): void
  handleDelete(id: string): void
}

const Todo: React.FC<PropsType> = ({ todo, handleSolve, handleDelete }) => (
  // Можно было бы красиво classnames использовать, но ради одного класса не стоит наверно :)
  <div className={`todo${todo.completed ? ' todo_completed' : ''}`}>
    <div className='todo__checkbox'>
      <CustomCheckbox
        isChecked={todo.completed}
        setChecked={() => handleSolve(todo.id)}
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

export default observer(Todo)
