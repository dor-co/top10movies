import { useState } from "react";
import { Button } from "react-bootstrap";
import { useFirestore } from "reactfire";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../../redux/Actions";

function AddMovieBody({movieItem}) {
    const firestoreRed = useSelector((state) => state.firestoreReducer);

    const [title, setTitle] = useState(movieItem.body === 'addBody' ? '' : movieItem.title);
    const [rate, setRate] = useState(movieItem.body === 'addBody' ? '' : movieItem.rate);
    const [category, setCategory] = useState(movieItem.body === 'addBody' ? '' : movieItem.category);
    const [titleValid, setTitleValid] = useState(true);

    const db = useFirestore();

    const dispatch = useDispatch();

    const titleInput = (e) => {
        if(movieItem.body === 'addBody'){
            setTitle(e.target.value);
            if (firestoreRed.data.findIndex(x => x.title.toLowerCase() === e.target.value.toLowerCase()) !== -1) {
                setTitleValid(false);
            }else{
                setTitleValid(true);
            }
        }else{
            movieItem.title = e.target.value;
            setTitle(e.target.value);
            if (firestoreRed.data.findIndex(x => x.title.toLowerCase() === e.target.value.toLowerCase()) !== -1) {
                setTitleValid(false);
            }else{
                setTitleValid(true);
            }
        }
    }

    const rateInput = (e) => {
        if(movieItem.body === 'addBody'){
            if (e.target.value < 0) {
                e.target.value = 0;
            } else if (e.target.value > 10) {
                e.target.value = 10;
            }
            setRate(e.target.value);
        }else{
            if (e.target.value < 0) {
                e.target.value = 0;
            } else if (e.target.value > 10) {
                e.target.value = 10;
            }
            movieItem.rate = e.target.value;
            setRate(e.target.value);
        }
    }

    const categoryInput = (e) => {
        if(movieItem.body === 'addBody'){
            setCategory(e.target.value);

        }else{
            movieItem.category = e.target.value;
            setCategory(e.target.value);
        }
    }

    const addNewMovie = () => {
        if (firestoreRed.data.findIndex(x => x.title === title) === -1) {
            db.collection("Movies").add({
                title: title,
                rate: rate,
                category: category
            })
            return dispatch(close())
        }
    }

    const editMovie = () => {
        db.collection("Movies").doc(movieItem.id)
            .update({
                title: title,
                rate: rate,
                category: category
            })
        return dispatch(close())
    }

    return (
        <div>
            <form className="was-validated">
                
                {/* movie title input */}
                <div className="mb-3">
                    <label for="validationTextarea" className="form-label">Movie Title*</label>
                    <input value={movieItem.body === 'addBody' ? title : movieItem.title} onChange={titleInput} type="text" className="form-control is-invalid" id="validationTextarea" placeholder="Please enter movie title" autoComplete="none" required />
                    {titleValid ? (
                        null
                    ) : (
                        <label style={{ color: 'red' }} for="validationTextarea" className="form-label">Movie title already exists</label>
                    )}
                </div>

                {/* movie rate input */}
                <div className="mb-3">
                    <label for="validationTextarea" className="form-label">Movie Rate*</label>
                    <input value={movieItem.body === 'addBody' ? rate : movieItem.rate} onChange={rateInput} type="number" step="0.1" className="form-control is-invalid" id="validationTextarea" placeholder="Please enter movie rate (A number)" autoComplete="none" required />
                </div>

                {/* movie category select */}
                <div className="mb-3">
                    <label for="validationTextarea" className="form-label">Movie Category*</label>
                    <select value={movieItem.body === 'addBody' ? category : movieItem.category} onChange={categoryInput} className="form-select" id="validationTooltip04" required>
                        <option selected disabled value="">Select Category</option>
                        <option>Action</option>
                        <option>Science Fiction</option>
                        <option>Thriller</option>
                        <option>Comedy</option>
                        <option>Drama</option>
                    </select>
                </div>

                {/* add or edit movie */}
                {title !== '' && rate !== '' && category !== '' && titleValid ? (
                    <Button onClick={movieItem.body === 'addBody' ? addNewMovie : editMovie} style={{ display: 'flex', margin: 'auto', marginTop: 15 }}>{movieItem.body === 'addBody' ? 'Add' : 'Save'}</Button>
                ) : (
                    <Button onClick={movieItem.body === 'addBody' ? addNewMovie : editMovie} style={{ display: 'flex', margin: 'auto', marginTop: 15 }} disabled>{movieItem.body === 'addBody' ? 'Add' : 'Save'}</Button>
                )}
            </form>
        </div>
    );
}

export default AddMovieBody;