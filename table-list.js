'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _transitions = require('./styles/transitions');

var _transitions2 = _interopRequireDefault(_transitions);

var _Divider = require('./Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _EnhancedButton = require('./internal/EnhancedButton');

var _EnhancedButton2 = _interopRequireDefault(_EnhancedButton);

var _colorManipulator = require('./utils/colorManipulator');

var _colors = require('./styles/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var TableItem = _react2.default.createClass({
  displayName: 'TableItem',

  propTypes: {
    children: _react2.default.PropTypes.node,
    innerDivStyle: _react2.default.PropTypes.object,
    onKeyboardFocus: _react2.default.PropTypes.func,
    onMouseEnter: _react2.default.PropTypes.func,
    onMouseLeave: _react2.default.PropTypes.func,
    onNestedListToggle: _react2.default.PropTypes.func,
    onTouchStart: _react2.default.PropTypes.func,
    onTouchTap: _react2.default.PropTypes.func,
    style: _react2.default.PropTypes.object
  },

  contextTypes: {
    muiTheme: _react2.default.PropTypes.object.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onKeyboardFocus: function onKeyboardFocus() {},
      onMouseEnter: function onMouseEnter() {},
      onMouseLeave: function onMouseLeave() {},
      onTouchStart: function onTouchStart() {}
    };
  },
  getInitialState: function getInitialState() {
    return {
      hovered: false,
      isKeyboardFocused: false,
      touch: false
    };
  },
  _handleKeyboardFocus: function _handleKeyboardFocus(e, isKeyboardFocused) {
    this.setState({ isKeyboardFocused: isKeyboardFocused });
    this.props.onKeyboardFocus(e, isKeyboardFocused);
  },
  _handleMouseEnter: function _handleMouseEnter(e) {
    if (!this.state.touch) this.setState({ hovered: true });
    this.props.onMouseEnter(e);
  },
  _handleMouseLeave: function _handleMouseLeave(e) {
    this.setState({ hovered: false });
    this.props.onMouseLeave(e);
  },
  _handleNestedListToggle: function _handleNestedListToggle(e) {
    e.stopPropagation();
    this.setState({ open: !this.state.open });
    this.props.onNestedListToggle(this);
  },
  _handleTouchStart: function _handleTouchStart(e) {
    this.setState({ touch: true });
    this.props.onTouchStart(e);
  },
  render: function render() {
    var _props = this.props;
    var children = _props.children;
    var onTouchTap = _props.onTouchTap;
    var style = _props.style;
    var innerDivStyle = _props.innerDivStyle;

    var other = _objectWithoutProperties(_props, ['children', 'onTouchTap', 'style', 'innerDivStyle']);

    var prepareStyles = this.context.muiTheme.prepareStyles;


    var textColor = this.context.muiTheme.rawTheme.palette.textColor;
    var hoverColor = (0, _colorManipulator.fade)(textColor, 0.1);
    var styles = {
      root: {
        backgroundColor: this.state.isKeyboardFocused || this.state.hovered ? hoverColor : null,
        color: textColor,
        display: 'block',
        fontSize: 16,
        lineHeight: '16px',
        position: 'relative',
        transition: _transitions2.default.easeOut()
      },

      //This inner div is needed so that ripples will span the entire container
      innerDiv: {
        padding: 16,
        position: 'relative'
      }
    };

    return _react2.default.createElement(
      _EnhancedButton2.default,
      _extends({}, other, {
        containerElement: 'div',
        onKeyboardFocus: this._handleKeyboardFocus,
        onMouseLeave: this._handleMouseLeave,
        onMouseEnter: this._handleMouseEnter,
        onTouchStart: this._handleTouchStart,
        onTouchTap: onTouchTap,
        ref: 'enhancedButton',
        style: (0, _simpleAssign2.default)({}, styles.root, style)
      }),
      _react2.default.createElement(
        'div',
        { style: prepareStyles((0, _simpleAssign2.default)({}, styles.innerDiv, innerDivStyle)) },
        children
      )
    );
  }
});

