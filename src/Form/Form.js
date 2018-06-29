import React, {Component} from "react";
import {render} from "react-dom";
import "./Form.css";
import $ from "jquery";
import axios from "axios";
import empty from "empty";
import Keys from "../configs/Keys.json";
import MatchBar from "./MatchBar";

class Form extends Component {
  constructor(props){
    super(props);

    //init state
    this.state = {
      searchMovie: []
    }
  }//constructor

  getMovie = (event) => {
  var inputEle, searchMovie, endPoint;

    inputEle = $(event.target);
    searchMovie = inputEle.val();

    if( !empty( searchMovie) ){

      var match_bar = $(".match_bar");
      match_bar.removeClass("close");
      match_bar.addClass("open");

      endPoint = `https://api.themoviedb.org/3/search/movie?api_key=${Keys.API_KEY}&query=${searchMovie}`;

      axios.get(endPoint).then(success=>{

        var hasResult = !empty(success.data.results)? true: false;

        var results = success.data.results.map(value => {
          return {
            id: value.id,
            title: value.title || value.original_title,
            release_date: value.release_date,
            poster: value.poster_path
          }
        });

        this.setState(prevState =>{
          return {
            searchMovie : results,
            hasResult,
          }
        });
      }).catch(err => console.log(err));
    }else{

      this.setState({hasResult: false});
    }
  }//getMovie

  handleResults = (event) =>{

    var match_bar = $(".match_bar");
    match_bar.removeClass("open")
    match_bar.addClass("close");

    $(".form input").val(null);
  }

  render(){

    return(
      <form className="form">
        <fieldset>
          <input type="text" required onChange={this.getMovie} placeholder="Search Movie"/>
        </fieldset>
        {this.state.hasResult ? <MatchBar searchMovie={this.state.searchMovie} handleResults={this.handleResults}/>:null }
      </form>
    );
  }
}


export default Form;
