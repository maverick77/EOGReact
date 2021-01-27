import React from 'react';
import { useQuery } from 'urql';
import ReactApexChart from 'react-apexcharts';
import CircularProgress from '@material-ui/core/CircularProgress';

const getMetricDetails = `
query($paylaod: [MeasurementQuery]){
  getMultipleMeasurements(input:$paylaod){
    metric
    measurements {
      value
      at
      unit
    }
  }
}
`;

const GraphComponent = (props: any) => {
  const series = props.graphData.getMultipleMeasurements.map((item: any) => {
    const data = item.measurements.map((metric: any) => {
      return [metric.at, metric.value];
    });

    return {
      name: item.metric,
      data,
    };
  });

  const GraphData = {
    series,
    options: {
      chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: 'zoom',
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      title: {
        text: 'Metrics Timeline Graph',
        align: 'left',
      },
      fill: {
        type: 'gradient',
      },
      yaxis: {
        title: {
          text: 'F',
        },
      },
      xaxis: {
        title: {
          text: 'Time',
        },
        type: 'datetime',
        //max: new Date('27 JAN 2021').getTime(),
        labels: {
          formatter: function(value: any, timestamp: any) {
            return new Date(timestamp).getHours(); // The formatter function overrides format property
          },
        },
      },
      tooltip: {
        shared: false,
      },
    },
  };
  return (
    <div id="chart">
      <ReactApexChart options={GraphData.options} series={GraphData.series} type="line" height={350} />
    </div>
  );
};

export const RenderGraph = (props: any) => {
  const Time = new Date();
  const after = Time.setHours(0, 0, 0, 0);
  const before = Time.setHours(4, 59, 59, 999);

  const paylaod = props.metrics.map((value: any) => ({
    metricName: value,
    after,
    before,
  }));

  const query = getMetricDetails;
  const [result] = useQuery({
    query,
    variables: {
      paylaod,
    },
  });
  const { fetching, data = [] } = result;
  if (fetching || (data && data.getMultipleMeasurements.length <= 0)) {
    return <CircularProgress />;
  }
  return data && data.getMultipleMeasurements.length > 0 ? (
    <GraphComponent {...{ graphData: data }} />
  ) : (
    <CircularProgress />
  );
};
