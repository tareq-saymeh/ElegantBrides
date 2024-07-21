import React from 'react';

const Reservations = () => {
  return (
    <div>
      <h1>Future Reservations</h1>
      <div className="d-flex justify-content-end mb-3">
      </div>
      <div>
        <table className="table table-secondary table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Customer</th>
              <th scope="col">Items</th>
              <th scope="col">Received Date</th>
              <th scope="col">Return Date</th>
              <th scope="col">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Dress</td>
              <td>2024-07-01</td>
              <td>2024-07-10</td>
              <td>123-456-7890</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Veil</td>
              <td>2024-07-05</td>
              <td>2024-07-15</td>
              <td>098-765-4321</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Emily</td>
              <td>Shoes</td>
              <td>2024-07-08</td>
              <td>2024-07-18</td>
              <td>555-123-4567</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservations;