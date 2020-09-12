import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const Backdrop = styled.img`
    grid-area: banner;
    width: 100%;
`;

const Cast = styled.div`
    grid-area: content;
    overflow: scroll;
    background-color: green;
`;

const CastProfile = styled(Card)`
    height: 275px;
    display: inline-block;
    width: 150px;
    margin: 20px;
`;

const MovieExpanded = ({ details , image }) => {  
    
    const mappedCast = details.cast.map( x => (
        <CastProfile raised key = { x.id } >
            <img src = {image.base + image.size + x.profile_path} height = 'auto' width = '100%' alt = 'no image' />
            <CardContent><span>{x.name}</span></CardContent>
        </CastProfile>        
    ))
   
    return (

        <Container className = 'movie-expanded'>        
            <Backdrop src = {image.base + image.size + details.backdrop_path} />
            <div>
                <h1>{details.original_title}</h1>
                <p>{details.tagline}</p>
            </div>
            <Cast>{mappedCast}</Cast>
        </Container>
    )
};

export default MovieExpanded;