import React from 'react';
import classes from './ContentHeader.module.css';

const ContentHeader = ()=>(
    <div className={classes.ContentHeader +' row'}>

        <div className={classes.Content + ' col-lg-12 col-md-12 '}>
            
            <h3 className={classes.ContentHeading}> official university archive <span >لوحة التحكم</span> </h3>
        </div>

    </div>

);



export default React.memo(ContentHeader) ;