import React from "react";
import {Link} from "react-router-dom";
import Spinner from "../assets/Spinner.svg"
import empty from "empty";

const imgUrl = "https://image.tmdb.org/t/p/w200/";

function MatchBar(props){

  return(
    <div className="match_bar open">
      <ul>
        {props.searchMovie.map(value => {

          var imgPath = (!empty(value.poster) )? imgUrl + value.poster : Spinner;

          return (
            <li className="each_match" key={value.id} onClick={props.handleResults}>
              <Link to={"/movie/" + value.id}>
                <img src={imgPath} alt="match_movie"/>
                <div className="info">
                  <p>{value.title}</p>
                  <p>{value.release_date}</p>
                </div>
              </Link>
            </li>);
        })}
      </ul>
    </div>
  );

}

export default MatchBar;
