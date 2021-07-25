import { useSelector, useDispatch } from "react-redux";

function MovieDetailsBody(){
    const moviesRed = useSelector((state) => state.moviesReducer);
    const dispatch = useDispatch();

    console.log(moviesRed)

    return(
        <div>
            <h1>{moviesRed.title}</h1>
            <h3>Category: {moviesRed.category}</h3>
            <h3>Rating: {moviesRed.rate}</h3>
        </div>
    );
}

export default MovieDetailsBody;