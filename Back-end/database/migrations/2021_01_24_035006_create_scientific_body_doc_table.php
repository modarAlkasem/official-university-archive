<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateScientificBodyDocTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('scientific_body_doc', function (Blueprint $table) {
            $table->bigIncrements('scientific_body_doc_id');
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
        Schema::dropIfExists('scientific_body_doc');
    }
}
