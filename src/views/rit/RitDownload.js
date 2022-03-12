import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  // CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CLink,
  CSelect,
  CTooltip
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { loadRitDefaultFiles, loadRitDepartments, loadRitFilesByDepartments } from '../../actions/rit';
import { RIT_DEPARTMENT_FILES_RESET } from '../../actiontypes';

const RitDownload = () => {
    const dispatch = useDispatch();
    const default_files = useSelector(state => state.rit.default_files)
    const departments = useSelector(state => state.rit.departments)
    const department_files = useSelector(state => state.rit.department_files)

    useEffect(() => {
        dispatch(loadRitDefaultFiles());
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      dispatch(loadRitDepartments());
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch({ type: RIT_DEPARTMENT_FILES_RESET });
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const loadDepartmentFiles = async event => {
    event.preventDefault();
    dispatch(loadRitFilesByDepartments(event.target.value))
  }

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Download 
            </CCardHeader>
            <CCardBody>
              <table className="table">
                <thead>
                <tr>
                  <th>#</th>
                  <th>File Name</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                  {
                    default_files?.map( (file, index) => 
                      // <option key={x.id} value={x.id}>{x.name}</option>
                      <tr>
                        <td>
                          <p><code className="highlighter-rouge">{index+1}</code></p>
                        </td>
                        <td>
                          <p><code className="highlighter-rouge">{file.file_type}</code></p>
                        </td>
                        <td>
                          <span className="h6">
                            <CLink href={file.file}>
                          {/* <CBadge color={'success'}> */}
                          <CTooltip content="Download">
                          <CIcon name="cil-cloud-download" className="mfe-2" />
                          </CTooltip>
                          {/* </CBadge> */}
                          </CLink>
                          </span>
                        </td>
                      </tr>
                    )
                  }
                  
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol lg={9}>
          <CCard>
            <CCardHeader>
              Select Department
              <small></small>
            </CCardHeader>
            <CCardBody>
              {/* <CCol md="3">
                <CLabel htmlFor="rit"></CLabel>
              </CCol> */}
              <CCol xs="12" md="9">
                <CSelect defaultValue={'DEFAULT'} custom name="dept" id="dept" onChange={loadDepartmentFiles}>
                <option value="DEFAULT" key="0" disabled={true}>Please select</option>
                  {
                    departments?.map( (x) => 
                      <option key={x.id} value={x.id}>{x.name}</option>
                    )
                  }
                </CSelect>
              </CCol>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              RIT by Department
            </CCardHeader>
            <CCardBody>
              <table className="table">
                <thead>
                <tr>
                  <th>#</th>
                  <th>File Name</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                  {
                    department_files?.map( (file, index) => 
                      // <option key={x.id} value={x.id}>{x.name}</option>
                      <tr>
                        <td>
                          <p><code className="highlighter-rouge">{index+1}</code></p>
                        </td>
                        <td>
                          <p><code className="highlighter-rouge">{file.rit}</code></p>
                        </td>
                        <td>
                          <span className="h6">
                            <CLink href={file.file}>
                          {/* <CBadge color={'primary'}> */}
                          <CTooltip content="Download">
                          <CIcon name="cil-cloud-download" className="mfe-2" />
                          </CTooltip>
                          {/* </CBadge> */}
                          </CLink>
                          </span>
                        </td>
                      </tr>
                    )
                  }
                  
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default RitDownload
