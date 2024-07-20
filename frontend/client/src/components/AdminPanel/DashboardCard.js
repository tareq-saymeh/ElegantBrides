// DashboardCard.js
import React from 'react';

const DashboardCard = ({ icon, iconClass, value, label, progress, progressClass }) => {
  return (
    <div className="col-xl-3 col-sm-6 col-12">
      <div className="card DashboardCard">
        <div className="card-content">
          <div className="card-body">
            <div className="media d-flex">
              <div className="align-self-center">
                <i className={`icon ${icon} ${iconClass} font-large-2 float-left`}></i>
              </div>
              <div className="media-body text-right">
                <h3>{value}</h3>
                <span>{label}</span>
              </div>
            </div>
            {progress && (
              <div className="progress mt-1 mb-0" style={{ height: '7px' }}>
                <div
                  className={`progress-bar ${progressClass}`}
                  role="progressbar"
                  style={{ width: `${progress}%` }}
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
