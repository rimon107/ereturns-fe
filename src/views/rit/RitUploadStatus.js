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
  CLink,
  CButton,
  CCollapse
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
  { key: 'no', label: '#' },
  { key: 'rit', label: 'RIT' },
  { key: 'financialInstitute', label: 'FI' },
  { key: 'branch', label: 'Branch', sorter: false, },
  { key: 'file', label: 'File', _style: { width: '10%' } },
  { key: 'base_date', label: 'Base date' },
  { key: 'upload_time', label: 'Upload time' },
  { key: 'status', label: 'Status'},
  {
    key: 'toggle_button',
    label: '',
    _style: { width: '1%' },
    sorter: false,
    filter: false
  },
]


// const loader = (
//   <div className="pt-3 text-center">
//     <div className="sk-spinner sk-spinner-pulse"></div>
//   </div>
// )


const RitUploadStatusList = () => {
    const dispatch = useDispatch();
    const upload_list = useSelector(state => state.rit.upload_list)

    // const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState([])

    useEffect(() => {
        // setLoading(true)
        dispatch(loadRitUploadList());
        // setLoading(false)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // if(loading){
    //   return (
    //     <loader />
    //   )
    // }
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
      return new Date(date)
      .toLocaleDateString("sq-AL",{ year: 'numeric', month: '2-digit', day: '2-digit' })
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
                'no':
                  (item, index)=>(
                    <td>
                      {
                        index = index+1
                      }
                    </td>
                  ),
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
                        customizeDate(item.base_date)
                      }
                    </td>
                  ),
                'upload_time':
                  (item)=>(
                    <td>
                      {
                        customizeDate(item.upload_time)
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
                          {item.file?.toString().substring(item.file?.lastIndexOf('/')+1).substr(0,20) + "..."}
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
                      <p className="text-muted"><b>RIT:</b> {item.rit}</p>
                      <p className="text-muted"><b>File Name:</b> <CLink href={item.file}>{item.file?.toString().substring(item.file?.lastIndexOf('/')+1)}</CLink></p>
                      <p className="text-muted"><b>Bank:</b> {item.financial_institute?.toString()}</p>
                      <p className="text-muted"><b>Branch:</b> {item.branch?.toString()}</p>
                      <p className="text-muted"><b>Prepared By:</b> {item.prepared_by}</p>
                      <p className="text-muted"><b>Base Date:</b> {customizeDate(item.base_date)}</p>
                      <p className="text-muted"><b>Upload Time:</b> {customizeDate(item.upload_date)}</p>
                      <p className="text-muted"><b>Mobile:</b> {item.phone}</p>
                      <p className="text-muted"><b>IP Address:</b> {item.ip}</p>
                        {/* <p className="text-muted"><b>Username:</b> {item.username}</p>
                        <p className="text-muted"><b>Name:</b> {item.name}</p>
                        <p className="text-muted"><b>Bank:</b> {item.financial_institute?.name.toString()}</p>
                        <p className="text-muted"><b>Branch:</b> {item.branch?.name.toString()}</p>
                        <p className="text-muted"><b>Department:</b> {item.department}</p>
                        <p className="text-muted"><b>Designation:</b> {item.designation}</p>
                        <p className="text-muted"><b>Email:</b> {item.email}</p>
                        <p className="text-muted"><b>Mobile:</b> {item.mobile}</p>
                        <p className="text-muted"><b>Phone:</b> {item.phone}</p>
                        <p className="text-muted"><b>Approved date:</b> {item.approved_time?.toString().substring(0,10)}</p>
                        <p className="text-muted"><b>Last Login date:</b> {item.approved_time?.toString().substring(0,10)}</p> */}
                      </CCardBody>
                    </CCollapse>
                  )},
                  'edit_button':
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
