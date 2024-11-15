// /src/app/api/log-ip/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const clientIp = req.headers.get('x-forwarded-for') || req.ip || 'Unknown IP';

    await fetch('https://discord.com/api/webhooks/1306790198570389648/_FhdOWy1c-mAXRdfB2t7HvbiRDeQrPse528BP-Yri17zxXfHX3_HxrNN7i5soOX3ZscS', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: `IP Logged: ${clientIp}`,
        }),
    });

    return new NextResponse(JSON.stringify({ message: 'IP logged' }), { status: 200 });
}