import ExplainedPPA from '../components/ExplainedPPA'
import ExplainedKOPPA from '../components/ExplainedKOPPA'
import ExplainedPPAFictive from '../components/ExplainedPPAFictive'
import OpenFiscaPage from '../components/OpenfiscaPage'

export default class FullPage extends OpenFiscaPage {
  render() {
    return (
      <div>
        <h1>Prime d'activité expliquée</h1>
        <ExplainedPPA data={this.props.data} dates={this.props.dates} />
        <ExplainedKOPPA data={this.props.data} dates={this.props.dates} />
        <h1>Primes d'activité fictives expliquées</h1>
        <ExplainedPPAFictive data={this.props.data} dates={this.props.dates} period="Mm3" />
        <ExplainedPPAFictive data={this.props.data} dates={this.props.dates} period="Mm2" />
        <ExplainedPPAFictive data={this.props.data} dates={this.props.dates} period="Mm1" />
      </div>
    )
  }
}
