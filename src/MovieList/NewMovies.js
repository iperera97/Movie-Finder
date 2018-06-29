import React,{Component} from "react";
import ShowList from "./ShowList";
import Keys from "../configs/Keys.json";
import axios from "axios";

class NewMovies extends Component {
  constructor(props){
    super(props);

    //init state
    this.state = {
      popularMovies: null,
      getMovies: false
    }

    var date = new Date();

    //now
    var nowMonth = date.getMonth() + 1;
    var nowDate = date.getDate();
    var nowYear = date.getFullYear();

    var str_date = `${nowYear}-${nowMonth - 1}-${nowDate}`;
    var end_date =  `${nowYear}-${nowMonth}-${nowDate}`;

    this.endPoint = `https://api.themoviedb.org/3/discover/movie?api_key=${Keys.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${str_date}&primary_release_date.lte=${end_date}`;
  }//constructor

  componentDidMount = () =>{

    var endPoint = this.endPoint;
    axios.get(endPoint).then(success => {

      var resultArr = success.data.results;
      var fetchResult = [];

      resultArr.map((value, index)=>{

        var movieObj = {
          id: value.id,
          title: value.hasOwnProperty("title")? value.title : value.original_title,
          poster: value.poster_path,
          release_date: value.release_date
        }

        fetchResult.push(movieObj);
      });

      //set state
      this.setState({ popularMovies: fetchResult, getMovies: true });
    }).catch(err => console.log(err));

  }//componentDidMount

  render(){
    return(
      <div>
        {this.state.getMovies && <ShowList movieList={this.state.popularMovies}/>}
      </div>
    );
  }
}

export default NewMovies;
