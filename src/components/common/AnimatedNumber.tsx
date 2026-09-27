import React, { useEffect, useState, useRef } from 'react';

export interface AnimatedNumberProps {
  value: number | string;
  duration?: number;
  delay?: number;
  decimals?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  formatIndian?: boolean;
  loading?: boolean;
}

export function parseNumberString(val: string | number) {
  if (typeof val === 'number') {
    return {
      num: val,
      prefix: '',
      suffix: '',
      decimals: Number.isInteger(val) ? 0 : 1,
      hasComma: true
    };
  }
  let str = String(val).trim();
  // Normalize unicode minus (e.g. −12%)
  str = str.replace(/[\u2212\u2013\u2014]/g, '-');

  // Compound format e.g. "36 / 36" or "18 / 30 (Shortage 12)"
  if (str.includes('/') && str.split('/').length === 2) {
    const parts = str.split('/');
    const left = parseFloat(parts[0].replace(/[^0-9.-]/g, ''));
    const right = parts[1].trim();
    if (!isNaN(left)) {
      return {
        num: left,
        prefix: '',
        suffix: ` / ${right}`,
        decimals: 0,
        hasComma: false
      };
    }
  }

  // Compound format "18 of 20"
  if (/\bof\b/.test(str) && str.split(/\bof\b/).length === 2) {
    const parts = str.split(/\bof\b/);
    const left = parseFloat(parts[0].replace(/[^0-9.-]/g, ''));
    const right = parts[1].trim();
    if (!isNaN(left)) {
      return {
        num: left,
        prefix: '',
        suffix: ` of ${right}`,
        decimals: 0,
        hasComma: false
      };
    }
  }

  // Regex: prefix (including currency symbols like ₹, $, €), number (with optional sign, commas, decimal), suffix
  const match = str.match(/^([^0-9.-]*)([-+]?[0-9,]*\.?[0-9]+)(.*)$/);
  if (!match) {
    return null;
  }
  const prefix = match[1] || '';
  const numStr = match[2].replace(/,/g, '');
  const suffix = match[3] || '';
  const num = parseFloat(numStr);
  const decimalMatch = numStr.match(/\.(\d+)/);
  const decimals = decimalMatch ? decimalMatch[1].length : 0;
  const hasComma = match[2].includes(',') || numStr.length >= 4;

  return {
    num: isNaN(num) ? 0 : num,
    prefix,
    suffix,
    decimals,
    hasComma
  };
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 850,
  delay = 0,
  decimals: propDecimals,
  className = '',
  prefix: propPrefix,
  suffix: propSuffix,
  formatIndian = true,
  loading = false,
}) => {
  const parsed = parseNumberString(value);
  const [displayStr, setDisplayStr] = useState<string>(() => {
    if (!parsed) return String(value);
    const prefix = propPrefix !== undefined ? propPrefix : parsed.prefix;
    const suffix = propSuffix !== undefined ? propSuffix : parsed.suffix;
    return `${prefix}0${suffix}`;
  });
  const [isCounting, setIsCounting] = useState<boolean>(true);
  const prevNumRef = useRef<number>(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (loading) {
      setIsCounting(false);
      return;
    }

    if (!parsed) {
      setDisplayStr(String(value));
      setIsCounting(false);
      return;
    }

    setIsCounting(true);
    const targetNum = parsed.num;
    const startNum = isFirstRender.current ? 0 : prevNumRef.current;
    isFirstRender.current = false;
    prevNumRef.current = targetNum;

    const prefix = propPrefix !== undefined ? propPrefix : parsed.prefix;
    const suffix = propSuffix !== undefined ? propSuffix : parsed.suffix;
    const decimals = propDecimals !== undefined ? propDecimals : parsed.decimals;

    let startTime: number | null = null;
    let animId: number;

    const timeoutId = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Quintic ease-out for swift, high-fidelity responsive feel
        const ease = 1 - Math.pow(1 - progress, 4);
        const current = startNum + (targetNum - startNum) * ease;

        let formattedNum: string;
        if (formatIndian && (parsed.hasComma || targetNum >= 1000)) {
          formattedNum = current.toLocaleString('en-IN', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          });
        } else if (decimals > 0) {
          formattedNum = current.toFixed(decimals);
        } else {
          formattedNum = Math.round(current).toString();
        }

        setDisplayStr(`${prefix}${formattedNum}${suffix}`);

        if (progress < 1) {
          animId = requestAnimationFrame(step);
        } else {
          // Final exact render
          let finalNum: string;
          if (formatIndian && (parsed.hasComma || targetNum >= 1000)) {
            finalNum = targetNum.toLocaleString('en-IN', {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            });
          } else if (decimals > 0) {
            finalNum = targetNum.toFixed(decimals);
          } else {
            finalNum = Math.round(targetNum).toString();
          }
          setDisplayStr(`${prefix}${finalNum}${suffix}`);
          setIsCounting(false);
        }
      };

      animId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animId);
    };
  }, [value, duration, delay, propDecimals, propPrefix, propSuffix, formatIndian, loading]);

  if (loading) {
    return (
      <span className={`inline-flex items-center gap-1 opacity-70 animate-pulse ${className}`}>
        <span className="inline-block w-8 h-4 rounded bg-slate-300 dark:bg-slate-700" />
      </span>
    );
  }

  return (
    <span
      className={`tabular-nums inline-block transition-transform duration-200 ${
        isCounting ? 'scale-[1.015] text-sky-700 dark:text-sky-300' : ''
      } ${className}`}
    >
      {displayStr}
    </span>
  );
};
