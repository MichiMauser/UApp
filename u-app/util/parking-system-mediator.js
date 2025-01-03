class ParkingSystemMediator {
    constructor(parkingSlotService, uiHandler) {
      this.parkingSlotService = parkingSlotService; // Handles parking slots (get, update, etc.)
      this.uiHandler = uiHandler;                  // Handles UI updates (display grid, show modal, etc.)
    }

    // Fetch parking slots and update the UI
    async fetchParkingSlots() {
      const f = () => {
        const val = Math.floor(Math.random() * 3)
        console.log(val)
        if(val == 0) {
          return "Available"
        } else if(val == 1) {
          return "Pending"
        } else {
          return "Occupied"
        }
      }
      try {
        // const slots = await this.parkingSlotService.getParkingSlots();
        const slots = Array.from({ length: 20 }, (_, i) => ({
          number: i + 1,
          availability: f()
          }
        ));
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
    async createParkingRequest(nrParcare, numeStud, nrInmat, nrZile) {
      try {
        // const response = await this.parkingSlotService.createRequestForParkingSpace(nrParcare, numeStud, nrInmat, nrZile);
        // if (response.error) {
        //   alert(response.error);
        // } else {
        //   alert('Request created successfully');
        //   this.fetchParkingSlots(); // Refresh parking slots to reflect the new request
        // }
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