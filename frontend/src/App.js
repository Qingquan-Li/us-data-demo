import { useState, useEffect } from 'react';
import DataTable from './components/DataTable';
import Search from './components/Search';

// Local:
// const API_URL = 'http://localhost:5000/api';
// Production:
const API_URL = 'https://us-data-demo.qingquanli.com/api';

export default function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch(API_URL + '/data');
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
              setData(data);
          } catch (error) {
              console.error("There was a problem with the fetch operation:", error.message);
          }
      };
      fetchData();
    }, []);
  
    return (
        <div className="App">
            <Search onSearch={setData} />
            <DataTable data={data} />
            {/* add Summary and Visualization components as needed */}
        </div>
    );
}
