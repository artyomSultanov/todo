import React, { KeyboardEvent, MouseEvent, PropsWithChildren } from 'react'
import { observer } from 'mobx-react'

import './index.scss'

interface PropsType {
  active: boolean
  setActive(active: boolean): void
}

const Modal: React.FC<PropsWithChildren<PropsType>> = ({
  active,
  setActive,
  children,
}) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation()

  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setActive(!active)
    }
  }

  return (
    <div
      className={`modal${active ? ' modal_active' : ''}`}
      onClick={() => setActive(!active)}
      onKeyUp={handleKey}
    >
      <div className='modal__content' onClick={handleClick}>
        {children}
      </div>
    </div>
  )
}

export default observer(Modal)
