import { Card, CardContent } from '@mui/material';
import React, { useRef, useState, useEffect } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import exporting from 'highcharts/modules/exporting';
import fullscreen from 'highcharts/modules/full-screen';
import dayjs from 'dayjs';

exporting(Highcharts);
fullscreen(Highcharts);

const OrderCompleteGraph = ({ data }) => {
  const chartRef = useRef(null);
  const [isFullScreen, setFullScreen] = useState(false);

  const toggleFullScreen = () => {
    const chart = chartRef.current.chart;

    if (!isFullScreen) {
      if (chart.container.requestFullscreen) {
        chart.container.requestFullscreen();
      } else if (chart.container.mozRequestFullScreen) {
        chart.container.mozRequestFullScreen();
      } else if (chart.container.webkitRequestFullscreen) {
        chart.container.webkitRequestFullscreen();
      } else if (chart.container.msRequestFullscreen) {
        chart.container.msRequestFullscreen();
      }
      setFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setFullScreen(false);
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setFullScreen(
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      );
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('mozfullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    document.addEventListener('msfullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
      document.removeEventListener('msfullscreenchange', handleFullScreenChange);
    };
  }, []);

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10);
  const orderDate = data?.orders?.map((item, i) => dayjs(item.createdAt).format('YYYY/MM/DD'));

  const orderCountMap = new Map();
  data?.orders?.forEach((item) => {
    const orderDate = dayjs(item.createdAt).format('YYYY-MM-DD');
    if (orderCountMap.has(orderDate)) {
      orderCountMap.set(orderDate, orderCountMap.get(orderDate) + 1);
    } else {
      orderCountMap.set(orderDate, 1);
    }
  });

  const orderData = Array.from(orderCountMap, ([date, count]) => ({ date, count }));

  const options = {
    chart: {
      type: 'spline',
      backgroundColor: '#0c0c20',
    },
    title: {
      text: 'Orders History',
      style: {
        color: 'white',
      },
    },
    xAxis: {
      categories: orderData.map(item => item.date),
      labels: {
        style: {
          color: 'white',
        },
      },
    },
    yAxis: {
      title: {
        text: 'Number of Orders',
        style: {
          color: 'white',
        },
      },
      labels: {
        style: {
          color: 'white',
        },
      },
    },
    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
          menuItems: [
            'downloadPNG',
            'downloadJPEG',
            'downloadPDF',
            'downloadSVG',
            'separator',
            'downloadCSV',
            'downloadXLS',
            {
              text: isFullScreen ? 'Exit Full Screen' : 'Full Screen',
              onclick: toggleFullScreen,
            },
          ],
        },
      },
    },
    series: [
      {
        name: 'Orders',
        data: orderData.map(item => item.count),
        marker: {
          symbol: 'circle',
          radius: 6,
        },
        color: '#0987ff',
      },
    ],
  };

  return (
    <Card sx={{ bgcolor: '#0c0c20', color: '#fff' }}>
      <CardContent>
        <HighchartsReact ref={chartRef} highcharts={Highcharts} options={options} />
      </CardContent>
    </Card>
  );
};

export default OrderCompleteGraph;
