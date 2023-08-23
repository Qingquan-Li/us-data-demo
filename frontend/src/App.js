// import { useState, useEffect } from 'react';
// import DataTable from './components/DataTable';
// import Search from './components/Search';

// // Local:
// // const API_URL = 'http://localhost:5000/api';
// // Production:
// const API_URL = 'https://us-data-demo.qingquanli.com/api';

// export default function App() {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//       const fetchData = async () => {
//           try {
//               const response = await fetch(API_URL + '/data');
//               if (!response.ok) {
//                   throw new Error('Network response was not ok');
//               }
//               const data = await response.json();
//               setData(data);
//           } catch (error) {
//               console.error("There was a problem with the fetch operation:", error.message);
//           }
//       };
//       fetchData();
//     }, []);
  
//     return (
//         <div className="App">
//             <Search onSearch={setData} />
//             <DataTable data={data} />
//             {/* add Summary and Visualization components as needed */}
//         </div>
//     );
// }


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Local:
// const API_URL = 'http://localhost:5000/api';
// Production:
const API_URL = 'https://us-data-demo.qingquanli.com/api';

export default function App() {
  const [data, setData] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [targetValue, setTargetValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(API_URL + '/data');
      setData(result.data);
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    // Convert the target value to a number if the search field is 'zip'
    // Otherwise, the search will be a string (`zip` field from API is a number)
    let searchValue = targetValue;
    if (searchField === 'zip') {
        searchValue = parseInt(targetValue, 10);
        if (isNaN(searchValue)) {
            alert('Please enter a valid ZIP code.');
            return;
        }
    }

    const result = await axios.post(API_URL + '/search', {
        search_field: searchField,
        target_value: searchValue
    });

    setData(result.data);
};


  return (
    <div className="App">
      <h1>US Data 500</h1>
      <button onClick={() => window.location.reload(false)}>Refresh</button>
      <div>
        <select value={searchField} onChange={e => setSearchField(e.target.value)}>
          <option value="">Select a field</option>
          <option value="first_name">First Name</option>
          <option value="last_name">Last Name</option>
          <option value="company_name">Company Name</option>
          <option value="address">Address</option>
          <option value="city">City</option>
          <option value="county">County</option>
          <option value="state">State</option>
          <option value="zip">Zip</option>
          <option value="phone1">Phone 1</option>
          <option value="phone2">Phone 2</option>
          <option value="email">Email</option>
          <option value="web">Web</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          value={targetValue}
          onChange={e => setTargetValue(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {data.length === 1 && searchField === 'first_name' ? (
        <div>
          <img src="https://raw.githubusercontent.com/jinchen003/Nearabl.Sample.Data/main/user.png" alt="User Icon" />
          {/* Display user details */}
          <div>
            <h2>{data[0].first_name} {data[0].last_name}</h2>
            <p>Email: {data[0].email}</p>
            {/* Add more details as needed */}
          </div>
        </div>
      ) : data.length === 1 && searchField === 'company_name' ? (
        <div>
          <video width="320" height="240" controls>
            <source src="https://raw.githubusercontent.com/jinchen003/Nearabl.Sample.Data/main/neARabl.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Display company details */}
          <div>
            <h2>{data[0].company_name}</h2>
            <p>Address: {data[0].address}</p>
            {/* Add more details as needed */}
          </div>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Company Name</th>
              <th>Address</th>
              <th>City</th>
              <th>County</th>
              <th>State</th>
              <th>Zip</th>
              <th>Phone 1</th>
              <th>Phone 2</th>
              <th>Email</th>
              <th>Web</th>
            </tr>
          </thead>
          <tbody>
            {data.map(person => (
              <tr key={person.email}>
                <td>{person.first_name}</td>
                <td>{person.last_name}</td>
                <td>{person.company_name}</td>
                <td>{person.address}</td>
                <td>{person.city}</td>
                <td>{person.county}</td>
                <td>{person.state}</td>
                <td>{person.zip}</td>
                <td>{person.phone1}</td>
                <td>{person.phone2}</td>
                <td>{person.email}</td>
                <td>{person.web}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
