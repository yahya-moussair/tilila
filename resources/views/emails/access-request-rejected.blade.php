@extends('emails.layouts.base')

@section('title', 'Access request update')

@section('preheader')
    An update on your request to view expert profiles.
@endsection

@section('content')
    <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 700; color: #0f172a;">
        Your access request was not approved
    </h2>

    <p style="margin: 0 0 14px; color: #334155;">
        Hello {{ $accessRequest->user->name }},
    </p>
    <p style="margin: 0 0 20px; color: #334155;">
        Thank you for your interest in Tilila. After review, we were unable to approve your request to view expert profiles at this time. If you believe this was a mistake, please contact us through our contact page.
    </p>

    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
        <tr>
            <td style="border-radius: 8px; background-color: #0097aa;">
                <a
                    href="{{ url('/contact') }}"
                    target="_blank"
                    rel="noopener noreferrer"
                    style="display: inline-block; padding: 12px 24px; font-size: 14px; font-weight: 600; color: #ffffff; text-decoration: none;"
                >
                    Contact us
                </a>
            </td>
        </tr>
    </table>
@endsection
