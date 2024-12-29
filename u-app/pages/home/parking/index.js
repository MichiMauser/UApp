// pages/parking/index.js
import { useState, useEffect } from 'react';
import Layout from '../../../components/layout';
import ParkingSlotCard from '../../../components/parking-slot-card';
import Modal from '../../../components/parking-modal';
import classes from '../../../styles/ParkingSlotCard.module.css';
import ParkingUIHandler from '../../../util/parking-system-handler';
import mediator from "../../../util/mediator-instance"

export default function Parking() {
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Parking slots state
  const [parkingSlots, setParkingSlots] = useState([]);

  const updateParkingSlots = (slots) => setParkingSlots(slots)
  const updatePendingRequests = (requests) => {}
  const updateShowModal = (slot) => {
    console.log("Ceva")
    setSelectedSlot(slot);
    setShowModal(true); 
  }

  const parkingUIHandler = new ParkingUIHandler(updateParkingSlots, updatePendingRequests, updateShowModal);

  // Create the mediator
  mediator.uiHandler = parkingUIHandler

  // Fetch parking slots when the component mounts
  useEffect(() => {
    mediator.fetchParkingSlots();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    setSelectedSlot(null); // Clear selected slot
  };

  const handleCreateRequest = (nrParcare, numeStud, nrInmat, nrZile) => {
    mediator.createParkingRequest(nrParcare, numeStud, nrInmat, nrZile);
  };

  const handleProcessRequest = (nrRequest, status) => {
    mediator.processRequest(nrRequest, status);
  };

  return (
    <div className={classes.gridContainer}>
      {/* Render parking lpot cards */}
      {parkingSlots.map((slot) => (
        <ParkingSlotCard
          key={slot.number}
          parkingInfos={slot}
          mediator={ mediator }  // Pass mediator to handle click actions
        />
      ))}

      {/* Show modal with selected parking slot details */}
      {showModal && selectedSlot && (
        <Modal onClose={handleCloseModal} slot={selectedSlot}/>
      )}
    </div>
  );
}

Parking.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
