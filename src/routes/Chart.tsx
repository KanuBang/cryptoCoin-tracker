import React from "react";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

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

// coin에서 coin 컴포넌트를 호출할때 props로 coinId를 건네기 때문에 interface가 필요함
// github heatmap도 apexchart로 구현 가능하다
// https://apexcharts.com/docs/installation/
// 설치와 import는 위를 참고
// 공식 문서를 참고하여 차트를 만들자
interface ChartProps {
  coinId: string;
}

const Chart = ({coinId}: ChartProps) => {
  const isDark = useRecoilValue(isDarkAtom)
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      //refetch 3번째 옵션 객체
      //refetchInterval: 10000,
    }
  );
  console.log(data?.map((price) => price.close) as number[]);
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map(price => ({
                x: price.time_close,
                y: [price.open, price.high, price.low, price.close],
              })) as unknown as number[],
            },
          ]}
         
          options={{
            //테마
            theme: {
              mode: isDark ? "dark" : "light",
            },
            // 차트의 높이 너비
            chart: {
              type: "candlestick",
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

export default Chart;

//demos를 참고하여 만들어보자 차트를 customizing 해보자
// 코드를 참고하여 만들자
