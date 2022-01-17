import classes from './Date.module.css';
import React from 'react';

const Date = props =>{
    let today = new window.Date().toLocaleDateString();


   

    return(

        <div className={classes.Date + ' col-lg-3 col-md-3 col-lg-pull-5  col-md-pull-5  '}  >
            <div className={classes.Part1}>
                <span className={classes.Text} >التاريخ اليوم</span>
                <span className={classes.DateExp} > {today}</span>
            </div>

            <div className={classes.Part2}>
                <i className="fas fa-calendar-check"></i>
            </div>

        </div>
    );
}

export default Date;