import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow
} from '@coreui/react';

import { loadRitFeatures } from '../../actions/rit';

const getBadge = status => {
  switch (status) {
    case "true": return 'success'
    case "false": return 'danger'
    case "Active": return 'success'
    case "Inactive": return 'danger'
    case "Daily": return 'info'
    case "Monthly": return 'dark'
    default: return 'primary'
  }
}
const fields = ['code','name', 
                { key: 'frequency', label: 'Frequency' },
                'version', 'column', 
                'row', 'cut_off_days', 'department',
                // { key: 'department', label: 'Department' },
                // { key: 'department', label: 'Department' },
                'status', 'validate']

const RitDetails = () => {
    const dispatch = useDispatch();
    const feature_list = useSelector(state => state.rit.features)

    useEffect(() => {
        dispatch(loadRitFeatures());
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              RIT <small>Details Table</small>
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={feature_list}
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
                'frequency':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.frequency?.toString())}>
                        {item.frequency?.toString()}
                      </CBadge>
                    </td>
                  ),
                'status':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.status?.toString())}>
                        {item.status?.toString()}
                      </CBadge>
                    </td>
                  ),
                  'validate':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.validate?.toString())}>
                        {item.validate?.toString()}
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

export default RitDetails
