import React from 'react';
import styled from 'styled-components';
import { ActorList } from './ActorList';
import MovieList from './MovieList';
import { ClipLoader } from 'react-spinners';
import { Fade, Card } from '@material-ui/core';

const SearchCardStyle = styled(Card)`
    display: grid;
    grid-template-rows: 20% 80%;
    width: 500px;
    height: 600px;
    background-color: var(--yellowish) !important;
    text-align: center;
    padding: 15px;
    `;

const StyledInput = styled.input`
    display: inline-block;
    border: none;
    `;

const StyledButton = styled.button`
    background-color: #f5c419;
    border: none;
    display: inline-block;
`;

const Search = ({ result, image , input, controlinput, get , type, openmovie , openactor }) => {  
    

    return (
        <div className= 'Search'>
            <Fade in timeout = {500}>
                <SearchCardStyle raised>
                    <div>                
                        {type === 'actor' ? <h3>Search Actor</h3> : <h3>Search Movie</h3>}
                        <StyledInput value = {input} onChange = { e => controlinput({[type]: e.target.value})} />
                        <StyledButton variant = "contained" onClick = { () => get()}>Search</StyledButton>    
                    </div>
                    <div className = 'center'>
                        <ClipLoader loading = {result.spinner} />
                         { type === 'actor' ? <ActorList result = {result} image = {image} openactor = {openactor} /> : <MovieList result = {result} image = {image} openmovie = {openmovie} /> }                
                    </div>
            </SearchCardStyle>
            </Fade>            
        </div>
    )
};

export default Search;