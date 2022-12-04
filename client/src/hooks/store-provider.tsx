import React, { PropsWithChildren, ReactElement } from 'react'
import { RootStoreModel, StoreContext } from 'stores/root-store'

const StoreProvider: React.FC<PropsWithChildren<{ store: RootStoreModel }>> = ({
  store,
  children,
}): ReactElement => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export default StoreProvider
