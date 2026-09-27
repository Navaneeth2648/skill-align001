import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

interface CanvasChartProps {
  type: 'line' | 'bar';
  data: number[];
  labels?: string[];
  height?: number;
  color?: string;
  secondaryColor?: string;
}

export const CanvasChart: React.FC<CanvasChartProps> = ({
  type,
  data,
  labels = [],
  height = 240,
  color = '#2367a7',
  secondaryColor = '#18794e'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useApp();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(300, rect.width || 450);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const isDark = theme === 'dark';
    const gridLineColor = isDark ? '#2f425a' : '#e2e8f0';
    const textColor = isDark ? '#94a3b8' : '#64748b';
    const activeColor = isDark ? '#77b9f0' : color;
    const activeGreen = isDark ? '#34d399' : secondaryColor;

    ctx.clearRect(0, 0, width, height);

    if (type === 'line') {
      const padding = { top: 25, right: 20, bottom: 35, left: 45 };
      const chartW = width - padding.left - padding.right;
      const chartH = height - padding.top - padding.bottom;

      // Draw horizontal grid lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = gridLineColor;
      ctx.fillStyle = textColor;
      ctx.font = '11px Inter, sans-serif';

      const minVal = Math.min(...data);
      const maxVal = Math.max(...data);
      const valRange = maxVal - minVal || 1;

      for (let i = 0; i <= 4; i++) {
        const y = padding.top + (chartH / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();

        const gridVal = Math.round(maxVal - (valRange / 4) * i);
        ctx.fillText(String(gridVal), 8, y + 4);
      }

      // Draw area fill
      ctx.beginPath();
      data.forEach((val, idx) => {
        const px = padding.left + (chartW / (data.length - 1 || 1)) * idx;
        const py = padding.top + chartH - ((val - minVal) / valRange) * chartH;
        if (idx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.lineTo(padding.left + chartW, padding.top + chartH);
      ctx.lineTo(padding.left, padding.top + chartH);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
      gradient.addColorStop(0, isDark ? 'rgba(119, 185, 240, 0.25)' : 'rgba(35, 103, 167, 0.18)');
      gradient.addColorStop(1, 'rgba(35, 103, 167, 0.0)');
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw line
      ctx.beginPath();
      data.forEach((val, idx) => {
        const px = padding.left + (chartW / (data.length - 1 || 1)) * idx;
        const py = padding.top + chartH - ((val - minVal) / valRange) * chartH;
        if (idx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = activeColor;
      ctx.stroke();

      // Draw points
      ctx.fillStyle = activeColor;
      data.forEach((val, idx) => {
        const px = padding.left + (chartW / (data.length - 1 || 1)) * idx;
        const py = padding.top + chartH - ((val - minVal) / valRange) * chartH;
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Bottom labels
      ctx.fillStyle = textColor;
      ctx.fillText('Earlier in Period', padding.left, height - 10);
      const recentText = 'Recent Postings';
      const recentW = ctx.measureText(recentText).width;
      ctx.fillText(recentText, width - padding.right - recentW, height - 10);

    } else if (type === 'bar') {
      const maxVal = Math.max(...data) || 1;
      const barHeight = 22;
      const spacing = 38;
      const labelW = 120;

      data.forEach((val, idx) => {
        const y = 16 + idx * spacing;
        const barW = Math.max(8, ((width - labelW - 60) * val) / maxVal);

        // Label
        ctx.fillStyle = isDark ? '#e2e8f0' : '#1e293b';
        ctx.font = '500 11px Inter, sans-serif';
        const labelText = labels[idx] || `Item ${idx + 1}`;
        ctx.fillText(labelText, 8, y + 15);

        // Background track
        ctx.fillStyle = isDark ? '#1e293b' : '#f1f5f9';
        ctx.beginPath();
        ctx.roundRect(labelW, y, width - labelW - 55, barHeight, 4);
        ctx.fill();

        // Bar fill
        ctx.fillStyle = idx % 3 === 0 ? activeGreen : activeColor;
        ctx.beginPath();
        ctx.roundRect(labelW, y, barW, barHeight, 4);
        ctx.fill();

        // Value text
        ctx.fillStyle = textColor;
        ctx.font = '600 11px Inter, sans-serif';
        ctx.fillText(`${val}%`, labelW + barW + 8, y + 15);
      });
    }
  }, [type, data, labels, height, color, secondaryColor, theme]);

  return (
    <div className="w-full relative overflow-hidden">
      <canvas 
        ref={canvasRef} 
        style={{ width: '100%', height: `${height}px` }} 
        aria-label="Interactive synthetic workforce data visualization"
      />
    </div>
  );
};
