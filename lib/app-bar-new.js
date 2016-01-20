'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Typography = require('./styles/typography');
var DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
var ThemeManager = require('./styles/theme-manager');
var Paper = require('./paper');

var AppBar = React.createClass({
  displayName: 'AppBar',

  propTypes: {
    actionIcons: React.PropTypes.array,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    filterIcon: React.PropTypes.element,
    iconStyleRight: React.PropTypes.object,
    moreIcon: React.PropTypes.element,
    navIcon: React.PropTypes.element,
    onLeftIconButtonTouchTap: React.PropTypes.func,
    onRightIconButtonTouchTap: React.PropTypes.func,
    style: React.PropTypes.object,
    title: React.PropTypes.node,
    titleStyle: React.PropTypes.object,
    zDepth: React.PropTypes.number
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
      title: '',
      zDepth: 1
    };
  },
  getInitialState: function getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
    };
  },
  getChildContext: function getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },
  getStyles: function getStyles() {
    var spacing = this.state.muiTheme.rawTheme.spacing;
    var themeVariables = this.state.muiTheme.appBar;
    var iconButtonSize = this.state.muiTheme.button.iconButtonSize;
    var flatButtonSize = 36;
    var styles = {
      root: {
        zIndex: 5,
        width: '100%',
        display: '-webkit-box; display: -moz-box; display: -ms-flexbox; display: -webkit-flex; display: flex',
        minHeight: themeVariables.height,
        backgroundColor: themeVariables.color,
        paddingLeft: spacing.desktopGutter,
        paddingRight: spacing.desktopGutter
      },
      title: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        margin: 0,
        paddingTop: 0,
        letterSpacing: 0,
        fontSize: 24,
        fontWeight: Typography.fontWeightNormal,
        color: themeVariables.textColor,
        lineHeight: themeVariables.height + 'px',
        display: 'inline'
      },
      mainElement: {
        boxFlex: 1,
        flex: 1
      },
      iconButton: {
        style: {
          marginTop: (themeVariables.height - iconButtonSize) / 2,
          marginRight: 8,
          marginLeft: -16
        },
        iconStyle: {
          fill: themeVariables.textColor,
          color: themeVariables.textColor
        }
      },
      flatButton: {
        color: themeVariables.textColor,
        backgroundColor: 'transparent',
        marginTop: (iconButtonSize - flatButtonSize) / 2 + 2
      }
    };

    return styles;
  },
  _onLeftIconButtonTouchTap: function _onLeftIconButtonTouchTap(event) {
    if (this.props.onLeftIconButtonTouchTap) {
      this.props.onLeftIconButtonTouchTap(event);
    }
  },
  _onRightIconButtonTouchTap: function _onRightIconButtonTouchTap(event) {
    if (this.props.onRightIconButtonTouchTap) {
      this.props.onRightIconButtonTouchTap(event);
    }
  },
  render: function render() {
    var _props = this.props;
    var title = _props.title;
    var titleStyle = _props.titleStyle;
    var className = _props.className;
    var style = _props.style;
    var zDepth = _props.zDepth;
    var children = _props.children;
    var navIcon = _props.navIcon;
    var filterIcon = _props.filterIcon;
    var actionIcons = _props.actionIcons;
    var moreIcon = _props.moreIcon;
    var iconStyleRight = _props.iconStyleRight;

    var other = _objectWithoutProperties(_props, ['title', 'titleStyle', 'className', 'style', 'zDepth', 'children', 'navIcon', 'filterIcon', 'actionIcons', 'moreIcon', 'iconStyleRight']);

    var titleElement = undefined;
    var navIconElement = undefined;
    var filterIconElement = undefined;
    var rightIcons = [];
    var rightIconElements = undefined;

    var styles = this.getStyles();
    var iconRightStyle = this.prepareStyles(styles.iconButton.style, {
      marginRight: -16,
      marginLeft: 'auto'
    }, iconStyleRight);

    if (navIcon) {
      if (navIcon.type.displayName === 'IconButton') {
        navIcon = React.cloneElement(navIcon, {
          iconStyle: this.mergeStyles(styles.iconButton.iconStyle, navIcon.props.iconStyle)
        });
      }

      navIconElement = React.createElement(
        'div',
        { style: styles.iconButton.style },
        navIcon
      );
    }

    // Title Wrapper
    if (title) {
      // If the title is a string, wrap in an h1 tag.
      // If not, just use it as a node.
      if (typeof title === 'string' || title instanceof String) {
        title = React.createElement(
          'h1',
          { style: this.prepareStyles(styles.title, titleStyle) },
          title
        );
      }
    }

    // Filter Icon
    if (filterIcon) {
      if (filterIcon.type.displayName === 'IconButton' || filterIcon.type.displayName === 'IconMenu') {
        filterIcon = React.cloneElement(filterIcon, {
          iconStyle: this.mergeStyles(styles.iconButton.iconStyle, filterIcon.props.iconStyle)
        });
      }

      filterIconElement = React.createElement(
        'div',
        { style: this.prepareStyles({ display: 'inline-block', verticalAlign: 'sub' }) },
        filterIcon
      );
    }

    // Builded title (text and filter icon)
    titleElement = React.createElement(
      'div',
      { style: this.prepareStyles(styles.mainElement) },
      title,
      filterIconElement
    );

    // Action Icons
    if (actionIcons) {
      actionIcons = actionIcons.map(function (icon) {
        if (icon.type.displayName === 'IconButton') {
          icon = React.cloneElement(icon, {
            iconStyle: this.mergeStyles(styles.iconButton.iconStyle, icon.props.iconStyle)
          });
        } else if (icon.type.displayName === 'FlatButton') {
          icon = React.cloneElement(icon, {
            style: this.mergeStyles(styles.flatButton, icon.props.style)
          });
        }
        return icon;
      }.bind(this));

      rightIcons = rightIcons.concat(actionIcons);
    }

    // More Icon
    if (moreIcon) {
      if (moreIcon.type.displayName === 'IconButton' || moreIcon.type.displayName === 'IconMenu') {
        moreIcon = React.cloneElement(moreIcon, {
          iconStyle: this.mergeStyles(styles.iconButton.iconStyle, moreIcon.props.iconStyle)
        });
      }

      rightIcons.push(moreIcon);
    }

    // Right-most Icon container
    if (rightIcons.length > 0) {
      rightIconElements = React.createElement(
        'div',
        { style: iconRightStyle },
        rightIcons
      );
    }

    return React.createElement(
      Paper,
      _extends({}, other, {
        rounded: false,
        className: className,
        style: this.mergeStyles(styles.root, style),
        zDepth: zDepth
      }),
      navIconElement,
      titleElement,
      rightIconElements,
      children
    );
  }
});

module.exports = AppBar;