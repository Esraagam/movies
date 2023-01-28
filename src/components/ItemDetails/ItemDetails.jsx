import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Helmet } from 'react-helmet';



export default function ItemDetails() {
    let {id,media_type}=useParams();
    const[itemDetails,setitemDetails]=useState({})

 async  function getItemDetails(id,mediatype){
    let {data}= await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`)
     setitemDetails(data);
    }

    useEffect(()=>{
        getItemDetails(id,media_type)

    },[])
  return <>
   <Helmet>
    <title>{itemDetails.title}</title>
  </Helmet>
  <div className='row'>
    <div className='col-md-3'>
    <img src={'https://image.tmdb.org/t/p/w500/'+itemDetails.poster_path} className='w-100' alt=""></img>
        <img src={'https://image.tmdb.org/t/p/w500/'+itemDetails.profile_path} className='w-100' alt=""></img>
    </div>
    <div className='col-md-9'>
      <h2>{itemDetails.title}{itemDetails.name}</h2>
      <p className='py-2 text-muted' >{itemDetails.overview}</p>
     <div className='d-flex'>vote_average :{itemDetails.vote_average? <h6 className=' mx-2 text-white '>{itemDetails.vote_average?.toFixed(1)}</h6>:''}</div>
     <div className='d-flex'>vote_count :{itemDetails.vote_count? <h6 className='mx-2  text-white '>{itemDetails.vote_count?.toFixed(1)}</h6>:''}</div>

        
    </div>
  </div>
  
  </>
}
