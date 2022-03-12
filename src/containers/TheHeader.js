import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CSubheader,
  CHeaderNavItem,
  CHeaderNavLink,
  CRow,
  CCol
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { 
  TheHeaderDropdown
}  from './index'
import { SET } from "../actiontypes"

const TheHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.core.sidebarShow)
  const user = useSelector(state => state.auth.user)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: SET, sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: SET, sidebarShow: val})
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo"/>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/dashboard">Home</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <TheHeaderDropdown/>
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
          <CRow>
            <CCol xs="6">
            </CCol>
          </CRow>
          <div className="d-md-down-none mfe-2 c-subheader-nav justify-content-end">
            <div className="text-right">
              <small><b>{user?.name},</b> {user?.department}, {user?.branch?.name} {user?.branch?.name? ",": ""} {user?.financial_institute?.name}</small>
            </div>
          </div>
          
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
