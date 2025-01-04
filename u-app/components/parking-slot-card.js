import classes from '../styles/ParkingSlotCard.module.css';

const ParkingSlotCard = ({ parkingInfos, mediator }) => {

    function getCardStyle() {
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
    // console.log(parkingInfos)
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
