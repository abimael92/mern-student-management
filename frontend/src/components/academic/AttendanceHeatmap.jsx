import React from 'react';
import HeatMap from 'react-heatmap-grid';

const AttendanceHeatmap = ({ data = [], xLabels = [], yLabels = [] }) => {
  return (
    <></>
    // <HeatMap
    //   xLabels={xLabels}
    //   yLabels={yLabels}
    //   data={data}
    //   cellStyle={(x, y, value) => ({
    //     background: `rgba(66, 86, 244, ${value / 100})`,
    //     fontSize: '11px',
    //   })}
    //   cellRender={(value) => `${value}%`}
    // />
  );
};

export default AttendanceHeatmap;
