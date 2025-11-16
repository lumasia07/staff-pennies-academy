<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Queue\SerializesModels;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class StudentResultMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $studentName;
    public string $quizTitle;
    public int $score;
    public int $correct;
    public int $total;
    public Carbon $completedAt;
    public string $pdfUrl;

    /**
     * Create a new message instance.
     */
    public function __construct(string $studentName, string $quizTitle, int $score, int $correct, int $total, Carbon $completedAt, string $pdfUrl)
    {
        $this->studentName = $studentName;
        $this->quizTitle = $quizTitle;
        $this->score = $score;
        $this->correct = $correct;
        $this->total = $total;
        $this->completedAt = $completedAt;
        $this->pdfUrl = $pdfUrl;
        Log::debug('StudentResultMail constructed', [
            'studentName' => $studentName,
            'quizTitle' => $quizTitle,
            'score' => $score,
            'correct' => $correct,
            'total' => $total,
            'completedAt' => $completedAt,
            'pdfUrl' => $pdfUrl,
        ]);
    }

    public function envelope(): Envelope
    {
        Log::debug('StudentResultMail envelope called', [
            'subject' => 'Your Test Results - Drivers Test Now',
        ]);
        return new Envelope(
            subject: 'Your Test Results - Drivers Test Now',
        );
    }

    public function content(): Content
    {
        Log::debug('StudentResultMail content called', [
            'view' => 'emails.student-result',
        ]);
        return new Content(
            view: 'emails.student-result',
        );
    }
}