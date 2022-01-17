import React from 'react';
import Logo from './Logo/Logo';
import classes from './HeadingBar.module.css';


const HeadingBar = ()=>(

    <div className={classes.HeadingBar} >
       
        <Logo/>
        <label htmlFor="check" id="sidebarToggle">
        <i className="fas fa-bars"></i>
        </label>
       
    </div>


);
export default HeadingBar;