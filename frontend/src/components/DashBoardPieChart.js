import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import '../css/Dashboard.css';


export default function DashBoardPieChart(props) {
    return (
      <div className='chart-component'>
        <h3 className="chart-heading">{props.title}</h3>
        <PieChart
          series={[
            {
              data: props.data
            },
          ]}
          width={400}
          height={200}
        />
        </div>
      );
}
