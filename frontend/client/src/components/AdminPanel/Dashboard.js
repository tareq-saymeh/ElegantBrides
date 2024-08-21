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

  const language = localStorage.getItem('language') || 'ar'; // Default language is Arabic

  // Translation object
  const translations = {
    en: {
      noUsers: 'No.Users',
      underReservation: 'Under reservation',
      todayReservation: 'Today reservation',
      totalVisits: 'Total Visits',
      noDress: 'No.Dress',
      noShoes: 'No.Shoes',
      noFlowers: 'No.Flowers',
      noJewelry: 'No.Jewelry',
      noAccessories: 'No.Accessories',
      noVeils: 'No.Veils',
      noDressNotReturned: 'No.Dress Not Returned',
      noShoesNotReturned: 'No.Shoes Not Returned',
      noFlowersNotReturned: 'No.Flowers Not Returned',
      noJewelryNotReturned: 'No.Jewelry Not Returned',
      noAccessoriesNotReturned: 'No.Accessories Not Returned',
      noVeilsNotReturned: 'No.Veils Not Returned',
      selectTimePeriod: 'Select Time Period',
      monthly: 'Monthly',
      daily: 'Daily',
      yearly: 'Yearly',
      reservationRequestMonthly: 'Reservation Request - Monthly',
      reservationRequestDaily: 'Reservation Request - Daily',
      reservationRequestYearly: 'Reservation Request - Yearly',
      websiteVisitsMonthly: 'Website Visits - Monthly',
      websiteVisitsDaily: 'Website Visits - Daily',
      websiteVisitsYearly: 'Website Visits - Yearly',
    },
    ar: {
      noUsers: 'عدد المستخدمين',
      underReservation: ' حجوزات حاليه',
      todayReservation: 'حجز اليوم',
      totalVisits: 'إجمالي الزيارات',
      noDress: 'عدد الفساتين',
      noShoes: 'عدد الأحذية',
      noFlowers: 'عدد الزهور',
      noJewelry: 'عدد المجوهرات',
      noAccessories: 'عدد الإكسسوارات',
      noVeils: 'عدد الأوشحة',
      noDressNotReturned: 'عدد الفساتين غير المعادة',
      noShoesNotReturned: 'عدد الأحذية غير المعادة',
      noFlowersNotReturned: 'عدد الزهور غير المعادة',
      noJewelryNotReturned: 'عدد المجوهرات غير المعادة',
      noAccessoriesNotReturned: 'عدد الإكسسوارات غير المعادة',
      noVeilsNotReturned: 'عدد الأوشحة غير المعادة',
      selectTimePeriod: 'اختر فترة زمنية',
      monthly: 'شهري',
      daily: 'يومي',
      yearly: 'سنوي',
      reservationRequestMonthly: 'طلب الحجز - شهري',
      reservationRequestDaily: 'طلب الحجز - يومي',
      reservationRequestYearly: 'طلب الحجز - سنوي',
      websiteVisitsMonthly: 'زيارات الموقع - شهري',
      websiteVisitsDaily: 'زيارات الموقع - يومي',
      websiteVisitsYearly: 'زيارات الموقع - سنوي',
    }
  };

  const handleReservationSelect = (eventKey) => {
    switch (eventKey) {
      case 'monthly':
        setReservationData([20, 25, 30, 30, 25, 40]);
        setReservationLabels(["January", "February", "March", "April", "May", "June"]);
        setReservationTitle(translations[language].reservationRequestMonthly);
        break;
      case 'daily':
        setReservationData([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]);
        setReservationLabels(["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10", "Day 11", "Day 12"]);
        setReservationTitle(translations[language].reservationRequestDaily);
        break;
      case 'yearly':
        setReservationData([200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750]);
        setReservationLabels(["2020", "2021", "2022", "2023", "2024"]);
        setReservationTitle(translations[language].reservationRequestYearly);
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
        setVisitTitle(translations[language].websiteVisitsMonthly);
        break;
      case 'daily':
        setVisitData([10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]);
        setVisitLabels(["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10", "Day 11", "Day 12"]);
        setVisitTitle(translations[language].websiteVisitsDaily);
        break;
      case 'yearly':
        setVisitData([1200, 2400, 3600, 4800, 6000, 7200]);
        setVisitLabels(["2019", "2020", "2021", "2022", "2023", "2024"]);
        setVisitTitle(translations[language].websiteVisitsYearly);
        break;
      default:
        break;
    }
  };

  return (
    <div className='dashboardContant'>
      <section id="minimal-statistics">
        <div className="row">
          <DashboardCard icon="icon-pencil" iconClass="primary" value="278" label={translations[language].noUsers} />
          <DashboardCard icon="icon-speech" iconClass="warning" value="156" label={translations[language].underReservation} />
          <DashboardCard icon="icon-graph" iconClass="success" value="64" label={translations[language].todayReservation} />
          <DashboardCard icon="icon-pointer" iconClass="danger" value="423" label={translations[language].totalVisits} />
        </div>

        <div className="row">
          <DashboardCard icon="icon-pencil" iconClass="primary" value="278" label={translations[language].noDress} />
          <DashboardCard icon="icon-speech" iconClass="warning" value="156" label={translations[language].noShoes} />
          <DashboardCard icon="icon-graph" iconClass="success" value="64" label={translations[language].noFlowers} />
          <DashboardCard icon="icon-pointer" iconClass="danger" value="423" label={translations[language].noJewelry} />
          <DashboardCard icon="icon-pointer" iconClass="danger" value="423" label={translations[language].noAccessories} />
          <DashboardCard icon="icon-pointer" iconClass="danger" value="423" label={translations[language].noVeils} />
          <DashboardCard icon="icon-direction" iconClass="success" value="5" label={translations[language].noDressNotReturned} progress={95} progressClass="bg-success" />
          <DashboardCard icon="icon-direction" iconClass="danger" value="100" label={translations[language].noShoesNotReturned} progress={40} progressClass="bg-danger" />
          <DashboardCard icon="icon-direction" iconClass="danger" value="20" label={translations[language].noFlowersNotReturned} progress={40} progressClass="bg-danger" />
          <DashboardCard icon="icon-direction" iconClass="warning" value="44" label={translations[language].noJewelryNotReturned} progress={40} progressClass="bg-warning" />
          <DashboardCard icon="icon-direction" iconClass="warning" value="42" label={translations[language].noAccessoriesNotReturned} progress={40} progressClass="bg-warning" />
          <DashboardCard icon="icon-direction" iconClass="success" value="23" label={translations[language].noVeilsNotReturned} progress={40} progressClass="bg-success" />
        </div>

        <div className="row">
          <div className='col-md-6'>
            <DropdownButton id="dropdown-reservation-button" title={translations[language].selectTimePeriod} onSelect={handleReservationSelect}>
              <Dropdown.Item eventKey="monthly">{translations[language].monthly}</Dropdown.Item>
              <Dropdown.Item eventKey="daily">{translations[language].daily}</Dropdown.Item>
              <Dropdown.Item eventKey="yearly">{translations[language].yearly}</Dropdown.Item>
            </DropdownButton>
            <LineChart 
              chartData={reservationData} 
              chartLabels={reservationLabels} 
              chartTitle={reservationTitle} 
            />
          </div>
          <div className='col-md-6'>
            <DropdownButton id="dropdown-visit-button" title={translations[language].selectTimePeriod} onSelect={handleVisitSelect}>
              <Dropdown.Item eventKey="monthly">{translations[language].monthly}</Dropdown.Item>
              <Dropdown.Item eventKey="daily">{translations[language].daily}</Dropdown.Item>
              <Dropdown.Item eventKey="yearly">{translations[language].yearly}</Dropdown.Item>
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
