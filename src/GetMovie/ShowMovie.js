import React from "react";
import Spinner from "../assets/Spinner.svg"
import empty from "empty";
import "./ShowMovie.css";

const poster = "https://image.tmdb.org/t/p/w300/";
const castImgs = "https://image.tmdb.org/t/p/w200/"
const youtube = "https://www.youtube.com/embed/";

function ShowMovie(props){

  var poster_path = (!empty(props.movieObj.poster))? poster + props.movieObj.poster : Spinner;
  return(
    <div className="show_movie">
      <div className="poster">
        <img src={poster_path} alt="poster"/>
      </div>
      <div className="details">
        <h1>{props.movieObj.title}</h1>
        <h2>{props.movieObj.tagline}</h2>
        <p>{props.movieObj.overview}</p>
        <p>Release Date {props.movieObj.release_date}</p>
        <p>{props.movieObj.rating? "Rating " + props.movieObj.rating: null}</p>
        <div className="genres">
          {!empty(props.movieObj.genres)?
            props.movieObj.genres.map((value, index)=>{
              return <p key={value.id}>{value.name}</p>
            }): null}
        </div>
      </div>
      <div className="cast-block">

        {!empty(props.movieObj.cast)? props.movieObj.cast.map((value, index)=>{

          var castPath = (!empty(value.profile_path))? castImgs + value.profile_path : Spinner;
            return(
              <div className="each_cast" key={value.id}>
                <div className="img">
                  <img src={castPath} img="cast"/>
                </div>
                <div className="info">
                  <p>Character - <span>{value.character}</span></p>
                  <p>Name - <span>{value.name}</span></p>
                </div>
              </div>
            )
          }): null}
      </div>
      <div className="reviews">
        {!empty(props.movieObj.reviews)? <h2>Reviews</h2> :null }
        {!empty(props.movieObj.reviews)? props.movieObj.reviews.map((value, index)=>{
          return(
            <div key={value.id}>
              <p>Author - {value.author}</p>
              <p>Content - {value.content}</p>
              <p><a href={value.url}>further more</a></p>
            </div>
          )
        }): null}

      </div>
      <div className="video">
        {!empty( props.movieObj.video )? <iframe width="600" height="350" src={youtube + props.movieObj.video.key}></iframe>:null}
      </div>
    </div>
  );
}

export default ShowMovie;
