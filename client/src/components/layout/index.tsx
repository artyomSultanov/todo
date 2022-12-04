import { observer } from 'mobx-react'
import { Outlet } from 'react-router-dom'

import Navbar from 'components/navbar'

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
)

export default observer(Layout)
