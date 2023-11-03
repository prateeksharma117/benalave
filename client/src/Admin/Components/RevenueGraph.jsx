import { Card, CardContent } from '@mui/material';
import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock'; // Import Highstock for Candlestick chart
import highchartsMore from 'highcharts/highcharts-more'; // Import the highcharts-more module
import exporting from 'highcharts/modules/exporting'; // Import the exporting module
import dayjs from 'dayjs';

// Initialize Highcharts modules
highchartsMore(Highcharts);
exporting(Highcharts);

const RevenueGraph = ({ data }) => {
    const revenueMap = new Map();
    data?.orders?.forEach((item) => {
        const orderDate = dayjs(item.createdAt).format('YYYY-MM-DD');
        const orderRevenue = item.totalPrice;

        if (revenueMap.has(orderDate)) {
            revenueMap.set(orderDate, revenueMap.get(orderDate) + orderRevenue);
        } else {
            revenueMap.set(orderDate, orderRevenue);
        }
    });


    const revenueData = Array.from(revenueMap, ([date, revenue]) => ({ date, revenue }));
    const candlestickData = data?.orders?.map(item => ({
        date: dayjs(item.createdAt).format('YYYY-MM-DD'),
        open: item.openPrice, 
        high: item.highPrice,
        low: item.lowPrice, 
        close: item.closePrice, 
    }));

    const options = {
        chart: {
            type: 'column',
            backgroundColor: '#0c0c20',
        },
        title: {
            text: 'Revenue History',
            style: {
                color: 'white', 
            },
        },
        xAxis: {
            categories: revenueData.map(item => item.date),
            labels: {
                style: {
                    color: 'white', 
                },
            },
        },
        yAxis: [
            {
                title: {
                    text: 'Revenue',
                    style: {
                        color: 'white',
                    },
                },
                labels: {
                    style: {
                        color: 'white', 
                    },
                },
                opposite: false,
            },
            {
                title: {
                    text: 'Price',
                    style: {
                        color: 'white', 
                    },
                },
                labels: {
                    style: {
                        color: 'white', 
                    },
                },
                opposite: true,
            },
        ],
        series: [
            {
                name: 'Revenue',
                data: revenueData.map(item => item.revenue), 
                marker: {
                    symbol: 'circle',
                    radius: 6,
                },
                color: '#0987ff', 
                yAxis: 0,
            },
            {
                type: 'candlestick',
                name: 'Candlestick',
                data: candlestickData.map(item => [item.open, item.high, item.low, item.close]),
                color: 'green',
                upColor: 'red', 
                yAxis: 1, 
            },
        ],
    };

    return (
        <Card sx={{ bgcolor: '#0c0c20', color: '#fff' }}>
            <CardContent>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </CardContent>
        </Card>
    );
};

export default RevenueGraph;
