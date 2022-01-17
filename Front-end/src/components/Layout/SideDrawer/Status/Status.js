import React , {useContext} from 'react';
import img from "./../../../../assets/ic10.png";
import classes from './Status.module.css';
import {Link} from 'react-router-dom';
import GeneralContext from './../../../../context/general_context';
const Status = ()=>{
    
    const generalContext =useContext(GeneralContext);
    return(

    <div className={classes.Status} >
        <img src={img} className="img-circle" alt="avatar"/>
        <Link to={`/membershipProfile/${generalContext.userId}`} className={classes.UserName}>{generalContext.firstName}</Link>
        <div className={classes.OnlineStatus}>
            <span className={classes.OnlineText}>online</span>
            <i className={"fa fa-circle text-success  "+classes.OnlineDot}></i>
        </div>


    </div>

);}

export default Status;