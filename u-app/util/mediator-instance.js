import ParkingSlotService from './parking-system-service';
import ParkingSystemMediator from './parking-system-mediator';
import ParkingUIHandler from './parking-system-handler.js';

const parkingSlotService = new ParkingSlotService();
const f = (_) => {}
const parkingUIHandler = new ParkingUIHandler(f, f, f);
const mediator = new ParkingSystemMediator(parkingSlotService, parkingUIHandler);

export default mediator;