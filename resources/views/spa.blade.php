<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- CSRF Token --}}
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>INDI</title>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link rel="icon" href="https://image.flaticon.com/icons/png/512/3569/3569998.png">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" rel="stylesheet">
</head>
<body>
<div id="app"></div>
<script src="{{ asset('js/app.js') }}"></script>
{{--<script type="text/javascript">window.GLOBALS={"user":{!! json_encode($user) !!}}</script>--}}
</body>
</html>
