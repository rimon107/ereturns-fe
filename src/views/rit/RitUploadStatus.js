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
  CLink
} from '@coreui/react';

import { loadRitUploadList } from '../../actions/rit';

const getBadge = status => {
  switch (status) {
    case 1: return 'success'
    case 0: return 'danger'
    case "file": return 'primary'
    case "true": return 'primary'
    case "false": return 'warning'
    case "Uploaded": return 'success'
    case "Failed to upload for error at first row": return 'danger'
    default: return 'primary'
  }
}
const fields = [
  // { key: 'sl', label: '#' },
  { key: 'rit', label: 'RIT' },
  { key: 'financialInstitute', label: 'FI' },
  // { key: 'financialInstituteCode', label: 'Bank Code' },
  { key: 'branch', label: 'Branch' },
  // { key: 'branchCode', label: 'Branch Code' },
  { key: 'file', label: 'File', _style: { width: '10%' } },
  { key: 'base_date', label: 'Base date' },
  { key: 'phone', label: 'Phone' },
  { key: 'prepared_by', label: 'Prepared By' },
  { key: 'upload_time', label: 'Upload time' },
  { key: 'ip', label: 'IP' },
  { key: 'status', label: 'Status', _style: { padding: '10px' } },
]


const loader = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)


const RitUploadStatusList = () => {
    const dispatch = useDispatch();
    const upload_list = useSelector(state => state.rit.upload_list)

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        dispatch(loadRitUploadList());
        setLoading(false)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if(loading){
      return (
        <loader />
      )
    }

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              RIT <small>Upload Status</small>
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={upload_list}
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
                'financialInstitute':
                  (item)=>(
                    <td>
                      {
                      item.financial_institute?.toString()
                      }
                    </td>
                  ),
                'prepared_by':
                  (item)=>(
                    <td>
                      {
                      item.prepared_by?.toString()
                      }
                    </td>
                  ),
                'base_date':
                  (item)=>(
                    <td>
                      {
                      new Date(item.upload_time)
                      .toLocaleDateString("sq-AL",{ year: 'numeric', month: '2-digit', day: '2-digit' })
                      }
                    </td>
                  ),
                'upload_time':
                  (item)=>(
                    <td>
                      {
                      new Date(item.upload_time)
                      .toLocaleDateString("sq-AL",{ year: 'numeric', month: '2-digit', day: '2-digit' })
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
                'file':
                  (item)=>(
                    <td>
                      <CLink href={item.file}>
                        <CBadge>
                          {item.file?.toString().substring(item.file?.lastIndexOf('/')+1)}
                        </CBadge>
                        </CLink>
                    </td>
                  ),
                  'validate':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.validate.toString())}>
                        {item.validate.toString()}
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
