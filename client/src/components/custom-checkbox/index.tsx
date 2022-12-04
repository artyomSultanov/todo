import React from 'react'

import './index.scss'

interface PropsType {
  isChecked: boolean
  setChecked(): void
}

const CustomCheckbox: React.FC<PropsType> = ({ isChecked, setChecked }) => (
  <div className='custom-checkbox'>
    <label className='custom-checkbox__label'>
      <input
        className='custom-checkbox__input'
        type='checkbox'
        name='checkbox'
        checked={isChecked}
        onChange={() => setChecked()}
      />
    </label>
  </div>
)

export default CustomCheckbox
