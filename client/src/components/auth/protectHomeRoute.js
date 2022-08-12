import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import {useDispatch,useSelector} from 'react-redux';
import { is_user_auth } from "../../store/actions/userAuthAction";

const ProtecteHomeRoute =()=>{
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(is_user_auth())
    },[]);
    
  const {authenticate,userInfo,loader} = useSelector(state=>state.userAuthReducer);
  console.log("redux auth: ",userInfo);

        return (
          loader
          ? <div className="loader"></div> 
          :
           authenticate ? <Outlet context={[userInfo]} />
          : <Navigate to="/login" replace/>
           
        );
        
      }

export default ProtecteHomeRoute;