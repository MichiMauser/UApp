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
          return "Taken"
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
        // let requests = [
        //   {
        //     "id": 1,
        //     "parking_slot_number": 101,
        //     "student_name": "John Doe",
        //     "registration_plate": "XYZ-1234",
        //     "start_date": "2025-01-10",
        //     "nr_of_days": 5,
        //     "status": "pending"
        //   },
        //   {
        //     "id": 2,
        //     "parking_slot_number": 102,
        //     "student_name": "Jane Smith",
        //     "registration_plate": "ABC-5678",
        //     "start_date": "2025-01-15",
        //     "nr_of_days": 3,
        //     "status": "pending"
        //   },
        //   {
        //     "id": 3,
        //     "parking_slot_number": 103,
        //     "student_name": "Alice Brown",
        //     "registration_plate": "LMN-9012",
        //     "start_date": "2025-02-01",
        //     "nr_of_days": 7,
        //     "status": "pending"
        //   },
        //   {
        //     "id": 4,
        //     "parking_slot_number": 101,
        //     "student_name": "John Doe",
        //     "registration_plate": "XYZ-1234",
        //     "start_date": "2025-01-10",
        //     "nr_of_days": 5,
        //     "status": "approved"
        //   },
        //   {
        //     "id": 5,
        //     "parking_slot_number": 101,
        //     "student_name": "John Doe",
        //     "registration_plate": "XYZ-1234",
        //     "start_date": "2025-01-10",
        //     "nr_of_days": 5,
        //     "status": "denied"
        //   },
        //   {
        //     "id": 6,
        //     "parking_slot_number": 101,
        //     "student_name": "John Doe",
        //     "registration_plate": "XYZ-1234",
        //     "start_date": "2025-01-10",
        //     "nr_of_days": 5,
        //     "status": "approvedPending"
        //   }
        // ]
        this.uiHandler.updatePendingRequests(requests);
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      }
    }
  
    // Handle parking request creation
    async createParkingRequest(nrParcare, numeStud, nrInmat, nrZile) {
      try {
        const response = await this.parkingSlotService.createRequestForParkingSpace(nrParcare, numeStud, nrInmat, nrZile);
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