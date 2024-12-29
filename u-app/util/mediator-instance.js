import ParkingSlotService from './parking-system-service';
import ParkingSystemMediator from './parking-system-mediator';
import ParkingUIHandler from './parking-system-handler';

const parkingSlotService = new ParkingSlotService();
const f = (_) => {}
const parkingUIHandler = null;
const mediator = new ParkingSystemMediator(parkingSlotService, parkingUIHandler);

export default mediator;