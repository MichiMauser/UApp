import React from 'react';
import { useRouter } from 'next/router';
import classes from '../styles/ParkingSlotCard.module.css';

const Modal = ({ onClose, slot }) => {
  const router = useRouter();

  const handleReserve = () => {
    router.push({
      pathname: '/home/parking/reserve-slot',
      query: { number: slot.number },
    });
  };

  return (
    <div className={classes.modalOverlay}>
      <div className={classes.modalContent}>
        <button className={classes.closeModal} onClick={onClose}>
          X
        </button>
        <h2>Parking Slot {slot.number}</h2>
        <p>Status: {slot.availability}</p>
        {slot.availability == "Available" && <button className={classes.reserveButton} onClick={handleReserve}>
          Reserve Slot
        </button>}
      </div>
    </div>
  );
};

export default Modal;
