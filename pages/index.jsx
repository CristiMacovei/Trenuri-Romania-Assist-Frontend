import { useEffect, useState } from 'react';
import axios from 'axios';

import Container from '../components/Container';
import Title from '../components/Title';
import Form from '../components/Form';
import Input from '../components/Input';
import DownloadButton from '../components/DownloadButton';

export default function Home() {
  const [stations, setStations] = useState(null)
  const [formMessage, setFormMessage] = useState(null)

  function compressName(string) {
    return string.toLowerCase().replaceAll(' ', '').replaceAll('.', '').replaceAll('â', 'a').replaceAll('ă', 'a').replaceAll('î', 'i').replaceAll('ș', 's').replaceAll('ş', 's').replaceAll('ț', 't').replaceAll('ţ', 't');
  }

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_API_URL);

    axios.get('https://api.project-trenuri-romania.cristimacovei.dev/data/stations')
    .then(res => {
      const stations = res.data.stations.map(entry => compressName(entry.stationName));

      setStations(stations);
    })
  }, []);

  function submitForm(evt) {
    const fData = new FormData(evt.target);

    const stationName = fData.get('stationName');
    const latitude = fData.get('latitude');
    const longitude = fData.get('longitude');

    const floatLatitude = parseFloat(latitude);
    const floatLongitude = parseFloat(longitude);

    if (isNaN(floatLatitude) || isNaN(floatLongitude)) {
      setFormMessage({
        type: 'error',
        message: 'Latitude and longitude must be numbers'
      });

      return;
    }

    if (Math.abs(floatLatitude) > 90) {
      setFormMessage({
        type: 'error',
        message: 'Latitude and longitude must be between -90 and 90 deg'
      });

      return;
    }

    if (Math.abs(floatLongitude) > 180) {
      setFormMessage({
        type: 'error',
        message: 'Latitude and longitude must be between -180 and 180 deg'
      });

      return;
    }

    axios.post(process.env.NEXT_PUBLIC_API_URL + '/upload', {
      stationName,
      latitude,
      longitude
    })
    .then(res => {
      setFormMessage({
        type: res.data.status,
        message: res.data.message
      });

      console.log(res.data);
    })
  }

  return (
    <div className=''>
      <Container>
        <Title content='Upload station coordinates'/>
        <Form className='pt-4 flex flex-col gap-8' onSubmit={submitForm}>
          <Input 
            type='text'
            name='stationName'
            placeholder='Enter station name'
            data={stations}
            compress={compressName}
          />

          <div className='flex flex-row gap-4'>
            <Input
              type='number'
              name='latitude'
              placeholder='Enter latitude'
            />

            <Input
              type='number'
              name='longitude'
              placeholder='Enter longitude'
            />
          </div>

          <Input
            type='submit'
            value='Send'
            msg={formMessage}
          />
        </Form>

        <DownloadButton />
      </Container>
    </div>
  )
}
