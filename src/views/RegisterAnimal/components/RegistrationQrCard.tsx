'use client';

import { useRef, useCallback } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from '@/components/elements';
import { QrCard, QrFrame } from '../RegisterAnimal.style';
import { REGISTRY_MESSAGES } from '../constants';

type RegistrationQrCardProps = {
  registrationId: string;
  petName?: string;
  showDownload?: boolean;
  size?: number;
};

export const RegistrationQrCard = ({
  registrationId,
  petName,
  showDownload = true,
  size = 180,
}: RegistrationQrCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const profileUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/registry/${registrationId}`
      : `/registry/${registrationId}`;

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `${registrationId}-pet-qr.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, [registrationId]);

  return (
    <QrCard>
      <QrFrame>
        <QRCodeCanvas
          ref={canvasRef}
          value={profileUrl}
          size={size}
          level="H"
          includeMargin
          bgColor="#ffffff"
          fgColor="#166634"
        />
      </QrFrame>

      <span style={{ fontSize: '0.875rem', color: '#667085', textAlign: 'center' }}>
        {REGISTRY_MESSAGES.scanHint}
      </span>

      {petName && (
        <strong style={{ color: '#166634' }}>
          {petName} · {registrationId}
        </strong>
      )}

      {showDownload && (
        <Button variant="primary" onClick={handleDownload}>
          {REGISTRY_MESSAGES.downloadQr}
        </Button>
      )}
    </QrCard>
  );
};
