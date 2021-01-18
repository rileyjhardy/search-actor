import React , { useState } from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './styles.css';

const ListItems = styled.div`    
    overflow-y: auto;    
    `;

const ListItem = styled(Card)`

display: grid;
grid-template-columns: 25% 75%;
font-size: 10px;
margin: 0 20px 20px 20px;
text-align: left;
cursor: pointer;
transition: all .2s !important;
    
    &:hover {
        transform: translate(0px,-7px);
    }

`;

const Image = styled.img`
height: 100%;
width: 100px;
object-fit: cover;
`;

const ActorList = ({ result , image , openactor }) => {

    const RenderedActors = (x) => {

        const [ imageLoaded , setImageLoaded ] = useState(false);

        const test =  x.knownfor.map(title => title.hasOwnProperty('original_name') ? <span key = {title.index}>{title.original_name} </span> : <span key = {title.index}>{title.original_title} &#9679; &nbsp;</span>
            );
            
        return (
            <ListItem raised key = {x.id} onClick = {() => openactor(x.id)}>
                <Image src = { image.base + image.size + x.image} alt='no image' className = {`smooth-image image-${imageLoaded ? 'visible' : 'hidden' }`} onLoad = {() => setImageLoaded(true)} />
                <CardContent>
                    <h4>{x.name}</h4>
                    <p>{x.biography.substring(0,100)}...</p>
                    <p><b>Known for:</b> {test}...</p>      
                </CardContent>
            </ListItem>
        )
    }

    const mappedList = result.details.map( x => RenderedActors(x));
    
    return (
        <ListItems>
            {mappedList}
        </ListItems>
    )
}

export { ActorList, ListItem, ListItems, Image };