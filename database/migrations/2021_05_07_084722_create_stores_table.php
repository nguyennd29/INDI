<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stores', function (Blueprint $table) {
            $table->increments('id');
            $table->string('store_name');
            $table->string('owner_id')->nullable();
            $table->string('address');
            $table->string('introduction')->nullable();
            $table->string('logo_image')->nullable();
            $table->rememberToken();
            $table->timestamps();

//            $table->string('phone');
//            $table->string('email');
//            $table->string('password');
//            $table->string('owner_name');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stores');
    }
}
