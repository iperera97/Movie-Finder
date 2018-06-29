import React from "react";
import "./ShowList.css";
import $ from "jquery";
import {Link} from "react-router-dom";
import Spinner from "../assets/Spinner.svg"

const imgUrl = "https://image.tmdb.org/t/p/w300/";

function ShowList(props){
  return(
    <div className="movie-grid">
      {props.movieList.map((value, index)=>{

        var imgPath = (value.poster !== null )? imgUrl + value.poster : Spinner;

        return(
          <div className="movie-block" key={value.id}>
            <img src={imgPath}/>
            <div className="info">
              <div className="text">
                <Link to={"/movie/" + value.id}>
                  <p>{value.title}</p>
                  <p>{value.release_date}</p>
                </Link>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default ShowList;
