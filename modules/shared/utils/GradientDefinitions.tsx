"use client";

import { ReactElement } from "react";

// Define the list of color gradients here.
const colors = [
  "#00008B", // Dark Blue
  "#0000FF", // Blue
  "#008000", // Green
  "#FFFF00", // Yellow
  "#FFC107", // Darker Yellow
  "#FFA500", // Orange
  "#FF0000", // Red
  "#8B0000", // Dark Red
  "#8B0000", // Dark Red
];

type props = {
  chartValue: number;
};

// This function generates gradient definitions for use in SVG elements.
// It creates a set of color stops based on predefined colors and offsets.
// Each gradient is assigned an ID starting with `grad`, followed by numbers from 1 to 100.
// These IDs can be referenced for the `fill` property in the <Cell> tag of a Bar in Recharts.
export function GradientDefinitions({ chartValue }: props): ReactElement {
  /* ------------------------------ FUNCTION ------------------------------- */

  function interpolateColor(color1: string, color2: string, factor: number) {
    const r1 = parseInt(color1.slice(1, 3), 16);
    const g1 = parseInt(color1.slice(3, 5), 16);
    const b1 = parseInt(color1.slice(5, 7), 16);

    const r2 = parseInt(color2.slice(1, 3), 16);
    const g2 = parseInt(color2.slice(3, 5), 16);
    const b2 = parseInt(color2.slice(5, 7), 16);

    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);

    return `rgb(${r}, ${g}, ${b})`;
  }

  /* -------------------------------- RENDER ------------------------------- */

  return (
    <>
      {colors.map((_, index) => {
        const colorPortion = 100 / colors.length;
        const colorStopThreshold = colorPortion * index;
        return (
          <>
            {chartValue >= colorStopThreshold - colorPortion && (
              <stop
                offset={`${
                  !chartValue
                    ? 0
                    : chartValue <= colorStopThreshold
                    ? 100
                    : (colorStopThreshold / chartValue) * 100
                }%`}
                style={{
                  stopColor:
                    index - 1 < 0
                      ? colors[index]
                      : interpolateColor(
                          colors[index - 1],
                          colors[index],
                          chartValue / colorStopThreshold
                        ),
                  stopOpacity: 1,
                }}
              />
            )}
          </>
        );
      })}
    </>
  );
}
