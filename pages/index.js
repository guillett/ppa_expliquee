import ExplainedPPA from '../components/ExplainedPPA'
import ExplainedKOPPA from '../components/ExplainedKOPPA'
import ExplainedPPAFictive from '../components/ExplainedPPAFictive'
import fetch from 'isomorphic-unfetch'

export default function Index({ data, dates }) {
  return (
    <div>
      <h1>Prime d'activité expliquée</h1>
      <ExplainedPPA data={data} dates={dates} />
      <ExplainedKOPPA data={data} dates={dates} />
      <h1>Primes d'activité fictives expliquées</h1>
      <ExplainedPPAFictive data={data} dates={dates} period="Mm3" />
      <ExplainedPPAFictive data={data} dates={dates} period="Mm2" />
      <ExplainedPPAFictive data={data} dates={dates} period="Mm1" />
    </div>
  )
}

Index.getInitialProps = async function() {
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