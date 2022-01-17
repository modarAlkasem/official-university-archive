import React from 'react';
import classes from './SignIn.module.css';

const SignIn  = props=>{    
    return (
        <div className = {classes.SignIn}> 
            <div className = {classes.SignInHeader} dir="rtl">
                <span className={classes.Text}> official university archive</span>

            </div>
            <div className = {classes.SignInMainPart}>
                <div className = {classes.MainPartHeader} dir='rtl' ><span className={classes.MainPartHeaderText}>تسجيل الدخول من هنا</span></div>
                <div className={classes.SignInFields} dir="rtl">

                    <div className = {classes.SignInUserNameField +' form-group'}>
                        <label htmlFor = "SignInUserNameFieldId">اسم المستخدم :</label>
                        <input name="userNameField" className = {'form-control'} type='email' id="SignInUserNameFieldId" placeholder="اسم المسنخدم" value={props.sentUserName} onChange={props.SentUserNameSignInChangedHandler}/>
                        <span id='signInuserNameFieldValId' ></span>
                    </div>
                    <div className = {classes.SignInPasswordField +' form-group'}>
                        <label htmlFor = "SignInPasswordFieldId">كلمة السر :</label>
                        <input name="passwordField" className = {'form-control'} type='password' id='SignInPasswordFieldId' placeholder="كلمة السر"  value={props.sentPassword} onChange={props.SentPasswordSignInChangedHandler}/>
                        <span id='signInPasswordFieldValId' ></span>
                    </div>
                    <div className = {classes.RememberMeField}>
                            <label htmlFor='RememberMeFieldId'>تذكرني</label>
                            <input type='checkbox' name= 'rememberMeField' id='RememberMeFieldId' style={{'display':'inline ' ,'cursor':'pointer' , marginRight:'10px' }} value={props.rememberMe} onClick={props.RememberMeSignInChangedHandler}/>
                    </div>

                </div>
                <div className= {classes.signInBtnDiv} dir='rtl'>
                        <button type='button' className='btn btn-primary btn-lg ' onClick={props.signIn}>
                            تسجيل الدخول
                        </button>

                </div>
            </div>

        </div>

    );
}

export default SignIn ;