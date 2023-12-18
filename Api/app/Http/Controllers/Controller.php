<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function sendSuccess($data, $message = '', $httpStatusCode = 200)
    {
        $response = [
            'status' => true,
            'data' => $data,
            'message' => $message,
        ];
        return response()->json($response, $httpStatusCode);
    }
    public function sendError($message, $data = null, $httpStatusCode = 401)
    {
        $response = [
            'status' => false,
            'message' => $message,
            'data' => $data
        ];

        return response()->json($response, $httpStatusCode);
    }
}
