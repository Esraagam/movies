import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import MediaItem from '../MediaItem/MediaItem';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
export default function Home() {

  let[trendingMovies,settrendingMovies]=useState([]);
  let[trendingTv,settrendinTv]=useState([]);
  let[trendingPerson,settrendingPerson]=useState([]);

  async function getTrending(mediaType,callback){
   let {data}= await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=f1aca93e54807386df3f6972a5c33b50`)
    console.log(data.results);
    callback(data.results);
   }
  useEffect(()=>{
    getTrending('movie',settrendingMovies);
    getTrending('tv',settrendinTv);
    getTrending('person',settrendingPerson);
  },[])

  return <>
  <Helmet>
    <title>home page</title>
  </Helmet>

  <div className='row py-3'>
    <div className='col-md-4 d-flex align-items-center'>
     <div>
       <div className='brd w-25 mb-3'></div>
       <h2 className='h5'>Trending<br/> movies <br/>to watch right now</h2>
       <p className='py-2 text-muted'> most watched movies by week </p>
       <div className='brd w-100 mt-3'></div></div>
    </div>
    {trendingMovies.slice(0,16).map((item,index)=> < MediaItem Key={index} item={item}/>)}
  </div>
  <hr/>
  <div className='row py-3'>
    <div className='col-md-4 d-flex align-items-center'>
     <div>
       <div className='brd w-25 mb-3'></div>
       <h2 className='h5'>Trending<br/> tv <br/>to watch right now</h2>
       <p className='py-2 text-muted'> most watched movies by week </p>
       <div className='brd w-100 mt-3'></div></div>
    </div>
    {trendingTv.slice(0,16).map((item,index)=> < MediaItem Key={index} item={item}/>)}
  </div>
  <hr/>
  <div className='row py-3'>
    <div className='col-md-4 d-flex align-items-center'>
     <div>
       <div className='brd w-25 mb-3'></div>
       <h2 className='h5'>Trending<br/> people <br/>to watch right now</h2>
       <p className='py-2 text-muted'> most watched movies by week </p>
       <div className='brd w-100 mt-3'></div></div>
    </div>
    {trendingPerson.filter((person)=>person.profile_path!==null).slice(0,16).map((item,index)=> < MediaItem Key={index} item={item}/>)}
  </div>
  </>
  }
