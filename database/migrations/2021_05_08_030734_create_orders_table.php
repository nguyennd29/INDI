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
            $table->integer('id');
            $table->string('user_id')->nullable();
            $table->string('store_id');
            $table->string('user_name')->nullable();
            $table->string('user_phone')->nullable();

            $table->string('note')->nullable();
            $table->integer('rating')->nullable();
            $table->string('comment')->nullable();
            $table->string('code')->nullable();
            $table->integer('cost')->nullable();
            $table->string('status')->nullable();
            $table->timestamp('due_at')->nullable();

            $table->timestamp('received_at')->nullable();
            $table->timestamp('processed_at')->nullable();
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
