import React, {useEffect, useState } from 'react';
import styled from 'styled-components';
import {Card} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MovieCamera from './media/MovieCamera.png';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import AddIcon from '@material-ui/icons/Add';


const Headshot = styled.img`

height: 500px

`;

const MappedMovies = styled(Card)`
    
    display: grid;
    grid-template-rows: repeat(auto-fill, minmax(300px,1fr));
    grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
    background-color: rgb(250, 250, 242) !important;
    margin-top: 20px;
    background-color: -var(yellowish);

`;

const Movie = styled(Card)`
    
    display: inline-block;
    height: 300px;
    width: 150px;
    margin: 20px;
    text-align: center;
    cursor: pointer;
    font-size: 12px;
    transition: all .2s !important;
    
    &:hover {
        transform: translate(0px,-7px);
    }

`;

const Details = styled.div`

    padding-left: 40px;
    overflow: hidden;
    max-width: 800px;
    

`;

const CenteredElements = styled.div`
    
    max-width: 80%;
    margin: auto;

`;

const Search = styled.div`
    position: fixed;
    left: 20px;
    top: 50%;
    cursor: pointer;
`;

const Titles = styled(Card)`    
    display: grid;
    grid-template-columns: auto 1fr;    
    background-color: var(--yellowish) !important;
    padding: 20px;
    animation-name: zoom;
    animation-duration: .3s;
    margin-bottom: 20px;
    margin-top: 20px;
    border-radius: 0 !important;    
`;

const SeeMore = styled.div`

    width: 100px;
    margin: 125px auto;    
    cursor: pointer;
`;

const RenderedCredits = ({ item , image , openmovie }) => {

    const [ imageLoaded , setImageLoaded ] = useState(false);
    
    return (
    <Movie raised key = {item.id} onClick = {() => openmovie(item.id)}>
        <img src = { item.poster_path === null ? MovieCamera : image.base + image.size + item.poster_path} onLoad = {() => setImageLoaded(true)} className = {`smooth-image image-${imageLoaded ? 'visible' : 'hidden' }`} height = 'auto' width = '100%' alt = "can't display" />
        <CardContent>
            <b>{item.original_title}</b>
            <br />
            {item.character}
            </CardContent>
    </Movie>
    )
}

const ActorExpanded = ({ back , details , openmovie , image }) => {   

    useEffect(() => {
        window.scrollTo(0,0)
    },[])
    
    const [ num , setNum ] = useState(15);

    const slicedMovies = details.movies.slice(0 , num);

    const mappedMovies = slicedMovies.map( (item,index) => <RenderedCredits item = {item} openmovie = {openmovie} image = {image} key = {index} />)

    return (
        
            <CenteredElements>
                <Titles raised>
                    <Headshot src = {`${image.base}${image.size}${details.profile_path}`} />
                    <Details>
                        <h1>{details.name}</h1>            
                        <p><b>Born:</b> {details.birthday}</p>
                        <p><b>Birthplace:</b> {details.place_of_birth === null ? "N/A" : details.place_of_birth}</p>
                        <p><b>Bio:</b> {details.biography === '' ? "N/A" : details.biography} </p>
                    </Details>
                </Titles>
                <Search onClick = {() => back()}>
                    <ArrowBackIosIcon />
                    <span>Search</span>
                </Search>
                
                <div style = {{padding: "20px"}}>
                        <h2 >Credits</h2>
                        <hr />
                </div>

                <MappedMovies raised>
                
                    
                    {mappedMovies}

                    <Movie onClick = {() => setNum(num + 10)}>
                    <AddIcon style = {{color: "gray", marginTop: '100px', verticalAlign: 'center', fontSize: '100px'}} />                    
                    </Movie>
                    
                </MappedMovies>
            </CenteredElements>
        
        
    )
}

export default ActorExpanded;