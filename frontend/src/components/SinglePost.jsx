import TravelRow from './TravelRow';

function SinglePost({ travel }) {
    return(
        <div className='homepage'>
            <div>
                <h2>{travel.title}</h2>
                <p>{travel.date}</p>
                <p>{travel.text}</p>
            </div>
        </div>
    );
}

export default SinglePost