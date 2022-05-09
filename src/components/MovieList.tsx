import React, {useState} from 'react'
import {State, Action} from '../App'
import SingleMovie from './SingleMovie';
import {Form} from 'react-bootstrap'

interface Props {
    state: State,
    dispatch: React.Dispatch<Action>
}

const MovieList: React.FC<Props> = ({state, dispatch}:Props) => {
    
    const [text, setText] = useState<string>("")
    const [rate, setRate] = useState<number>(0)
    const [rating, setRating] = useState<number>(0)

    const stars = (x: number, y: string) => {
        let starsArray = [];
        if (y === "filter by rate") {
            for (let i = 1; i <= 5; i++) {
                if (i <= x) {
                starsArray.push(<span key={i} onClick={() => setRate(i)}>★</span>); 
                } else {
                starsArray.push(<span key={i} onClick={() => setRate(i)}>☆</span>); 
                }
            }
        } else {
            for (let j = 1; j <= 5; j++) {
                if (j <= x) {
                starsArray.push(<span key={j} onClick={() => setRating(j)}>★</span>); 
                } else {
                starsArray.push(<span key={j} onClick={() => setRating(j)}>☆</span>); 
                }
            }
        }
        
        return starsArray;
    }

return (
<div className="movie-list">
    <Form.Control 
    type="text" 
    placeholder="Search..."
    style={{width:'50%', margin:'30px 30%'}} 
    value={text} 
    onChange={e => setText(e.target.value)}
    />
    <div className="stars">{stars(rate, "filter by rate")}</div>
    <ul style={{listStyleType:'none'}}>
    {state.movies
    .filter(movie => movie.title.toLowerCase().startsWith(text.toLowerCase().trim()) && movie.rate >= rate)
    .map((movie,index) => 
    <li key = {index}> 
        <SingleMovie
        movie = {movie}
        dispatch={dispatch} 
        stars={stars}
        /> 
    </li>
    )}
    </ul>
</div>
)}

export default MovieList