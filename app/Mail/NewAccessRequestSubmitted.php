<?php

namespace App\Mail;

use App\Models\AccessRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewAccessRequestSubmitted extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public AccessRequest $accessRequest,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New expert profile access request',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.new-access-request-submitted',
        );
    }
}
