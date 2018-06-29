import React,{Component} from "react";
import Keys from "../configs/Keys.json";
import axios from "axios";
import ShowList from "./ShowList";
import DatePicker from 'react-date-picker';
import $ from "jquery";
import empty from "empty";

class Upcoming extends Component {

  constructor(props){
    super(props);

    //init state
    this.state = {
      upcomingMovies : null,
      getMovies: false,
      date: new Date(),
      emptyresults: false
    };

    var date = new Date();

    //now
    var nowMonth = date.getMonth() + 1;
    var nowDate = date.getDate();
    var nowYear = date.getFullYear();

    this.default_str_date = `${nowYear}-${nowMonth}-${nowDate}`;
    this.default_end_date =  `${nowYear}-${nowMonth + 3}-${nowDate}`;
  }//constructor

  onChange = date => {

    //get end dates
    var endMonth = date.getMonth() + 1;
    var endDate = date.getDate();
    var endYear = date.getFullYear();

    var endFullDate = `${endYear}-${endMonth}-${endDate}`;

    this.setState({ date : date, endFullDate});

    var endPoint = `https://api.themoviedb.org/3/discover/movie?api_key=${Keys.API_KEY}&language=en-US&sort_by=upcoming.desc&include_adult=true&include_video=false&page=1&primary_release_date.gte=${this.default_str_date}&primary_release_date.lte=${endFullDate}`;
    this.getUpcomingMovies(endPoint);
  }//onChange

  componentDidMount = (e) =>{

    var endPoint = `https://api.themoviedb.org/3/discover/movie?api_key=${Keys.API_KEY}&language=en-US&sort_by=upcoming.desc&include_adult=true&include_video=false&page=1&primary_release_date.gte=${this.default_str_date}&primary_release_date.lte=${this.default_end_date}`;
    this.getUpcomingMovies(endPoint);
  }

  getUpcomingMovies = (endPoint) => {

    axios.get(endPoint).then(success => {

      var resultArr = success.data.results;

      //no results
      if(empty(resultArr)){

        console.log("results are empty");
      }else{
      //has results

        var fetchResult = resultArr.map((value, index)=>{

        var movieObj = {
          id: value.id,
          title: value.hasOwnProperty("title")? value.title : value.original_title,
          poster: value.poster_path,
          release_date: value.release_date
        }
          return movieObj;
        });

        //set state
        this.setState({ upcomingMovies: fetchResult, getMovies: true });
      }//end else
    }).catch(err => console.log(err));
  }//getUpcomingMovies

  render(){

    return(
      <div className="upcoming">
        <h2>FROM
          <span
            className="bold_date">
            {this.default_str_date}
          </span>
          TO
          <span
            className="bold_date">
            {this.state.endFullDate || this.default_end_date}
          </span>
        </h2>
        <div className="date_picker">
          <DatePicker
            onChange={this.onChange}
            value={this.state.date}
          />
        </div>
        {this.state.getMovies && <ShowList movieList={this.state.upcomingMovies}/>}
      </div>
    );
  }
}

export default Upcoming;
