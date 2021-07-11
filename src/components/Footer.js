import React, { useState, useEffect } from 'react'
import moment from 'moment-timezone';

const Footer = () => {
    const isHome = localStorage.getItem('home');

    let dayOfWeek, dayOfMonth, month, year, hour, minute, second, tod, date, tzOffset, timeZone;
    
    const daysArray = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const monthsArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    // const [date, setDate] = useState(new Date());
    
    const [renderDate, setRenderDate] = useState('');

    
    const getDayOfWeek = (dayOfWeek) => {
        let dayOfWeekTxt = daysArray[dayOfWeek];
        // console.log(dayOfWeek);
        // console.log(dayOfWeekTxt);
        return dayOfWeekTxt;
    }

    const getMonthTxt = (month) => {
        let monthTxt = monthsArray[month];
        // console.log(month);
        // console.log(monthTxt);
        return monthTxt;
    }

    const formatHour = (hour) => {
        let formattedHour;

        if(hour > 12) {
            formattedHour = hour - 12;
        } else if(hour === 0) {
            formattedHour = hour + 12;
        } else {
            formattedHour = hour;
        }

        // console.log(formattedHour);

        return formattedHour;
    }

    const formatMinutes = (minute) => {
        
        if(minute < 10) {
            minute = `0${minute.toString()}`; 
            // console.log(`minute: ${minute}`);
        }

        return minute;
    }

    const formatSeconds = (second) => {

        //second = 9;

        if(second < 10) {
            second = `0${second.toString()}`;
        }

         
          // console.log(`second: ${second}`);

        return second;
    }

    

    const getReturnedDate = () => {
        
            
            date = new Date();
        

            dayOfWeek = date.getDay();
            month = date.getMonth();
            dayOfMonth = date.getDate();
            year = date.getFullYear();
            hour = date.getHours();
            minute = date.getMinutes();
            second = date.getSeconds();
            tzOffset = date.getTimezoneOffset();
            timeZone = moment.tz.guess();

            if(hour >= 12) {
                tod = 'PM';
            } else {
                tod = 'AM';
            }

    
            dayOfWeek = getDayOfWeek(dayOfWeek);
            month = getMonthTxt(month);
            hour = formatHour(hour);
            minute = formatMinutes(minute);
            second = formatSeconds(second);
            tzOffset = moment.tz.zone(timeZone).abbr(tzOffset);
    
            // console.log(`${dayOfWeek} ${month} ${dayOfMonth}, ${year} ${hour}:${minute}:${second} ${tod}`)

             
                 

            // console.log(date);
            // console.log(tzOffset);
        

        

        date = `${dayOfWeek} ${month} ${dayOfMonth}, ${year} ${hour}:${minute}:${second} ${tod} ${tzOffset}`;

        // console.log(`newDate: ${date}`);
        //    // console.log(`this.second: ${second}`);

        /*return <p>
        {dayOfWeek} {month} {dayOfMonth}, {year} {hour}:{minute}:{second} {tod}</p>
        */


        return date;
    }

    useEffect(() => {
        setInterval(() => {
            getReturnedDate();
            setRenderDate(date);
        },1000);
        
    }, [renderDate])

    

    // window.addEventListener('load',getReturnedDate());

    

    //getDayOfWeek(dayOfWeek);

    return (
        isHome === 'true' ? <footer className="footer-home" onLoad={console.log(isHome)}>
            <p id="copyright">&copy; 2021, Rabbithole Development</p>
             <p>{
                 getReturnedDate()
             
             }</p>
        </footer> :
        <footer className="footer" onLoad={console.log(isHome)}>
        <p id="copyright">&copy; 2021, Rabbithole Development</p>
         <p>{
             getReturnedDate()
         
         }</p>
    </footer>
    )
}

export default Footer;