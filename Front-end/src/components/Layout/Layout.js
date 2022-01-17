import React ,{useContext}from 'react';
import  Aux from '../../hoc/Auxiliary/Auxiliary';
import HeadingBar from './HeadingBar/HeadingBar';
import SideDrawer from './SideDrawer/SideDrawer';
import Dashboard from './../Dashboard/Dashboard';
import  './Layout_2.css';
import classes from './Layout.module.css';
import CategoryContent from './../../containers/CategoryContent/CategoryContent';
import {BrowserRouter as Router ,Switch  } from 'react-router-dom';
import Details from './../Details/Details';
import AddDocument from './../AddDocument/AddDocument';
import ProtectedRoute from './../../hoc/ProtectedRoute/ProtectedRoute';
import GenralContext from './../../context/general_context';
import AdminProfile from './../AdminProfile/AdminProfile';
import EmployeeProfile from './../EmployeeProfile/EmployeeProfile';

const Layout =()=>{
    let showSideBar = true;
    let generalContext = useContext(GenralContext);
    const checkboxClickedHandler =()=>{
        const mainContentSelector =  document.getElementById('main-content').style;
        if(showSideBar){
            showSideBar=false;
            mainContentSelector.width='95vw';

        }else{
            showSideBar=true; 
            mainContentSelector.width='78vw';
        }

    }
    
    return(
        <Router>
            
                        <Aux>
                            <div>
                            <input type="checkbox" id="check" onClick={checkboxClickedHandler}/>
                    
                                <HeadingBar/>
                                <SideDrawer/>
                            </div>
                            
                                <main className={classes.Content} id="main-content">
                                    
                                    <Switch>
                                        <ProtectedRoute path = "/" exact component = {Dashboard}/>
                                        <ProtectedRoute path = "/categories/:catId" exact component={CategoryContent}/>                            
                                        <ProtectedRoute path = "/categories/:catId/subcategories/:subcatId/:catName/:docId" exact  component = {Details}/>
                                        <ProtectedRoute path = '/categories/:catId/:catName/create' exact component = {AddDocument} />                                        
                                            {generalContext.role==='A'?<ProtectedRoute path = '/membershipProfile/:userId' exact component = {AdminProfile} />:null}                                               
                                            {generalContext.role==='E'?<ProtectedRoute path = '/membershipProfile/:userId' exact component = {EmployeeProfile} />:null}

                                        
                                    </Switch>
                                    
                                </main>
                        
                        
                    </Aux>
        
        
        

        </Router>

    );   
}
export default Layout;