<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Carbon\Carbon;

class StudentTestMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $studentName;
    public string $quizTitle;
    public string $testUrl;
    public Carbon $expiresAt;

    /**
     * Create a new message instance.
     */
    public function __construct(string $studentName, string $quizTitle, string $testUrl, Carbon $expiresAt)
    {
        $this->studentName = $studentName;
        $this->quizTitle = $quizTitle;
        $this->testUrl = $testUrl;
        $this->expiresAt = $expiresAt;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your "Drivers Test Now" Test is Ready',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        // This tells Laravel to use our new Blade view
        return new Content(
            view: 'emails.student-test-link',
        );
    }

    /**
     * Get the attachments for the message.
     */
    public function attachments(): array
    {
        return [];
    }
}