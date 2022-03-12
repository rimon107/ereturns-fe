import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CSelect,
    CDataTable,
    CFormGroup,
    CForm,
    CLabel,
    CInput,
    CCardFooter,
    CButton
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { loadRitFeatures, loadRitUploadStatusReportByFI } from '../../../actions/rit';
import { loadInstitutes } from '../../../actions/institute';
import { 
    RIT_REPORT_DATA_RESET
} from '../../../actiontypes';

const ReportRitBankWise = () => {
    const dispatch = useDispatch();
    const features = useSelector(state => state.rit.features)
    const report_data = useSelector(state => state.rit.report_data)
    const institutes = useSelector(state => state.institute.institutes)
    
    const DEFAULT_RIT = 0
    const DEFAULT_FI = 0
    const DEFAULT_DATE = "1970-01-01"

    const [formData, setFormData] = useState({
        rit: '',
        fi: '',
        date_from: ''
    });

    const { rit, fi, date_from } = formData;

    const [reportData, setReportData] = useState(report_data)

    useEffect(() => {
        setReportData(report_data)
    }, [report_data])

    // setReportData(report_data)

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    useEffect(() => {
        dispatch(loadRitFeatures());
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        dispatch(loadInstitutes());
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        dispatch({ type: RIT_REPORT_DATA_RESET });
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        dispatch(loadRitUploadStatusReportByFI(DEFAULT_RIT, DEFAULT_FI, DEFAULT_DATE));
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const onSubmit = async e => {
        e.preventDefault();
        dispatch(loadRitUploadStatusReportByFI(rit, fi, date_from));
    };

    const fields = [
        // { key: 'sl', label: '#' },
        { key: 'financialInstitute', label: 'Institute' },
        // { key: 'financialInstituteCode', label: 'Bank Code' },
        { key: 'branch', label: 'Branch' },
        { key: 'file', label: 'File', _style: { width: '10%' } },
        { key: 'base_date', label: 'Reporting date' },
        { key: 'upload_time', label: 'Upload Date' },
        { key: 'prepared_by', label: 'Prepared By' },
        { key: 'phone', label: 'Phone' },
    ]


    return (
        <>

            <CRow>
                <CCol lg={9}>
                    <CCard>
                        <CForm method="GET" className="form-horizontal" onSubmit={onSubmit}>
                            <CCardHeader>
                                Search
                                <small className="text-muted"> Options</small>
                            </CCardHeader>
                            <CCardBody>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="rit">RIT Name</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CSelect defaultValue={'DEFAULT'} custom name="rit" id="rit" onChange={onChange}>
                                            <option value="DEFAULT" key="0">Please select</option>
                                            {
                                                features?.map((x) =>
                                                    <option key={x.id} value={x.id}>{x.name}</option>
                                                )
                                            }
                                        </CSelect>
                                    </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="fi">Institute</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CSelect defaultValue={'DEFAULT'} custom name="fi" id="fi" onChange={onChange}>
                                            <option value="DEFAULT" key="0">Please select</option>
                                            {
                                                institutes?.map((x) =>
                                                    <option key={x.id} value={x.id}>{x.name}</option>
                                                )
                                            }
                                        </CSelect>
                                    </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="date_from">Upload Date From</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput 
                                        type="date" 
                                        id="date_from" 
                                        name="date_from" 
                                        placeholder="date" 
                                        value={date_from}
                                        onChange={onChange}
                                        />
                                    </CCol>
                                </CFormGroup>

                            </CCardBody>
                            <CCardFooter>
                                <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Search</CButton>
                            </CCardFooter>
                        </CForm>
                    </CCard>
                </CCol>
            </CRow>

            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Upload Status <small className="text-muted">Bank Wise</small>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={reportData}
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
                                scopedSlots={{
                                    'financialInstitute':
                                        (item) => (
                                            <td>
                                                {
                                                    item.financial_institute?.toString()
                                                }
                                            </td>
                                        ),
                                    'prepared_by':
                                        (item) => (
                                            <td>
                                                {
                                                    item.prepared_by?.toString()
                                                }
                                            </td>
                                        ),
                                    'base_date':
                                        (item) => (
                                            <td>
                                                {
                                                    new Date(item.base_date)
                                                        .toLocaleDateString("sq-AL", { year: 'numeric', month: '2-digit', day: '2-digit' })
                                                }
                                            </td>
                                        ),
                                    'upload_time':
                                        (item) => (
                                            <td>
                                                {
                                                    new Date(item.upload_time)
                                                        .toLocaleDateString("sq-AL", { year: 'numeric', month: '2-digit', day: '2-digit' })
                                                }
                                            </td>
                                        ),
                                    'file':
                                        (item) => (
                                            <td>
                                                <CBadge>
                                                    {item.file?.toString().substring(item.file?.lastIndexOf('/') + 1)}
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

export default ReportRitBankWise
