import axios from 'axios';
import React from 'react'

export default function DownloadButton() {
  function fetchCSV(evt) {
    evt.preventDefault();

    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/fetch`)
    .then(res => {
      const { json } = res.data;

      const csv = json.map(entry => `${entry.name},${entry.latitude},${entry.longitude}`).join('\n');

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'stations.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    });
  }
  
  return (
    <div className='pt-4'>
      <span className='underline cursor-pointer text-primary' onClick={fetchCSV}>
        Download data
      </span>
    </div>
  )
}
