import React from 'react';
import OpenfiscaTraced from './OpenfiscaTraced';
import fetch from 'isomorphic-unfetch'

export default class OpenfiscaPage extends React.Component { }

OpenfiscaPage.getInitialProps = async function() {
  const res = await fetch('http://localhost:3000/static/openfisca-trace.json')
  const data = await res.json()

  const dates = {
    M: '2019-04',
    Mm1: '2019-03',
    Mm2: '2019-02',
    Mm3: '2019-01',
    D: '2019-04-01',
    labels: {
      M: 'avril 2019',
      Mm1: 'mars 2019',
      Mm2: 'février 2019',
      Mm3: 'janvier 2019',
    }
  }

  return {
    dates,
    data
  }
}
