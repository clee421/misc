import React, { ReactElement } from 'react';

// 3rd Party Library
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// Types
import { useLineGraphWeatherData } from './weather-graph.selector';

// Style
import './weather-graph.scss';

// EVAL: The component can be designed better
const WeatherGraph: React.FC<any> = (): ReactElement => {
  const weatherData = useLineGraphWeatherData();

  if (weatherData.length < 1) {
    return (
      <div className="weather-graph-container">
        <div className="no-weather-data">No Data</div>
      </div>
    )
  }

  return (
    <div className="weather-graph-container">
      <LineChart
        width={400}
        height={400}
        data={weatherData}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
        <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
        <Line type="monotone" dataKey="pressure" stroke="#33CEFF" />
      </LineChart>
    </div>
  );
};

export default WeatherGraph;
