// import { useSelector } from "react-redux";
// import { Button } from "react-bootstrap";
// import { useState, useEffect } from "react";
// import { useFirestore } from "reactfire";
// import { useDispatch } from "react-redux";
// import { close } from "../../redux/Actions";

// function EditMovieBody({item}) {
//     const moviesRed = useSelector((state) => state.moviesReducer);
//     const firestoreRed = useSelector((state) => state.firestoreReducer);

//     console.log('firestoreRed', firestoreRed)
//     // const dispatch = useDispatch();

//     const [editView, setEditView] = useState(false);
//     const [title, setTitle] = useState(item.title);
//     const [rate, setRate] = useState(item.rate);
//     const [category, setCategory] = useState(item.category);
//     const [titleValid, setTitleValid] = useState(true);

//     const db = useFirestore();

//     const dispatch = useDispatch();

//     // console.log('************',moviesRed,'*************')

//     const openEditView = () => {
//         setTitle(moviesRed.title);
//         setRate(moviesRed.rate);
//         setCategory(moviesRed.category)
//         setEditView(!editView);
//     }

//     const titleInput = (e) => {
//         item.title = e.target.value;
//         setTitle(e.target.value);
//         if (firestoreRed.data.findIndex(x => x.title.toLowerCase() === e.target.value.toLowerCase()) !== -1) {
//             setTitleValid(false);
//         }else{
//             setTitleValid(true);
//         }
//     }

//     const rateInput = (e) => {
//         if (e.target.value < 0) {
//             e.target.value = 0;
//         } else if (e.target.value > 10) {
//             e.target.value = 10;
//         }
//         item.rate = e.target.value;
//         setRate(e.target.value);
//     }

//     const categoryInput = (e) => {
//         item.category = e.target.value;
//         setCategory(e.target.value);
//     }

//     const saveEdit = () => {
//         if (title.trim() !== '' && rate.toString().trim() !== '' && category.trim() !== '' && firestoreRed.data.findIndex(x => x.title === title) === -1) {
//             db.collection("Movies").doc(moviesRed.id)
//                 .update({
//                     title: title,
//                     rate: rate,
//                     category: category
//                 })

//             return dispatch(close())
//         }
//     }

//     const deleteMovie = () => {
//         db.collection("Movies").doc(moviesRed.id)
//             .delete()

//         return dispatch(close())
//     }

//     return (
//         <div>
//             <form className="was-validated">
//                 {/* movie title input */}
//                 <div className="mb-3">
//                     <label for="validationTextarea" className="form-label">Movie Title*</label>
//                     <input value={item.title} onChange={titleInput} type="text" className="form-control is-invalid" id="validationTextarea" placeholder="Enter movie title" autoComplete="none" required />
//                     {titleValid ? (
//                         null
//                     ) : (
//                         <label style={{ color: 'red' }} for="validationTextarea" className="form-label">Movie title already exists</label>
//                     )}
//                 </div>

//                 {/* movie rate input */}
//                 <div className="mb-3">
//                     <label for="validationTextarea" className="form-label">Movie Rate*</label>
//                     <input input value={item.rate} onChange={rateInput} type="number" step="0.1" className="form-control is-invalid" id="validationTextarea" placeholder="Enter movie rate (A number)" autoComplete="none" required />
//                 </div>

//                 {/* movie category select */}
//                 <div className="mb-3">
//                     <label for="validationTextarea" className="form-label">Movie Category*</label>
//                     <select value={item.category} onChange={categoryInput} className="form-select" id="validationTooltip04" required>
//                         <option selected disabled value="">Select Category</option>
//                         <option>Action</option>
//                         <option>Science Fiction</option>
//                         <option>Thriller</option>
//                         <option>Comedy</option>
//                         <option>Drama</option>
//                     </select>
//                 </div>
//                 <div>
//                     {/* <Button style={{ display: 'flex', margin: 'auto', marginTop: 15 }} onClick={openEditView}>Edit</Button> */}
//                     {title.trim() !== '' && rate.toString().trim() !== '' && category.trim() !== '' && titleValid ? (
//                         <Button style={{ display: 'flex', margin: 'auto', marginTop: 15 }} onClick={saveEdit}>Save</Button>
//                     ) : (
//                         <Button style={{ display: 'flex', margin: 'auto', marginTop: 15 }} onClick={saveEdit} disabled>Save</Button>
//                     )}
//                     {/* <Button style={{ display: 'flex', margin: 'auto', marginTop: 15 }} onClick={deleteMovie}>Delete Movie</Button> */}
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default EditMovieBody;