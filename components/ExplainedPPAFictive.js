import OpenfiscaTraced from './OpenfiscaTraced';

export default class ExplainedPPAFictive extends OpenfiscaTraced {
  render() {
    const p = this.props.dates[this.props.period]
    const pl = this.props.dates.labels[this.props.period]

    return (
      <div>
        <p>La prime d'activité fictive du mois de {pl} a été évaluée à {this.vr('ppa_fictive', p)} €.</p>
        <p>Ce montant est obtenu à partir de la somme des éléments suivants :</p>
        <ul>
          <li>un montant forfaitaire de {this.vr('ppa_fictive_montant_forfaitaire', p)} € ;</li>
          <li>des bonifications individuelles d'un total de {this.vr('ppa_bonification', p)} € ;</li>
          <li>61% de vos revenus d'activité, c'est à dire {this.vr('ppa_fictive_ressource_activite', p)} €.</li>
        </ul>
        <p>À cette somme sont déduits les éléments suivants :</p>
        <ul>
          <li>un forfait logement de {this.vr('ppa_forfait_logement', p)} € ;</li>
          <li>l'intégralité de vos ressources ie. {this.vr('ppa_base_ressources', p)} €.</li>
        </ul>
        <p>On obtient {this.vr('ppa_fictive', p)} € comme prime d'activité fictive pour le mois de {pl}. <span>En cas de valeur négative on prend 0.</span></p>
      </div>
    )
  }
}
