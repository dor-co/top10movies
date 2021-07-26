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
    // const dispatch = useDispatch();

    const [editView, setEditView] = useState(false);
    // const [title, setTitle] = useState('');
    // const [rate, setRate] = useState('');
    // const [category, setCategory] = useState('');

    //const db = useFirestore();

    const dispatch = useDispatch();

    // console.log('************',moviesRed,'*************')

    // const openEditView = () => {
    //     setTitle(moviesRed.title);
    //     setRate(moviesRed.rate);
    //     setCategory(moviesRed.category)
    //     setEditView(!editView);
    // }

    // const titleInput = (e) => {
    //     setTitle(e.target.value);
    // }

    // const rateInput = (e) => {
    //     setRate(e.target.value);
    // }

    // const categoryInput = (e) => {
    //     setCategory(e.target.value);
    // }

    // const saveEdit = () => {
    //     if (title.trim() !== '' && rate.toString().trim() !== '' && category.trim() !== '') {
    //         db.collection("Movies").doc(moviesRed.id)
    //             .update({
    //                 title: title,
    //                 rate: rate,
    //                 category: category
    //             })

    //         return dispatch(close())
    //     } else {
    //         alert('!!!');
    //     }
    // }

    // const deleteMovie = () => {
    //     db.collection("Movies").doc(moviesRed.id)
    //         .delete()

    //         return dispatch(close())
    //     }

    const closeModal = () => {
        return dispatch(close())
    }

    return (
        <div>
            {/* {editView ? (
                <> */}
                    {/* <form className="was-validated">
                        <div className="mb-3">
                            <label for="validationTextarea" className="form-label">Movie Title*</label>
                            <input value={title} onChange={titleInput} type="text" className="form-control is-invalid" id="validationTextarea" placeholder="Enter movie title" autoComplete="none" required />
                        </div>

                        <div className="mb-3">
                            <label for="validationTextarea" className="form-label">Movie Rate*</label>
                            <input input value={rate} onChange={rateInput} type="number" step="0.1" className="form-control is-invalid" id="validationTextarea" placeholder="Enter movie rate (A number)" autoComplete="none" required />
                        </div>

                        <div className="mb-3">
                            <label for="validationTextarea" className="form-label">Movie Category*</label>
                            <select value={category} onChange={categoryInput} className="form-select" id="validationTooltip04" required>
                                <option selected disabled value="">Select Category</option>
                                <option>Action</option>
                                <option>Science Fiction</option>
                                <option>Thriller</option>
                                <option>Comedy</option>
                                <option>Drama</option>
                            </select>
                        </div>
                        <div>
                            <Button style={{ display: 'flex', margin: 'auto', marginTop: 15 }} onClick={openEditView}>Edit</Button>
                            {title.trim() !== '' && rate.toString().trim() !== '' && category.trim() !== '' ? (
                                <Button style={{ display: 'flex', margin: 'auto', marginTop: 15 }} onClick={saveEdit}>Save</Button>
                            ) : (
                                <Button style={{ display: 'flex', margin: 'auto', marginTop: 15 }} onClick={saveEdit} disabled>Save</Button>
                            )}
                            <Button style={{ display: 'flex', margin: 'auto', marginTop: 15 }} onClick={deleteMovie}>Delete Movie</Button>
                        </div>
                    </form> */}
                {/* </>
            ) : (
                <> */}
                    <h2>{moviesRed.title}</h2>
                    <h5><MdIcons.MdStar size={25} color={'#eccf00'} /> {moviesRed.rate}/10</h5>
                    <h6>{moviesRed.category}</h6>

                    <div>
                        <Button className='closeModalBtn' onClick={closeModal}>Close</Button>
                    </div>
                {/* </>
            )} */}

        </div>
    );
}

export default MovieDetailsBody;