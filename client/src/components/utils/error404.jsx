import React from 'react';
import {Link} from 'react-router-dom'

const Error404 = ()=>{
    return (
        <div className="error404 wrapper">
        <div className="container">
          <div className="grid-row">
            <div className="colmun colmun-left">
              <h1 className="px-spc-b-20">We can't find the page you are looking for.</h1>
              <span className="px-spc-b-20">This page has been relocated or removed.</span>
      
              <button className="go-home"><i className="fa fa-home"></i><Link to='/'> Go Home</Link></button>
            </div>
            <div className="colmun colmun-right">
            </div>
          </div>
        </div>
      </div>
    );
}

export default Error404