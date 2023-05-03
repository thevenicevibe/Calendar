import React, { useState } from "react";
import { Button, Table } from "reactstrap";
import "./style.css";
import moment from "moment";
import mmTimezone from "moment-timezone";

// const WeekCalendar = () => {
//   const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const times = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
  "10:00 PM",
  "11:00 PM",
];

const WeekCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [timezone, setTimezone] = useState("UTC");

  const handleTimezoneChange = (event) => {
    setTimezone(event.target.value);
  };
  // functions to update the current week when the next/previous buttons are clicked
  const handleNextWeek = () => {
    const nextWeek = new Date(currentWeek);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentWeek(nextWeek);
  };

  const handlePreviousWeek = () => {
    const previousWeek = new Date(currentWeek);
    previousWeek.setDate(previousWeek.getDate() - 7);
    setCurrentWeek(previousWeek);
  };

  // array of days with time slots for the current week
  const daysOfWeek = [
    // use the currentWeek state to calculate the dates for the current week

    // { name: 'Sunday', date: new Date(currentWeek.getFullYear(), currentWeek.getMonth(), currentWeek.getDate() - currentWeek.getDay()) },
    {
      name: "Mon",
      date: new Date(
        currentWeek.getFullYear(),
        currentWeek.getMonth(),
        currentWeek.getDate() - currentWeek.getDay() + 1
      ),
    },
    {
      name: "Tue",
      date: new Date(
        currentWeek.getFullYear(),
        currentWeek.getMonth(),
        currentWeek.getDate() - currentWeek.getDay() + 2
      ),
    },
    {
      name: "Wed",
      date: new Date(
        currentWeek.getFullYear(),
        currentWeek.getMonth(),
        currentWeek.getDate() - currentWeek.getDay() + 3
      ),
    },
    {
      name: "Thu",
      date: new Date(
        currentWeek.getFullYear(),
        currentWeek.getMonth(),
        currentWeek.getDate() - currentWeek.getDay() + 4
      ),
    },
    {
      name: "Fri",
      date: new Date(
        currentWeek.getFullYear(),
        currentWeek.getMonth(),
        currentWeek.getDate() - currentWeek.getDay() + 5
      ),
    },
    // { name: 'Saturday', date: new Date(currentWeek.getFullYear(), currentWeek.getMonth(), currentWeek.getDate() - currentWeek.getDay() + 6) },
  ];

  return (
    <div>
      <div className="btn-container">
        <Button type="button" className="btn-prev" onClick={handlePreviousWeek}>
          Previous Week
        </Button>
        <h5 style={{color: "#888888",}}> {currentWeek.toDateString()}</h5>
        <Button type="button" className="btn-next" onClick={handleNextWeek}>
          Next Week
        </Button>
      </div>

      <div className="sub-container">
        <label for="fname">Time zone:</label>
        <select
          value={timezone}
          onChange={handleTimezoneChange}
          className="timezone"
          style={{ border: "2px solid #D6D8E7", borderRadius: "2px" }}
        >
          <option value="UTC">UTC-0</option>
          <option value="Asia/Kolkata">UTC+05:30</option>
        </select>
      </div>
      <Table>
        <tbody className="table-container">
          <tr>
            {daysOfWeek.map((day) => (
              <>
                <tr>
                  <td 
                    key={day.name}
                    style={{ color: "#AB0000", fontSize: "16px", padding:"5px"}}
                  >
                    {day.name}
                    <td
                      className="td-sub"
                      
                      key={day.date.toDateString()}
                      style={{
                        fontSize: "14px",
                        color: "#888888",
                        fontWeight: "500",
                      }}
                    >
                      {moment(day.date.toDateString()).format("M/DD")}
                    </td>
                  </td>
                
                  {moment(day.date.toDateString()).isBefore(currentWeek.toDateString())?<td style={{padding:"15px",color: "#888888"}}>Past</td>: 
                  <div style={{width:"100%",flexDirection:"row",display:"flex", flexWrap:"wrap",padding:"10px",color: "#888888",}}>{times.map((time) => (
                    

                    <tr key={time} className="tr-sub" style={{padding:"5px"}}>
                        
                        <input type="checkbox" />
                      {`${mmTimezone
                        .tz(time, "hh:mm A", timezone)
                        .utc()
                        .format("hh:mm A")}`}
                      </tr> 
                    // </td>
                  ))}</div>
                      }

                </tr>
              </>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
    
  );
};

export default WeekCalendar;
