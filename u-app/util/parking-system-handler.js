import { Park } from "@mui/icons-material";

class ParkingUIHandler {
    constructor(parkingSlotsFunction, requestsFunction, showModalFunction) {
        this.parkingSlotsFunction = parkingSlotsFunction
        this.requestsFunction = requestsFunction
        this.showModalFunction = showModalFunction
    }
    updateParkingSlots(parkingSlots) {
        this.parkingSlotsFunction(parkingSlots)
        console.log('Updated parking slots:', parkingSlots);
    }

    updatePendingRequests(requests) {
        this.requestsFunction(requests)
        console.log('Updated pending requests:', requests);
    }

    showModal(slot) {
        // Display a modal with the details of the selected slot
        this.showModalFunction(slot)
        console.log('Show modal for slot:', slot);
    }
}

export default ParkingUIHandler