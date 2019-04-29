var dates = {
  M: '2019-04',
  Mm1: '2019-03',
  Mm2: '2019-02',
  Mm3: '2019-01',
  D: '2019-04-01',
  labels: {
    M: 'avril 2019',
    Mm1: 'mars 2019',
    Mm2: 'février 2019',
    Mm3: 'janvier 2019',
  }
};


function compoConstructor(data) {
  var compo = function(name, period) {
    const key = `${name}<${period}>`;
    return data.trace[key].value[0];
  }

  compo.p = function(name, period) {
    const key = `${name}<${period}>`;
    const params = data.trace[key].parameters;

    function parameterGetter(name, period) {
      const pkey = `${name}<${period}>`;
      return params[pkey]
    }

    parameterGetter.dump = function() {
      return params;
    }

    return parameterGetter;
  }

  compo.evl = function (block) {
    if (typeof block === 'function') {
      return block.apply(compo, [dates]);
    }
    return block;
  };

  return compo;
}
