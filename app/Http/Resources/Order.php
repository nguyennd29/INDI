<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Order extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'store_id' => $this->store_id,
            'user_name' => $this->user_name,
            'user_phone' => $this->user_phone,
            'note' => $this->note,
            'rating' => $this->rating,
            'comment'=> $this->comment,
            'cost'=> $this->cost,
            'status'=> $this->status,
            'file_list'=> $this->file_list,
            'canceled_at'=> $this->comment,
            'printed_at'=> $this->printed_at,
            'picked_at'=> $this->picked_at,
        ];
    }
}
