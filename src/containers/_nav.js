// import React from 'react'
// import CIcon from '@coreui/icons-react'


export const _default_nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Home',
    to: '/',
    icon: 'cil-laptop'
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Upload']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Upload Status',
    to: '/rit/upload-status',
    icon: 'cil-cloud-upload',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Reports']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Upload Status Report',
    route: '',
    icon: 'cil-cloud-upload',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'RIT & Base Date Wise',
        to: '/report/rit-base-date-wise',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'RIT & Bank Wise',
        to: '/report/rit-bank-wise',
      }
    ]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Non Reporting Bank/Branch',
    to: '/report/non-reporting-bank-branch',
    icon: 'cil-credit-card',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Modules']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'RIT',
    route: '',
    icon: 'cil-memory',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'RIT Download',
        to: '/rit/download',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'RIT Details',
        to: '/rit',
      }
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Comparative Statement',
    route: '',
    icon: 'cil-memory',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'NPL and Provision Comparison Statement(Branch wise) ',
        to: '',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Categorized Loan Comparison Statement of all Branches',
        to: '',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Contingent Liability Statement ',
        to: '',
      }
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Risk Identification',
    route: '',
    icon: 'cil-memory',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Key Indicator(Branch wise) ',
        to: '',
      }
    ]
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Settings']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'User Management',
    route: '',
    icon: 'cil-user',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add User',
        to: '',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'User List',
        to: '',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Change Password',
        to: '',
      }
    ]
  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Contact',
    to: '',
    icon: 'cil-info',
    badge: {
      color: 'info',
      text: 'info',
    }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'test',
    to: '/test',
    icon: 'cil-laptop'
  },
]

export const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Home',
    to: '/',
    icon: 'cil-laptop'
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Upload']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Upload Status',
    to: '/rit/upload-status',
    icon: 'cil-cloud-upload',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Reports']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Upload Status Report',
    route: '',
    icon: 'cil-cloud-upload',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'RIT & Base Date Wise',
        to: '/report/rit-base-date-wise',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'RIT & Bank Wise',
        to: '/report/rit-bank-wise',
      }
    ]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Non Reporting Bank/Branch',
    to: '/report/non-reporting-bank-branch',
    icon: 'cil-credit-card',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Modules']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'RIT',
    route: '',
    icon: 'cil-memory',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'RIT Download',
        to: '/rit/download',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'RIT Details',
        to: '/rit',
      }
    ]
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Settings']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'User Management',
    route: '',
    icon: 'cil-user',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add User',
        to: '/user/add',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'User List',
        to: '/users',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Change Password',
        to: '',
      }
    ]
  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Contact',
    to: '',
    icon: 'cil-info',
    badge: {
      color: 'info',
      text: 'info',
    }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'test',
    to: '/test',
    icon: 'cil-laptop'
  },
]

