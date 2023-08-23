// TODO: implement this component

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';
// import { RootAPIURL } from './RootAPIURL';

// export default function PeopleDistribution() {
//   const [peopleData, setPeopleData] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios.get(RootAPIURL + '/num-of-people-per-state');
//       setPeopleData(result.data);
//     };
//     fetchData();
//   }, []);

//   const states = Object.keys(peopleData);
//   const counts = Object.values(peopleData);

//   const totalStates = states.length;
//   const totalPeople = counts.reduce((acc, val) => acc + val, 0);

//   const chartData = {
//     labels: states,
//     datasets: [
//       {
//         label: '# of People',
//         peopleData: counts,
//         backgroundColor: 'rgba(75,192,192,0.4)',
//         borderColor: 'rgba(75,192,192,1)',
//         borderWidth: 1,
//       }
//     ]
//   };

//   return (
//     <div>
//       <h2>Summary Statistics</h2>
//       <p>Total states: {totalStates}</p>
//       <p>Total people: {totalPeople}</p>

//       <h2>People Distribution Across US</h2>
//       <Bar data={chartData} options={{ scales: { y: { beginAtZero: true } } }} />
//     </div>
//   );
// }
