import { useRouter } from 'next/router';
import { useState } from 'react';
import classes from '../../../../styles/ParkingReserveSlot.module.css';
import Layout from '../../../../components/layout';
import mediator from '../../../../util/mediator-instance';
import { useSelector } from 'react-redux'

export default function ReserveSlot() {
  const router = useRouter();
  const { number } = router.query;
  const {user} = useSelector((state) => state.user)

  const [formData, setFormData] = useState({
    licensePlate: '',
    days: 1,
    startDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mediator) {
      try {
        // Pass the startDate along with other data
        await mediator.createParkingRequest(
          number,
          user.username,
          formData.licensePlate,
          formData.startDate,
          formData.days
        );
        alert(`Slot ${number} reserved successfully!`);
        router.push('/home/parking');
      } catch (error) {
        console.error('Error during reservation:', error);
      }
    } else {
      console.error('Mediator not found');
    }
  };

  return (
    <div className={classes.formContainer}>
      <h1 className={classes.header}>Reserve Parking Slot {number}</h1>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.formGroup}>
          <label className={classes.formLabel}>License Plate:</label>
          <input
            type="text"
            name="licensePlate"
            value={formData.licensePlate}
            onChange={handleChange}
            className={classes.input}
            required
          />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.formLabel}>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className={classes.input}
            required
          />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.formLabel}>Number of Days:</label>
          <input
            type="number"
            name="days"
            min="1"
            value={formData.days}
            onChange={handleChange}
            className={classes.input}
            required
          />
        </div>
        <button type="submit" className={classes.submitButton}>
          Reserve Slot
        </button>
      </form>
    </div>
  );
}

ReserveSlot.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
