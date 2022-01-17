
class Auth {
    constructor (authState){
        
        this.authenticated = authState;


    }

    signIn(callBack){
        
        // if(this.authenticated ){
        //     callBack();

        // }
    }

    signOut(callBack){
        callBack();
    }

    isAuthenticated = ()=>{
        return this.authenticated;
    }
}

export default Auth ;