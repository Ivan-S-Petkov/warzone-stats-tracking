import React, { useCallback, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Group A', value: 40373 },
  { name: 'Group B', value: 2527 },
];
const COLORS = ['#393738', '#1870BB'];

function LevelChart() {
  return (
    <PieChart width={82} height={82}>
      <Pie
        data={data}
        cx={36}
        cy={36}
        innerRadius={30}
        outerRadius={40}
        fill="#ffffff"
        paddingAngle={0}
        dataKey="value"
        startAngle={-270}
        endAnge={90}
        stroke="#FFFFFF80"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
export default LevelChart;
