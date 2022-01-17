import React , {Component} from 'react';
import  Layout from '../../components/Layout/Layout';
import axios from 'axios';
import GenralContext from './../../context/general_context';
import { Route , Switch ,withRouter} from 'react-router-dom';
import SignIn from './../../components/SignIn/SignIn';
import CookieService from './../../CookieService/CookieService';
import ProtectedRoute from './../../hoc/ProtectedRoute/ProtectedRoute';




class App extends Component {
    axiosInstance = axios.create({
        baseURL:'http://127.0.0.1:8000'
    
    });
    
    state = {
        categories : [],
        sentUserName:'',
        sentPassword : '',
        rememberMe :false,
        userName :'',
        firstName:'',
        lastName:'',
        role:'',       
        authenticated:false,
        userId:null
      }


      

     getCategories= ()=>{
        

        this.axiosInstance.get('/categories', {
            headers:{
                Authorization:`Bearer ${CookieService.get('access_token')}`
            }
        }).then(res=>{
            this.setState({
                categories:res.data
            });
        }).catch(err=>{
            console.error(err);
        });

      }


      sentUserNameSignInChangedHandler = event=>{
        this.setState({
            sentUserName : event.target.value
        });
      }

      sentPasswordSignInChangedHandler = event=>{
        this.setState({
            sentPassword : event.target.value
        });
      }
      rememberMeSignInChangedHandler = ()=>{
          
        this.setState({
            rememberMe : !this.state.rememberMe
        });
      }

      signIn=()=>{
        
        const userNameValEle =document.getElementById('signInuserNameFieldValId');
        const passwordValEle = document.getElementById('signInPasswordFieldValId');
        const reg = /[\s\S]*\S[\s\S]*/;
        const  stylesString = 'display:inline; color:#f39c12; ';
        if(this.state.sentUserName.match(reg)){
            userNameValEle.style.display = 'none';
            if(this.state.sentPassword.match(reg)){
                passwordValEle.style.display='none';
                this.axiosInstance.post('/signIn' ,{
                    'email':this.state.sentUserName,
                    'password':this.state.sentPassword
                } ).then(res=>{
                    if(!this.state.rememberMe){
                        const options = {path:'/'};
                        CookieService.set('access_token' ,res.data.token , options);
                    }
                    if(this.state.rememberMe){
                        const expiresAt= 60*24;
                        let date =new Date();
                        date.setTime(date.getTime()+(expiresAt*60*1000));
                        const options ={
                            path:'/',
                            expires:date
                        };
                        CookieService.set('access_token' ,res.data.token , options);

                    }
                    this.setState({
                        sentPassword:'',
                        sentUserName:'',
                        role:res.data.role,
                        rememberMe:false,
                        firstName:res.data.first_name,
                        lastName:res.data.last_name,
                        userName:res.data.email,                        
                        authenticated:true,
                        userId :res.data.user_id

                    });

                            this.props.history.push('/');
                    
                    
                    
                }).catch(err=>{
                    // if(err.response.state===401){
                        userNameValEle.style.cssText = stylesString;
                        userNameValEle.innerText='**اسم المستخدم او كلمة المرور غير صحيح**' ;
                        
                    // }
                    
                });

            }else{
                passwordValEle.innerText = '** يجب ان لا يكون حقل كلمة السر فارغ **';
                passwordValEle.style.cssText = stylesString;
                return 0;
            }

        }else{
            userNameValEle.innerText = '** يجب ان لا يكون حقل اسم المستخدم فارغ **';
            userNameValEle.style.cssText = stylesString;
            return 0;

        }


      }
      signOut=()=>{
          this.axiosInstance.get('/signOut',{
            headers:{
                Authorization:`Bearer ${CookieService.get('access_token')}`
            }
        }).then(()=>{
            CookieService.remove('access_token');
            this.setState({
                firstName:'',
                lastName:'',
                userName:'',
                role:'',                
                categories:[],
                rememberMe:false,
                authenticated:false,
                userId:null
            });
        }).catch(err=>{console.error(err)});
        this.props.history.push('/signIn');

      }
//        someThing=()=>{
//            if(this.state.token){

            
//             return (<span><Redirect to ='/'/>
//                          <Layout></Layout>
//                 </span> );
//            }else{
            
//             return(
//                 <span>                <Redirect to ='/signIn'/> 
//                 <SignIn sentUserName = {this.state.sentUserName}
//                                                     sentPassword = {this.state.sentPassword}  
//                                                     rememberMe = {this.state.rememberMe}
//                                                     SentUserNameSignInChangedHandler ={this.sentUserNameSignInChangedHandler}
//                                                     SentPasswordSignInChangedHandler ={this.sentPasswordSignInChangedHandler}
//                                                     RememberMeSignInChangedHandler = {this.rememberMeSignInChangedHandler}
//                                                     signIn ={this.signIn}/></span>
// );
//            }
//        }
    render(){
        return (
            
                <GenralContext.Provider value = {{categories:this.state.categories,
                                                firstName:this.state.firstName,
                                                lastName:this.state.lastName,
                                                userName:this.state.userName,
                                                role:this.state.role ,
                                                signOut:this.signOut,
                                                authenticated:this.state.authenticated ,
                                                userId:this.state.userId}}>  
                <Switch>
                    <ProtectedRoute path='/' exact component={Layout}/>
                    <Route path='/signIn' exact render={()=>{return  <SignIn sentUserName = {this.state.sentUserName}
                                                     sentPassword = {this.state.sentPassword}  
                                                    rememberMe = {this.state.rememberMe}
                                                    SentUserNameSignInChangedHandler ={this.sentUserNameSignInChangedHandler}
                                                   SentPasswordSignInChangedHandler ={this.sentPasswordSignInChangedHandler}
                                                   RememberMeSignInChangedHandler = {this.rememberMeSignInChangedHandler}
                                                    signIn ={this.signIn}/> }} />
                    
                </Switch>

                </GenralContext.Provider>
            
        );
    
    }

    getAuthUserInfo=()=>{
        this.axiosInstance.get('/authUserInfo' ,{
            headers:{
                Authorization:`Bearer ${CookieService.get('access_token')}`
            }
        } ).then(res=>{
            
            this.setState({
                sentPassword:'',
                sentUserName:'',
                role:res.data.role,
                rememberMe:false,
                firstName:res.data.first_name,
                lastName:res.data.last_name,
                userName:res.data.email,               
                authenticated:true,
                userId:res.data.user_id

            });
    }).catch(error=>{console.error(error)});}


componentDidMount(){
    if(CookieService.get('access_token')){

        this.getCategories();
        this.getAuthUserInfo();
    }
    
}

componentDidUpdate(){
    if(CookieService.get('access_token') && this.state.categories.length===0){
        this.getCategories();

    }
    // console.log(this.props.location);
    // if(this.props.location.data==='details'){
    //     this.getAuthUserInfo();
    // }
    
    

}

}


export default withRouter(App);