import { BrowserRouter } from 'react-router-dom'
import { observer } from 'mobx-react'

import Router from 'pages'
import rootStore from 'stores/root-store'
import StoreProvider from 'hooks/store-provider'

const App = () => {
  return (
    <div className='app'>
      <StoreProvider store={rootStore}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </StoreProvider>
    </div>
  )
}
export default observer(App)
