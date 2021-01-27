import React from 'react';
import { useQuery } from 'urql';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';

const getMetrics = `
query {
  getMetrics
}
`;

export const MetricSelection = (props: any) => {
  const query = getMetrics;
  const [result] = useQuery({
    query,
  });
  const { fetching, data } = result;
  if (fetching) return <CircularProgress />;

  return (
    <div>
      <InputLabel id="demo-mutiple-name-label">Select Metric</InputLabel>
      <Select
        labelId="demo-mutiple-name-label"
        id="demo-mutiple-name"
        value={props.metrics}
        onChange={props.handleChange}
        multiple
      >
        {data.getMetrics.map((value: any) => {
          return <MenuItem value={value}>{value}</MenuItem>;
        })}
      </Select>
    </div>
  );
};
