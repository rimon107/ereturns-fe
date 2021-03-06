import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CWidgetDropdown,
  CRow,
  CCol
} from '@coreui/react'
import ChartLineSimple from '../charts/ChartLineSimple'
import { members } from "../../actions/user";

const DashboardWidgetsDropdown = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(members());
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  const member = useSelector(state => state.auth.members)

  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={member?.active.toString()}
          text="Active Members"
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={[65, 59, 84, 84, 51, 55, 40]}
              pointHoverBackgroundColor="primary"
              label="Members"
              labels="months"
            />
          }
        />
      </CCol>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header={member?.online.toString()}
          text="Members online"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={[1, 18, 9, 17, 34, 22, 11]}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 }}}}
              label="Members"
              labels="months"
            />
          }
        >
          
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header={member?.inactive.toString()}
          text="Members Inactive"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{height: '70px'}}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={[78, 81, 80, 45, 34, 12, 40]}
              options={{ elements: { line: { borderWidth: 2.5 }}}}
              pointHoverBackgroundColor="warning"
              label="Members"
              labels="months"
            />
          }
        >
          
        </CWidgetDropdown>
      </CCol>

      

    </CRow>
  )
}

export default DashboardWidgetsDropdown
