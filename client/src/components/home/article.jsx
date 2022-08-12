import React from 'react'
import moment from 'moment'
import { Link} from "react-router-dom";
import htmlToText from "react-html-parser";

const Article = ({index,art}) => {
    return (
        <div key={index} className="home-artical">
            <div className="row">
                <div className="col-4">
                    <div className="home-image">
                        <div className="image">
                            <img src={`/uploads/articleImages/${art.image}`} alt="" />
                            <span>{art.category}</span>
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <div className="home-artical-details">
                        <div className="title">
                            <Link to={`/article/details/${art.slug}`}>{art.title}</Link>
                        </div>
                        <div className="name-time">
                            <span><Link to='/'>{art.adminName}</Link></span>
                            <span>{moment(art.createdAt).fromNow()}</span>
                        </div>
                        <div className="artical-text">
                            {htmlToText(art.text.slice(0, 230))}
                        </div>
                        <div className="read-more">
                            <button className="read-more-btn">
                                <Link to={`/article/details/${art._id}`}>Read more</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Article