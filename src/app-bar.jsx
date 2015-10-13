const React = require('react');
const StylePropable = require('./mixins/style-propable');
const Typography = require('./styles/typography');
const IconButton = require('./icon-button');
const NavigationMenu = require('./svg-icons/navigation/menu');
const DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
const ThemeManager = require('./styles/theme-manager');
const Paper = require('./paper');


const AppBar = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  propTypes: {
    onLeftIconButtonTouchTap: React.PropTypes.func,
    onRightIconButtonTouchTap: React.PropTypes.func,
    style: React.PropTypes.object,
    iconElementLeft: React.PropTypes.element,
    iconElementRight: React.PropTypes.element,
    iconStyleRight: React.PropTypes.object,
    title: React.PropTypes.node,
    zDepth: React.PropTypes.number,
  },

  getInitialState () {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getDefaultProps() {
    return {
      title: '',
      zDepth: 1,
    };
  },

  getStyles() {
    let spacing = this.state.muiTheme.rawTheme.spacing;
    let themeVariables = this.state.muiTheme.appBar;
    let iconButtonSize = this.state.muiTheme.button.iconButtonSize;
    let flatButtonSize = 36;
    let styles = {
      root: {
        zIndex: 5,
        width: '100%',
        display: '-webkit-box; display: -webkit-flex; display: flex',
        minHeight: themeVariables.height,
        backgroundColor: themeVariables.color,
        paddingLeft: spacing.desktopGutter,
        paddingRight: spacing.desktopGutter,
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
      },
      mainElement: {
        boxFlex: 1,
        flex: '1',
      },
      iconButton: {
        style: {
          marginTop: (themeVariables.height - iconButtonSize) / 2,
          marginRight: 8,
          marginLeft: -16,
        },
        iconStyle: {
          fill: themeVariables.textColor,
          color: themeVariables.textColor,
        },
      },
      flatButton: {
        color: themeVariables.textColor,
        backgroundColor: 'transparent',
        marginTop: (iconButtonSize - flatButtonSize) / 2 + 2,
      },
    };

    return styles;
  },

  render() {
    let props = this.props;
    let menuElementLeft;
    let menuElementRight;
    let styles = this.getStyles();
    let title = props.title;
    let iconRightStyle = this.mergeAndPrefix(styles.iconButton.style, {
      marginRight: -16,
      marginLeft: 'auto',
    }, props.iconStyleRight);
    let titleElement;

    if (title) {
      // If the title is a string, wrap in an h1 tag.
      // If not, just use it as a node.
      titleElement = typeof title === 'string' || title instanceof String ?
        <h1 style={this.mergeAndPrefix(styles.title, styles.mainElement)}>{title}</h1> :
        <div style={this.mergeAndPrefix(styles.mainElement)}>{title}</div>;
    }

    if (props.iconElementLeft) {
      let iconElementLeft = props.iconElementLeft;

      switch (iconElementLeft.type.displayName) {
        case 'IconButton':
          iconElementLeft = React.cloneElement(iconElementLeft, {
            iconStyle: this.mergeAndPrefix(styles.iconButton.iconStyle),
          });
          break;
      }

      menuElementLeft = (
        <div style={styles.iconButton.style}>
          {iconElementLeft}
        </div>
      );
    }

    if (props.iconElementRight) {
      let iconElementRight = props.iconElementRight;

      switch (iconElementRight.type.displayName) {
        case 'IconMenu':
        case 'IconButton':
          iconElementRight = React.cloneElement(iconElementRight, {
            iconStyle: this.mergeAndPrefix(styles.iconButton.iconStyle),
          });
          break;

        case 'FlatButton':
          iconElementRight = React.cloneElement(iconElementRight, {
            style: this.mergeStyles(styles.flatButton, iconElementRight.props.style),
          });
          break;
      }

      menuElementRight = (
        <div style={iconRightStyle}>
          {iconElementRight}
        </div>
      );
    }

    return (
      <Paper
        rounded={false}
        className={props.className}
        style={this.mergeAndPrefix(styles.root, props.style)}
        zDepth={props.zDepth}>
          {menuElementLeft}
          {titleElement}
          {menuElementRight}
          {props.children}
      </Paper>
    );
  },

  _onLeftIconButtonTouchTap(event) {
    if (this.props.onLeftIconButtonTouchTap) {
      this.props.onLeftIconButtonTouchTap(event);
    }
  },

  _onRightIconButtonTouchTap(event) {
    if (this.props.onRightIconButtonTouchTap) {
      this.props.onRightIconButtonTouchTap(event);
    }
  },

});

module.exports = AppBar;
