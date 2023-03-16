import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a
          style={{ textDecoration: 'none' }}
          href="https://www.bps-tunisie.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          BPS
        </a>
        <span className="ms-1">&copy; 2022 Business Process Solutions.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">
          Made with <span style={{ color: '#e25555' }}>&#9829;</span> For{' '}
          <span style={{ color: '#321FDB' }}>Factarni</span>
        </span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
