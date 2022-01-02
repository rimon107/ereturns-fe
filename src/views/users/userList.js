import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from '@coreui/react';

import { loadUserList } from '../../actions/user';

const getBadge = status => {
  switch (status) {
    case "Online": return 'success'
    case "Offline": return 'danger'
    case "true": return 'primary'
    case "false": return 'warning'
    default: return 'primary'
  }
}
const fields = [
  // { key: 'sl', label: '#' },
  { key: 'id', label: 'Id' },
  { key: 'user_code', label: 'User Code' },
  { key: 'name', label: 'Name'},
  { key: 'username', label: 'Username' },
  { key: 'designation' },
  { key: 'department', label: 'Department' },
  { key: 'email' },
  { key: 'mobile' },
  { key: 'status', label: 'Status' },
  { key: 'is_active', label: 'Active' },
]




const RitUploadStatusList = () => {
    const dispatch = useDispatch();
    const user_list = useSelector(state => state.user.users)

    useEffect(() => {
        dispatch(loadUserList());
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    

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
                'department':
                  (item)=>(
                    <td>
                      {
                      item.department?.name.toString()
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
                  )
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
