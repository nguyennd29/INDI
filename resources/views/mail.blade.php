<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->

    <!-- Styles -->


</head>
<body>
<div>Đơn hàng #{{$order->id}} đã in xong</div>

<div>Xin hãy đến cửa hàng lấy tài liệu!</div>
<div>
    <div>
        <div>Cửa Hàng:</div>
        <div>{{$order->store->store_name}}</div>
    </div>
    <div>
        <div>Địa Chỉ:</div>
        <div>{{$order->store->address}}</div>
    </div>
    <div>
        <div>SĐT:</div>
        <div>{{$order->store->owner->phone}}</div>
    </div>
    <br/>
    <div>
        Giá trị đơn hàng: {{$order->cost}}đ
    </div>
    <div>
        Chi tiết: <a href={{'http://indiprint.xyz/order/'.$order->id}}>{{'http://indiprint.xyz/order/'.$order->id}}</a>
    </div>
</div>
</body>
</html>
