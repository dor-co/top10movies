import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useFirestore } from "reactfire";
import { useDispatch } from "react-redux";
import { close } from "../../redux/Actions";
import * as MdIcons from 'react-icons/md';
import './Style.css';

function MovieDetailsBody() {
    const moviesRed = useSelector((state) => state.moviesReducer);

    const dispatch = useDispatch();

    const db = useFirestore();

    const closeModal = () => {
        return dispatch(close())
    }

    const clickDeleteMovie = () => {
        db.collection("Movies").doc(moviesRed.id)
        .delete()

        return dispatch(close())
    }

    return (
        <div>
            {moviesRed.body === 'no add' ? (
                <>
                    <h2>{moviesRed.title}</h2>
                    <h5><MdIcons.MdStar size={25} color={'#eccf00'} /> {moviesRed.rate}/10</h5>
                    <h6>{moviesRed.category}</h6>
                </>
            ) : (
                <>
                    <h4 className='deleteTitle'>Are you sure you want to delete '{moviesRed.title}' movie?</h4>
                </>
            )}

            <div>
                {moviesRed.body === 'delete' && 
                    <Button className='deleteMovieBtn' onClick={clickDeleteMovie}>Delete</Button>                
                }
                <Button className='closeModalBtn' onClick={closeModal}>{moviesRed.body === 'no add' ? 'Close' : 'Cancel'}</Button>
            </div>
        </div>
    );
}

export default MovieDetailsBody;