import React from "react";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}


interface PriceProps {
  coinId: string;
}

const Price = ({ coinId }: PriceProps) => {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      //refetch 3번째 옵션 객체
      //efetchInterval: 10000,
    }
  );
  console.log(data?.map((price) => price.close) as number[]);
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="area"
          series={[
            {
              name: "Price",
              //종가만 가져옴
              data: data?.map((price) => price.close) as number[],
            },
          ]}
          options={{
            //테마
            theme: {
              mode: "dark",
            },
            // 차트의 높이 너비
            chart: {
              type: "heatmap",
              height: 300,
              width: 30,
              toolbar: {
                show: true,
              },
              //배경색
              background: "transparent",
        
            },
            grid: { show: false },

            //차트의 선 스타일링
            stroke: {
              curve: "smooth",
              width: 1,
            },
            yaxis: {
              show: true,
              labels: {
                style: {
                  colors:"tomato",
                }
              }
            },
            xaxis: {
              axisBorder: { show: true },
              axisTicks: { show: true },
              labels: { 
                show: true,
                style: {
                  colors:"tomato"
                }
              },
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
       
            fill: {
              type: "gradient",
        
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
          
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Price;

//demos를 참고하여 만들어보자 차트를 customizing 해보자
// 코드를 참고하여 만들자
