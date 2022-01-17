<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Http\Response;

class CategoryController extends Controller
{
    public function index(){
        $categories = Category::all();;
        return response()->json($categories ) ->header('Access-Control-Allow-Origin', 'http://localhost:3000')->header('Access-Control-Allow-Methods', 'GET')->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }
}
