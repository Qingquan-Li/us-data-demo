import { useState, useEffect } from 'react';
import axios from 'axios';
import { RootAPIURL } from './RootAPIURL';

export default function DataTableAndSearch() {
  const [data, setData] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios(RootAPIURL + '/data');
  //     setData(result.data);
  //   };

  //   fetchData();
  // }, []);

  // For "Refresh" button
  const fetchData = async () => {
    const result = await axios(RootAPIURL + '/data');
    setData(result.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = async () => {
    if (!searchField) {
      alert('Please select a field before searching.');
      return;
    }
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
    const result = await axios.post(RootAPIURL + '/search', {
      search_field: searchField,
      target_value: searchValue
    });
    setData(result.data);
    // Set to true once a search is executed
    setHasSearched(true);

  };

  // For "Go Back to the US Data 500 Table" button
  const handleReset = () => {
    setSearchField('');
    setTargetValue('');
    fetchData();
    // Set back to false once the table is reset
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen flex flex-col p-4">
      
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
        {/* Conditionally render the button based on hasSearched */}
        {hasSearched && (
          <button className="px-4 py-2 bg-blue-600 text-white rounded mx-1" onClick={handleReset}>
            Go Back to the US Data 500 Table
          </button>
        )}
      </div>
      {data.length === 1 && searchField === 'first_name' ? (
        <div className="flex items-center">
          <img className="mr-4" src="https://raw.githubusercontent.com/Qingquan-Li/files/main/us-data-demo/user.png" alt="User Icon" />
          <div>
            <h2 className="text-xl font-semibold">{data[0].first_name} {data[0].last_name}</h2>
            <p className="text-gray-700">Company Name: {data[0].company_name}</p>
            <p className="text-gray-700">Address: {data[0].address}</p>
            <p className="text-gray-700">City: {data[0].city}</p>
            <p className="text-gray-700">County: {data[0].county}</p>
            <p className="text-gray-700">State: {data[0].state}</p>
            <p className="text-gray-700">Zip: {data[0].zip}</p>
            <p className="text-gray-700">Phone 1: {data[0].phone1}</p>
            <p className="text-gray-700">Phone 2: {data[0].phone2}</p>
            <p className="text-gray-700">Email: {data[0].email}</p>
            <p className="text-gray-700">Web: {data[0].web}</p>
          </div>
        </div>
      ) : data.length === 1 && searchField === 'company_name' ? (
        <div>
          <video className="w-96 mb-4" controls>
            <source src="https://raw.githubusercontent.com/Qingquan-Li/files/main/us-data-demo/neARabl.mp4" type="video/mp4" />
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
