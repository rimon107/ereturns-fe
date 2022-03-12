import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
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
import { loadRitFeatures, loadRitNonReportingBranchByFI } from '../../../actions/rit';
import { loadInstitutes } from '../../../actions/institute';
import { 
    RIT_REPORT_DATA_RESET
} from '../../../actiontypes';

const ReportRitNonReportingBankBranch = () => {
    const dispatch = useDispatch();
    const features = useSelector(state => state.rit.features)
    const report_data = useSelector(state => state.rit.report_data)
    const institutes = useSelector(state => state.institute.institutes)

    const DEFAULT_RIT = 0
    const DEFAULT_FI = 0
    const DEFAULT_BASE_DATE = "1970-01-01"

    const [formData, setFormData] = useState({
        rit: '',
        fi: '',
        base_date: '',
    });

    const { rit, fi, base_date } = formData;

    const [reportData, setReportData] = useState(report_data)

    useEffect(() => {
        setReportData(report_data)
    }, [report_data])

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
        dispatch(loadRitNonReportingBranchByFI(DEFAULT_RIT, DEFAULT_FI, DEFAULT_BASE_DATE));
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const onSubmit = async e => {
        e.preventDefault();
        dispatch(loadRitNonReportingBranchByFI(rit, fi, base_date));
    };

    const fields = [
        // { key: 'sl', label: '#' },
        { key: 'financialInstitute', label: 'Institute' },
        { key: 'branch', label: 'Branch' },
        { key: 'branchCode', label: 'Branch Code' },
        { key: 'userCode', label: 'User Code' },
        { key: 'userName', label: 'User Name' },
        { key: 'designation', label: 'Designtion' },
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
                                        <CLabel htmlFor="base_date">Reporting Base Date</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput 
                                            type="date" 
                                            id="base_date" 
                                            name="base_date" 
                                            placeholder="date" 
                                            value={base_date}
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
                            Upload Status <small className="text-muted">Non Reporting Branch</small>
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
                                    'branch':
                                        (item) => (
                                            <td>
                                                {
                                                    item.branch_name?.toString()
                                                }
                                            </td>
                                        ),
                                    'branchCode':
                                        (item) => (
                                            <td>
                                                {
                                                    item.branch_code?.toString()
                                                }
                                            </td>
                                        ),
                                    'userCode':
                                        (item) => (
                                            <td>
                                                {
                                                    item.user_code?.toString()
                                                }
                                            </td>
                                        ),
                                    'userName':
                                        (item) => (
                                            <td>
                                                {
                                                    item.user_name?.toString()
                                                }
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

export default ReportRitNonReportingBankBranch
