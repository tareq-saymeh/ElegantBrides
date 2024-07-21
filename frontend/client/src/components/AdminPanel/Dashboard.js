import React, { useState } from 'react';
import DashboardCard from './DashboardCard';
import LineChart from './LineChart';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const Dashboard = () => {
  const [reservationData, setReservationData] = useState([20, 25, 30, 30, 25, 40]);
  const [reservationLabels, setReservationLabels] = useState(["January", "February", "March", "April", "May", "June"]);
  const [reservationTitle, setReservationTitle] = useState("Reservation Request");

  const [visitData, setVisitData] = useState([100, 200, 300, 400, 500, 600]);
  const [visitLabels, setVisitLabels] = useState(["January", "February", "March", "April", "May", "June"]);
  const [visitTitle, setVisitTitle] = useState("Website Visits");

  const handleReservationSelect = (eventKey) => {
    switch (eventKey) {
      case 'monthly':
        setReservationData([20, 25, 30, 30, 25, 40]);
        setReservationLabels(["January", "February", "March", "April", "May", "June"]);
        setReservationTitle("Reservation Request - Monthly");
        break;
      case 'daily':
        setReservationData([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]);
        setReservationLabels(["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10", "Day 11", "Day 12"]);
        setReservationTitle("Reservation Request - Daily");
        break;
      case 'yearly':
        setReservationData([200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750]);
        setReservationLabels(["2020", "2021", "2022", "2023", "2024"]);
        setReservationTitle("Reservation Request - Yearly");
        break;
      default:
        break;
    }
  };

  const handleVisitSelect = (eventKey) => {
    switch (eventKey) {
      case 'monthly':
        setVisitData([100, 200, 300, 400, 500, 600]);
        setVisitLabels(["January", "February", "March", "April", "May", "June"]);
        setVisitTitle("Website Visits - Monthly");
        break;
      case 'daily':
        setVisitData([10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]);
        setVisitLabels(["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10", "Day 11", "Day 12"]);
        setVisitTitle("Website Visits - Daily");
        break;
      case 'yearly':
        setVisitData([1200, 2400, 3600, 4800, 6000, 7200]);
        setVisitLabels(["2019", "2020", "2021", "2022", "2023", "2024"]);
        setVisitTitle("Website Visits - Yearly");
        break;
      default:
        break;
    }
  };

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

        <div className="row">
          <div className='col-md-6'>
            <DropdownButton id="dropdown-reservation-button" title="Select Time Period" onSelect={handleReservationSelect}>
              <Dropdown.Item eventKey="monthly">Monthly</Dropdown.Item>
              <Dropdown.Item eventKey="daily">Daily</Dropdown.Item>
              <Dropdown.Item eventKey="yearly">Yearly</Dropdown.Item>
            </DropdownButton>
            <LineChart 
              chartData={reservationData} 
              chartLabels={reservationLabels} 
              chartTitle={reservationTitle} 
            />
          </div>
          <div className='col-md-6'>
            <DropdownButton id="dropdown-visit-button" title="Select Time Period" onSelect={handleVisitSelect}>
              <Dropdown.Item eventKey="monthly">Monthly</Dropdown.Item>
              <Dropdown.Item eventKey="daily">Daily</Dropdown.Item>
              <Dropdown.Item eventKey="yearly">Yearly</Dropdown.Item>
            </DropdownButton>
            <LineChart 
              chartData={visitData} 
              chartLabels={visitLabels} 
              chartTitle={visitTitle} 
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
