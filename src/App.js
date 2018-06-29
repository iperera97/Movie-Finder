import React, {Component} from "react";
import {render} from "react-dom";
import Header from "./Header/Header";
import Form from "./Form/Form";
import "./App.css";
import {Switch, Route} from "react-router-dom";
import Popular from "./MovieList/NewMovies";
import Upcoming from "./MovieList/Upcoming";
import GetMovie from "./GetMovie/GetMovie";
import empty from "empty";
import Footer from "./Footer/Footer"
import About from "./About/About";

class App extends Component {

  constructor(props){
    super(props);
  }//constructor

  render(){

    return(
      <div className="container">
        <Header />
        <Form />
        {/*Routes goes here*/}
        <Switch>
          <Route exact path="/" component={Popular} />
          <Route exact path="/upcoming" component={Upcoming} />
          <Route exact path="/movie/:id" component={GetMovie} />
          <Route exact path="/about" component={About}/>
        </Switch>
        {/*<Footer />*/}
        <Footer />
      </div>
    );
  }
}

export default App;
