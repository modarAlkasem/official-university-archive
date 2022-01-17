<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
        public function register(Request $request){
            if(auth()->user()->role=='A'){
                $validator = Validator::make($request->all() , [
                    'email'=>'required',
                    'first_name'=>'required',
                    'last_name'=>'required',
                     'password'=>'required',                 
                     'role'=>'required',
                ]);
                
                if($validator->fails()){
                    return response()->json([],404);
    
                }
                if(User::where('email', 'like', $request->email)->get()->count()){
                    return response()->json(['error'=>'يوجد مسبقا اسم مستخدم مماثل'],404 );
                    
                }if(!User::where('email', 'like',$request->email)->get()->count()){
                    $input = $request->all();
                    $input['password']=Hash::make($input['password']);
                    $user = User::create($input);
                    $success['token']=$user->createToken('jskl^fjskl$mc,cmxzklc$00432,zmc#z#,x#wop23')->accessToken;
                    $success['first_name'] = $user->first_name;
                    $success['last_name'] = $user->last_name;
                    $success['role'] = $user->role;
                    $success['email'] = $user->email;
                    $success['user_id'] = $user->user_id;
                    return response()->json($success , 200);
                }
            }else{
                return response()->json(['error'=>'المستخدم غير مسموح له'] ,401)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'POST')->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            }


        }






        public function signIn(Request $request){

            if(Auth::attempt(['email'=>$request->email , 'password'=>$request->password])){
                $user = Auth::user();
                $success['token']=$user->createToken('jskl^fjskl$mc,cmxzklc$00432,zmc#z#,x#wop23')->accessToken;                
                $success['first_name'] = $user->first_name;
                $success['last_name'] = $user->last_name;
                $success['role'] = $user->role;
                $success['email'] = $user->email;
                $success['user_id'] = $user->user_id;
                return response()->json($success , 200)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'POST')->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            }else{
                return response()->json(['error'=>'اسم المستخدم او كلمة السر غير صحيحة'],401)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'POST')->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            }


        }

        public function signOut(Request $request){
            $accessToken = auth()->user()->token();
            $token= $request->user()->tokens->find($accessToken);
            $token->revoke();
            return response(['message' => 'تم تسجيل الخروج بنجاح'], 200);

        }

        public function getUserInfo(Request $request){
            return response()->json(auth()->user())->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'GET')->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
             

        }

        public function update(Request $request){

            if(auth()->user()->role=='A'){
                $user = User::find(intval($request->user_id));
                
                
                if($request->oldPassword!=''){
                    if(Hash::make($request->oldPassword)===$user->password){
                        $user->password = Hash::make($request->newPassword);
                    }else{
                        return response()->json(['error'=>'كلمة السر القديمة غير صحيحة' , 'errorType'=>1] ,404)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'PUT')->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
                    }
                }
                if($request->email!== $user->email){
                    if(User::where('email' , 'like' ,$request->email )->get()->count()==0){
                        $user->first_name =$request->first_name;
                        $user->last_name = $request->last_name;
                        $user->email = $request->email;
                        $user->role = $request->role;
                        $user->save();
                    }

                    else{
                        return response()->json(['error'=>'يوجد اسم مستخدم مماثل ' , 'errorType'=>2] ,404)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'PUT')->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
                    }
                }else{
                    $user->first_name =$request->first_name;
                    $user->last_name = $request->last_name;
                    $user->email = $request->email;
                    $user->role = $request->role;
                    $user->save();

                }

                

            }else{
                return response()->json(['error'=>'المستخدم غير مسموح له'] ,401)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'PUT')->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            }

        }


        public function destroy(Request $request){
            
            if(auth()->user()->role=='A'){
                $user = User::where('email' , 'like' , $request->email)->get();
                
                if($user->count()!=0 ){
                    User::where('email' , 'like' , $request->email)->delete();
                    return response()->json([] ,200)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'Delete')->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
                }else{
                    return response()->json(['error'=>'المستخدم غير موجود'] ,404)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'Delete')->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
                }

            }else{
                return response()->json(['error'=>'المستخدم غير مسموح له'] ,401)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'Delete')->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            }
        }


}
