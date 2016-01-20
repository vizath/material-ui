'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _divider = require('material-ui/lib/divider');

var _divider2 = _interopRequireDefault(_divider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
var ColorManipulator = require('./utils/color-manipulator');
var ThemeManager = require('./styles/theme-manager');
var EnhancedButton = require('./enhanced-button');

var Colors = require('./styles/colors');

var TableItem = React.createClass({
  displayName: 'TableItem',

  propTypes: {
    children: React.PropTypes.node,
    innerDivStyle: React.PropTypes.object,
    onKeyboardFocus: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onNestedListToggle: React.PropTypes.func,
    onTouchStart: React.PropTypes.func,
    onTouchTap: React.PropTypes.func,
    style: React.PropTypes.object
  },

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  mixins: [StylePropable],

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

    var textColor = this.context.muiTheme.rawTheme.palette.textColor;
    var hoverColor = ColorManipulator.fade(textColor, 0.1);
    var styles = {
      root: {
        backgroundColor: this.state.isKeyboardFocused || this.state.hovered ? hoverColor : null,
        color: textColor,
        display: 'block',
        fontSize: 16,
        lineHeight: '16px',
        position: 'relative',
        transition: Transitions.easeOut()
      },

      //This inner div is needed so that ripples will span the entire container
      innerDiv: {
        padding: 16,
        position: 'relative'
      }
    };

    return React.createElement(
      EnhancedButton,
      _extends({}, other, {
        linkButton: true,
        containerElement: 'div',
        onKeyboardFocus: this._handleKeyboardFocus,
        onMouseLeave: this._handleMouseLeave,
        onMouseEnter: this._handleMouseEnter,
        onTouchStart: this._handleTouchStart,
        onTouchTap: onTouchTap,
        ref: 'enhancedButton',
        style: this.mergeStyles(styles.root, style)
      }),
      React.createElement(
        'div',
        { style: this.prepareStyles(styles.innerDiv, innerDivStyle) },
        children
      )
    );
  }
});

var TableCell = React.createClass({
  displayName: 'TableCell',

  propTypes: {
    children: React.PropTypes.node,
    style: React.PropTypes.object,
    width: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number])
  },

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  mixins: [StylePropable],

  render: function render() {
    var mergedStyles = this.mergeStyles({
      flex: this.props.width ? null : 1
    }, this.props.style);

    return React.createElement(
      'div',
      { style: this.prepareStyles(mergedStyles) },
      this.props.children
    );
  }
});

var TableList = React.createClass({
  displayName: 'TableList',

  propTypes: {
    data: React.PropTypes.array,
    headers: React.PropTypes.array,
    onHeaderClick: React.PropTypes.func,
    onItemClick: React.PropTypes.func,
    style: React.PropTypes.object
  },

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  mixins: [StylePropable],

  getDefaultProps: function getDefaultProps() {
    return {
      data: [],
      headers: []
    };
  },
  getInitialState: function getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
    };
  },
  getChildContext: function getChildContext() {
    return {
      muiTheme: this.context.muiTheme
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.context.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },
  _onHeaderClick: function _onHeaderClick(header) {
    this.props.onHeaderClick(header);
  },
  _onItemClick: function _onItemClick(item) {
    this.props.onItemClick(item);
  },
  render: function render() {
    var _props2 = this.props;
    var data = _props2.data;
    var headers = _props2.headers;
    var style = _props2.style;

    var other = _objectWithoutProperties(_props2, ['data', 'headers', 'style']);

    var styles = {
      root: {},
      cell: {
        width: '100%'
      }
    };
    var rowStyle = {
      display: '-webkit-box; display: -moz-box; display: -ms-flexbox; display: -webkit-flex; display: flex',
      justifyContent: 'space-around',
      flexFlow: 'row nowrap',
      alignItems: 'center'
    };

    var rows = data.map(function (d, i) {
      var cells = headers.map(function (header, j) {
        return React.createElement(
          TableCell,
          { width: header.size, key: 'header' + i + j },
          React.createElement(
            'div',
            { style: header.style },
            d[header.key]
          )
        );
      }.bind(this));

      return React.createElement(
        TableItem,
        { key: 'data' + i, onTouchTap: this._onItemClick.bind(this, d) },
        React.createElement(
          'div',
          { style: rowStyle },
          cells
        )
      );
    }.bind(this));

    // props or theme ?
    var grey = ColorManipulator.fade(Colors.darkBlack, 0.4);

    var rowHeaders = headers.map(function (header, i) {
      var hover = header.text ? React.createElement(
        TableItem,
        {
          onTouchTap: this._onHeaderClick.bind(this, header),
          style: { color: grey }
        },
        header.text
      ) : React.createElement('div', { style: { width: header.size } });
      return React.createElement(
        TableCell,
        { width: header.size, key: 'header' + i },
        hover
      );
    }.bind(this));

    return React.createElement(
      'div',
      _extends({}, other, { style: this.prepareStyles(styles.root, style) }),
      React.createElement(
        'div',
        { style: { paddingLeft: 16, paddingRight: 16 } },
        React.createElement(
          'div',
          { style: rowStyle },
          rowHeaders
        )
      ),
      React.createElement(_divider2.default, null),
      rows
    );
  }
});

module.exports = TableList;