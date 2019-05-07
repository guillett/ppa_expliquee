import Link from 'next/link'
import Layout from '../../components/Layout'
import OpenfiscaPage from '../../components/OpenfiscaPage'
import OpenfiscaTraced from '../../components/OpenfiscaTraced'

export default class Page extends OpenfiscaTraced(OpenfiscaPage) {
  render() {
    const p = this.props.dates.M
    const pl = this.props.dates.labels.M

    const mois = ['Mm1', 'Mm2', 'Mm3'];
    const first = this.vr("ppa_fictive", this.props.dates[mois[0]]);
    const allSame = mois.map(m => this.vr("ppa_fictive", this.props.dates[m])).reduce((a, v) => a && v == first, true);

    return (
      <Layout>
        <p>La prime d'activité est calculée en faisant la moyenne de 3 valeurs appelées primes d'activité fictives.</p>
        {
          allSame ? (
            <div>
              <p>Vos primes d'activité fictives valent <Link href="/step/ppamm3"><a>{this.vr("ppa_fictive", this.props.dates.Mm1)}&nbsp;€</a></Link> sur chacun des mois du trimestre de référence.</p>
              <p>Vous pouvez cliquer sur le montant pour en avoir le détail.</p>
            </div>
           ) : (
            <div>
              <p>Vos primes d'activité fictives valent&nbsp;:</p>
              <ul>
                <li><Link href="/step/ppamm3"><a>{this.vr("ppa_fictive", this.props.dates.Mm3)}&nbsp;€ pour {this.props.dates.labels.Mm3}</a></Link>,</li>
                <li><Link href="/step/ppamm2"><a>{this.vr("ppa_fictive", this.props.dates.Mm2)}&nbsp;€ pour {this.props.dates.labels.Mm2} e</a></Link>t</li>
                <li><Link href="/step/ppamm1"><a>{this.vr("ppa_fictive", this.props.dates.Mm1)}&nbsp;€ pour {this.props.dates.labels.Mm1}</a></Link>.</li>
              </ul>
              <p>Vous pouvez cliquer sur une prime d'activité fictive pour en avoir le détail.</p>
            </div>
          )
        }
      </Layout>
    )
  }
}
