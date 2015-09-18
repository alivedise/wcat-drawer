'use strict';

(function (exports) {
  exports.App = React.createClass({
    displayName: 'App',

    getInitialState: function getInitialState() {
      this.stores = {
        'star4': window.T15.concat(window.T13),
        'star3': window.Star3,
        'star2': window.Star2
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
      if (item.length === 2) {
        item.push(rarity);
      }
      if (item[0].indexOf('.png') < 0) {
        item[0] = 'http://wcatproject.com/img/icon/' + item[0] + '.png';
      }
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
      var newResult = this.draw(10);
      newResult.push(this.draw(1));
      this.setState({
        money: money + 3000,
        results: results.concat(newResult),
        newResult: newResult
      });
    },
    drawSingle: function drawSingle() {
      var money = this.state.money;
      var results = this.state.results;
      var newResult = this.draw(1);
      this.setState({
        money: money + 300,
        results: results.concat(newResult),
        newResult: newResult
      });
    },
    componentDidUpdate: function componentDidUpdate() {
      var results = this.state.results;
      var newResult = this.state.newResult;
      for (var key in this.refs) {
        var self = this;
        (function () {
          var type = key.split('-')[0];
          var index = Number(key.split('-')[1]);
          self.refs[key].getDOMNode().onerror = function () {
            if (type === 'new') {
              newResult[index][0] = 'img/bug.png';
            } else {
              results[index][0] = 'img/bug.png';
            }
            self.setState({
              newResult: newResult,
              results: results
            });
          };
        })();
      }
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
        var name = '';
        if (item[0].indexOf('bug') >= 0) {
          name = React.createElement(
            'div',
            { className: 'name' },
            item[1]
          );
        }
        return React.createElement(
          'div',
          { className: 'col-lg-3 col-md-4 col-xs-6 thumb' },
          React.createElement('img', { ref: 'new-' + index, src: item[0], alt: item[1] }),
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
        if (item[2] === 'star4') {
          star4++;
        } else if (item[2] === 'star3') {
          star3++;
        } else {
          star2++;
        }
        return React.createElement(
          'div',
          { className: 'thumb col-md-1' },
          React.createElement('img', { ref: 'all-' + index, alt: item[1], src: item[0] })
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
          { key: 'control' },
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
              '十抽'
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
          ' [4: ',
          star4,
          '(',
          this.getPercentage(star4),
          ') ,star3: ',
          star3,
          '(',
          this.getPercentage(star3),
          '), star2: ',
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