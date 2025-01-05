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
              <div className={classes.requestContent}>
                <div className={classes.requestInfo}>
                  <div className={classes.slotNumber}>
                    <strong>Parking Slot:</strong> {request.parking_slot_number}
                  </div>
                  <div className={classes.studentName}>
                    <strong>Student Name:</strong> {request.student_name}
                  </div>
                  <div className={classes.registrationPlate}>
                    <strong>Registration Plate:</strong>{' '}
                    {request.registration_plate || 'N/A'}
                  </div>
                  <div className={classes.startDate}>
                    <strong>Start Date:</strong>{' '}
                    {new Date(request.start_date).toLocaleDateString()}
                  </div>
                  <div className={classes.nrOfDays}>
                    <strong>Duration:</strong> {request.nr_of_days} day(s)
                  </div>
                  <div className={classes.status}>
                    <strong>Status:</strong> {request.status}
                  </div>
                </div>
                <div className={classes.actionButtons}>
                  {request.status === 'Pending' ? (
                    <>
                      <button
                        className={`${classes.iconButton} ${classes.greenButton}`}
                        onClick={() => handleApprove(request.id)}
                        title="Approve"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          width="24"
                          height="24"
                        >
                          <path d="M9 16.2l-4.2-4.2-1.4 1.4 5.6 5.6 12-12-1.4-1.4z" />
                        </svg>
                      </button>
                      <button
                        className={`${classes.iconButton} ${classes.redButton}`}
                        onClick={() => handleDeny(request.id)}
                        title="Deny"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          width="24"
                          height="24"
                        >
                          <path d="M12 10.6l-7.1-7.1-1.4 1.4 7.1 7.1-7.1 7.1 1.4 1.4 7.1-7.1 7.1 7.1 1.4-1.4-7.1-7.1 7.1-7.1-1.4-1.4z" />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <div className={classes.largeIconWrapper}>
                      {request.status === 'Approved' && (
                        <div
                          className={`${classes.largeIcon} ${classes.greenIcon}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            width="40"
                            height="40"
                          >
                            <path d="M9 16.2l-4.2-4.2-1.4 1.4 5.6 5.6 12-12-1.4-1.4z" />
                          </svg>
                        </div>
                      )}
                      {request.status === 'Denied' && (
                        <div
                          className={`${classes.largeIcon} ${classes.redIcon}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            width="40"
                            height="40"
                          >
                            <path d="M12 10.6l-7.1-7.1-1.4 1.4 7.1 7.1-7.1 7.1 1.4 1.4 7.1-7.1 7.1 7.1 1.4-1.4-7.1-7.1 7.1-7.1-1.4-1.4z" />
                          </svg>
                        </div>
                      )}
                      {request.status === 'ApprovedPending' && (
                        <div
                          className={`${classes.largeIcon} ${classes.yellowIcon}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            width="40"
                            height="40"
                          >
                            <path d="M12 0c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm0 21.5c-5.2 0-9.5-4.3-9.5-9.5s4.3-9.5 9.5-9.5 9.5 4.3 9.5 9.5-4.3 9.5-9.5 9.5z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
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
