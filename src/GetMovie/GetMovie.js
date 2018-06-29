import React,{Component} from "react";
import Keys from "../configs/Keys.json";
import axios from "axios";
import ShowMovie from "./ShowMovie";
import empty from "empty";

class GetMovie extends Component {

  constructor(props){
    super(props);

    //init state
    this.state = {
      movieObj: null,
      getMovie: false
    }
  }

  componentDidMount = () => {

    var movieId = this.props.match.params.id;
    this.getMovie(movieId);
  }//componentDidMount

  getMovie = (movieId) => {

    var endPoint = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${Keys.API_KEY}&language=en-US&append_to_response=credits,reviews,videos`;

    axios.get(endPoint).then(({data}) => {

      var cast = [];
      var count = 4;

      for(var i = 0; i <= count; i++){

        //has results
        if( !empty(data.credits.cast) ){

          //has results greater than 5
          if( data.credits.cast.length >= 5 ){

            cast.push(data.credits.cast[i]);
          }else{
          //less than 5
            count = data.credits.cast.length;
          }
        }else{
        //empty
          cast = null;
        }
      }

      var movieObj = {
        title: (data.hasOwnProperty("title"))? data.title: data.original_title,
        id: data.id,
        cast,
        overview: data.overview,
        poster: data.poster_path,
        genres: data.genres,
        revenue: data.revenue,
        runtime: data.runtime,
        status: data.status,
        tagline: data.tagline,
        video: data.videos.results[0],
        reviews: data.reviews.results,
        rating: data.vote_average,
        release_date: data.release_date
      }

      this.setState({
        movieObj,
        getMovie: true
      });

    }).catch(err => console.log(err));
  }//getMovie

  componentWillReceiveProps = ({match}) =>{

    var newId = match.params.id;
    var oldId = this.props.match.params.id;

    if( newId !== oldId ){

      this.getMovie(newId);
    }
  }//componentWillReceiveProps

  render(){
    return(
      <div>
        {this.state.getMovie && <ShowMovie movieObj={this.state.movieObj}/>}
      </div>
    );
  }
}

export default GetMovie;
