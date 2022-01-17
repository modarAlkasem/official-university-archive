<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdministrativeDocTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('administrative_doc', function (Blueprint $table) {
            $table->bigIncrements('administrative_doc_id');
            $table->unsignedBigInteger('doc_number');
            $table->date('date');
            $table->string('source', 100);
            $table->integer('num_pages');
            $table->unsignedInteger('subcategory_id');
            $table->foreign('subcategory_id')->references('subcategory_id')->on('subcategory');
            $table->text('content');
            $table->date('recieving_date');
            $table->text('notes');
            $table->string('file_path',150);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('administrative_doc');
    }
}
