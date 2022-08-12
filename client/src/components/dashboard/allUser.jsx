import React from 'react';
import Helmet from 'react-helmet';
import { FaSearch } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { Link, useParams } from "react-router-dom";

import Pagination from '../home/pagination'

const AllUser = () => {

    const {currentPage} = useParams();
    const dispatch = useDispatch();
    
    const user = 'sub-admin';
    const status = "block"
    return (
        <div className='all-sub-admin'>
            <Helmet>
                <title>All user</title>
            </Helmet>
            <h2>page not ready yet</h2>
            <Link to={'/dashboard'}>go to dashboard</Link>
        </div>
    )
}

export default AllUser