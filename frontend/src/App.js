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
    <div className="min-h-screen flex flex-col p-4">
      <button className="text-3xl font-bold mb-4" onClick={() => window.location.reload(false)}>US Data 500</button>
      <div className="mb-6">
        <select className="border p-2 rounded mr-2" value={searchField} onChange={e => setSearchField(e.target.value)}>
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
          className="border p-2 rounded mr-2"
          type="text"
          placeholder="Search..."
          value={targetValue}
          onChange={e => setTargetValue(e.target.value)}
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSearch}>
          Search
        </button>
      </div>
      {data.length === 1 && searchField === 'first_name' ? (
        <div className="flex items-center">
          <img className="mr-4" src="https://raw.githubusercontent.com/jinchen003/Nearabl.Sample.Data/main/user.png" alt="User Icon" />
          <div>
            <h2 className="text-xl font-semibold">{data[0].first_name} {data[0].last_name}</h2>
            <p className="text-gray-700">Email: {data[0].email}</p>
          </div>
        </div>
      ) : data.length === 1 && searchField === 'company_name' ? (
        <div>
          <video className="w-96 mb-4" controls>
            <source src="https://raw.githubusercontent.com/jinchen003/Nearabl.Sample.Data/main/neARabl.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div>
            <h2 className="text-xl font-semibold">{data[0].company_name}</h2>
            <p className="text-gray-700">Address: {data[0].address}</p>
          </div>
        </div>
      ) : (
        <table className="border-collapse border-2 border-gray-600 w-full">
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
              <tr key={person.email} className="hover:bg-gray-200">
                <td className="border-2 border-gray-400 p-2">{person.first_name}</td>
                <td className="border-2 border-gray-400 p-2">{person.last_name}</td>
                <td className="border-2 border-gray-400 p-2">{person.company_name}</td>
                <td className="border-2 border-gray-400 p-2">{person.address}</td>
                <td className="border-2 border-gray-400 p-2">{person.city}</td>
                <td className="border-2 border-gray-400 p-2">{person.county}</td>
                <td className="border-2 border-gray-400 p-2">{person.state}</td>
                <td className="border-2 border-gray-400 p-2">{person.zip}</td>
                <td className="border-2 border-gray-400 p-2">{person.phone1}</td>
                <td className="border-2 border-gray-400 p-2">{person.phone2}</td>
                <td className="border-2 border-gray-400 p-2">{person.email}</td>
                <td className="border-2 border-gray-400 p-2">{person.web}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
