import React from 'react'
import {Line} from "react-chartjs-2";

export default function AnalyticsChart({analyticData}) {
    const visitCounters = [0,0,0,0,0,0,0,0,0,0,0,0]
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    month.forEach((elem,index)=>{
        analyticData.forEach(item=>{
            let date = item.Date
            if (date.includes(elem)) {
                visitCounters[index]++
            }
        })
    })

    const data = {
        labels: month,
        datasets: [
            {
                label: 'Visits',
                data: visitCounters,
                // backgroundColor: '#2196f3',
                borderColor: '#3f729b',
                fill: true,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
            }
        ]
    }

    return (
        <>
            <h1 className="font-bold text-2xl text-gray-900 my-5 border-l-4 px-5 py-2 bg-gray-200 mb-2 border-gray-900">User study activity for last year</h1>
            <div className="">
                <Line  data={data} options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                    },
                    interaction: {
                        intersect: false,
                    },
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Value'
                            },
                            suggestedMin: 0,
                            suggestedMax: 50
                        }
                    }
                }}/>
            </div>
        </>
    )
}