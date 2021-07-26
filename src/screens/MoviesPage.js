//import logo from '../logo.svg';
import '../App.css';
import { Button, Modal } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import { useFirestore } from "reactfire";
import "firebase/firestore";
import MovieCard from '../components/movieCard/MovieCard';
import { useSelector, useDispatch } from "react-redux";
import { open, close, getData } from "../redux/Actions";
import AddMovieBody from '../components/addMovieBody/AddMovieBody';
import MovieDetailsBody from '../components/movieDetailsBody/MovieDetailsBody';
import EditMovieBody from '../components/editMovieBody/EditMovieBody';
import './Style.css';

function App() {
    const moviesRed = useSelector((state) => state.moviesReducer);
    
    const dispatch = useDispatch();

    const db = useFirestore();

    const [movie, setMovie] = useState([]);
    const [selectCategory, setSelectCategory] = useState('');

    const useItems = (itemType, callback, items) => {
        useEffect(() => {
            const fetchData = async () => {
                await db
                    .collection(itemType) //access firestore //access "items" collection
                    .onSnapshot((snapshot) => {
                        let listItems = [];

                        listItems = snapshot.docs.map((doc) => ({
                            id: doc.id, //id and data pushed into items array
                            ...doc.data(), //spread operator merges data to id.
                        }));
                        callback(listItems); //items is equal to listItems
                    });
            };
            fetchData();
        }, []);
        return items;
    };

    useItems("Movies", setMovie, movie);

    const openModal = (add, addBody) => {
        dispatch(getData(movie));
        dispatch(open(add, addBody));
    }

    const addMovie = () => {
        openModal('Add New Movie', 'addBody')
    }

    const closeModal = () => {
        return dispatch(close())
    }

    const selectChange = (opt) => {
        setSelectCategory(opt.target.value)
    }

    return (
        <div className="App">
            <h1 className='screenTitle'>Top 10 movies of ABC company</h1>

            <div className='screenContainer'>
                <Button className='addMovieBtn' onClick={addMovie}>Add Movie</Button>

                <div className="col-md-3 position-relative selectContainer">
                    {/* <label for="validationTooltip04" class="form-label">State</label> */}
                    <select value={selectCategory} onChange={selectChange} className="form-select selectStyle" id="validationTooltip04" required>
                        <option selected disabled value="">Filter By</option>
                        <option>Select All</option>
                        <option>Action</option>
                        <option>Science Fiction</option>
                        <option>Thriller</option>
                        <option>Comedy</option>
                        <option>Drama</option>
                    </select>
                    <div className="invalid-tooltip">
                        Please select a valid state.
                    </div>
                </div>
            </div>

            {
                selectCategory !== '' && selectCategory !== 'Select All' ? (
                    movie
                    .filter(e => e.category === selectCategory)
                    .sort((a, b) => b.rate - a.rate)
                    .slice(0, 10)
                    .map(item => {
                        return (
                            <MovieCard item={item} />
                        );
                    })
                ) : (
                    movie
                    .sort((a, b) => b.rate - a.rate)
                    .slice(0, 10)
                    .map(item => {
                        return (
                            <MovieCard item={item} />
                        );
                    })
                )
            }

            <Modal
                show={moviesRed.boolOpen}
                onHide={closeModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered={true}
                contentclassname={"modal-content "}
            >
                <Modal.Header className='modalHeaderStyle'>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {moviesRed.modalHeader}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modalTextStyle'>
                        {moviesRed.body === 'edit' && (
                            <>
                                <AddMovieBody movieItem={moviesRed} />
                            </>
                        )}

                        {moviesRed.body === 'addBody' && (
                            <>
                                <AddMovieBody movieItem={moviesRed} />
                            </>
                        )}

                        {moviesRed.body === 'no add' && (
                            <>
                                <MovieDetailsBody />
                            </>
                        )}

                    </div>
                </Modal.Body>
            </Modal>

        </div>
    );
}

export default App;
