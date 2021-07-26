import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useFirestore } from "reactfire";
import { useDispatch } from "react-redux";
import { close } from "../../redux/Actions";
import * as MdIcons from 'react-icons/md';
import './Style.css';

function MovieDetailsBody() {
    const moviesRed = useSelector((state) => state.moviesReducer);

    const dispatch = useDispatch();

    const closeModal = () => {
        return dispatch(close())
    }

    return (
        <div>
            <h2>{moviesRed.title}</h2>
            <h5><MdIcons.MdStar size={25} color={'#eccf00'} /> {moviesRed.rate}/10</h5>
            <h6>{moviesRed.category}</h6>

            <div>
                <Button className='closeModalBtn' onClick={closeModal}>Close</Button>
            </div>
        </div>
    );
}

export default MovieDetailsBody;