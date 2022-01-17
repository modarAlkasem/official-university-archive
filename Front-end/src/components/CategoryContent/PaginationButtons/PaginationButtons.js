import React , {useContext} from 'react';
import classes from './PaginationButtons.module.css';
import CategoryContentContext from './../../../context/category_content_context';

const PaginationButtons = props =>{

    const categoryContentContext = useContext(CategoryContentContext);

    return(

    <div className={classes.PaginationButtons +' row'}>

        <div className={classes.Content +' col-lg-12 col-md-12'}>
            <span className={classes.PaginationGroupButtons}>
            <button className={classes.Right } type="button"  name="previousPaginationBtn" id="previous_pagination_btn" onClick= {categoryContentContext.prevNextPageHandler.bind(this,1)}>
                السابق
                <i className="glyphicon glyphicon-chevron-right"></i>
            </button>
            <button className={classes.Left} type="button" name="nextPaginationBtn" id="next_pagination_btn" onClick= {categoryContentContext.prevNextPageHandler.bind(this,2)}>
                التالي
                <i className="glyphicon glyphicon-chevron-left"></i>
            </button>

            </span>
        </div>

    </div>
);}



export default React.memo(PaginationButtons) ;