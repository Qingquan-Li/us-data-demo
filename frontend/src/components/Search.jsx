import { useState } from 'react';

export default function Search({ onSearch }) {
    const [searchField, setSearchField] = useState('');
    const [targetValue, setTargetValue] = useState('');

    const handleSearch = async () => {
        const response = await fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ searchField, targetValue })
        });
        const data = await response.json();
        onSearch(data);
    };

    return (
        <div>
            <select value={searchField} onChange={e => setSearchField(e.target.value)}>
                <option value="first_name">First Name</option>
                <option value="last_name">Last Name</option>
                <option value="company_name">Company Name</option>
                <option value="state">State</option>
            </select>
            <input
                type="text"
                value={targetValue}
                onChange={e => setTargetValue(e.target.value)}
                placeholder="Search..."
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}
