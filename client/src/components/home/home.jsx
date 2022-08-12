import React, { useState, useRef, useEffect } from 'react';
import { FaArrowUp, FaChevronRight } from 'react-icons/fa';
import Navbar from './navbar';
import PopularArtical from './popularArtical';
import { Link, Switch, Route, useNavigate, Outlet, useOutletContext } from "react-router-dom";
import HomeArtical from './homeArtical';
import ArticalDetails from './articalDetails';
import CategoryArtical from './categoryArtical';
import TagArtical from './tagArtical';
import Footer from './footer';
import CreateAt from './createAt';
import { useSelector, useDispatch } from 'react-redux'
import { add_visitor, get_home_tag_category } from '../../store/actions/home/homeAction'
import { is_user_auth } from '../../store/actions/userAuthAction';

const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { allCategory, allTag } = useSelector(state => state.homeReducer)
   // const { authenticate,userInfo } = useSelector(state => state.);
   const [userInfo] = useOutletContext();

    const [value, setvalue] = useState('');
    const nav = useRef();
    const search = (e) => {
        e.preventDefault();
        navigate(`/article/search/${value}`);
    }

    const scrollTop = () => {
        nav.current?.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        dispatch(get_home_tag_category())
        dispatch(add_visitor())
    }, []);

  

    return (
        <div className="home">
            <Navbar nav={nav} />
            <div className="main-content">
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                           <Outlet context={[userInfo]}/>
                        </div>
                        <div className="col-4">
                            <div className="search-category-tag">
                                <div className="search">
                                    <h2>Search</h2>
                                    <div className="form-group">
                                        <input onChange={(e) => setvalue(e.target.value)} className='form-control' type="text" placeholder='search' />
                                    </div>
                                    <div className="form-group">
                                        <button onClick={search} className="btn btn-block">Search</button>
                                    </div>
                                </div>
                                <div className="popular-artical">
                                    <div className="title">
                                        <h3>Popular Artical</h3>
                                    </div>
                                    <PopularArtical />
                                </div>
                                <div className="flow-facebook">
                                    <div className="title">
                                        <h3>Follow Me</h3>
                                    </div>
                                    <div className="image">
                                        <iframe src="https://www.linkedin.com/in/osama-mahmoud-1916301a3" style={{
                                            width: "500px", height: "200px", border: 'none', overflow: 'hidden', scrolling: "no", frameborder: "0", allowfullscreen: "true", allow: "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                        }}></iframe>
                                    </div>
                                </div>
                                <div className="category">
                                    <div className="title">
                                        <h3>Category</h3>
                                    </div>
                                    <ul className="cate-list">
                                        {
                                            allCategory&&allCategory.length > 0 && allCategory.map((cate, index) =>
                                                <div key={index} className="cate-item">

                                                    <li><FaChevronRight /><Link to={`/article/category/${cate}/page-1`}>{cate}</Link></li>
                                                    <span></span>
                                                </div>
                                            )
                                        }
                                    </ul>
                                </div>
                                <div className="tag">
                                    <div className="title">
                                        <h3>Tag</h3>
                                    </div>
                                    <ul>
                                        {
                                            allTag&&allTag.length > 0 && allTag.map((tag, index) => <li key={index}><Link to={`/article/tag/${tag.split(' ').join('-')}/page-1`}>{tag}</Link></li>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <CreateAt />
            <div onClick={scrollTop} id="scroll">
                <button className="scroll-btn">
                    <span><FaArrowUp /></span>
                </button>
            </div>
        </div>
    )
};

export default Home;