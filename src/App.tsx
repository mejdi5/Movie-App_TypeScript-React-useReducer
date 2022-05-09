import React, {useEffect, useReducer} from 'react';
import axios from 'axios';
import './App.css';
import MovieList from './components/MovieList';
import AddMovie from './components/AddMovie'


export interface Movie {
  _id: string,
  title: string,
  rate: number,
  date: string,
  imgUrl: string,
  description: string,
  category: string
}

export interface State {
  movies: Movie[]
}

export enum ActionKind {
  GET_MOVIES = "GET_MOVIES",
  ADD_MOVIE = "ADD_MOVIE",
  DELETE_MOVIE = "DELETE_MOVIE",
  EDIT_MOVIE = "EDIT_MOVIE",
}

export type Action =
| {type: ActionKind.GET_MOVIES, payload: Movie[]} 
| {type: ActionKind.ADD_MOVIE, payload: Movie} 
| {type: ActionKind.DELETE_MOVIE, payload: string}  
| {type: ActionKind.EDIT_MOVIE, payload: Movie} 

export const initialState = {movies: []}

export const reducer = (state: State, action: Action) : State => {
  console.log(state)
  switch (action.type) {
    case ActionKind.GET_MOVIES:
      return {...state, movies: action.payload}
    case ActionKind.ADD_MOVIE:
      return {...state, movies: [...state.movies, action.payload]}
    case ActionKind.DELETE_MOVIE:
      return {...state, movies: state.movies.filter(movie => movie._id !== action.payload)}
    case ActionKind.EDIT_MOVIE:
      return {...state, movies: state.movies.map(movie => movie._id === action.payload._id ? action.payload : movie)}
    default:
      return state;
  }
};


const App: React.FC = () => {

  useEffect(() => {
    axios.get("https://movie-app-gmc.herokuapp.com/api/movies")
    .then(response =>  dispatch({type: ActionKind.GET_MOVIES, payload: response.data}))
    .catch(err=> console.log(err))
  },[])

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <MovieList state={state} dispatch={dispatch}/>
      <AddMovie dispatch={dispatch}/>
    </div>
  );
}

export default App;
