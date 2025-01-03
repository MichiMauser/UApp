import classes from '../styles/ParkingSlotCard.module.css';

const ParkingSlotCard = ({ parkingInfos, mediator }) => {

    function getCardStyle() {
        if(parkingInfos.availability == "Available"){
            return classes.available
        } else if(parkingInfos.availability == "Occupied") {
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
          <p>{parkingInfos.number}</p>
        </div>
      </div>
    );
};

export default ParkingSlotCard;
