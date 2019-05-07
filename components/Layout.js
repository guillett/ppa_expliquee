import Router from 'next/router';

const Layout = (props) => (
  <div>
    <style>{`
      .back {
        text-decoration: underline grey;
        cursor: pointer;
      }

      a {
        text-decoration: dashed underline grey;
        color: black;
      }
    `}</style>
    <h1>La prime d'activité expliquée en détails</h1>
    <div>
      { (props.back !== false) && <a class="back" onClick={() => Router.back()}>Précédent</a> }
    </div>
    {props.children}
  </div>
)

export default Layout
