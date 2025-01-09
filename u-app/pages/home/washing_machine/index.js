import Layout from "../../../components/layout"
import Head from 'next/head';
import { motion } from 'framer-motion'
import Link from 'next/link';
import { useState } from "react";
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import classes from '../../../styles/Washing_machinePage.module.css'
import { useSelector } from 'react-redux'
import { queryClient } from "../../../lib/queryclient";

async function getReservationData(){

    const response = await fetch('http://127.0.0.1:8000/home/washer/get_reservations');

    if (!response.ok) {
      const error = new Error('An error occurred while getting washing data');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
    const result = await response.json();
    return result;
}

async function sendReservationData(formData){

    const response = await fetch('http://127.0.0.1:8000/home/washer/',
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
        }
    );

    if (!response.ok) {
      const error = new Error('An error occurred while sending washing data');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
    const result = await response.json();
    return result;
}

async function sendDeleteReservationData(formData){

    const response = await fetch('http://127.0.0.1:8000/home/washer/del_reservation',
        {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
        }
    );

    if (!response.ok) {
      const error = new Error('An error occurred while sending delete washing data');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
    const result = await response.json();
    return result;
}

export default function Washing_machine(){

    const [currentDay, setCurrentDay] = useState(new Date().getDay());
    const [weekOffset, setWeekOffset] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [roomNumber, setRoomNumber] = useState('');
    const {user} = useSelector((state) => state.user)


    const { data: reservedSlots2, error, isError, isLoading } = useQuery({
        queryFn: getReservationData,
        queryKey: ['washing_machine'],
        staleTime: 100,
      });
    
    const { mutate, error: error2, isError: isError2, isPending } = useMutation({
        mutationFn: sendReservationData,
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ["washing_machine"]})
          router.push('/');
        },
      });

    const { mutate:mutate2, error: error3, isError: isError3, isPendin:isPending2 } = useMutation({
        mutationFn: sendDeleteReservationData,
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ["washing_machine"]})
          router.push('/home/washing/');
        },
    });
    
    const reservedSlots = reservedSlots2 ? reservedSlots2.map((slot) => {
        const date = new Date(slot.date);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

        return {
          date: formattedDate,
          roomNumber: slot.room_nr,
          timeIndex: slot.time_frame,
          username: slot.username,
        };
    }) : [];


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

    function formatDateForDayIndex(dayIndex) {
        const date = getDateForDay(dayIndex);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0'); 
        
        return `${year}-${month}-${day}`;
    }
    

    //cell clicked stuff
    const handleCellClick = (dayIndex, slotIndex) => {
        const fullDate = formatDateForDayIndex(dayIndex);
        
        // console.log(reservedSlots[0].timeIndex + "\n" + slotIndex + "\n");
        // console.log(reservedSlots[0].date + "\n" + fullDate + "\n");
        // console.log(reservedSlots[0].username + "\n" + user.username + "\n");
        const isMyReservation = reservedSlots.some(
            (slot) => slot.date === fullDate && slot.timeIndex === slotIndex && slot.username === user.username
        );
        
        if (isMyReservation) {
            setSelectedSlot({ dayIndex, slotIndex, fullDate });
            setIsCancelModalOpen(true);
        } else {
            setSelectedSlot({ dayIndex, slotIndex, fullDate });
            setIsModalOpen(true);
        }
    };

    function handleRoomNumberChange(event) {
        setRoomNumber(event.target.value);
    }

    function handleConfirmReservation() {
        if (roomNumber.trim() === '') {
            alert('Please enter a valid room number');
            return;
        }
        confirmReservation(roomNumber);
    }

    const confirmReservation = (roomNumber) => {
        alert(`Reservation made for ${daysOfWeek[selectedSlot.dayIndex]} at ${timeSlots[selectedSlot.slotIndex]}`);
        const newConfirmation = {
            "time_frame" : selectedSlot.slotIndex,
            "date": selectedSlot.fullDate + " 00:00:00.000000",
            "username": user.username,
            "room_nr": roomNumber
        }
        mutate(newConfirmation);
        setIsModalOpen(false); 
    };

    const cancelReservation = () => {
        setIsModalOpen(false);
        setIsCancelModalOpen(false);
    };

    // Check if a cell is reserved
    const isReserved = (dayIndex, slotIndex) => {
        const fullDate = formatDateForDayIndex(dayIndex);
        return reservedSlots.some(slot => slot.date === fullDate && slot.timeIndex === slotIndex);
    };

    // If it is my reservation clicked
    const isMyReservation = (dayIndex, slotIndex) => {
        const fullDate = formatDateForDayIndex(dayIndex);
        return reservedSlots.some(
            (slot) => slot.date === fullDate && slot.timeIndex === slotIndex && slot.username === user.username
        );
    };

    const removeReservation = () => {
        alert(`Reservation canceled for ${daysOfWeek[selectedSlot.dayIndex]} at ${timeSlots[selectedSlot.slotIndex]}`);
        console.log(selectedSlot.slotIndex);
        const reservation_toBe_Removed = {
            "time_frame" : selectedSlot.slotIndex,
            "date": selectedSlot.fullDate + " 00:00:00.000000",
            "username": user.username,
        }
        mutate2(reservation_toBe_Removed);
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
                <div className={classes.inputContainer}>
                            <label htmlFor="roomNumber">Enter your room number:</label>
                            <input
                                type="text"
                                id="roomNumber"
                                value={roomNumber}
                                onChange={handleRoomNumberChange}
                                className={classes.input}
                                placeholder="e.g., 1234"
                            />
                </div>
                <motion.div className={classes.modalButtons}>
                    <motion.button whileHover={{ scale: 1.05}} transition={{ type: 'tween' }} 
                        onClick={cancelReservation}>No</motion.button>
                    <motion.button whileHover={{ scale: 1.05}} transition={{ type: 'tween' }} 
                        onClick={handleConfirmReservation}>Yes</motion.button>
                        
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