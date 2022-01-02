import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
      <span> Copyright &copy;- All Rights Reserved</span>
        <a href="https://www.bb.org.bd" target="_blank" rel="noopener noreferrer" className="ml-1">Bangladesh Bank</a>
        
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Developed By: Information Systems Development and Support Department (ISDSD), Bangladesh Bank </span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
