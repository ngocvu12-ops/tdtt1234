/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface HorseIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

export default function PorscheIcon({ size = 16, className = "", ...props }: HorseIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 120"
      fill="none"
      className={className}
      style={{ width: size, height: size, display: "inline-block", verticalAlign: "middle" }}
      {...props}
    >
      {/* Definitions for Clips */}
      <defs>
        <clipPath id="top-right-clip">
          <path d="M 50 10 L 88 10 L 88 58 L 50 58 Z" />
        </clipPath>
        <clipPath id="bottom-left-clip">
          <path d="M 12 58 L 50 58 L 50 115 C 50 115, 25 102, 12 85 Z" />
        </clipPath>
      </defs>

      {/* Outer Golden Crest Shield */}
      <path
        d="M 12 10 
           L 88 10 
           C 88 10, 88 55, 88 65 
           C 88 95, 50 115, 50 115 
           C 50 115, 12 95, 12 65 
           C 12 55, 12 10, 12 10 Z"
        fill="#EAB308" /* Gold/Yellow */
        stroke="#0F172A" /* Slate 900 */
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* Inner Quad Divisions */}
      <path d="M 50 10 L 50 115" stroke="#0F172A" strokeWidth="3" />
      <path d="M 12 58 C 30 58, 70 58, 88 58" stroke="#0F172A" strokeWidth="3" />

      {/* Top-Right Quadrant Stripes */}
      <g clipPath="url(#top-right-clip)">
        <path d="M 50 10 L 88 10 L 88 58 L 50 58 Z" fill="#EF4444" /> {/* Red base */}
        <line x1="58" y1="10" x2="58" y2="58" stroke="#0F172A" strokeWidth="3.5" />
        <line x1="68" y1="10" x2="68" y2="58" stroke="#0F172A" strokeWidth="3.5" />
        <line x1="78" y1="10" x2="78" y2="58" stroke="#0F172A" strokeWidth="3.5" />
      </g>

      {/* Bottom-Left Quadrant Stripes */}
      <g clipPath="url(#bottom-left-clip)">
        <path d="M 12 58 L 50 58 L 50 115 C 50 115, 25 102, 12 85 Z" fill="#EF4444" /> {/* Red base */}
        <line x1="22" y1="58" x2="22" y2="100" stroke="#0F172A" strokeWidth="3.5" />
        <line x1="32" y1="58" x2="32" y2="110" stroke="#0F172A" strokeWidth="3.5" />
        <line x1="42" y1="58" x2="42" y2="115" stroke="#0F172A" strokeWidth="3.5" />
      </g>

      {/* Top-Left Quadrant Antlers (Stylized branches on gold background) */}
      <g stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" fill="none">
        <path d="M 20 22 Q 32 26 44 24" />
        <path d="M 28 24 C 29 18, 25 15, 23 16" strokeWidth="2.5" />
        <path d="M 36 24 C 37 18, 33 15, 31 16" strokeWidth="2.5" />

        <path d="M 18 34 Q 30 38 44 34" />
        <path d="M 26 35 C 27 29, 23 26, 21 27" strokeWidth="2.5" />
        <path d="M 34 35 C 35 29, 31 26, 29 27" strokeWidth="2.5" />

        <path d="M 18 46 Q 30 49 44 45" />
        <path d="M 24 46 C 25 40, 21 37, 19 38" strokeWidth="2.5" />
        <path d="M 32 46 C 33 40, 29 37, 27 38" strokeWidth="2.5" />
      </g>

      {/* Bottom-Right Quadrant Antlers (Stylized branches on gold background) */}
      <g stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" fill="none">
        <path d="M 56 68 Q 68 71 80 68" />
        <path d="M 62 69 C 63 63, 59 60, 57 61" strokeWidth="2.5" />
        <path d="M 70 69 C 71 63, 67 60, 65 61" strokeWidth="2.5" />

        <path d="M 56 78 Q 68 81 78 77" />
        <path d="M 61 79 C 62 73, 58 70, 56 71" strokeWidth="2.5" />
        <path d="M 68 79 C 69 73, 65 70, 63 71" strokeWidth="2.5" />

        <path d="M 56 88 Q 66 90 75 85" />
        <path d="M 60 89 C 61 83, 57 80, 55 81" strokeWidth="2.5" />
        <path d="M 67 88 C 68 82, 64 80, 62 81" strokeWidth="2.5" />
      </g>

      {/* Central Escutcheon / Shield (Stuttgart logo: gold shield + rearing horse) */}
      <path
        d="M 36 42 
           L 64 42 
           C 64 42, 64 68, 64 72 
           C 64 86, 50 94, 50 94 
           C 50 94, 36 86, 36 72 
           C 36 68, 36 42, 36 42 Z"
        fill="#EAB308"
        stroke="#0F172A"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Rearing Porsche Horse inside central shield */}
      <path
        d="M 46 78 
           C 47 76, 48 72, 48 68 
           C 48 65, 46 64, 47 62 
           C 48 60, 53 60, 54 60 
           C 54 58, 52 57, 53 55 
           C 54 53, 56 53, 57 51 
           C 56 50, 54 50, 53 51 
           C 52 52, 51 54, 49 53
           C 48 52, 49 50, 48 48 
           C 49 46, 51 47, 52 46 
           C 49 44, 48 46, 46 46 
           C 45 46, 44 47, 43 49 
           C 42 51, 44 53, 43 55 
           C 42 57, 39 56, 38 58 
           C 38 60, 42 61, 42 64 
           C 42 67, 41 70, 41 74 
           C 41 76, 39 78, 42 79 
           C 44 80, 45 79, 46 78 Z"
        fill="#0F172A"
      />
      {/* Rearing Front Legs */}
      <path d="M 45 54 Q 38 50 40 45" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 46 56 Q 36 53 38 48" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Rearing Back Legs */}
      <path d="M 45 72 Q 43 78 39 82" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      
      {/* Red text area indicator */}
      <path d="M 40 46 H 60" stroke="#0F172A" strokeWidth="1.2" />
    </svg>
  );
}
