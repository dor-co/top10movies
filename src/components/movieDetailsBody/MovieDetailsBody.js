import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useFirestore } from "reactfire";
import { useDispatch } from "react-redux";
import { close } from "../../redux/Actions";

function MovieDetailsBody() {
    const moviesRed = useSelector((state) => state.moviesReducer);
    // const dispatch = useDispatch();

    const [editView, setEditView] = useState(false);
    const [title, setTitle] = useState('');
    const [rate, setRate] = useState('');
    const [category, setCategory] = useState('');

    const db = useFirestore();

    const dispatch = useDispatch();

    // console.log('************',moviesRed,'*************')

    const openEditView = () => {
        setTitle(moviesRed.title);
        setRate(moviesRed.rate);
        setCategory(moviesRed.category)
        setEditView(!editView);
    }

    const titleInput = (e) => {
        setTitle(e.target.value);
    }

    const rateInput = (e) => {
        setRate(e.target.value);
    }

    const categoryInput = (e) => {
        setCategory(e.target.value);
    }

    const saveEdit = () => {
        if(title.trim() !== '' && rate.toString().trim() !== '' && category.trim() !== ''){
            db.collection("Movies").doc(moviesRed.id)
            .update({
                title: title,
                rate: rate,
                category: category
            })

            return dispatch(close())
        }else{
            alert('!!!');
        }
    }

    return (
        <div>
            {editView ? (
                <>
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
                        <select value={category} onChange={categoryInput} className="form-select" id="validationTooltip04" required>
                            <option selected disabled value="">Select Category</option>
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

                    <div>
                        <Button style={{ display: 'flex', margin: 'auto', marginTop: 15 }} onClick={openEditView}>Edit</Button>
                        <Button style={{ display: 'flex', margin: 'auto', marginTop: 15 }} onClick={saveEdit}>Save</Button>
                    </div>
                </>
            ) : (
                <>
                    <h1>{moviesRed.title}</h1>
                    <h3>Category: {moviesRed.category}</h3>
                    <h3>Rating: {moviesRed.rate}</h3>

                    <div>
                        <Button onClick={openEditView}>Edit</Button>
                    </div>
                </>
            )}

        </div>
    );
}

export default MovieDetailsBody;