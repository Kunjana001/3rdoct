'use client'

import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

export function ShareQr() {
  const [qr, setQr] = useState<{ url: string; image: string } | null>(null)

  useEffect(() => {
    const url = `${window.location.origin}${window.location.pathname}`
    QRCode.toDataURL(url, {
      margin: 1,
      width: 320,
      errorCorrectionLevel: 'H',
      color: { dark: '#0b1022', light: '#eef2ff' },
    })
      .then((image) => setQr({ url, image }))
      .catch(() => {})
  }, [])

  if (!qr) return <div className="size-36" aria-hidden="true" />

  return (
    <figure className="flex flex-col items-center gap-3">
      <a
        href={qr.image}
        download="our-sky-qr.png"
        className="glass block rounded-2xl p-2.5 transition-transform hover:scale-105"
        aria-label="Download QR code for this website"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={qr.image} alt={`QR code linking to ${qr.url}`} width={128} height={128} className="size-32 rounded-lg" />
      </a>
      <figcaption className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Scan to return to our sky
      </figcaption>
    </figure>
  )
}
