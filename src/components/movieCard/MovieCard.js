import { useDispatch } from "react-redux";
import { open } from "../../redux/Actions";
import './Style.css';
import { Button } from "react-bootstrap";
import * as MdIcons from 'react-icons/md';

function MovieCard({ item }) {

    const dispatch = useDispatch();

    const openMovieDetails = (val, movieDetailsBody, title, category, rate, id, image) => {
        dispatch(open(val, movieDetailsBody, title, category, rate, id, image));
    }

    const viewMovieDetails = () => {
        openMovieDetails('Movie Details', 'no add', item.title, item.category, item.rate, item.id)
    }

    const viewMovieEdit = () => {
        openMovieDetails('Edit Movie', 'edit', item.title, item.category, item.rate, item.id, item.imageSrc)
    }

    const deleteMovie = () => {
        openMovieDetails('Delete Movie', 'delete', item.title, item.category, item.rate, item.id, item.imageSrc)
    }

    return (
        <>
            <div onClick={viewMovieDetails} className="card border-dark mb-3 cardTextStyle">
                <div className="card-body text-dark cardTextBody">
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