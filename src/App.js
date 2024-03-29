import React, { useState , useEffect } from 'react';
import Search from './Search';
import MovieExpanded from './MovieExpanded';
import ActorExpanded from './ActorExpanded';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

    const [ controlledInput , setControlledInput ] = useState({actor: '', movie: ''});
    const [ imageConfig , setImageConfig ] = useState({base: '', size: ''})
    const [ actorResult , setActorResult ] = useState({ details: [],  render: false, spinner: false});
    const [ movieResult , setMovieResult ] = useState({ details: [], render: false, spinner: false});
    const [ expandedMovie , setExpandedMovie ] = useState({ details: {} , render: false });
    const [ expandedActor , setExpandedActor ] = useState({ details: {}, render: false })
    const apiKey = "c75de37ef442de495cd2bc2459b6f965";

    const getPerson = async function() {
        
      setActorResult({ details: [], render: false, spinner: true}) 
       
      let response = await fetch(`https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${controlledInput.actor}&page=1`).then(res => res.json()).catch(err => console.error(err));

      function filterResults(person){
           if( person.known_for_department === "Acting" && person.hasOwnProperty('known_for') && person.popularity > 1){
               
               return true;
           }
      }
   
       const actors = response.results.filter(person => filterResults(person));
       
       actors.sort((a,b) => b.popularity - a.popularity);

       const array = [];        

       for ( let i = 0 ; i < actors.length; i++){

           let x = await fetch(`https://api.themoviedb.org/3/person/${actors[i].id}?api_key=${apiKey}&page=1`).then(res => res.json()).catch(err => console.error(err));
           let y = await fetch(`https://api.themoviedb.org/3/person/${actors[i].id}/images?api_key=${apiKey}`).then(res => res.json()).catch(err => console.error(err));
               
           if ( y.profiles.length > 0 ) {

           const { profiles: [  { file_path: test } ] } = y;    
           x.image = test;

           }  

           x.knownfor = actors[i].known_for;

               array.push(x);
       };
   
      setActorResult(Object.assign({}, actorResult, { details: array, render: true, spinner: false}));
      return array;
   };

    const getMovie = async function(){

    setMovieResult({ details: [], render: false, spinner: true});

    let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${controlledInput.movie}`).then(res => res.json());

    function filterResults(pop){
        if (pop.popularity > 1 && pop.hasOwnProperty('release_date')){
            return true;
        }
    }

    const movies = response.results.filter(pop => filterResults(pop));

    movies.sort((a,b) => b.popularity - a.popularity);

    setMovieResult(Object.assign({}, setMovieResult, { details: movies, render: true, spinner: false}));        
}

    const openMovie = async function(id) {

      const details = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`)
      .then(res => res.json())
      .catch(err => console.error(err));

      const castList = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`)
      .then(res => res.json())
      .catch(err => console.error(err));

      const { cast } = castList;

      details.cast = cast;

      setExpandedMovie({details: details, render: true})
      setExpandedActor({details: {} , render: false})

    }

    const openActor = async function(id){

      const details = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=en-US`)
      .then(res => res.json())
      .catch(err => console.error(err));

      const credits = await fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${apiKey}&language=en-US`)
      .then(res => res.json())
      .catch(err => console.error(err));

      const { cast: movies } = credits;

      movies.sort((a,b) => b.popularity - a.popularity);

      details.movies = movies;

      console.log(details);

      setExpandedActor({details: details, render: true});
      setExpandedMovie({details: {}, render: false})

    }

    const backToSearch = () => {
      setExpandedActor(Object.assign({}, expandedActor, {render: false}))
      setExpandedMovie(Object.assign({}, expandedMovie, {render: false}))
    }

    useEffect(() => {
    fetch('https://api.themoviedb.org/3/configuration?api_key=c75de37ef442de495cd2bc2459b6f965')
    .then(res => res.json())
    .then(data => setImageConfig({base: data.images.base_url, size: data.images.profile_sizes[2]}));        
      },[]); 
      
      const searchBoxes = (
        <div className = {`${ expandedActor.render === false && expandedMovie.render === false ? 'App' : 'no-display'}`}>
          <Search 
            result = {actorResult}
            image = {imageConfig}
            input = {controlledInput.actor}
            controlinput = {setControlledInput}
            get = {getPerson}
            type = 'actor'
            openactor = {openActor}
          
          />
          <p>or</p>
  
          <Search
            result = {movieResult}
            image = {imageConfig}
            input = {controlledInput.movie}
            controlinput = {setControlledInput}
            get = {getMovie}
            type = 'movie'
            openmovie = {openMovie}
            />
        </div>
      )

  return (
  
        <div>
         {expandedMovie.render ? <MovieExpanded back = { () => backToSearch()} details = {expandedMovie.details} openactor = {openActor} openmovie = {openMovie} image = {imageConfig} /> : null}
         {expandedActor.render ? <ActorExpanded back = {() => backToSearch()} details = {expandedActor.details} openactor = {openActor} openmovie = {openMovie} image = {imageConfig} /> : null}
         { searchBoxes }
         
        </div>
  )
}

export default App;
