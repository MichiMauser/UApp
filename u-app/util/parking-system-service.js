let api = 'http://127.0.0.1:8000/home/parking'

class ParkingSlotService {
  async getParkingSlots() {
    const response = await fetch(`${api}`);
    const data = await response.json();
    //console.log(data)
    return data.requests;
  }
  
  async getRequests() {
    const response = await fetch(`${api}/getRequests`);
    const data = await response.json();
    return data.requests;
  }

  async createRequestForParkingSpace(parking_slot_number, student_name, registration_plate, start_date, nr_of_days) {
    console.log({ parking_slot_number, student_name, registration_plate, start_date, nr_of_days })
    const response = await fetch(`${api}/createRequestForParkingSpace`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ parking_slot_number, student_name, registration_plate, start_date, nr_of_days }),
    });
    return await response.json();
  }

  async processRequest(nrRequest, status) {
    const response = await fetch(`${api}/processRequest/${nrRequest}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return await response.json();
  }
}

export default ParkingSlotService;