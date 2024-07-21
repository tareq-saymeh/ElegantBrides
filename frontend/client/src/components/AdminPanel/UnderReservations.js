import React from 'react';

const UnderReservations = () => {
  return (
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
            <th scope="col">Late Tax</th>
            <th scope="col">Received</th>
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
            <td>$10</td>
            <td><button className="btn btn-success">Received</button></td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Veil</td>
            <td>2024-07-05</td>
            <td>2024-07-15</td>
            <td>098-765-4321</td>
            <td>$5</td>
            <td><button className="btn btn-success">Received</button></td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Emily</td>
            <td>Shoes</td>
            <td>2024-07-08</td>
            <td>2024-07-18</td>
            <td>555-123-4567</td>
            <td>$8</td>
            <td><button className="btn btn-success">Received</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UnderReservations;
