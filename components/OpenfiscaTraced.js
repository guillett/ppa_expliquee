import React from 'react';
import fetch from 'isomorphic-unfetch'

export default class OpenfiscaTraced extends React.Component {
  constructor(props) {
    super(props)
  }

  v(name, period) {
    const key = `${name}<${period}>`
    return this.props.data.trace[key].value.reduce((a, e) => a + e, 0)
  }

  d(name, period) {
    const key = `${name}<${period}>`
    return this.props.data.trace[key]
  }

  vr(name, period) {
    return this.r(this.v(name, period));
  }

  p(name, period) {
    const key = `${name}<${period}>`;
    const params = this.props.data.trace[key].parameters;

    function parameterGetter(name, period) {
      const pkey = `${name}<${period}>`;
      return params[pkey]
    }

    parameterGetter.dump = function() {
      return params;
    }

    return parameterGetter;
  }

  r(value) {
    return Math.round(value * 100) / 100;
  }
}
