'use strict';

(function (exports) {
  exports.App = React.createClass({
    displayName: 'App',

    getInitialState: function getInitialState() {
      this.stores = {
        'star4': window.SSRare,
        'star3': window.SRare,
        'star2': window.Rare
      };
      return {
        money: 0,
        results: [],
        newResult: [],
        STAR4_SCORE: 92,
        STAR3_SCORE: 70
      };
    },
    componentDidMount: function componentDidMount() {
      $("[name='my-checkbox']").bootstrapSwitch();
    },
    componentDidUpdate: function componentDidUpdate() {
      $("[name='my-checkbox']").bootstrapSwitch();
    },
    getRandom: function getRandom(rarity) {
      var item = this.stores[rarity][Math.floor(Math.random() * this.stores[rarity].length)];
      return item;
    },
    draw: function draw(time) {
      var result = [];
      for (var i = 0; i < time; i++) {
        var score = Math.ceil(Math.random() * 100);
        if (score > this.state.STAR4_SCORE) {
          result.push(this.getRandom('star4'));
        } else if (score > this.state.STAR3_SCORE) {
          result.push(this.getRandom('star3'));
        } else {
          result.push(this.getRandom('star2'));
        }
      }
      return result;
    },
    drawTen: function drawTen() {
      var money = this.state.money;
      var results = this.state.results;
      var newResult = this.draw(11);
      this.setState({
        money: money + 250,
        results: results.concat(newResult),
        newResult: newResult
      });
    },
    drawSingle: function drawSingle() {
      var money = this.state.money;
      var results = this.state.results;
      var newResult = this.draw(1);
      this.setState({
        money: money + 25,
        results: results.concat(newResult),
        newResult: newResult
      });
    },
    onClick: function onClick(evt) {
      switch (evt.target.id) {
        case 'ten':
          this.drawTen();
          break;
        case 'single':
          this.drawSingle();
          break;
        case 'clear':
          this.setState({
            newResult: [],
            results: [],
            money: 0
          });
          break;
      }
    },
    getPercentage: function getPercentage(count) {
      return this.state.results.length ? (100 * count / this.state.results.length).toFixed(2) + '%' : '0%';
    },
    render: function render() {
      var star4 = 0;
      var star3 = 0;
      var star2 = 0;
      var resultDOM = this.state.newResult.map(function (item, index) {
        return React.createElement(
          'div',
          { className: 'col-lg-1 col-md-2 col-xs-3' },
          React.createElement('img', { src: item.img, alt: item.name }),
          name
        );
      });
      if (resultDOM.length) {
        resultDOM = React.createElement(
          'div',
          { className: 'container' },
          React.createElement(
            'div',
            { className: 'row' },
            resultDOM
          )
        );
      }
      var totalDOM = this.state.results.map(function (item, index) {
        if (item.rarity === 4) {
          star4++;
        } else if (item.rarity === 3) {
          star3++;
        } else {
          star2++;
        }
        return React.createElement(
          'div',
          { className: 'thumb col-lg-1 col-md-1 col-sm-1 col-xs-1' },
          React.createElement('img', { ref: 'all-' + index, alt: item.name, src: item.img })
        );
      });
      if (totalDOM.length) {
        totalDOM = React.createElement(
          'div',
          { className: 'container' },
          React.createElement(
            'div',
            { className: 'row' },
            totalDOM
          )
        );
      }
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { key: 'control', className: 'container' },
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
              'button',
              { className: 'btn btn-info', id: 'single', onClick: this.onClick },
              '單抽'
            ),
            React.createElement(
              'button',
              { className: 'btn btn-info', id: 'ten', onClick: this.onClick },
              '十連(10+1)'
            ),
            React.createElement(
              'button',
              { className: 'btn btn-warning', id: 'clear', onClick: this.onClick },
              '重來'
            )
          )
        ),
        React.createElement(
          'div',
          { id: 'result', ref: 'result', key: 'result' },
          resultDOM
        ),
        React.createElement(
          'h3',
          null,
          '累計: ',
          this.state.money,
          '石 [四星: ',
          star4,
          '(',
          this.getPercentage(star4),
          ') ,三星: ',
          star3,
          '(',
          this.getPercentage(star3),
          '), 二星: ',
          star2,
          '(',
          this.getPercentage(star2),
          ')]'
        ),
        React.createElement(
          'div',
          { id: 'total', key: 'total', ref: 'total' },
          totalDOM
        )
      );
    }
  });
})(window);