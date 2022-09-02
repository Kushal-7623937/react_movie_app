import React from 'react';
import Styled from "styled-components";


const MovieContainer = Styled.div`
display: flex;
flex-wrap: wrap;
flex-direction: column;
margin: 10px;
padding: 10px;
width: 280px;
box-shadow:0 3px 10px 0 #aaa;
cursor:pointer;


`;
const CoverImage = Styled.img`
height:360px;
object-fit: cover;
`;

const MovieName = Styled.span`
color: black;
font-size: 20px;
font-weight: bold;
overflow: hidden;
`;

const YearName = Styled.span`
display: flex;
flex-direction: column;
text-transform: capitalize;


`;


const MovieComponent =(props)=>{


	const {Title , Year , imdbID ,Type , Poster} = props.movie;
	return(

<div>
<MovieContainer
      onClick={() => {
        props.onMovieSelect(imdbID);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
<CoverImage src={Poster} /> 
<MovieName>{Title} </MovieName>
<YearName> Year: {Year}</YearName>
<YearName> Type: {Type}</YearName>



</MovieContainer>
</div>

		);

}

export default MovieComponent;