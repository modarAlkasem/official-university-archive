import React from 'react';
import CookieService from  './../../CookieService/CookieService';
import {Route ,Redirect } from 'react-router-dom';

const ProtectedRoute = ({component:Component , ...rest})=>{

    if(CookieService.get('access_token')){

    }
    return(

        <Route {...rest}
            render ={(props)=>{
                if(CookieService.get('access_token')){
                    return <Component {...props}/>;
                }else{
                    
                    return<Redirect to={{pathname:'/signIn',state:{from:props.location }}}/>
                }
                
            }}
        />

    );
}

export default ProtectedRoute;