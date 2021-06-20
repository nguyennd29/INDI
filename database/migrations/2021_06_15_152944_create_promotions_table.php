<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePromotionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('promotions', function (Blueprint $table) {
            $table->string('code')->unique();
            $table->string('type');
            $table->integer('discount_percent')->nullable();
            $table->integer('discount_amount')->nullable();
            $table->integer('max_amount')->nullable();
            $table->integer('min_order_cost')->nullable();
            $table->timestamp('invalid_at')->nullable();

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
        Schema::dropIfExists('promotions');
    }
}
