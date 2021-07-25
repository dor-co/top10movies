import {useState} from "react";
import { Button } from "react-bootstrap";
import { useFirestore } from "reactfire";
import { useDispatch } from "react-redux";
import { close } from "../../redux/Actions";

function AddMovieBody() {

    const [title, setTitle] = useState('');
    const [rate, setRate] = useState('');
    const [category, setCategory] = useState('');

    const db = useFirestore();

    const dispatch = useDispatch();

    const titleInput = (e) => {
        setTitle(e.target.value)
    }

    const rateInput = (e) => {
        if (e.target.value < 0) {
            e.target.value = 0;
        } else if (e.target.value > 10) {
            e.target.value = 10;
        }
        setRate(e.target.value)
    }

    const categoryInput = (e) => {
        setCategory(e.target.value)
    }

    const addNewMovie = () => {
        if(title.trim() !== '' && rate.trim() !== '' && category.trim() !== ''){
            db.collection("Movies").add({
                title: title,
                rate: rate,
                category: category
            })

            return dispatch(close())

            // .then((docRef) => {
            //     console.log("Document written with ID: ", docRef.id);
            // })
            // .catch((error) => {
            //     console.error("Error adding document: ", error);
            // });
        }else{
            alert('!!!');
        }
    }

    return (
        <div>
            {/* movie title input */}
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default">Movie Title</span>
                </div>
                <input value={title} onChange={titleInput} type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
            </div>

            {/* movie rate input */}
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default">Movie Rate</span>
                </div>
                <input value={rate} onChange={rateInput} type="number" step="0.1" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
            </div>

            {/* movie category input */}
            <div className="col-md-3 position-relative" style={{ width: '100%' }}>
                    {/* <label for="validationTooltip04" class="form-label">State</label> */}
                    <select value={category} onChange={categoryInput} className="form-select" id="validationTooltip04" required>
                        <option selected disabled value="">Filter By</option>
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

            {/* save movie */}
            <Button onClick={addNewMovie} style={{ display: 'flex', margin: 'auto', marginTop: 15 }}>Save</Button>

        </div>
    );
}

export default AddMovieBody;