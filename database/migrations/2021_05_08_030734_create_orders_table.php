<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('user_id')->nullable();
            $table->string('store_id');
            $table->string('user_name');
            $table->string('user_phone');
            $table->json('file_list');
            $table->string('note')->nullable();
            $table->integer('rating')->nullable();
            $table->string('comment')->nullable();
            $table->integer('cost')->nullable();
            $table->string('status');

            $table->timestamp('canceled_at')->nullable();
            $table->timestamp('printed_at')->nullable();
            $table->timestamp('picked_at')->nullable();
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
        Schema::dropIfExists('orders');
    }
}
