import { useDispatch, useSelector } from "react-redux";
import { open } from "../../redux/Actions";
import './Style.css';
import { Button } from "react-bootstrap";
import { useFirestore } from "reactfire";
import * as MdIcons from 'react-icons/md';

function MovieCard({ item }) {

    const dispatch = useDispatch();

    const db = useFirestore();

    const openMovieDetails = (val, movieDetailsBody, title, category, rate, id) => {
        dispatch(open(val, movieDetailsBody, title, category, rate, id));
    }

    const viewMovieDetails = () => {
        openMovieDetails('Movie Details', 'no add', item.title, item.category, item.rate, item.id)
    }

    const viewMovieEdit = () => {
        openMovieDetails('Edit Movie', 'edit', item.title, item.category, item.rate, item.id)
    }

    const deleteMovie = () => {
        db.collection("Movies").doc(item.id)
        .delete()
    }

    return (
        <>
            <div onClick={viewMovieDetails} className="card border-dark mb-3" style={{ width: '80%', height: 100, margin: 'auto', border: 'none', borderRadius: 0, borderBottom: '2px solid' }}>
                <div className="card-body text-dark" style={{ display: 'flex' }}>
                    <img className='movieImg' src={item.imageSrc} />
                    <h6 className='movieTitle'>{item.title}</h6>
                </div>
            </div>
            <Button className='editBtn' onClick={viewMovieEdit} title='Edit'><MdIcons.MdEdit size={20} /></Button>
            <Button className='deleteBtn' onClick={deleteMovie} title='Delete'><MdIcons.MdDelete size={20} /></Button>
        </>
    );
}

export default MovieCard;