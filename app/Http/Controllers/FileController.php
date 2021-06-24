<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    function count_pdf_pages($pdfname) {
        $pdftext = file_get_contents($pdfname);
        $num = preg_match_all("/\/Page\W/", $pdftext, $dummy);

        return $num;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'file' => 'required|mimes:pdf|max:51200'
        ]);

        try {
            $file = $request->file('file');
            $fileName = $file->getClientOriginalName().'_'.time();

            $path = Storage::disk('public')->putFileAs(
                'files', $file, $fileName
            );

            $url = URL::to('/storage/files/'.$fileName);

            $filePath = public_path('/storage/files/'.$fileName);
            $page_count = $this->count_pdf_pages($filePath);

            $newFile = File::create([
                'file_name' => $fileName,
                'url' => $url,
                'status' => File::UPLOADED,
                'page_count' => $page_count,
            ]);

            return response()->json([
                'file' => $newFile,
                'message' => 'Tải lên file thành công',
            ], 200);
        }
        catch (\Exception $e) {
            return response()->json([
                'message' => 'Tải lên file thất bại',
            ], 400);
        }
    }


    public function delete(Request $request)
    {
        $validated = $request->validate([
            'fileName' => 'required'
        ]);

        if (Storage::disk('public')->exists('/files/'.$request->fileName)){
            Storage::disk('public')->delete('/files/'.$request->fileName);

            return response()->json([
                'message' => 'Xoá file thành công',
            ], 200);
        }

        return response()->json([
            'message' => 'Không tìm thấy file',
        ], 400);
    }

    public function storeLogo(Request $request)
    {
        $validated = $request->validate([
            'logo' => 'required|mimes:png,jpg,jpeg|max:10240'
        ]);

        try {
            $file = $request->file('logo');
            $fileName = $file->getClientOriginalName().'_'.time();

            $path = Storage::disk('public')->putFileAs(
                'logos', $file, $fileName
            );

            $url = URL::to('/storage/logos/'.$fileName);


            return response()->json([
                'logo_url' => $url,
                'message' => 'Tải lên logo thành công',
            ], 200);
        }
        catch (\Exception $e) {

            return response()->json([
                'message' => 'Tải lên logo thất bại',
            ], 400);
        }
    }

//    public function download($file_id) {
//        $file = File::find($file_id);
//        if ($file) {
//            $filePath = public_path('/storage/files/'.$file->file_name);
//
//            return response()->download($filePath);
//        }
//
//        return response()->json(['error' => 'Action Error'], 400);
//    }
}
