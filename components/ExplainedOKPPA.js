import OpenfiscaTraced from './OpenfiscaTraced'

export default class ExplainedOKPPA extends OpenfiscaTraced {
  render() {
    const p = this.props.dates.M
    const pl = this.props.dates.labels.M

    const mois = ['Mm1', 'Mm2', 'Mm3'];
    const first = this.vr("ppa_fictive", this.props.dates[mois[0]]);
    const allSame = mois.map(m => this.vr("ppa_fictive", this.props.dates[m])).reduce((a, v) => a && v == first, true);

    return (
      <div>
        <p>Selon notre simulateur, en {pl}, vous pouvez bénéficier de la prime d'activité pour un montant de {this.vr('ppa', p)}&nbsp;€&nbsp;/&nbsp;mois.</p>
        <p>Cette prime d'activité est calculée en faisant la moyenne de 3 valeurs appelées primes d'activité fictives.</p>
        {
          allSame ? (
            <p>Vos primes d'activité fictives valent {this.vr("ppa_fictive", this.props.dates.Mm1)}&nbsp;€ sur chacun des mois du trimestre de référence.</p>
           ) : (
            <div>
              <p>Vos primes d'activité fictives valent&nbsp;:</p>
              <ul>
                <li> {this.vr("ppa_fictive", this.props.dates.Mm3)}&nbsp;€ pour {this.props.dates.labels.Mm3},</li>
                <li> {this.vr("ppa_fictive", this.props.dates.Mm2)}&nbsp;€ pour {this.props.dates.labels.Mm2} et</li>
                <li> {this.vr("ppa_fictive", this.props.dates.Mm1)}&nbsp;€ pour {this.props.dates.labels.Mm1}.</li>
              </ul>
            </div>
          )
        }
      </div>
    )
  }
}
