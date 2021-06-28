<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function store(Request $request) {
        $validated = $request->validate([
            'feedback' => 'required',
        ]);

        $feedbackData = $request->only([
            'email',
            'feedback',
        ]);

        $feedback = Feedback::create($feedbackData);

        return response()->json($feedback, 200);
    }
}
