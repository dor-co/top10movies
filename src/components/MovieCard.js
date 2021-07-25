import { useDispatch, useSelector } from "react-redux";
import { open } from "../redux/Actions";
import './Style.css';
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useFirestore } from "reactfire";

function MovieCard({ item }) {

    const dispatch = useDispatch();

    const db = useFirestore();

    const openEditView = () => {

    }

    // console.log('redux from card', moviesRed.boolOpen)

    // console.log('item from card', item.id)

    const openMovieDetails = (val, movieDetailsBody, title, category, rate, id) => {
        dispatch(open(val, movieDetailsBody, title, category, rate, id));
    }

    const viewMovieDetails = () => {
        // setModalOpen(true)
        openMovieDetails('Movie Details', 'no add', item.title, item.category, item.rate, item.id)
    }

    const viewMovieEdit = () => {
        // setModalOpen(true)
        openMovieDetails('Edit Movie', 'edit', item.title, item.category, item.rate, item.id)
    }

    const deleteMovie = () => {
        db.collection("Movies").doc(item.id)
        .delete()
    }

    return (
        <>
            <div onClick={viewMovieDetails} className="card border-dark mb-3" style={{ width: '80%', height: 100, margin: 'auto', border: 'none', borderRadius: 0, borderBottom: '2px solid' }}>
                {/* <div className="card-header">{item.title}</div> */}
                <div className="card-body text-dark" style={{ display: 'flex' }}>

                    {/* <h5 className="card-title">rate: {item.rate}</h5> */}
                    {/* <p className="card-text">{item.category}</p> */}
                    <img src={item.imageSrc} style={{ height: 67 }} />
                    <h6 style={{ marginLeft: 10, marginTop: 22 }}>{item.title}</h6>
                    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}

                </div>

            </div>
            <Button onClick={viewMovieEdit} style={{ display: 'flex', margin: 'auto', marginTop: -60, marginRight: '10%', position: 'absolute', right: 10 }}>Edit</Button>
            <Button onClick={deleteMovie} style={{ display: 'flex', margin: 'auto', marginTop: -60, marginRight: '10%', position: 'absolute', right: 70 }}>Delete</Button>
        </>
    );
}

export default MovieCard;