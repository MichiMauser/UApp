import classes from '../styles/ParkingSlotCard.module.css';
import { useSelector } from 'react-redux'

const ParkingSlotCard = ({ parkingInfos, mediator }) => {

    const {user} = useSelector((state) => state.user)
    

    function getCardStyle() {
        if(parkingInfos.student_name == user.username) {
            return classes.ownSlot
        }
        if(parkingInfos.status == "Available" || parkingInfos.status == "available" ){
            return classes.available
        } else if(parkingInfos.status == "Occupied") {
            return classes.taken
        } else {
            return classes.pending
        }
    }

    const handleClick = () => {
      mediator.uiHandler.showModal(parkingInfos);
    };
    return (
      <div
        className={`${classes.cardContainer} ${getCardStyle()}`}
        onClick={handleClick}
      >
        <div className={classes.card}>
          <p>{parkingInfos.id}</p>
        </div>
      </div>
    );
};

export default ParkingSlotCard;
