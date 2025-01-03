let api = 'http://127.0.0.1:8000/parking_func'

class ParkingSlotService {
  async getParkingSlots() {
    const response = await fetch(`${api}/getParkingSpots`);
    const data = await response.json();
    return data.success;
  }
  
  async getRequests() {
    const response = await fetch(`${api}/getRequests`);
    const data = await response.json();
    return data.success;
  }

  async createRequestForParkingSpace(nrParcare, numeStud, nrInmat, start, nrZile) {
    const response = await fetch(`${api}/createRequestForParkingSpace`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nrParcare, numeStud, nrInmat, start, nrZile }),
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