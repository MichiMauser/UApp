class ParkingSlotService {
  async getParkingSlots() {
    const response = await fetch('/api/getParkingSlots');
    const data = await response.json();
    return data.success;
  }
  
  async getRequests() {
    const response = await fetch('/api/getRequests');
    const data = await response.json();
    return data.success;
  }

  async createRequestForParkingSpace(nrParcare, numeStud, nrInmat, nrZile) {
    const response = await fetch('/api/createRequestForParkingSpace', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nrParcare, numeStud, nrInmat, nrZile }),
    });
    return await response.json();
  }

  async processRequest(nrRequest, status) {
    const response = await fetch('/api/processRequest', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nrRequest, status }),
    });
    return await response.json();
  }
}

export default ParkingSlotService;