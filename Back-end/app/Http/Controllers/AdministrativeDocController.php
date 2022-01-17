<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\AdministrativeDoc;
use Illuminate\Support\Facades\Storage;
use DateTime;
use Illuminate\Http\Response;


class AdministrativeDocController extends Controller
{
    public function index(){

        $administrativeDocs = AdministrativeDoc::paginate(10);

        return response()->json($administrativeDocs)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'GET')->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }

    public function store(Request $request , $catId , $subcatID){

        $administrativeDoc = new AdministrativeDoc;
        $administrativeDoc->doc_number = intval($request->doc_number);
        $administrativeDoc->num_pages = intval($request->num_pages );
        $administrativeDoc->source = $request->source;
        $date = DateTime::createFromFormat('Y-m-d',$request->date )->format('Y-m-d');
        $administrativeDoc->date = $date;
        $administrativeDoc->subcategory_id = intval($request->subcategory_id );
        $administrativeDoc->content = $request->content ;
        $recievingDate = DateTime::createFromFormat('Y-m-d',$request->recieving_date )->format('Y-m-d');
        $administrativeDoc->recieving_date = $recievingDate;
        $administrativeDoc->notes = $request->notes ;

        $file = $request->file('file');
        $fileName = $file->getClientOriginalName();
        $pathInfo = pathinfo($fileName);
        $fileName =  $pathInfo ['filename'];
        $fileExtenstion = $pathInfo ['extension'];
        $time= time();
        $dateTime = date('Y_m_d H_i_s',$time);
        $finalFileName =  $fileName .$dateTime .'.'.$fileExtenstion;
        $filePath = Storage::disk('local')->putFileAs('/administrative_docs' , $file ,  $finalFileName);

        $administrativeDoc->file_path =  $filePath ;
        $administrativeDoc->save();
        
        return response()->json($administrativeDoc)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'POST')->header('Access-Control-Allow-Headers', 'Content-Type', 'Authorization');



        

    }


    public function update(Request $request , $catId , $subcatID , $DocId){

        $administrativeDoc = AdministrativeDoc::find(intval($DocId));
        $administrativeDoc->doc_number = intval($request->doc_number);
        $administrativeDoc->num_pages = intval($request->num_pages );
        $administrativeDoc->source = $request->source;
        $date = DateTime::createFromFormat('Y-m-d',$request->date )->format('Y-m-d');
        $administrativeDoc->date = $date;
        $administrativeDoc->subcategory_id = intval($request->subcategory_id );
        $administrativeDoc->content = $request->content ;
        $recievingDate = DateTime::createFromFormat('Y-m-d',$request->recieving_date )->format('Y-m-d');
        $administrativeDoc->recieving_date = $recievingDate;
        $administrativeDoc->notes = $request->notes ;
        if($request->hasFile('file')){

          Storage::disk('local')->delete('/'.$administrativeDoc->file_path);
          $file = $request->file('file');
          $fileName = $file->getClientOriginalName();
          $pathInfo = pathinfo($fileName);
          $fileName =  $pathInfo ['filename'];
          $fileExtenstion = $pathInfo ['extension'];
          $time= time();
          $dateTime = date('Y_m_d H_i_s',$time);
          $finalFileName =  $fileName .$dateTime .'.'.$fileExtenstion;
          $filePath = Storage::disk('local')->putFileAs('/administrative_docs' , $file ,  $finalFileName);  
          $administrativeDoc->file_path =  $filePath ;


        }

        $administrativeDoc->save();

        return response()->json($administrativeDoc)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'PUT')->header('Access-Control-Allow-Headers', 'Content-Type', 'Authorization');

    }



    public function viewDoc($catId , $subcatID , $docId){

        $docPath = AdministrativeDoc::find(intval($docId))->file_path;
        return response()->file(storage_path('app\\'.str_replace('/','\\',$docPath)) , ['Access-Control-Allow-Origin'=>'http://localhost:3000',
                                             'Access-Control-Allow-Methods'=>'GET',
                                             'Access-Control-Allow-Headers'=>'Content-Type, Authorization']);

    }



    public function search(Request $request){
        $searchingType = intval($request->query('searchingType'));
        $value = $request->query('value');
        $docs = null;                 
        if($searchingType==2){
           
            $docs =AdministrativeDoc::where('doc_number' , '=' , intval($value))->paginate(10);

        }elseif($searchingType==1){
            
                $docs = AdministrativeDoc::where('content', 'like' ,'%'.$value.'%' )->paginate(10);
        }

        return response()->json($docs)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'GET')->header('Access-Control-Allow-Headers', 'Content-Type', 'Authorization');
    
    }
}
