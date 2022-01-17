<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScientificBodyDoc extends Model
{
    use HasFactory;
    protected $table = 'scientific_body_doc';
    protected $primaryKey='scientific_body_doc_id';

    public function subcategory(){

        return $this->belongsTo(Subcategory::class);
    }
    
}
