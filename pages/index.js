import React from 'react';
import Link from 'next/link'

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <h1>Prime d'activité expliquée</h1>
        <ul>
          <li><Link href="/full"><a>Tout d'un coup</a></Link></li>
          <li><Link href="/step/start"><a>Par étape</a></Link></li>
        </ul>
      </div>
    )
  }
}
