import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
const fields = [
  { key: 'no', label: '#' },
  'code','name', 
  { key: 'frequency', label: 'Frequency' },
  'department',
  'status', 'validate',
  {
    key: 'toggle_button',
    label: '',
    _style: { width: '1%' },
    sorter: false,
    filter: false
  }
]

const RitDetails = () => {
    const dispatch = useDispatch();
    const feature_list = useSelector(state => state.rit.features)

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
                'no':
                  (item, index)=>(
                    <td>
                      {
                        index = index+1
                      }
                    </td>
                  ),
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
                        <p className="text-muted"><b>Code:</b> {item.code}</p>
                        <p className="text-muted"><b>Name:</b> {item.name}</p>
                        <p className="text-muted"><b>Frequency:</b> {item.frequency}</p>
                        <p className="text-muted"><b>Version:</b> {item.version}</p>
                        <p className="text-muted"><b>Column:</b> {item.column}</p>
                        <p className="text-muted"><b>Row:</b> {item.row}</p>
                        <p className="text-muted"><b>Cut off days:</b> {item.cut_off_days}</p>
                        <p className="text-muted"><b>Department:</b> {item.department}</p>
                        <p className="text-muted"><b>Status:</b> {item.status?.toString()}</p>
                        <p className="text-muted"><b>Validate:</b> {item.validate?.toString()}</p>
                      </CCardBody>
                    </CCollapse>
                  )}
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
