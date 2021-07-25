//import logo from '../logo.svg';
import '../App.css';
import { Button, Modal } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import { useFirestore } from "reactfire";
import "firebase/firestore";
import MovieCard from '../components/MovieCard';
import { useSelector, useDispatch } from "react-redux";
import { open, close } from "../redux/Actions";
import AddMovieBody from '../components/addMovieBody/AddMovieBody';
import MovieDetailsBody from '../components/movieDetailsBody/MovieDetailsBody';

function App() {
    const moviesRed = useSelector((state) => state.moviesReducer);
    const dispatch = useDispatch();

    const db = useFirestore();

    //const [modalOpen, setModalOpen] = useState(false);
    const [movie, setMovie] = useState([]);
    const [selectCategory, setSelectCategory] = useState('');

    // const ref = useFirestore().collection("Movies").doc("MoviesList");
    // const refData = useFirestoreDocData(ref).data;
    // console.log('!!!!',refData)

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

    // console.log(movie);

    const openModal = (add, addBody) => {
        // setModalOpen(true)
        dispatch(open(add, addBody));
    }

    const addMovie = () => {
        // setModalOpen(true)
        openModal('Add New Movie', 'addBody')
    }

    const closeModal = () => {
        //setModalOpen(false)
        return dispatch(close())
    }

    const selectChange = (opt) => {
        setSelectCategory(opt.target.value)
    }

    return (
        <div className="App">
            <h1>top 10 movies of ABC company</h1>
            
            <div style={{marginBottom: 15}}>
                <Button onClick={addMovie} style={{position: 'absolute', right: 10}}>Add Movie</Button>

                <div className="col-md-3 position-relative" style={{ margin: 10 }}>
                    {/* <label for="validationTooltip04" class="form-label">State</label> */}
                    <select value={selectCategory} onChange={selectChange} className="form-select" id="validationTooltip04" required>
                        <option selected disabled value="">Filter By</option>
                        <option>select all</option>
                        <option>פעולה</option>
                        <option>מדע בדיוני</option>
                        <option>מתח</option>
                        <option>קומדיה</option>
                        <option>דרמה</option>
                    </select>
                    <div className="invalid-tooltip">
                        Please select a valid state.
                    </div>
                </div>
            </div>

            {
                selectCategory !== '' && selectCategory !== 'select all' ? (
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
                        {moviesRed.body === 'addBody' ? (
                            <>
                                {/* <h3>add!!!</h3> */}
                                <AddMovieBody />
                            </>
                        ) : (
                            <MovieDetailsBody />
                        )}
                    </div>

                </Modal.Body>
                {/* <Modal.Footer style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    </Modal.Footer> */}
            </Modal>

        </div>
    );
}

export default App;
