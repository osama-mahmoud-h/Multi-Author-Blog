import React from 'react';
import { useEffect } from 'react';
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { get_popular_articles } from '../../store/actions/home/homeAction';
const PopularArtical = () => {
    const dispatch = useDispatch();

    const { popularArticles } = useSelector(state => state.homeReducer);
    useEffect(()=>{
        dispatch(get_popular_articles())
    },[]);
    return (
        <>{
        popularArticles&&popularArticles.length>0?
        popularArticles.map((art, index) => 

          <div key={index} className="row">
        <div className="col-4">
            <Link to={`/article/details/${art._id}`} className='image'><img src={`/uploads/articleImages/${art.image}`} alt="" /></Link>
        </div>
        <div className="col-8">
            <div className="title-time">
                <Link to={`/article/details/${art._id}`}>{art.title}</Link>
                <br />
                <span>{moment(art.createdAt).format('DD MMM YYYY')}</span>
            </div>
        </div>
    </div>
        )
      
        :""
           
    }</>
    )
};

export default PopularArtical;
