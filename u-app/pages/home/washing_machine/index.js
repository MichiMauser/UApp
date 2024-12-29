import Layout from "../../../components/layout"
import Head from 'next/head';
import { motion } from 'framer-motion'
import Link from 'next/link';
import { useState } from "react";
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import classes from '../../../styles/Washing_machinePage.module.css'

export default function Washing_machine(){

    const [currentDay, setCurrentDay] = useState(new Date().getDay());
    const [weekOffset, setWeekOffset] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);

    // Mock data for reserved slots
    const myRoomNumber = 2354;

    const reservedSlots = [
        { date: "2024-12-27", timeIndex: 1, roomNumber: 3532 }, // Example: Reserved for 10:00 - 12:00 on Dec 27, 2024
        { date: "2024-12-28", timeIndex: 3, roomNumber: 7339 }, // Example: Reserved for 14:00 - 16:00 on Dec 28, 2024
        { date: "2024-12-29", timeIndex: 5, roomNumber: 2354 }, // Example: Reserved for 18:00 - 20:00 on Dec 29, 2024
    ];

    // Week grid
    const daysOfWeek = [
        "duminică", "luni", "marți", "miercuri", "joi", "vineri", "sâmbătă"
    ];

    const timeSlots = [
        "08:00 - 10:00",
        "10:00 - 12:00",
        "12:00 - 14:00",
        "14:00 - 16:00",
        "16:00 - 18:00",
        "18:00 - 20:00",
        "20:00 - 22:00"
    ];

    //dates stuff
    const getDateForDay = (dayIndex) => {
        const today = new Date();
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + dayIndex + weekOffset * 7));
        return startOfWeek;
    };

    const getCurrentDate = (index) => {
        const date = getDateForDay(index);
        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "short" });
        return `${day} ${month}`;
    };

    const getWeekInterval = () => {
        const startDate = getDateForDay(0); // duminica 
        const endDate = getDateForDay(6);  //sambata
        const startDay = startDate.getDate();
        const startMonth = startDate.toLocaleString("default", { month: "short" });
        const endDay = endDate.getDate();
        const endMonth = endDate.toLocaleString("default", { month: "short" });
        return `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
    };

    //cell clicked stuff
    const handleCellClick = (dayIndex, slotIndex) => {
        const date = getDateForDay(dayIndex);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0'); 
        const fullDate = `${year}-${month}-${day}`; 
        
        const isMyReservation = reservedSlots.some(
            (slot) => slot.date === fullDate && slot.timeIndex === slotIndex && slot.roomNumber === myRoomNumber
        );
        
        if (isMyReservation) {
            setSelectedSlot({ dayIndex, slotIndex, fullDate });
            setIsCancelModalOpen(true);
        } else {
            setSelectedSlot({ dayIndex, slotIndex, fullDate });
            setIsModalOpen(true);
        }
    };

    const confirmReservation = () => {
        alert(`Reservation made for ${daysOfWeek[selectedSlot.dayIndex]} at ${timeSlots[selectedSlot.slotIndex]}`);
        console.log(selectedSlot.fullDate);
        setIsModalOpen(false); 
    };

    const cancelReservation = () => {
        setIsModalOpen(false);
        setIsCancelModalOpen(false);
    };

    // Check if a cell is reserved
    const isReserved = (dayIndex, slotIndex) => {
        const date = getDateForDay(dayIndex);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const fullDate = `${year}-${month}-${day}`;

        return reservedSlots.some(slot => slot.date === fullDate && slot.timeIndex === slotIndex);
    };

    // If it is my reservation clicked
    const isMyReservation = (dayIndex, slotIndex) => {
        const date = getDateForDay(dayIndex);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const fullDate = `${year}-${month}-${day}`;

        return reservedSlots.some(
            (slot) => slot.date === fullDate && slot.timeIndex === slotIndex && slot.roomNumber === myRoomNumber
        );
    };

    const removeReservation = () => {
        alert(`Reservation canceled for ${daysOfWeek[selectedSlot.dayIndex]} at ${timeSlots[selectedSlot.slotIndex]}`);
        console.log(selectedSlot.fullDate);
        setIsCancelModalOpen(false); 
    }


    return (
        <>
        {/*popup to confirm reservation*/}
        {isModalOpen && (
            <div className={classes.modal}>
            <div className={classes.modalContent}>
                <h3>Are you sure you want to reserve the washing machine?</h3>
                <p>Time: {timeSlots[selectedSlot.slotIndex]} on {daysOfWeek[selectedSlot.dayIndex]}</p>
                <motion.div className={classes.modalButtons}>
                    <motion.button whileHover={{ scale: 1.05}} transition={{ type: 'tween' }} 
                        onClick={cancelReservation}>No</motion.button>
                    <motion.button whileHover={{ scale: 1.05}} transition={{ type: 'tween' }} 
                        onClick={confirmReservation}>Yes</motion.button>
                        
                </motion.div>
            </div>
        </div>        
        )}

        {/* Cancel Reservation Modal */}
        {isCancelModalOpen && (
            <div className={classes.modal}>
                <div className={classes.modalContent}>
                    <h3>Do you want to cancel your reservation?</h3>
                    <p>Time: {timeSlots[selectedSlot.slotIndex]} on {daysOfWeek[selectedSlot.dayIndex]}</p>
                    <motion.div className={classes.modalButtons}>
                        <motion.button whileHover={{ scale: 1.05 }} transition={{ type: 'tween' }}
                            onClick={cancelReservation}>No</motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} transition={{ type: 'tween' }}
                            onClick={removeReservation}>Yes</motion.button>
                    </motion.div>
                </div>
            </div>
        )}        

        {/*week navigation*/}
        <div className={classes.weekNavContainer}>
            <motion.button whileHover={{ scale: 1.05 }} transition={{ type: 'tween' }} onClick={() => setWeekOffset(weekOffset - 1)} 
                className={classes.button}>  &lt;
            </motion.button>
            <div className={classes.intervalWeekShow}>
                {getWeekInterval()}
            </div>
            <motion.button whileHover={{ scale: 1.05 }} transition={{ type: 'tween' }} onClick={() => setWeekOffset(weekOffset + 1)} 
                className={classes.button}>  &gt;
            </motion.button>
        </div>

        <div className={classes.calendar}>
                {/* Days of the Week */}
                <div className={classes.header}>
                    <div className={classes.time}></div>
                    {daysOfWeek.map((day, index) => (
                        <div
                            key={index}
                            className={`${classes.day} ${currentDay === index ? classes.highlight : ""}`}>
                            <div>{day}</div>
                            <div className={classes.date}>{getCurrentDate(index)}</div>
                        </div>
                    ))}
                </div>

                {/* Time Slots */}
                <div className={classes.body}>
                    {timeSlots.map((slot, slotIndex) => (
                        <div key={slotIndex} className={classes.row}>
                            <div className={classes.time}>{slot}</div>
                            {daysOfWeek.map((_, dayIndex) => (
                                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'tween' }} key={`${slotIndex}-${dayIndex}`}
                                    className={`${classes.cell} 
                                    ${isMyReservation(dayIndex, slotIndex) ? classes.myReserved : ""} 
                                    ${isReserved(dayIndex, slotIndex) ? classes.reserved : ""}`}  
                                    onClick={() => {
                                        if (!isReserved(dayIndex, slotIndex) || isMyReservation(dayIndex, slotIndex)) {
                                            handleCellClick(dayIndex, slotIndex);
                                        }
                                    }}>
                                </motion.div>
                            ))}
                        </div>
                    ))}
                </div>
            </div></>
    );
}

Washing_machine.getLayout = function getLayout(page){
    return (
        <Layout>
            {page}
        </Layout>
    )
}