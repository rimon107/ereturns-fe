import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
// import CIcon from '@coreui/icons-react'

import { profile } from '../../actions/user';


const User = ({match}) => {
  const dispatch = useDispatch();
  // const user = usersData.find( user => user.id.toString() === match.params.id)
  const user = useSelector(state => state.user.user)
  const userDetails = user ? Object.entries(user) : 
    [['',  "No user found"]]

  useEffect(() => {
    dispatch(profile(match.params.id));
}, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
            {/* User id: {match.params.id} */}
            <strong>User Details</strong>
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  {
                    userDetails?.map(([key, value], index) => {
                      if(key=='name'||key=='email'||key=='designation'||key=='department'||key=='mobile')
                        return (
                          <tr key={index.toString()}>
                            <td>{`${key}`}</td>
                            <td><strong>{value?.toString()}</strong></td>
                          </tr>
                        )
                      if(key=='financial_institute'||key=='branch')
                       return (
                        <tr key={index.toString()}>
                        <td>{`${key}`}</td>
                        <td><strong>{value.name?.toString()}</strong></td>
                        </tr>

                       )
                      })
                  }
                </tbody>
              </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default User
