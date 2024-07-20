import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LineChart = ({ chartData, chartLabels, chartTitle }) => {
  // Prepare data array
  const dataArr = chartData.split(",");

  // Define line chart data
  const lineData = {
    labels: chartLabels.split(","),
    datasets: [
      {
        label: chartTitle,
        data: dataArr,
        fill: false,
        borderColor: 'rgb(75,192,192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <div id="line-chart-container">
        <Line data={lineData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default LineChart;
