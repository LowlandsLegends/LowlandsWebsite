// /src/app/api/logIp.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (clientIp) {
        await fetch('https://discord.com/api/webhooks/1306790198570389648/_FhdOWy1c-mAXRdfB2t7HvbiRDeQrPse528BP-Yri17zxXfHX3_HxrNN7i5soOX3ZscS', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: `IP Logged: ${clientIp}`,
            }),
        });
    }

    res.status(200).json({ message: 'IP logged' });
}