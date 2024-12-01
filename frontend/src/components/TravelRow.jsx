import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

function TravelRow({ travel, removeTravel }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/travels/${travel._id}`, {
                method: 'DELETE',
            });

            if (response.status === 204) {
                alert('Travel deleted successfully!');
                window.location.reload();
            } else {
                alert('Failed to delete travel.');
            }
        } catch (error) {
            console.error('Error deleting travel:', error);
            alert('An error occurred while deleting the travel.');
        }
    };

    return (
        <tr>
            <td>{travel.title}</td>
            <td>{travel.text}</td>
            <td>{travel.date}</td>
            <td>
                <FaEdit onClick={() => navigate(`/edit/${travel._id}`)} /> {}
                <FaTrash onClick={handleDelete} />
            </td>
        </tr>
    );
}

export default TravelRow;