var TableCell = _react2.default.createClass({
  displayName: 'TableCell',


  propTypes: {
    children: _react2.default.PropTypes.node,
    style: _react2.default.PropTypes.object,
    width: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number])
  },

  contextTypes: {
    muiTheme: _react2.default.PropTypes.object.isRequired
  },

  render: function render() {
    var prepareStyles = this.context.muiTheme.prepareStyles;

    var mergedStyles = (0, _simpleAssign2.default)({}, {
      flex: this.props.width ? null : 1
    }, this.props.style);

    return _react2.default.createElement(
      'div',
      { style: prepareStyles(mergedStyles) },
      this.props.children
    );
  }
});

var TableList = _react2.default.createClass({
  displayName: 'TableList',


  propTypes: {
    data: _react2.default.PropTypes.array,
    headers: _react2.default.PropTypes.array,
    onHeaderClick: _react2.default.PropTypes.func,
    onItemClick: _react2.default.PropTypes.func,
    style: _react2.default.PropTypes.object
  },

  contextTypes: {
    muiTheme: _react2.default.PropTypes.object.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      data: [],
      headers: []
    };
  },
  _onHeaderClick: function _onHeaderClick(header) {
    if (this.props.onHeaderClick) {
      this.props.onHeaderClick(header);
    }
  },
  _onItemClick: function _onItemClick(item) {
    if (this.props.onItemClick) {
      this.props.onItemClick(item);
    }
  },
  render: function render() {
    var _props2 = this.props;
    var data = _props2.data;
    var headers = _props2.headers;
    var style = _props2.style;
    var onHeaderClick = _props2.onHeaderClick;
    var onItemClick = _props2.onItemClick;

    var other = _objectWithoutProperties(_props2, ['data', 'headers', 'style', 'onHeaderClick', 'onItemClick']);

    var prepareStyles = this.context.muiTheme.prepareStyles;


    var styles = {
      root: {},
      cell: {
        width: '100%'
      }
    };
    var rowStyle = {
      display: 'flex',
      justifyContent: 'space-around',
      flexFlow: 'row nowrap',
      alignItems: 'center'
    };

    var rows = data.map(function (d, i) {
      var cells = headers.map(function (header, j) {
        return _react2.default.createElement(
          TableCell,
          { width: header.size, key: 'header' + i + j },
          _react2.default.createElement(
            'div',
            { style: header.style },
            d[header.key]
          )
        );
      }.bind(this));

      return _react2.default.createElement(
        TableItem,
        { key: 'data' + i, onTouchTap: this._onItemClick.bind(this, d) },
        _react2.default.createElement(
          'div',
          { style: rowStyle },
          cells
        )
      );
    }.bind(this));

    // props or theme ?
    var grey = (0, _colorManipulator.fade)(_colors.darkBlack, 0.4);

    var rowHeaders = headers.map(function (header, i) {
      var hover = header.text ? _react2.default.createElement(
        TableItem,
        {
          onTouchTap: this._onHeaderClick.bind(this, header),
          style: { color: grey }
        },
        header.text
      ) : _react2.default.createElement('div', { style: { width: header.size } });
      return _react2.default.createElement(
        TableCell,
        { width: header.size, key: 'header' + i },
        hover
      );
    }.bind(this));

    return _react2.default.createElement(
      'div',
      _extends({}, other, { style: prepareStyles((0, _simpleAssign2.default)({}, styles.root, style)) }),
      _react2.default.createElement(
        'div',
        { style: { paddingLeft: 16, paddingRight: 16 } },
        _react2.default.createElement(
          'div',
          { style: rowStyle },
          rowHeaders
        )
      ),
      _react2.default.createElement(_Divider2.default, null),
      rows
    );
  }
});

module.exports = TableList;