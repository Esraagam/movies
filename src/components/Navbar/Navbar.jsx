import React from 'react';
import { Link } from 'react-router-dom';


export default function Navbar({userdata ,logout}) {
  return <nav className='p-2 d-flex  flex-column flex-md-row justify-content-between'>
    <div className="left-nav  flex-column flex-md-row  d-flex align-items-center">
      <h1 className='m-0 pe-3'>Noxe</h1>
      {userdata?<ul className='list-unstyled m-0 d-flex flex-column flex-md-row  align-items-center'>
        <li className='px-2'><Link to='home'>Home</Link></li>
        <li className='px-2'><Link to='movies'>Movies</Link></li>
        <li className='px-2'><Link to='tv'>Tv</Link></li>
        <li className='px-2'><Link to='people'>People</Link></li>
      </ul>:''}
      
    </div>
    <div className="right-nav flex-column flex-md-row  d-flex align-items-center">
      <div className="social-media">
        <i className='mx-1 fab fa-facebook'></i>
        <i className='mx-1 fab fa-instagram'></i>
        <i className='mx-1 fab fa-youtube'></i>
        <i className='mx-1 fab fa-spotify'></i>
      </div>
      <ul className='list-unstyled m-0 flex-column flex-md-row  d-flex align-items-center'>
        {userdata?<><li className='px-2 cursor-pointer' onClick={logout}><span >Logout</span></li>
        <li className='px-2'><Link to='Profile'>profile</Link></li></>:<><li className='px-2'><Link to='login'>Login</Link></li>
        <li className='px-2'><Link to=''>Register</Link></li></>}
        

        

        
      </ul>
    </div>
  </nav>

}
