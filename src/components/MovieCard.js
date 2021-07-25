import { useDispatch } from "react-redux";
import { open } from "../redux/Actions";
import './Style.css';

function MovieCard({ item }) {
    // const moviesRed = useSelector((state) => state.moviesReducer);
    const dispatch = useDispatch();

    // console.log('redux from card', moviesRed.boolOpen)

    // console.log('item from card', item.id)

    const openMovieDetails = (val, movieDetailsBody, title, category, rate, id) => {
        dispatch(open(val, movieDetailsBody, title, category, rate, id));
    }

    const viewMovieDetails = () => {
        // setModalOpen(true)
        openMovieDetails('Movie Details', 'no add', item.title, item.category, item.rate, item.id)
    }

    return (
            <div onClick={viewMovieDetails} className="card border-dark mb-3" style={{ width: '80%', height: 141, margin: 'auto' }}>
                <div className="card-header">{item.title}</div>
                <div className="card-body text-dark" style={{display: 'flex'}}>
                    
                    {/* <h5 className="card-title">rate: {item.rate}</h5> */}
                    {/* <p className="card-text">{item.category}</p> */}
                    <img src={item.imageSrc} style={{ height: 67 }} />
                    <h6 style={{marginLeft: 10}}>{item.title}</h6>
                    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                </div>
            </div>
    );
}

export default MovieCard;