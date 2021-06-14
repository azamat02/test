import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';

import './styles.css'
import Spinner from "../../main-page-components/spinner";
import AdminApi from "../../admin-api";

const today = new Date();

export default function UserAnalytics({userId, userData}) {
    const [userLog, setUserLog] = useState(null)
    let adminApi = new AdminApi()

    useEffect(()=>{
        if (userLog === null) {
            (
                async ()=>{
                    let data = await adminApi.getUserLog(userId)
                    console.log(data)
                    setUserLog(data)
                }
            )()
        }
    },[userLog])

    if (userLog === null) {
        return <Spinner/>
    }

    const randomValues = getRange(180).map(index => {
        let currentDate = shiftDate(today, -index).toISOString().substring(0,10)
        let count = 0;

        userLog.forEach(elem=>{
            let date1 = currentDate.toString()
            let date2 = elem.enter_date.toString()

            if (date1 == date2) {
                count++;
            }
        })

        return {
            date: shiftDate(today, -index),
            count: count,
        };
    });

    return (
        <div className="w-3/4">
            <h1 className="text-4xl font-bold my-10 text-center">User activity for last 6 months</h1>
            <div className="border-2 border-gray-900 pr-10 rounded pt-5">
                <CalendarHeatmap
                    startDate={shiftDate(today, -180)}
                    endDate={today}
                    values={randomValues}
                    classForValue={value => {
                        if (value.count > 4) {
                            if (!value) {
                                return 'color-empty';
                            }
                            return `color-gitlab-4`;
                        }
                        else {
                            if (!value) {
                                return 'color-empty';
                            }
                            return `color-gitlab-${value.count}`;
                        }


                    }}
                    tooltipDataAttrs={value => {
                        return {
                            'data-tip': `${value.date.toISOString().slice(0, 10)} has entered ${
                                value.count
                            } times`,
                        };
                    }}
                    showWeekdayLabels={true}
                    weekdayLabels={["Sunday","Mon","Tuesday","Wed","Thursday","Fri","Saturday"]}
                    onClick={value => alert(`Clicked on value with count: ${value.count}`)}
                />
                <ReactTooltip />
            </div>
        </div>
    );
}

function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
}

function getRange(count) {
    return Array.from({ length: count }, (_, i) => i);
}
