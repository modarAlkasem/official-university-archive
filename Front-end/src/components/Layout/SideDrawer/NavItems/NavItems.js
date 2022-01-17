import React ,{useContext} from 'react';
import classes from './NavItems.module.css';
import {Link} from 'react-router-dom';
import GeneralContext from './../../../../context/general_context';

const NavItems = ()=>{
    const generalContext  = useContext(GeneralContext);
    let showButton = false;

    const checkboxClickedHandler = ()=>{
       
        const buttonSelector =  document.getElementById('logout_btn').style;
        if(!showButton){
            showButton=true;
            buttonSelector.opacity='1';
            buttonSelector.visibility='visible';  
        } else{
            showButton=false;
            buttonSelector.opacity='0';
            buttonSelector.visibility='hidden';
        }  
    }
    const categories = generalContext.categories.map(current=>{
        return <Link to={`/categories/${current.category_id}`} key={current.category_id}>
            <i className="far fa-file-archive NavItems-Icons"></i>
             <span>{current.title}</span></Link>

    });

    return( 
        <div className={classes.NavItems}  >
            
            <span className={classes.Header}>header</span>
            <Link to="/" ><i className="fas fa-tachometer-alt NavItems-Icons" ></i> <span> لوحة التحكم</span></Link>
            {categories}
            <span className={classes.settings} ><label htmlFor="check_2"><i className="fa fa-cogs NavItems-Icons"></i> <span>الإعدادات</span></label> <button type="button" className={classes.Logout_btn }  id="logout_btn" onClick={generalContext.signOut}>تسجيل الخروج</button></span>
          <input type="checkbox" id="check_2" onClick={checkboxClickedHandler}/>
        </div>
  

    );
}


export default NavItems;