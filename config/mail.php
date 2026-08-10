<?php
declare(strict_types=1);

/* Change this to the email address that should receive enquiries/applications. */
const SITE_EMAIL = 'extasit01@gmail.com';
const SITE_FROM = 'extasit01@gmail.com';

function sendSiteMail(string $subject, string $body, string $replyTo = ''): bool {
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'From: ExtasIT <'.SITE_FROM.'>',
    ];
    if ($replyTo && filter_var($replyTo,FILTER_VALIDATE_EMAIL)) {
        $headers[] = 'Reply-To: '.$replyTo;
    }
    return @mail(SITE_EMAIL, $subject, $body, implode("\r\n",$headers));
}
