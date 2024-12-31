import React from 'react'
import DashboardBarChart from '../components/DashboardBarChart';
import DashBoardPieChart from '../components/DashBoardPieChart';
import DashboardCard from '../components/DashboardCard/DashboardCard';
import '../css/Dashboard.css';


export default function Dashboard() {
  const registeredEventsMargins = {top: 10, bottom: 30, left: 40, right: 10}
  const registeredEventsData = [25, 70, 22, 38, 95]
  const registeredEventsLabels = ['Event 1', 'Event 2', 'Event 3', 'Event 4', 'Event 5']
  const viewedEventsMargins = { top: 10, bottom: 30, left: 70, right: 10 }
  const viewedEventsData = [35, 44, 24, 34, 70]
  const viewedEventsLabels = ['Event 1', 'Event 2', 'Event 3', 'Event 4', 'Event 5']

  const attendeesByCategoryData = [
    { id: 0, value: 10, label: 'Arts' },
    { id: 1, value: 25, label: 'Entertainment' },
    { id: 2, value: 40, label: 'IT' },
  ]
  const eventsByCategoryData = [
    { id: 0, value: 15, label: 'Arts' },
    { id: 1, value: 25, label: 'Music' },
    { id: 2, value: 10, label: 'Medicine' },
  ]

  return (
    <div className="dashboard-container">
      {/* Cards Section */}
      <div className="dashboard-cards">
        <DashboardCard title='Number of Attendees' value={220}/>
        <DashboardCard title='Number of Events' value={240}/>
        <DashboardCard title='Number of Views' value={1000}/>
      </div>
      
      {/* Charts Section */}
      <div className="dashboard-charts">
      <DashboardBarChart title='Top 5 Most Viewed Events' layout='horizontal' data={viewedEventsData} margins={viewedEventsMargins} labels={viewedEventsLabels}/>
      <DashBoardPieChart title='Events By Category' data={eventsByCategoryData}/>
      </div>

      <div className="dashboard-charts">
      <DashboardBarChart title='Top 5 Most Registered Events' layout='vertical' data={registeredEventsData} margins={registeredEventsMargins} labels={registeredEventsLabels}/>
      <DashBoardPieChart title='Attendees By Category' data={attendeesByCategoryData}/>
      </div>
    </div>
  )
}
