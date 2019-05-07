import Link from 'next/link'
import Layout from '../components/Layout'
import OpenfiscaPage from '../components/OpenfiscaPage'
import OpenfiscaTraced from '../components/OpenfiscaTraced'

export default class Page extends OpenfiscaTraced(OpenfiscaPage) {
  render() {
    const p = this.props.dates.M
    const pl = this.props.dates.labels.M

    const mois = ['Mm1', 'Mm2', 'Mm3'];
    const first = this.vr("ppa_fictive", this.props.dates[mois[0]])
    const allSame = mois.map(m => this.vr("ppa_fictive", this.props.dates[m])).reduce((a, v) => a && v == first, true)

    return (
      <Layout back={false}>
        {  this.vr('ppa', this.props.dates.M) ?
          (
            <div>
                <p>Selon notre simulateur, en {pl}, vous pouvez bénéficier de la prime d'activité pour un montant de {this.vr('ppa', p)}&nbsp;€&nbsp;/&nbsp;mois.</p>
                <Link href="/step/ok"><a>En savoir plus</a></Link>
            </div>
          ) :
          (
            <div>TODO</div>
          )
        }
      </Layout>
    )
  }
}
