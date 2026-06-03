<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use ValueError;

class EnsureExpertAccessApproved
{
    /**
     * @param  Closure(Request): Response  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user) {
            return redirect()->guest(route('login'));
        }

        if (in_array((string) $user->role, ['admin', 'expert'], true)) {
            return $next($request);
        }

        try {
            $accessRequest = $user->accessRequest;

            if (! $accessRequest) {
                return redirect()->route('access-request.create');
            }

            if ($accessRequest->isApproved()) {
                return $next($request);
            }

            if ($accessRequest->isPending()) {
                return redirect()->route('access-request.pending');
            }

            if ($accessRequest->isRejected()) {
                return redirect()->route('access-request.rejected');
            }

            return redirect()->route('access-request.create');
        } catch (ValueError) {
            return redirect()->route('access-request.create');
        }
    }
}
