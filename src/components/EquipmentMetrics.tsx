import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { MetricSelection } from './MetricSelection';
import { RenderGraph } from './RenderGraph';

const useStyles = makeStyles({
  card: {
    margin: '5% 25%',
  },
});

export default () => {
  const classes = useStyles();
  const [metrics, setMetrics] = useState([]);
  const handleChange = (event: any) => {
    setMetrics(event.target.value);
  };

  return (
    <Card className={classes.card}>
      <MetricSelection {...{ handleChange, setMetrics, metrics }} />
      {metrics.length > 0 && <RenderGraph {...{ metrics }} />}
    </Card>
  );
};
