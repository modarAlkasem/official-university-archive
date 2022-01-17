<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\ScientificBodyDoc;
use App\Models\Subcategory;
use Illuminate\Support\Facades\Storage;
use DateTime;
use Illuminate\Http\Response;

class ScientificBodyDocController extends Controller
{

    public function index($catId , $subcatId){
        $scientificBodyDocs=null;
        if(Subcategory::find(intval($subcatId))->title=='الكل'){

            $scientificBodyDocs=ScientificBodyDoc::paginate(10);
            return response()->json($scientificBodyDocs)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'GET')->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        }else{

            $scientificBodyDocs = ScientificBodyDoc::where('subcategory_id' , '=',intval($subcatId))->paginate(10);
            return  response()->json($scientificBodyDocs)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'GET')->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        }
    }





    public function store(Request $request , $catId , $subcatID){

        
        $scientificBodyDoc = new ScientificBodyDoc;
        $scientificBodyDoc->doc_number = intval($request->doc_number);
        $scientificBodyDoc->num_pages = intval($request->num_pages );
        $scientificBodyDoc->source = $request->source;
        $date = DateTime::createFromFormat('Y-m-d',$request->date )->format('Y-m-d');
        $scientificBodyDoc->date = $date;
        $subcategory=intval($request->subcategory_id );
        $scientificBodyDoc->subcategory_id = $subcategory;
        $scientificBodyDoc->content = $request->content ;
        $recievingDate = DateTime::createFromFormat('Y-m-d',$request->recieving_date )->format('Y-m-d');
        $scientificBodyDoc->recieving_date = $recievingDate;
        $scientificBodyDoc->notes = $request->notes ;

        $file = $request->file('file');
        $fileName = $file->getClientOriginalName();
        $pathInfo = pathinfo($fileName);
        $fileName =  $pathInfo ['filename'];
        $fileExtenstion = $pathInfo ['extension'];
        $time= time();
        $dateTime = date('Y_m_d H_i_s',$time);
        $finalFileName =  $fileName .$dateTime .'.'.$fileExtenstion;
        $filePath=null;
        if(Subcategory::find($subcategory)->title=='الصادر'){

            $filePath = Storage::disk('local')->putFileAs('/scientific_body_docs/outgoing' , $file ,  $finalFileName);

        }elseif(Subcategory::find($subcategory)->title=='الوارد'){

            $filePath = Storage::disk('local')->putFileAs('/scientific_body_docs/incoming' , $file ,  $finalFileName);

        }
        

        $scientificBodyDoc->file_path =  $filePath ;
        $scientificBodyDoc->save();
        return response()->json($scientificBodyDoc)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'POST')->header('Access-Control-Allow-Headers', 'Content-Type', 'Authorization');

    }

    public function update(Request $request , $catId , $subcatID , $DocId){
        
        $scientificBodyDoc =  ScientificBodyDoc::find( intval($DocId));
        $scientificBodyDoc->doc_number = intval($request->doc_number);
        $scientificBodyDoc->num_pages = intval($request->num_pages );
        $scientificBodyDoc->source = $request->source;
        $date = DateTime::createFromFormat('Y-m-d',$request->date )->format('Y-m-d');
        $scientificBodyDoc->date = $date;
        $subcategory=intval($request->subcategory_id );
        $scientificBodyDoc->subcategory_id = $subcategory;
        $scientificBodyDoc->content = $request->content ;
        $recievingDate = DateTime::createFromFormat('Y-m-d',$request->recieving_date )->format('Y-m-d');
        $scientificBodyDoc->recieving_date = $recievingDate;
        $scientificBodyDoc->notes = $request->notes ;
        if($request->hasFile('file')){
            Storage::disk('local')->delete('/'.$scientificBodyDoc->file_path);
            $file = $request->file('file');
            $fileName = $file->getClientOriginalName();
            $pathInfo = pathinfo($fileName);
            $fileName =  $pathInfo ['filename'];
            $fileExtenstion = $pathInfo ['extension'];
            $time= time();
            $dateTime = date('Y_m_d H_i_s',$time);
            $finalFileName =  $fileName .$dateTime .'.'.$fileExtenstion;
            $filePath=null;
            if(Subcategory::find($subcategory)->title=='الصادر'){
    
                $filePath = Storage::disk('local')->putFileAs('/scientific_body_docs/outgoing' , $file ,  $finalFileName);
    
            }elseif(Subcategory::find($subcategory)->title=='الوارد'){
    
                $filePath = Storage::disk('local')->putFileAs('/scientific_body_docs/incoming' , $file ,  $finalFileName);
    
            }
                
            $scientificBodyDoc->file_path =  $filePath ;
        }

        $scientificBodyDoc->save();

        return response()->json($scientificBodyDoc)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'PUT')->header('Access-Control-Allow-Headers', 'Content-Type', 'Authorization');

    }


    public function viewDoc($catId , $subcatID , $docId){
        $docPath = ScientificBodyDoc::find(intval($docId))->file_path;
        return response()->file(storage_path('app\\'.str_replace('/','\\',$docPath)) , ['Access-Control-Allow-Origin'=>'http://localhost:3000',
                                             'Access-Control-Allow-Methods'=>'GET',
                                             'Access-Control-Allow-Headers'=>'Content-Type, Authorization']);

    }

    public function search(Request $request){
        $searchingType = intval($request->query('searchingType'));
        $searchingIn = intval($request->query('searchingIn'));
        $value = $request->query('value');
        $docs = null;              
        if($searchingType==2){
           if($searchingIn==4){              
            $docs =ScientificBodyDoc::where('doc_number' , '=' , intval($value))->paginate(10);            
           }else {
                $docs = ScientificBodyDoc::where('subcategory_id', '=' , $searchingIn)->where('doc_number' , '=' , intval($value))->paginate(10);
           } 
        }elseif($searchingType==1){
            if($searchingIn==4){
                $docs = ScientificBodyDoc::where('content', 'like' ,'%'.$value.'%' )->paginate(10);

            }else{                
                $docs = ScientificBodyDoc::where('subcategory_id' , '=' , $searchingIn)->where('content', 'like' ,'%'.$value.'%' )->paginate(10);
            }

        }

        return response()->json($docs)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'GET')->header('Access-Control-Allow-Headers', 'Content-Type', 'Authorization');



        
    }


    

}
