import React from 'react';

import Status from './Status/Status';
import NavItems from './NavItems/NavItems';
import classes from './SideDrawer.module.css';


const SideDrawer = props=>{
    return(
        <div className={classes.SideDrawer}>
            
            <Status/>
            <NavItems/>
        </div>

    );
}

export default SideDrawer;