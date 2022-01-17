import React from 'react';
import classes from './Logo.module.css';
import {Link} from 'react-router-dom';
const Logo = props =>(
    <Link to="/" className={classes.LogoMain}><h3 className={classes.Logo}>Official University Archive</h3></Link>

);

export default Logo;