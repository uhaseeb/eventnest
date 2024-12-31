import React from 'react'
import './DashboardCard.css';

export default function DashboardCard(props) {
  return (
      <div className="dashboard-card">
          <h3>{props.title}</h3>
          <p>{props.value}</p>
        </div>
  )
}
