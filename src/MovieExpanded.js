import React, { useState , useEffect } from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Profile from './media/Profile.jpg';
import { BeatLoader } from 'react-spinners';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import AddIcon from '@material-ui/icons/Add';

const Backdrop = styled.img`    
    width: 100%;
    max-height: 500px;
    object-fit: cover;
    animation-name: zoom;
    animation-duration: .5s;
`;

const Cast = styled(Card)`

    display: grid;
    grid-template-rows: repeat(auto-fill, minmax(300px,1fr));
    grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
    overflow: hidden;
    width: 100%;
    animation-name: zoom;
    animation-duration: .3s;
    animation-delay: .25s;
`;

const CastProfile = styled(Card)`
    cursor: pointer;
    height: 300px;
    display: inline-block;
    width: 150px;
    margin: 20px;
    text-align: center;
    font-size: 12px;
    border-radius: 0 !important;
    transition: all .2s !important;
    
    &:hover {
        transform: translate(0px,-7px);
    }
`;

const Titles = styled(Card)`    
    color: black;
    padding: 20px;
    font-family: Impact;
    animation-name: zoom;
    animation-duration: .3s;
    margin-bottom: 20px;
    margin-top: 20px;
    border-radius: 0 !important;    
`;

const Header = styled.h1`
display: inline-block;
`;

const Overview = styled.p`
font-weight: regular;
font-family: Georgia;
`;

const CenteredElements = styled.div`
    max-width: 1200px;
    margin: auto;
`;

const Search = styled.div`
    position: fixed;
    left: 20px;
    top: 50%;
    cursor: pointer;
`;

const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;
`;

const SeeMore = styled.div`

    width: 100px;
    margin: 125px auto;
    cursor: pointer;
`;

const RenderedActors = ({ item , openactor , image }) => {

    const [ imageLoaded , setImageLoaded ] = useState(false);

    return (

        <CastProfile raised key = { item.id } onClick = {() => openactor(item.id)}>
            <img src = {item.profile_path === null ? Profile : image.base + image.size + item.profile_path} onLoad = {() => setImageLoaded(true)} className = {`smooth-image ${ item.profile_path === null ? 'profile-height' : ''} image-${imageLoaded ? 'visible' : 'hidden' }`} height = 'auto' width = '100%' alt = "can't display" />
            <CardContent>
                <b>{item.name}</b>
                <br />
                {item.character}
            </CardContent>
            
        </CastProfile>

    )
}

const MovieExpanded = ({ back, details , openactor , image }) => { 

    useEffect(() => {
        window.scrollTo(0,0)
    },[])
    
    const [ bannerLoaded , setBannerLoaded ] = useState(false);
    const [ num , setNum ] = useState(15);

    
     
    const slicedCast = details.cast.slice(0, num );
    
    const mappedCast = slicedCast.map( (item,index) => <RenderedActors openactor = {openactor} image = {image} item = {item} key = {index} />);
   
    return (
         
            <CenteredElements>  
                    
                    <Titles raised>
                        {details.backdrop_path === null ? "No image available" : <Backdrop src = {image.base + image.size + details.backdrop_path} onLoad = {() => setBannerLoaded(true)} />}
                        {bannerLoaded ?  null : <SpinnerContainer><BeatLoader /></SpinnerContainer>}
                        <hr />
                            <Header>{details.original_title} |</Header><span style = {{verticalAlign: '5px' , fontSize: '20px'}}>&nbsp;{details.release_date.substring(0,4)}</span>
                            
                            <h6>{details.tagline}</h6>
                            <br />
                            <Overview>{details.overview}</Overview>
                            <hr />
                    </Titles>
                
                <Search onClick = {() => back()}>
                    <ArrowBackIosIcon />
                    <span>Search</span>
                </Search>
                <div style = {{padding: "20px"}}>
                        <h2 >Cast</h2>
                        <hr />
                    </div>
                <Cast raised>
                    
                    {mappedCast}
                    
                    <CastProfile raised onClick = {() => setNum(num + 10)}>
                
                        <AddIcon style = {{color: "gray", marginTop: '100px', verticalAlign: 'center', fontSize: '100px'}} />
                    
                    </CastProfile>                
                </Cast>
            </CenteredElements>
        
    )
};

export default MovieExpanded;