import React from 'react';
import {Helmet} from 'react-helmet';
import DashboradNavbar from './dashboradNavbar'
import Sidebar from './sidebar';
import { Switch, Route, Outlet } from "react-router-dom";
import DashboradIndex from './dashboradIndex';
import DashboradArticle from './dashboradArticle';
import ArticleAdd from './articleAdd';
import ArticleEdit from './articleEdit';
import AllCategory from './allCategory';
import AddCategory from './addCategory';
import EditCategory from './editCategory';
import AllTag from './allTag';
import AddTag from './addTag';
import EditTag from './editTag';
import AllSubAdmin from './allSubAdmin';
import AllUser from './allUser';
import SubadminProfile from './subadminProfile';
import DashComments from './dashComments';

const Dashboard = () => {
  return (
    <div className='dashborad'>
      <Helmet>
        <title>Dashborad</title>
      </Helmet>
      <DashboradNavbar />
      <div className="dashborad-main-content">
       
        <Sidebar />
        <Outlet/>

      </div>
    </div>
  )
}

export default Dashboard