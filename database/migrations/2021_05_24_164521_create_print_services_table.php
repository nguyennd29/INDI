<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePrintServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('print_services', function (Blueprint $table) {
            $table->id();
            $table->integer('store_id');
            $table->string('print_type')->nullable();
            $table->string('page_type')->nullable();
            $table->string('color_type')->nullable();
            $table->string('paper_size')->nullable();
            $table->integer('price_per_page')->nullable();
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
        Schema::dropIfExists('print_services');
    }
}
