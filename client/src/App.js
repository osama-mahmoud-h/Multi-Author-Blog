import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import Home from './components/home/home';
import HomeArtical from './components/home/homeArtical';
import ArticalDetails from './components/home/articalDetails';
import CategoryArtical from './components/home/categoryArtical';
import TagArtical from './components/home/tagArtical';

//utils and auth
import AdminLogin from './components/auth/adminLogin';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Error404 from './components/utils/error404';

//dashboard
import Dashboard from './components/dashboard/dashborad';
import DashboradIndex from './components/dashboard/dashboradIndex';
import DashboradArticle from './components/dashboard/dashboradArticle';
import ArticleAdd from './components/dashboard/articleAdd';
import ArticleEdit from './components/dashboard/articleEdit';
import AllCategory from './components/dashboard/allCategory';
import AddCategory from './components/dashboard/addCategory';
import EditCategory from './components/dashboard/editCategory';
import AllTag from './components/dashboard/allTag';
import AddTag from './components/dashboard/addTag';
import EditTag from './components/dashboard/editTag';
import AllSubAdmin from './components/dashboard/allSubAdmin';
import AllUser from './components/dashboard/allUser';
import SubadminProfile from './components/dashboard/subadminProfile';
import DashComments from './components/dashboard/dashComments';
import ProtecteHomeRoute from './components/auth/protectHomeRoute';



function App() {
  return (
   <>
   <Router>
    <Routes>
      <Route path='/' element={<ProtecteHomeRoute/>}>
      <Route  path=''  element={<Home/>}>
          <Route path='' element={<HomeArtical />}   />
          <Route path='article/:currentPage' element={<HomeArtical />}   />
          <Route path='article/details/:articleId' element={<ArticalDetails />}  />
          <Route path='article/category/:categorySlug/:currentPage' element={<CategoryArtical />}  />
          <Route path='article/tag/:tagSlug/:currentPage' element={<TagArtical/>}  />
          <Route path='article/search/:searchValue' element={<HomeArtical/>}  />
      </Route>
      </Route>
     

      <Route path='/admin/login' element={< AdminLogin/>}  />
      <Route path='/register' element={<Register/>}  />
      <Route path='/login' element={<Login/>}  />
      <Route path='*' element={<Error404/>} />

      <Route path="dashboard" element={<Dashboard/> }>
          <Route path="" element={<DashboradIndex/>}  />
          <Route path="all-article/:currentPage" element={<DashboradArticle/>}  />
          <Route path="article-add" element={<ArticleAdd/>}  />
          <Route path="article/edit/:articleId" element={<ArticleEdit/>}  />
          <Route path="all-category/:currentPage" element={<AllCategory/>}  />
          <Route path="add-category" element={<AddCategory/>}  />
          <Route path="category/edit/:cateSlug" element={<EditCategory/>}  />

          <Route path="all-tag/:currentPage" element={<AllTag/>}  />
          <Route path="add-tag" element={<AddTag/>}  />
          <Route path="tag/edit/:tagSlug" element={<EditTag/>}  />

          <Route path="all-sub-admin/:currentPage" element={<AllSubAdmin/>}  />

          <Route path="all-user/:currentPage" element={<AllUser/>}  />

          <Route path="sub-admin-profile/:adminId" element={<SubadminProfile/>}  />

          <Route path="comments/:currentPage" element={<DashComments/>}  />
          

      </Route>

    </Routes>
   </Router>
   </>
  );
}

export default App;
