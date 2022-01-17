<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Http\Response;

class SubcategoryController extends Controller
{
    public function getSpecSubcats($catId){
        
        $subcats = Category::find(intval($catId))->subcategories;
        return response()->json($subcats)->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'GET')->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        
    }
}
