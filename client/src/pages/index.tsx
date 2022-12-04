import { Routes, Route, Navigate } from 'react-router-dom'

import Layout from 'components/layout'
import rootStore from 'stores/root-store'
import Todolist from './todolist'
import Auth from './auth'

const Router = () => {
  const authStore = rootStore.authStore

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Navigate to='/auth/signup' />} />
        <Route
          path='/auth/signup'
          element={<Auth method={authStore.signup} title='Please, signup :)' />}
        />
        <Route
          path='/auth/signin'
          element={<Auth method={authStore.signin} title='Please, signin :)' />}
        />
        <Route
          path='/todolist'
          element={<Todolist />}
          loader={() => rootStore.todolistStore.getAll('all')}
        />
        <Route path='*' element={<h1>Not found</h1>} />
      </Route>
    </Routes>
  )
}

export default Router
