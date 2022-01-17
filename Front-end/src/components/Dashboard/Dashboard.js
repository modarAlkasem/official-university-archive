import React , {useContext} from 'react';
import classes from './Dashboard.module.css';
import Category from './Category/Category';
import Date from './Date/Date';
import GeneralContext from './../../context/general_context';

const Dashboard = props =>{
         const generalContext = useContext(GeneralContext);
         const categories = generalContext.categories.map(current=>{
             return (
                 <Category catName = {current.title} amount ='2' key={current.category_id} catId = {current.category_id}/>
             );
         });
        return (

            <div className ={classes.Dashboard +" container-fluid "} >

                <div className="row">
                    <div className={classes.Header+ ' col-lg-12 col-md-12'}>
                        <h3 className={classes.DashHeading}> Official University Archive <span >لوحة التحكم</span> </h3>
                        
                    </div>

                    {/* <div className="col-lg-4">
                        Date
                    </div> */}

                </div>
                <div className="row">
                    {categories}

                </div>
                <div className="row" >
                    <Date/>

                </div>
                





            </div>
        );
}

export default Dashboard ;