class ParkingSystemMediator {
    constructor(parkingSlotService, uiHandler) {
      this.parkingSlotService = parkingSlotService; // Handles parking slots (get, update, etc.)
      this.uiHandler = uiHandler;                  // Handles UI updates (display grid, show modal, etc.)
    }

    // Fetch parking slots and update the UI
    async fetchParkingSlots() {
      try {
        const slots = await this.parkingSlotService.getParkingSlots();
        // console.log("acestea sunt sloturile", slots)
        this.uiHandler.updateParkingSlots(slots);
      } catch (error) {
        console.error('Error fetching parking slpots:', error);
      }
    }
  
    // Fetch pending requests and update the UI
    async fetchPendingRequests() {
      try {
        const requests = await this.parkingSlotService.getRequests();
        this.uiHandler.updatePendingRequests(requests);
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      }
    }
  
    // Handle parking request creation
    async createParkingRequest(nrParcare, numeStud, nrInmat, start_date, nrZile) {
      try {
        const response = await this.parkingSlotService.createRequestForParkingSpace(nrParcare, numeStud, nrInmat, start_date, nrZile);
        if (response.error) {
          alert(response.error);
        } else {
          alert('Request created successfully');
          this.fetchParkingSlots(); // Refresh parking slots to reflect the new request
        }
      } catch (error) {
        console.error('Error creating parking request:', error);
      }
    }
  
    // Handle request processing (accepted or denied)
    async processRequest(nrRequest, status) {
      try {
        const response = await this.parkingSlotService.processRequest(nrRequest, status);
        if (response.error) {
          alert(response.error);
        } else {
          alert('Request processed successfully');
          this.fetchPendingRequests(); // Refresh pending requests
          this.fetchParkingSlots(); // Refresh parking slots to reflect the new status
        }
      } catch (error) {
        console.error('Error processing request:', error);
      }
    }
  }

export default ParkingSystemMediator;