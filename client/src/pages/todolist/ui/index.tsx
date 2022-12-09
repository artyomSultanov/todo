import React, { ChangeEvent, useEffect, useState } from 'react'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react'

import Todo from 'components/todo'
import rootStore from 'stores/root-store'
import Modal from 'components/modal'
import TodoForm from 'components/todo-form'

import './index.scss'
import { useNavigate } from 'react-router-dom'

const Todolist = () => {
  const todos = rootStore.todolistStore.todos
  const navigate = useNavigate()
  const user = rootStore.authStore.user
  const [active, setActive] = useState(false)
  const [filter, setFilter] = useState('all')

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value)
  }

  useEffect(() => {
    if (JSON.stringify(user) === '{}') {
      navigate('/auth/signup')
    } else {
      rootStore.todolistStore.getAll(filter)
    }
  }, [filter, user, navigate])

  return (
    <>
      <div className='todolist'>
        <div className='todolist-features'>
          <FontAwesomeIcon
            className='todolist-features__add-button'
            icon={faAdd}
            onClick={() => setActive(true)}
          />
          <select
            className='todolist-features__select-list'
            onChange={handleChange}
          >
            <option value='all'>All</option>
            <option value='done'>Done</option>
            <option value='undone'>Undone</option>
          </select>
        </div>
        <div className='todolist__items'>
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
