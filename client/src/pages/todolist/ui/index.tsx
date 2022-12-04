import React, { ChangeEvent, useEffect, useState } from 'react'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react'

import Todo from 'components/todo'
import rootStore from 'stores/root-store'
import Modal from 'components/modal'
import TodoForm from 'components/todo-form'

// import useTodolist from '../model'
import './index.scss'

const Todolist = () => {
  const todos = rootStore.todolistStore.todos
  const [active, setActive] = useState(false)
  const [filter, setFilter] = useState('all')

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value)
  }

  useEffect(() => {
    rootStore.todolistStore.getAll(filter)
  }, [filter])

  return (
    <>
      <div className='todolist'>
        <div className='todolist__tools'>
          <div className='todolist__tools__add' onClick={() => setActive(true)}>
            <FontAwesomeIcon
              className='todolist__tools__add-icon'
              icon={faAdd}
            />
          </div>
          <select className='todolist__tools__select' onChange={handleChange}>
            <option value='all'>All</option>
            <option value='done'>Done</option>
            <option value='undone'>Undone</option>
          </select>
        </div>
        <div className='todolist__todos'>
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              getTodos={() => rootStore.todolistStore.getAll(filter)}
            />
          ))}
        </div>
      </div>
      <Modal active={active} setActive={setActive}>
        <TodoForm getTodos={() => rootStore.todolistStore.getAll(filter)} />
      </Modal>
    </>
  )
}

export default observer(Todolist)
