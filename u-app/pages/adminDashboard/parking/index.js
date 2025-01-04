import { useState, useEffect } from 'react';
import Layout from '../../../components/layout';
import mediator from '../../../util/mediator-instance';
import classes from '../../../styles/ParkingRequests.module.css';

export default function ParkingRequests() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(0); // Used to trigger re-fetching

  // This function will be used to update the pending requests list
  mediator.uiHandler.requestsFunction = (requests) => {
    const statusOrder = {
        Pending: 0,
        Approved: 1,
        ApprovedPending: 2,
        Denied: 3,
      };
      console.log(requests)
    
      // Sort requests by status using the custom order
      requests.sort((a, b) => {
        return statusOrder[a.status] - statusOrder[b.status];
      });
    setPendingRequests(requests);
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        await mediator.fetchPendingRequests(); // This will update the pending requests
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      }
    };
    console.log("Fetching requests...");
    fetchRequests();
  }, [refreshFlag]); // Trigger refetch every time refreshFlag changes

  const handleApprove = async (requestId) => {
    try {
      await mediator.processRequest(requestId, 'Accepted');
      setRefreshFlag((prev) => prev + 1); // Trigger re-fetch
    } catch (error) {
      console.error('Error approving the request:', error);
    }
  };

  const handleDeny = async (requestId) => {
    try {
      await mediator.processRequest(requestId, 'Denied');
      setRefreshFlag((prev) => prev + 1); // Trigger re-fetch
    } catch (error) {
      console.error('Error denying the request:', error);
    }
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.pageHeader}>Pending Parking Requests</h1>
      <div className={classes.requestsList}>
        {pendingRequests?.length > 0 ? (
          pendingRequests.map((request) => (
            <div key={request.id} className={classes.requestItem}>
              <div className={classes.requestInfo}>
                <div className={classes.slotNumber}>
                  <strong>Parking Slot:</strong> {request.parking_slot_number}
                </div>
                <div className={classes.studentName}>
                  <strong>Student Name:</strong> {request.student_name}
                </div>
                <div className={classes.registrationPlate}>
                  <strong>Registration Plate:</strong> {request.registration_plate || 'N/A'}
                </div>
                <div className={classes.startDate}>
                  <strong>Start Date:</strong> {new Date(request.start_date).toLocaleDateString()}
                </div>
                <div className={classes.nrOfDays}>
                  <strong>Duration:</strong> {request.nr_of_days} day(s)
                </div>
                <div className={classes.status}>
                  <strong>Status:</strong> {request.status}
                </div>
              </div>
              {request.status == "Pending" && <div>
                <div className={classes.buttons}>
                    <button
                    className={classes.approveButton}
                    onClick={() => handleApprove(request.id)}
                    >
                    Approve
                    </button>
                    <button
                    className={classes.denyButton}
                    onClick={() => handleDeny(request.id)}
                    >
                    Deny
                    </button>
                </div>
              </div>}
            </div>
          ))
        ) : (
          <p>No pending requests</p>
        )}
      </div>
    </div>
  );
}

ParkingRequests.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
