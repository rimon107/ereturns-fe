import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
// import CIcon from '@coreui/icons-react'

import { profile } from '../../actions/user';
import { capitalize } from 'lodash';


const User = ({match}) => {
  const dispatch = useDispatch();
  // const user = usersData.find( user => user.id.toString() === match.params.id)
  const user = useSelector(state => state.user.user)
  const userDetails = user ? Object.entries(user) : 
    [["no_user", "No user found"]]

  useEffect(() => {
    if(!user) {
      dispatch(profile(match.params.id));
    }
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
            {
              userDetails.length > 1? (
                <table className="table table-striped table-hover">
                <tbody>
                  <tr key={3}>
                    <td>{capitalize(userDetails[3][0])}</td>
                    <td><strong>{userDetails[3][1]?.toString()}</strong></td>
                  </tr>
                  <tr key={5}>
                    <td>{capitalize(userDetails[5][0].replace("_", " "))}</td>
                    <td><strong>{userDetails[5][1]?.name.toString()}</strong></td>
                  </tr>
                  <tr key={6}>
                    <td>{capitalize(userDetails[6][0])}</td>
                    <td><strong>{userDetails[6][1]?.name.toString()}</strong></td>
                  </tr>
                  <tr key={8}>
                    <td>{capitalize(userDetails[8][0])}</td>
                    <td><strong>{userDetails[8][1]?.toString()}</strong></td>
                  </tr>
                  <tr key={9}>
                    <td>{capitalize(userDetails[9][0])}</td>
                    <td><strong>{userDetails[9][1]?.toString()}</strong></td>
                  </tr>
                  <tr key={10}>
                    <td>{capitalize(userDetails[10][0])}</td>
                    <td><strong>{userDetails[10][1]?.toString()}</strong></td>
                  </tr>
                  <tr key={11}>
                    <td>{capitalize(userDetails[11][0])}</td>
                    <td><strong>{userDetails[11][1]?.toString()}</strong></td>
                  </tr>
                  <tr key={12}>
                    <td>{capitalize(userDetails[12][0])}</td>
                    <td><strong>{userDetails[12][1]?.toString()}</strong></td>
                  </tr>
                </tbody>
              </table>
              ) : (
                <table className="table table-striped table-hover">
                <tbody>
                  <tr key={1}>
                    {/* <td>{capitalize(userDetails[0][0])}</td> */}
                    <td><strong>{userDetails[0][1]?.toString()}</strong></td>
                  </tr>
                </tbody>
              </table>
              )
            }
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default User
