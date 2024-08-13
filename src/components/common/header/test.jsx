import { Button } from 'antd'
import React from 'react'
import { HiPlus } from 'react-icons/hi2'
import { capitalizeInitialChar } from '../../../helper/capitalizeInitialChar'

const Test = ({children,handleCreateComponent}) => {
  return (
    <div className="header p-4 bg-[#EDEDFA]">
      <div className="flex justify-between align-center ">
      {children}
      <Button
            className="custom-font p-2 mt-5"
            onClick={handleCreateComponent}
            icon={<HiPlus size={16} />}
            type="primary"
          >
            Add 
          </Button>
        </div>

    </div>
  )
}

export default Test
