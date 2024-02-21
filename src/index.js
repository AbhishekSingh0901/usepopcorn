import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import StarRating from "./components/starRating/star-rating.component";

// function Test() {
//   const [movieRating, setMovieRating] = useState();

//   return (
//     <div>
//       <StarRating
//         messages={["terrible", "bad", "okay", "good", "amzaing"]}
//         onSetRating={setMovieRating}
//       />
//       <p>this movie was rated {movieRating} stars</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <Test />
    <StarRating size={50} maxRating={10} color="#00BFFF" /> */}
  </React.StrictMode>
);
