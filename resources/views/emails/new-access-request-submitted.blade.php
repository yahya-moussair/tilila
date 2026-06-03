@extends('emails.layouts.base')

@section('title', 'New access request')

@section('preheader')
    A user submitted a request to view expert profiles.
@endsection

@section('content')
    <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 700; color: #0f172a;">
        New expert profile access request
    </h2>

    <p style="margin: 0 0 14px; color: #334155;">
        <strong>{{ $accessRequest->user->name }}</strong> ({{ $accessRequest->user->email }}) submitted a request to access expert profiles.
    </p>

    @if($accessRequest->organization)
        <p style="margin: 0 0 8px; color: #334155;">
            <strong>Organization:</strong> {{ $accessRequest->organization }}
        </p>
    @endif

    <p style="margin: 0 0 8px; color: #334155;">
        <strong>Profession:</strong> {{ $accessRequest->profession }}
    </p>

    <p style="margin: 0 0 20px; color: #334155;">
        <strong>Reason:</strong><br>
        {{ $accessRequest->reason }}
    </p>

    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
        <tr>
            <td style="border-radius: 8px; background-color: #0097aa;">
                <a
                    href="{{ url('/admin/access-requests') }}"
                    target="_blank"
                    rel="noopener noreferrer"
                    style="display: inline-block; padding: 12px 24px; font-size: 14px; font-weight: 600; color: #ffffff; text-decoration: none;"
                >
                    Review request
                </a>
            </td>
        </tr>
    </table>
@endsection
