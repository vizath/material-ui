'use strict';

var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Typography = require('./styles/typography');
var IconButton = require('./icon-button');
var NavigationMenu = require('./svg-icons/navigation/menu');
var DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
var ThemeManager = require('./styles/theme-manager');
var Paper = require('./paper');

var AppBar = React.createClass({
  displayName: 'AppBar',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  },

  propTypes: {
    onLeftIconButtonTouchTap: React.PropTypes.func,
    onRightIconButtonTouchTap: React.PropTypes.func,
    style: React.PropTypes.object,
    navIcon: React.PropTypes.element,
    filterIcon: React.PropTypes.element,
    moreIcon: React.PropTypes.element,
    actionIcons: React.PropTypes.array,
    iconStyleRight: React.PropTypes.object,
    title: React.PropTypes.node,
    titleStyle: React.PropTypes.object,
    zDepth: React.PropTypes.number
  },

  getInitialState: function getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  getDefaultProps: function getDefaultProps() {
    return {
      title: '',
      zDepth: 1
    };
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
        display: '-webkit-box; display: -webkit-flex; display: flex',
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
        flex: '1'
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

  render: function render() {
    var props = this.props;
    var navIconElement = undefined;
    var filterIconElement = undefined;
    var rightIconElements = undefined;
    var rightIcons = [];
    var styles = this.getStyles();
    var title = props.title;
    var iconRightStyle = this.mergeAndPrefix(styles.iconButton.style, {
      marginRight: -16,
      marginLeft: 'auto'
    }, props.iconStyleRight);
    var titleElement = undefined;

    if (props.navIcon) {
      var navIcon = props.navIcon;

      if (navIcon.type.displayName === 'IconButton') {
        navIcon = React.cloneElement(navIcon, {
          iconStyle: this.mergeAndPrefix(styles.iconButton.iconStyle, navIcon.props.iconStyle)
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
          { style: this.mergeAndPrefix(styles.title, props.titleStyle) },
          title
        );
      }
    }

    // Filter Icon
    if (props.filterIcon) {
      var filterIcon = props.filterIcon;

      if (filterIcon.type.displayName === 'IconButton' || filterIcon.type.displayName === 'IconMenu') {
        filterIcon = React.cloneElement(filterIcon, {
          iconStyle: this.mergeAndPrefix(styles.iconButton.iconStyle, filterIcon.props.iconStyle)
        });
      }

      filterIconElement = React.createElement(
        'div',
        { style: this.mergeAndPrefix({ display: 'inline-block', verticalAlign: 'sub' }) },
        filterIcon
      );
    }

    // Builded title (text and filter icon)
    titleElement = React.createElement(
      'div',
      { style: this.mergeAndPrefix(styles.mainElement) },
      title,
      filterIconElement
    );

    // Action Icons
    if (props.actionIcons) {
      var actionIcons = props.actionIcons;

      actionIcons = actionIcons.map((function (icon) {
        if (icon.type.displayName === 'IconButton') {
          icon = React.cloneElement(icon, {
            iconStyle: this.mergeAndPrefix(styles.iconButton.iconStyle, icon.props.iconStyle)
          });
        } else if (icon.type.displayName === 'FlatButton') {
          icon = React.cloneElement(icon, {
            style: this.mergeAndPrefix(styles.flatButton, icon.props.style)
          });
        }
        return icon;
      }).bind(this));

      rightIcons = rightIcons.concat(actionIcons);
    }

    // More Icon
    if (props.moreIcon) {
      var moreIcon = props.moreIcon;

      if (moreIcon.type.displayName === 'IconButton' || moreIcon.type.displayName === 'IconMenu') {
        moreIcon = React.cloneElement(moreIcon, {
          iconStyle: this.mergeAndPrefix(styles.iconButton.iconStyle, moreIcon.props.iconStyle)
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
      {
        rounded: false,
        className: props.className,
        style: this.mergeAndPrefix(styles.root, props.style),
        zDepth: props.zDepth },
      navIconElement,
      titleElement,
      rightIconElements,
      props.children
    );
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
  }

});

module.exports = AppBar;