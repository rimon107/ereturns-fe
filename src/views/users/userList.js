import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CCollapse
} from '@coreui/react';

import { loadUserList } from '../../actions/user';

const getBadge = status => {
  switch (status) {
    case "Online": return 'success'
    case "Offline": return 'danger'
    case true: return 'primary'
    case false: return 'warning'
    default: return 'primary'
  }
}
const fields = [
  // { key: 'sl', label: '#' },
  // { key: 'id', label: 'Id' },
  { key: 'no', label: '#' },
  { key: 'name', label: 'Name', _style: { width: '20%'}},
  { key: 'branch', label: 'Branch', sorter: false, },
  { key: 'email', _style: { width: '20%'} },
  { key: 'mobile' },
  { key: 'status', label: 'Status' },
  { key: 'is_active', label: 'Active' },
  {
    key: 'toggle_button',
    label: '',
    _style: { width: '1%' },
    sorter: false,
    filter: false
  },
  {
    key: 'edit_button',
    label: '',
    _style: { width: '1%' },
    sorter: false,
    filter: false
  }
]


const RitUploadStatusList = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user_list = useSelector(state => state.user.users)

    useEffect(() => {
        dispatch(loadUserList());
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const [details, setDetails] = useState([])

    const toggleDetails = (index) => {
      const position = details.indexOf(index)
      let newDetails = details.slice()
      if (position !== -1) {
        newDetails.splice(position, 1)
      } else {
        newDetails = [...details, index]
      }
      setDetails(newDetails)
    }

    const customizeDate = (date) => {
      if(date) {
        return new Date(date)
        .toLocaleDateString("sq-AL",{ year: 'numeric', month: '2-digit', day: '2-digit' })
      }
    }
    
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              User <small>List</small>
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={user_list}
              fields={fields}
              hover
              tableFilter
              itemsPerPageSelect
              striped
              bordered
              size="md"
              itemsPerPage={10}
              sorter
              pagination
              scopedSlots = {{
                'no':
                  (item, index)=>(
                    <td>
                      {
                        index = index+1
                      }
                    </td>
                  ),
                'branch':
                  (item)=>(
                    <td>
                      {
                      item.branch?.name.toString()
                      }
                    </td>
                  ),
                'status':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  ),
                  'is_active':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.is_active)}>
                        {item.is_active.toString()}
                      </CBadge>
                    </td>
                  ),
                  'toggle_button':
                  (item, index)=>{
                    return (
                      <td className="py-2">
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={()=>{toggleDetails(index)}}
                        >
                          {details.includes(index) ? 'Hide' : 'Show'}
                        </CButton>
                      </td>
                    )
                  },
                  'details':
                  (item, index)=>{
                    return (
                    <CCollapse show={details.includes(index)}>
                      <CCardBody>
                        <p className="text-muted"><b>Username:</b> {item.username}</p>
                        <p className="text-muted"><b>Name:</b> {item.name}</p>
                        <p className="text-muted"><b>Bank:</b> {item.financial_institute?.name.toString()}</p>
                        <p className="text-muted"><b>Branch:</b> {item.branch?.name.toString()}</p>
                        <p className="text-muted"><b>Department:</b> {item.department}</p>
                        <p className="text-muted"><b>Designation:</b> {item.designation}</p>
                        <p className="text-muted"><b>Email:</b> {item.email}</p>
                        <p className="text-muted"><b>Mobile:</b> {item.mobile}</p>
                        <p className="text-muted"><b>Phone:</b> {item.phone}</p>
                        <p className="text-muted"><b>Approved date:</b> {customizeDate(item.approved_time)}</p>
                        <p className="text-muted"><b>Last Login date:</b> {customizeDate(item.approved_time)}</p>
                      </CCardBody>
                    </CCollapse>
                  )},
                  'edit_button':
                  (item)=>{
                    return (
                      <td className="py-2">
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={() => history.push(`/users/update/${item.id}`)}
                        >
                          {"Edit"}
                        </CButton>
                      </td>
                    )
                  },
              }}
            />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default RitUploadStatusList
