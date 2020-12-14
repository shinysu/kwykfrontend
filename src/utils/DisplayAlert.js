import React from 'react';
import Alert from 'react-bootstrap/Alert'

function DisplayAlert(props) {
  let message = ""+props.message;
  return(
    <Alert variant='danger' className='alert'>
        {message}
    </Alert>

  );
}

export default DisplayAlert;
