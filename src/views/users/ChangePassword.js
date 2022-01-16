import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
// import CIcon from '@coreui/icons-react'

import { profile } from '../../actions/user';
import { capitalize } from 'lodash';


const User = ({match}) => {
  // const dispatch = useDispatch();
  // // const user = usersData.find( user => user.id.toString() === match.params.id)
  // const user = useSelector(state => state.user.user)
  // const userDetails = user ? Object.entries(user) : 
  //   [['',  "No user found"]]

//   useEffect(() => {
//     dispatch(profile(match.params.id));
// }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
            {/* User id: {match.params.id} */}
            <strong>Change Password</strong>
          </CCardHeader>
          <CCardBody>
              
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default User
