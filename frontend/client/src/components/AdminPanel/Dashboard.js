// Dashboard.js
import React from 'react';
import DashboardCard from './DashboardCard';
import LineChart from './LineChart.js';


const Dashboard = () => {
  const chartData = "20,25,30,30,25,40"; // example data
  const chartLabels = "January,February,March,April,May,June"; // example labels
  const chartTitle = "Reservation Request"; // example title
  return (
    <div className='dashboardContant'>
    <section id="minimal-statistics">
      
      <div className="row">
        <DashboardCard icon="icon-pencil" iconClass="primary" value="278" label="No.Users" />
        <DashboardCard icon="icon-speech" iconClass="warning" value="156" label="Under reservation" />
        <DashboardCard icon="icon-graph" iconClass="success" value="64" label="Today reservation" />
        <DashboardCard icon="icon-pointer" iconClass="danger" value="423" label="Total Visits" />
      </div>
      
      
      <div className="row">
        <DashboardCard icon="icon-pencil" iconClass="primary" value="278" label="No.Dress" />
        <DashboardCard icon="icon-speech" iconClass="warning" value="156" label="No.Shoes" />
        <DashboardCard icon="icon-graph" iconClass="success" value="64" label="No.Flowers" />
        <DashboardCard icon="icon-pointer" iconClass="danger" value="423" label="No.Jewerly" />
        <DashboardCard icon="icon-pointer" iconClass="danger" value="423" label="No.Accessories" />
        <DashboardCard icon="icon-pointer" iconClass="danger" value="423" label="No.Vailes" />
        <DashboardCard icon="icon-direction" iconClass="success" value="5" label="No.Dress Not Returned" progress={95} progressClass="bg-success" />
        <DashboardCard icon="icon-direction" iconClass="danger" value="100" label="No.Shoes Not Returned" progress={40} progressClass="bg-danger" />
        <DashboardCard icon="icon-direction" iconClass="danger" value="20" label="No.Flowers Not Returned" progress={40} progressClass="bg-danger" />
        <DashboardCard icon="icon-direction" iconClass="warning" value="44" label="No.Jewerly Not Returned" progress={40} progressClass="bg-warning" />
        <DashboardCard icon="icon-direction" iconClass="warning" value="42" label="No.Accessories Not Returned" progress={40} progressClass="bg-warning" />
        <DashboardCard icon="icon-direction" iconClass="success" value="23" label="No.Vailes Not Returned" progress={40} progressClass="bg-success" />
      </div>
      <div className='DashBoardChart'>
      <LineChart 
        chartData={chartData} 
        chartLabels={chartLabels} 
        chartTitle={chartTitle} 
      /></div>
    </section>
    
    
    </div>
  );
};

export default Dashboard;
