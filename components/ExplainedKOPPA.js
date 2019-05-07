import OpenfiscaTraced from './OpenfiscaTraced'

export default class ExplainedKOPPA extends OpenfiscaTraced {
  render() {
    const p = this.props.dates.M
    const pl = this.props.dates.labels.M
    return (
      <div>
        <p>Selon notre simulateur, vous ne pouvez pas bénéficier de la prime d'activité en {pl}.</p>
        { !this.vr("ppa_eligibilite_etudiants", this.props.dates.M) ?
          <ExplainedKOStudentPPA data={this.props.data} dates={this.props.dates} /> :
          <ExplainedKOMinPPA data={this.props.data} dates={this.props.dates} />
        }
        <div>
          <ExplainedKOStudentPPA data={this.props.data} dates={this.props.dates} />
          <ExplainedKOMinPPA data={this.props.data} dates={this.props.dates} />
        </div>
      </div>
    )
  }
}

class ExplainedKOStudentPPA extends OpenfiscaTraced {
  render() {
    const d = this.props.dates
    const params = this.p("ppa_eligibilite_etudiants", d.M)
    const seuil = 169 *
      params("cotsoc.gen.smic_h_b", d.D) *
      params("prestations.prestations_familiales.af.seuil_rev_taux", d.D)
    const roundedSeuil = this.r(seuil)

    const mois = ['Mm3', 'Mm2', 'Mm1']
    const moisSousSeuil = mois.filter(m => this.vr('ppa_revenu_activite_individu', d[m])<seuil)
    return (
      <p>En tant qu'étudiant.e, pour être éligible à la prime d'activité
      il faut que sur les trois derniers mois vos revenus d'activité mensuels soient supérieures à {roundedSeuil}&nbsp;€
      or pour le{moisSousSeuil.length>1 ? 's' : ''} mois de {moisSousSeuil.map(m=> d.labels[m]).join(' et ')},
      ils n'ont été que de {moisSousSeuil.map(m => this.vr('ppa_revenu_activite_individu', d[m]) + ' €').join(' et ')}{moisSousSeuil.length>1 ? ' respectivement' : ''}.</p>
    )
  }
}

class ExplainedKOMinPPA extends OpenfiscaTraced {
  render() {
    const d = this.props.dates
    const mois = ['Mm1', 'Mm2', 'Mm3']
    const moyenne = mois.reduce((a, m) => a + this.vr('ppa_fictive', d[m]), 0) / 3.0

    const params = this.p("ppa", d.M)
    const minimum = params('prestations.minima_sociaux.ppa.seuil_non_versement', d.D)
    const sousSeuil = moyenne < minimum
    return (
      <div>
        <p>La prime d'activité n'est pas versée lorsque la moyenne des primes d'activité fictives est en dessous de {this.r(minimum)}&nbsp;€
          or dans votre cas cette moyenne vaut {this.r(moyenne)}&nbsp;€.</p>
      </div>
    )
  }
}
