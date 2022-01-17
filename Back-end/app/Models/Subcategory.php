<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subcategory extends Model
{
    use HasFactory;

    protected $table='subcategory';
    protected $primaryKey = 'subcategory_id';

    public function category(){

        return $this->belongsTo(Category::class);


    }

    public function administrativeDocs(){

        return $this->hasMany(AdministrativeDoc::class);

    }


    public function scientificBodyDocs(){

        return $this->hasMany( ScientificBodyDoc::class);
    }
}
