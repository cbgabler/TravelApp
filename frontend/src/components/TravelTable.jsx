import TravelRow from './TravelRow';

function TravelTable({ travels }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Text</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {travels.map(travel => (
                    <TravelRow key={travel._id} travel={travel} />
                ))}
            </tbody>
        </table>
    );
}

export default TravelTable;
