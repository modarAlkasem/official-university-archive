<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdministrativeDoc extends Model
{
    use HasFactory;

    protected $table = 'administrative_doc';
    protected $primaryKey = 'administrative_doc_id';


    public function subcategory(){

        return $this->belongsTo(Subcategory::class);
    }
    

}
