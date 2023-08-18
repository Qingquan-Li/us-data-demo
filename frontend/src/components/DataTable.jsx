export default function DataTable({ data }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Company Name</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {data.map(row => (
                    <tr key={row.email}>
                        <td>{row.first_name}</td>
                        <td>{row.last_name}</td>
                        <td>{row.company_name}</td>
                        <td>{row.address}</td>
                        <td>{row.city}</td>
                        <td>{row.state}</td>
                        <td>{row.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
