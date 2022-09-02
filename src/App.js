import React,{useState ,useEffect} from "react";
import Styled from "styled-components";
import './App.css';
import MovieComponent from './components/MovieComponent.js';
import axios from 'axios';
import MovieInfoComponent from './components/MovieInfoComponent.js';
import ReactDOM from "react-dom/client";
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import ReactPaginate from 'react-paginate';

export const API_KEY = "db92654d";




const Header = Styled.div`
 display:flex;
 background-color: black;
 flex-direction: row;
 color:white;
 padding:10px;
 font-weight: bold;
 font-size: 25px;
 box-shadow: 0 3px 6px 0 #555;
 `;

 const Appname = Styled.div`
 display : flex ;
 flex-direction :row;
 align-items : center;

 `;

 const MovieImage =Styled.img`
 width: 50px;
 height: 50px;
 margin: 20px;

 `;

 const SearchBox = Styled.div`
 display: flex;
 flex-direction: row;
 background-color: white;
 align-items:center;
 padding: 10px 10px;
 border-radius: 6px;
 margin-left: 20px;
 width : 50%;

 `;

 const SearchIcon = Styled.img`
 width: 30px;
 height: 30px;


 `;
const SearchInput = Styled.input`
width:100%;
border: none;
outline: none;
margin-left:20px;

`;

const MovieListContainer = Styled.div`
display:flex;
flex-direction: row;
flex-wrap: wrap;
padding: 30px;
justify-content: space-evenly;

`;
const Placeholder = Styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;
function App (){
  
const getMovies = (term='movie', page=1) => {
    setLoading(true);
    axios.get(`https://www.omdbapi.com/?apikey=db92654d&s=${encodeURIComponent(term)}&plot=full&page=${page}`)
      .then(response => {
      // console.log(response.data);
      setMovies(response.data.Search);
      setTotal(Math.ceil(response.data.totalResults/50))
      setPages(page);
      setLoading(false);
    }).catch(error => {
      // console.log(error);
      setMovies([]);
      setLoading(false);
    });
  }
  



  const [data , setData] = useState('');
  const[ startTime , setStartTime]= useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();
  const [loading, setLoading] = useState(true);
  const [showPop, setShowPop] = useState(false);
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState({});
  const [keyword, setKeyword] = useState('frozen');
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState();
  useEffect(() => {
    getMovies();
  }, []);
  


   const handlePageClick = e => {
    console.log(e.selected);
    getMovies(keyword, (e.selected + 1));
  }






  const datafetching=async(searchString)=>{

   const response = await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=db92654d`);
   updateMovieList(response.data.Search);
  }

  const onInputChange =(e)=>{
    setData(e.target.value);
    const startTime =setTimeout(()=> datafetching(e.target.value), 500);
    setStartTime(startTime);
  };
  return(

    <>
    
     
  
 <div>
  <div>
  <Header> 

  <Appname><img src="https://png.pngtree.com/png-vector/20190420/ourmid/pngtree-vector-camera-icon-png-image_964594.jpg "  className="camera" /> Kushal Movie  App </Appname>
  <SearchBox>

<SearchIcon src="data:image/png;base64,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" />
<SearchInput placeholder="Search for your favourite movie" value={data} onChange={onInputChange} />

  </SearchBox> 
  </Header>

  <h3 className=" text-center mt-3" id="sub-title"> Get  Your Favourite Movie Details Here</h3>

{selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <Placeholder  src="https://i.pinimg.com/originals/aa/f7/05/aaf705e06726ce3881288ae4be3ac5fe.jpg "  />


        )}

      </MovieListContainer>



<div className='paginate'>
        <ReactPaginate 
          previousLabel={"Back"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={total}
          marginPagesDisplayed={1}
          pageRangeDisplayed={4}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          />
      </div>





  </div>
  
</div>
</>

 
  );
}

export default App;
