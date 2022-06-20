import useAlert from 'hooks/useAlert';
import React from 'react';
import { Alert } from 'react-bootstrap';

/**
 * Component for displaying errors
 */
const MyAlerts = ({ storeKey }) => {
  const { isError, setError } = useAlert();

  if (isError(storeKey)) {
    return (
      <Alert variant="danger" onClose={() => setError(storeKey, false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          Apologies but we could not load new cats for you at this time! Miau!
        </p>
      </Alert>
    );
  }

  return null;
};

export default MyAlerts;
