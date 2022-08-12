import React, { useEffect } from 'react';
import { BsFillPeopleFill } from "react-icons/bs";
import { FaRegCaretSquareRight,FaRegUser,FaTag } from "react-icons/fa";
import { Link} from "react-router-dom";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { category_count } from '../../store/actions/dashboard/categoryAction';
import { tag_count } from '../../store/actions/dashboard/tagAction';
import { article_count } from '../../store/actions/dashboard/articleAction';
import { users_count, visitors_count } from '../../store/actions/dashboard/usersAction.js';

const DashboradIndex = () => {
    const dispatch = useDispatch();
    const { tagCount } = useSelector(state => state.dashboradTag);
    const { categoryCount } = useSelector(state => state.dashboradCategory);
    const { articleCount } = useSelector(state => state.dashboradArtical);
    const { usersCount } = useSelector(state => state.usersReducer);
    const { visitorsCount } = useSelector(state => state.usersReducer);

    useEffect(()=>{
        dispatch(category_count());
        dispatch(tag_count());
        dispatch(article_count())
        dispatch(users_count());
        dispatch(visitors_count());

    },[]);

    const chartOptions = {
        series : [
            {
                name : "Visitor",
                data : [100,120,90,200,244,324,123,213,123,342,321,133]
            }
        ],
        options : {
            color:['#181ee8','#181ee8'],
            chart : {
                background : 'transparent'
            },
            dataLabels : {
                enabled : false
            },
            stroke : {
                curve : 'soomth'
            },
            xaxis : {
                categories : ['Jan','Feb','Mar','Apl','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
            },
            legend : {
                position : 'top'
            },
            grid : {
                show : 'false'
            }
        }
    }
    return (
        <div className='dashborad-main-content-elements'>
            <div className="dashborad-elements">
                <div className="cards">
                    <div className="single-card">
                        <div className="card_icon">
                            <BsFillPeopleFill/>
                        </div>
                        <div className="card_info">
                            <h2>{visitorsCount}</h2>
                            <span>Visitoes</span>
                        </div>
                    </div>
                    <Link to="/dashboard/all-article/page-1"  className="single-card">
                        <div className="card_icon">
                            <BsFillPeopleFill/>
                        </div>
                        <div className="card_info">
                            <h2>{articleCount}</h2>
                            <span>Articles</span>
                        </div>
                    </Link>
                    <Link  to="/dashboard" className="single-card">
                        <div className="card_icon">
                            <FaRegCaretSquareRight/>
                        </div>
                        <div className="card_info">
                            <h2>{ categoryCount }</h2>
                            <span>Categorys</span>
                        </div>
                    </Link>
                    <Link to="/dashboard"  className="single-card">
                        <div className="card_icon">
                            <FaTag/>
                        </div>
                        <div className="card_info">
                            <h2>{tagCount}</h2>
                            <span>Tags</span>
                        </div>
                    </Link>
                    <Link to='/deshboard/all-sub-admin' className="single-card">
                        <div className="card_icon">
                            <FaRegUser/>
                        </div>
                        <div className="card_info">
                            <h2>{usersCount}</h2>
                            <span>users</span>
                        </div>
                    </Link>
                </div>
                <div className="card-chart">
                    <Chart
                        options={chartOptions.options}
                        series={chartOptions.series}
                        type = 'bar'
                        height='100%'
                        width = '100%'
                    />
                </div>
            </div>
        </div>
    )
}

export default DashboradIndex