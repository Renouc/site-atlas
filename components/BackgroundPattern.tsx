export default function BackgroundPattern() {
  return (
    <div
      aria-hidden="true"
      className="bg-pattern pointer-events-none fixed inset-0 -z-10"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
        <defs>
          <pattern
            id="sakura"
            x="0"
            y="0"
            width="300"
            height="300"
            patternUnits="userSpaceOnUse"
          >
            {/* F1 — 霓虹粉，小，偏左上 */}
            <g
              transform="translate(28,72) rotate(23)"
              style={{ filter: "drop-shadow(0 0 5px #ff6ec7)" }}
              opacity="0.42"
            >
              <ellipse rx="4.5" ry="8.5" cx="0" cy="-9.5" fill="#ff6ec7" />
              <ellipse rx="4.5" ry="8.5" cx="0" cy="-9.5" fill="#ff6ec7" transform="rotate(72)" />
              <ellipse rx="4.5" ry="8.5" cx="0" cy="-9.5" fill="#ff6ec7" transform="rotate(144)" />
              <ellipse rx="4.5" ry="8.5" cx="0" cy="-9.5" fill="#ff6ec7" transform="rotate(216)" />
              <ellipse rx="4.5" ry="8.5" cx="0" cy="-9.5" fill="#ff6ec7" transform="rotate(288)" />
              <circle r="2.2" fill="#ffe4f2" />
            </g>

            {/* F2 — 霓虹玫瑰，极小，上方偏中 */}
            <g
              transform="translate(152,14) rotate(-22)"
              style={{ filter: "drop-shadow(0 0 3px #ff3d9a)" }}
              opacity="0.27"
            >
              <ellipse rx="3" ry="5.5" cx="0" cy="-6.5" fill="#ff3d9a" />
              <ellipse rx="3" ry="5.5" cx="0" cy="-6.5" fill="#ff3d9a" transform="rotate(72)" />
              <ellipse rx="3" ry="5.5" cx="0" cy="-6.5" fill="#ff3d9a" transform="rotate(144)" />
              <ellipse rx="3" ry="5.5" cx="0" cy="-6.5" fill="#ff3d9a" transform="rotate(216)" />
              <ellipse rx="3" ry="5.5" cx="0" cy="-6.5" fill="#ff3d9a" transform="rotate(288)" />
              <circle r="1.4" fill="#ffe0f0" />
            </g>

            {/* F3 — 霓虹青，大，右上 */}
            <g
              transform="translate(258,96) rotate(47)"
              style={{ filter: "drop-shadow(0 0 7px #00e5ff)" }}
              opacity="0.44"
            >
              <ellipse rx="7.5" ry="13" cx="0" cy="-14" fill="#00e5ff" />
              <ellipse rx="7.5" ry="13" cx="0" cy="-14" fill="#00e5ff" transform="rotate(72)" />
              <ellipse rx="7.5" ry="13" cx="0" cy="-14" fill="#00e5ff" transform="rotate(144)" />
              <ellipse rx="7.5" ry="13" cx="0" cy="-14" fill="#00e5ff" transform="rotate(216)" />
              <ellipse rx="7.5" ry="13" cx="0" cy="-14" fill="#00e5ff" transform="rotate(288)" />
              <circle r="3.2" fill="#e0fbff" />
            </g>

            {/* F4 — 霓虹紫，中，左下偏上 */}
            <g
              transform="translate(65,208) rotate(-28)"
              style={{ filter: "drop-shadow(0 0 5px #bf5fff)" }}
              opacity="0.36"
            >
              <ellipse rx="5.5" ry="10" cx="0" cy="-11" fill="#bf5fff" />
              <ellipse rx="5.5" ry="10" cx="0" cy="-11" fill="#bf5fff" transform="rotate(72)" />
              <ellipse rx="5.5" ry="10" cx="0" cy="-11" fill="#bf5fff" transform="rotate(144)" />
              <ellipse rx="5.5" ry="10" cx="0" cy="-11" fill="#bf5fff" transform="rotate(216)" />
              <ellipse rx="5.5" ry="10" cx="0" cy="-11" fill="#bf5fff" transform="rotate(288)" />
              <circle r="2.6" fill="#f3e0ff" />
            </g>

            {/* F5 — 霓虹粉，小，右下 */}
            <g
              transform="translate(195,265) rotate(68)"
              style={{ filter: "drop-shadow(0 0 4px #ff6ec7)" }}
              opacity="0.30"
            >
              <ellipse rx="4" ry="7.5" cx="0" cy="-8.5" fill="#ff6ec7" />
              <ellipse rx="4" ry="7.5" cx="0" cy="-8.5" fill="#ff6ec7" transform="rotate(72)" />
              <ellipse rx="4" ry="7.5" cx="0" cy="-8.5" fill="#ff6ec7" transform="rotate(144)" />
              <ellipse rx="4" ry="7.5" cx="0" cy="-8.5" fill="#ff6ec7" transform="rotate(216)" />
              <ellipse rx="4" ry="7.5" cx="0" cy="-8.5" fill="#ff6ec7" transform="rotate(288)" />
              <circle r="2" fill="#ffe4f2" />
            </g>

            {/* F6 — 霓虹青，极小，贴右边缘（与下一 tile 无缝衔接） */}
            <g
              transform="translate(292,158) rotate(12)"
              style={{ filter: "drop-shadow(0 0 3px #00e5ff)" }}
              opacity="0.22"
            >
              <ellipse rx="3" ry="5.5" cx="0" cy="-6.5" fill="#00e5ff" />
              <ellipse rx="3" ry="5.5" cx="0" cy="-6.5" fill="#00e5ff" transform="rotate(72)" />
              <ellipse rx="3" ry="5.5" cx="0" cy="-6.5" fill="#00e5ff" transform="rotate(144)" />
              <ellipse rx="3" ry="5.5" cx="0" cy="-6.5" fill="#00e5ff" transform="rotate(216)" />
              <ellipse rx="3" ry="5.5" cx="0" cy="-6.5" fill="#00e5ff" transform="rotate(288)" />
              <circle r="1.4" fill="#e0fbff" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sakura)" />
      </svg>
    </div>
  );
}
