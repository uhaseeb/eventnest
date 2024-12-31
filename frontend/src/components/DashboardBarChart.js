import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import '../css/DashboardCharts.css';


export default function DashboardBarChart(props) {
  const isHorizontal = props.layout === 'horizontal';
  const axisKey = isHorizontal ? 'yAxis' : 'xAxis';

  return (
    <div className='chart-component'>
        <h3 className="chart-heading">{props.title}</h3>
      <BarChart
      series={[
        { data: props.data || [] },
      ]}
      height={400}
      width={800}
      layout={props.layout}
      {...{
        [axisKey]: [{ data: props.labels || [], scaleType: 'band' }]
      }}
      margin={props.margins}
    />
    </div>
  )
}
