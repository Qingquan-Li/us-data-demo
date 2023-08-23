import React, { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register everything from Chart.js
Chart.register(...registerables);

export default function PeopleDistribution() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from API when component mounts
    fetch('http://localhost:5000/api/num-of-people-per-state')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const stateNames = Object.keys(data);
  const peopleCounts = Object.values(data);

  const chartData = {
    labels: stateNames,
    datasets: [
      {
        label: 'Number of People',
        data: peopleCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    // maintainAspectRatio: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className='p-5'>
      <div style={{ width: '80%', margin: '0 auto' }}>
      <h2 className='pb-1'>People Distribution Visualization of US Data 500</h2>
        <Bar data={chartData} options={chartOptions} style={{ maxHeight: '400px' }} />
      </div>
    </div>
  );
}
