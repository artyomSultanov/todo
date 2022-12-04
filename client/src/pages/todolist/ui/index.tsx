import React, { useEffect } from 'react'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react'

import Todo from 'components/todo'
import rootStore from 'stores/root-store'
import Modal from 'components/modal'
import TodoForm from 'components/todo-form'

import './index.scss'
import useTodolist from '../model'

const Todolist = () => {
  const todolistStore = rootStore.todolistStore
  const todos = todolistStore.state.todos ?? []
  const {
    active,
    setActive,
    filter,
    handleChange,
    handleAdd,
    handleSolve,
    handleDelete,
  } = useTodolist()

  useEffect(() => {
    todolistStore.getAll(filter)
  }, [filter, todolistStore])

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
              handleSolve={handleSolve}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </div>
      <Modal active={active} setActive={setActive}>
        <TodoForm handleAdd={handleAdd} />
      </Modal>
    </>
  )
}

export default observer(Todolist)
