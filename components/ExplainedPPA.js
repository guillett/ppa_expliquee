import OpenfiscaTraced from './OpenfiscaTraced'
import ExplainedOKPPA from '../components/ExplainedOKPPA'
import ExplainedKOPPA from '../components/ExplainedKOPPA'

export default class ExplainedPPA extends OpenfiscaTraced {
  render() {
    return this.vr('ppa', this.props.dates.M) ?
      <ExplainedOKPPA data={this.props.data} dates={this.props.dates} /> :
      <ExplainedKOPPA data={this.props.data} dates={this.props.dates} />
  }
}
