@extends('emails.layouts.base')

@section('title', 'Access approved')

@section('preheader')
    Your request to view expert profiles has been approved.
@endsection

@section('content')
    <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 700; color: #0f172a;">
        Your access request was approved
    </h2>

    <p style="margin: 0 0 14px; color: #334155;">
        Hello {{ $accessRequest->user->name }},
    </p>
    <p style="margin: 0 0 20px; color: #334155;">
        Your request to view expert profiles on Tilila has been approved. Use the link below to activate your access.
    </p>

    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
        <tr>
            <td style="border-radius: 8px; background-color: #0097aa;">
                <a
                    href="{{ $activationUrl }}"
                    target="_blank"
                    rel="noopener noreferrer"
                    style="display: inline-block; padding: 12px 24px; font-size: 14px; font-weight: 600; color: #ffffff; text-decoration: none;"
                >
                    Activate access
                </a>
            </td>
        </tr>
    </table>
@endsection
