// @ts-check
import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";
import tinygradient from "tinygradient";

const COLORS_IN_GRADIENT = 20;

const colors = tinygradient("#f97c91", "#5bd69c").rgb(COLORS_IN_GRADIENT); // 20 colors, red to green

function getColor(data) {
  const max = data.length * 100;
  const actual = data.reduce((acc, elem) => acc + elem.value, 0);
  const colorIndex = Math.floor((actual / max) * colors.length);
  return colors[colorIndex];
}

const JudgementViz = ({ studentName = "Mike", studentQualities }) => {
  if (Object.keys(studentQualities).length === 0) {
    return <p>There are no qualities to graph!</p>
  }
  const data = Object.keys(studentQualities).map(quality => ({
    quality,
    value: studentQualities[quality]
  }));
  const color = `#${getColor(data).toHex()}`;
  return (
    <div>
      <RadarChart
        cx={300}
        cy={250}
        outerRadius={150}
        width={600}
        height={500}
        data={data}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="quality" />
        <PolarRadiusAxis />
        <Radar
          name={studentName}
          dataKey="value"
          stroke={color}
          fill={color}
          fillOpacity={0.6}
        />
      </RadarChart>
    </div>
  );
};

// "#8884d8"

export default JudgementViz;
