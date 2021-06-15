import React, { useState } from 'react';
import { ListItem, ListItems, Image } from './ActorList';
import { CardContent } from '@material-ui/core';

const MovieList = ({ result , image , openmovie }) => {  
    
    //renderedMovies adds functionality for more appealing image loading on a per movie basis

    const RenderedMovies = (x) => {

        const [ imageLoaded , setImageLoaded ] = useState(false);

        return (
             
            <ListItem key = {x.id} onClick = {() => openmovie(x.id)}>                                
                <Image src = { image.base + image.size + x.poster_path} className = {`smooth-image image-${imageLoaded ? 'visible' : 'hidden' }`} onLoad = {() => setImageLoaded(true)} />
                <CardContent>
                    <h4>{x.original_title}</h4><span>{x.release_date.substring(0,4)}</span>
                    <p>{x.overview.substring(0,100)} ...</p>                
                </CardContent>                                
            </ListItem>          
            
        )
    }

    const mappedMovies = result.details.map( x =>  RenderedMovies(x));

    return (
        <ListItems>
            {mappedMovies}
        </ListItems>

    )
}

export default MovieList;