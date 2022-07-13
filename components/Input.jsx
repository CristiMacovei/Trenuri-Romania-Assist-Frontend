import React, { useEffect, useState } from 'react'

export default function Input(props) {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (props.msg) {
      setMessage(props.msg);
    }
  }, [props.msg])

  function handleChange(evt) {
    if (props.name === 'latitude') {
      const floatLatitude = parseFloat(evt.target.value);

      if (isNaN(floatLatitude)) {
        setMessage({ type: 'error', message: 'Cannot be empty' });
      } else if (Math.abs(floatLatitude) > 90) {
        setMessage({ type: 'error', message: 'Invalid value' });
      } else {
        setMessage(null);
      }
    }

    if (props.name === 'longitude') {
      const floatLatitude = parseFloat(evt.target.value);

      if (isNaN(floatLatitude)) {
        setMessage({ type: 'error', message: 'Cannot be empty' });
      } else if (Math.abs(floatLatitude) > 180) {
        setMessage({ type: 'error', message: 'Invalid value' });
      } else {
        setMessage(null);
      }
    }

    if (props.type !== 'text' && props.name !== 'stationName') {
      return;
    }

    if (props.data === null) {
      setMessage({
        type: 'warning',
        message: 'Station list not found'
      })

      return;
    }

    if (typeof props.compress !== 'function') { 
      setMessage({
        type: 'error',
        message: 'Compression function not found'
      });

      return;
    }

    console.log(props.compress(evt.target.value), props.data.filter(string => string.startsWith(props.compress(evt.target.value))));
    if (props.data.filter(string => string.startsWith(props.compress(evt.target.value))).length === 0) {
      setMessage({ 
        type: 'warning', 
        message: 'No station matches your description' 
      });
    }
    else {
      setMessage(null);
    }
  }

  return (
    <div>
      <input 
        type={typeof props.type === 'string' ? props.type : 'text'} 
        name={typeof props.name === 'string' ? props.name: 'some-random-input'}
        placeholder={typeof props.placeholder === 'string' ? props.placeholder: 'Type something for some unkown reason'}
        className={`w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:shadow-outline ${props.type === 'submit' ? 'cursor-pointer bg-primary text-gray-100 hover:bg-primary-highlighted' : 'bg-gray-200 text-gray-800'}`}
        step='any'
        onChange={handleChange}
      />

      {
          message ? (
            <span className='flex items-center pl-1'>
              { 
                message.type === 'warning' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#eab308" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : message.type === 'error' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#ee3333" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : message.type === 'success' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : ''
              }

              <span className={`pl-1 ${message.type === 'success' ? 'text-green-500' : (message.type === 'warning' ? 'text-yellow-500' : 'text-red-500')}`}> {message.message} </span>
            </span>
          ) : ''
      }
    </div>
  )
}
