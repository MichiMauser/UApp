import { Park } from "@mui/icons-material";

class ParkingUIHandler {
    constructor(parkingSlotsFunction, requestsFunction, showModalFunction) {
        this.parkingSlotsFunction = parkingSlotsFunction
        this.requestsFunction = requestsFunction
        this.showModalFunction = showModalFunction
    }
    updateParkingSlots(parkingSlots) {
        // Update the UI with the list of parking slots
        // You would update the state of your React component, or directly manipulate the DOM
        this.parkingSlotsFunction(parkingSlots)
        console.log('Updated parking slots:', parkingSlots);
    }

    updatePendingRequests(requests) {
        // Update the UI with the list of pending requests
        // You would update the state of your React component, or directly manipulate the DOM
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