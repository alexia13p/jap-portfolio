import * as THREE from 'three';

export function createCircuitTextures(size = 1024) {
  const S = size;
  const albedo = document.createElement('canvas');
  albedo.width = albedo.height = S;
  const emis = document.createElement('canvas');
  emis.width = emis.height = S;
  const a = albedo.getContext('2d');
  const e = emis.getContext('2d');

  const g = a.createLinearGradient(0, 0, S, S);
  g.addColorStop(0, '#9aa3ad');
  g.addColorStop(0.5, '#7f8892');
  g.addColorStop(1, '#6d7680');
  a.fillStyle = g;
  a.fillRect(0, 0, S, S);
  for (let i = 0; i < 24000; i++) {
    a.fillStyle = `rgba(${Math.random() > 0.5 ? 255 : 0},255,255,${Math.random() * 0.03})`;
    a.fillRect(Math.random() * S, Math.random() * S, 1, 1);
  }

  e.fillStyle = '#000';
  e.fillRect(0, 0, S, S);

  const hexR = 34;
  a.strokeStyle = 'rgba(40,48,58,0.35)';
  a.lineWidth = 1.4;
  for (let row = 0; row * hexR * 1.5 < S + hexR; row++) {
    for (let col = 0; col * hexR * Math.sqrt(3) < S + hexR; col++) {
      const cx = col * hexR * Math.sqrt(3) + (row % 2 ? (hexR * Math.sqrt(3)) / 2 : 0);
      const cy = row * hexR * 1.5;
      a.beginPath();
      for (let k = 0; k < 6; k++) {
        const ang = (Math.PI / 180) * (60 * k - 30);
        const px = cx + hexR * 0.92 * Math.cos(ang);
        const py = cy + hexR * 0.92 * Math.sin(ang);
        k ? a.lineTo(px, py) : a.moveTo(px, py);
      }
      a.closePath();
      a.stroke();
    }
  }

  const drawTrace = (ctx, color, w) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = w;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (let i = 0; i < 26; i++) {
      let x = Math.random() * S;
      let y = Math.random() * S;
      ctx.beginPath();
      ctx.moveTo(x, y);
      const steps = 4 + ((Math.random() * 5) | 0);
      for (let s = 0; s < steps; s++) {
        if (Math.random() > 0.5) x += (Math.random() - 0.5) * 260;
        else y += (Math.random() - 0.5) * 260;
        x = Math.max(0, Math.min(S, x));
        y = Math.max(0, Math.min(S, y));
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, w * 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  drawTrace(a, 'rgba(28,34,44,0.7)', 3);
  drawTrace(a, 'rgba(30,36,46,0.5)', 2);
  a.save();
  a.globalCompositeOperation = 'lighter';
  drawTrace(a, 'rgba(90,150,255,0.22)', 2.4);
  a.restore();

  drawTrace(e, 'rgba(90,160,255,0.95)', 2.6);
  drawTrace(e, 'rgba(140,200,255,0.7)', 1.6);

  const map = new THREE.CanvasTexture(albedo);
  const emissiveMap = new THREE.CanvasTexture(emis);
  [map, emissiveMap].forEach((t) => {
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
  });
  return { map, emissiveMap };
}
