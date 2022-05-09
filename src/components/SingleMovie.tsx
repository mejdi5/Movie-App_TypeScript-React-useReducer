import React,{useState} from 'react'
import { Movie, Action, ActionKind } from '../App'
import {CloseButton} from 'react-bootstrap'
import EditMovie from './EditMovie'

interface Props {
    movie: Movie,
    dispatch: React.Dispatch<Action>
    stars: (x: number, y: string) => JSX.Element | JSX.Element[]
}

const SingleMovie : React.FC<Props> = ({movie, dispatch, stars}: Props) => {

    const deleteMovie = (e:React.FormEvent) => {
        e.preventDefault()
        dispatch({type: ActionKind.DELETE_MOVIE, payload: movie._id})
    }


return (
    <div className="movie">
        <CloseButton 
        style={{float:'right'}}
        onClick={e => deleteMovie(e)}
        />
        <h1>{movie.title}</h1>
        <h5>{movie.date}</h5>
        <img 
        src={movie.imgUrl} 
        alt={movie.title} 
        className="movie-img"
        />
        <p>{stars(movie.rate, "rate")}</p>
        <p>{movie.description}</p>
        <h4>{movie.category}</h4>
        <EditMovie 
        movie={movie} 
        dispatch={dispatch}
        />
    </div>
)
}

export default SingleMovie