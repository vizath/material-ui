const React = require('react');
const StylePropable = require('./mixins/style-propable');
const Typography = require('./styles/typography');
const DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
const ThemeManager = require('./styles/theme-manager');
const Paper = require('./paper');


const AppBar = React.createClass({

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
    zDepth: React.PropTypes.number,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

  getDefaultProps() {
    return {
      title: '',
      zDepth: 1,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
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
        display: '-webkit-box; display: -moz-box; display: -ms-flexbox; display: -webkit-flex; display: flex',
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
        flex: 1,
        overflow: 'hidden',
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

  render() {
    let {
      title,
      titleStyle,
      className,
      style,
      zDepth,
      children,
      navIcon,
      filterIcon,
      actionIcons,
      moreIcon,
      iconStyleRight,
      ...other,
    } = this.props;
    let titleElement;
    let navIconElement;
    let filterIconElement;
    let rightIcons = [];
    let rightIconElements;

    let styles = this.getStyles();
    let iconRightStyle = this.prepareStyles(styles.iconButton.style, {
      marginRight: -16,
      marginLeft: 'auto',
    }, iconStyleRight);

    if (navIcon) {
      if (navIcon.type.displayName === 'IconButton') {
        navIcon = React.cloneElement(navIcon, {
          iconStyle: this.mergeStyles(styles.iconButton.iconStyle, navIcon.props.iconStyle),
        });
      }

      navIconElement = (
        <div style={styles.iconButton.style}>
          {navIcon}
        </div>
      );
    }

    // Title Wrapper
    if (title) {
      // If the title is a string, wrap in an h1 tag.
      // If not, just use it as a node.
      if (typeof title === 'string' || title instanceof String) {
        title = <h1 style={this.prepareStyles(styles.title, titleStyle)}>{title}</h1>;
      }
    }

    // Filter Icon
    if (filterIcon) {
      if (filterIcon.type.displayName === 'IconButton' || filterIcon.type.displayName === 'IconMenu') {
        filterIcon = React.cloneElement(filterIcon, {
          iconStyle: this.mergeStyles(styles.iconButton.iconStyle, filterIcon.props.iconStyle),
        });
      }

      filterIconElement = (
        <div style={this.prepareStyles({display: 'inline-block', verticalAlign: 'sub'})}>
          {filterIcon}
        </div>
      );
    }

    // Builded title (text and filter icon)
    titleElement = (
      <div style={this.prepareStyles(styles.mainElement)}>
        {title}
        {filterIconElement}
      </div>
    );

    // Action Icons
    if (actionIcons) {
      actionIcons = actionIcons.map(function(icon) {
        if (icon.type.displayName === 'IconButton') {
          icon = React.cloneElement(icon, {
            iconStyle: this.mergeStyles(styles.iconButton.iconStyle, icon.props.iconStyle),
          });
        } else if (icon.type.displayName === 'FlatButton') {
          icon = React.cloneElement(icon, {
            style: this.mergeStyles(styles.flatButton, icon.props.style),
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
          iconStyle: this.mergeStyles(styles.iconButton.iconStyle, moreIcon.props.iconStyle),
        });
      }

      rightIcons.push(moreIcon);
    }

    // Right-most Icon container
    if (rightIcons.length > 0) {
      rightIconElements = (
        <div style={iconRightStyle}>
          {rightIcons}
        </div>
      );
    }

    return (
      <Paper
        {...other}
        rounded={false}
        className={className}
        style={this.mergeStyles(styles.root, style)}
        zDepth={zDepth}
      >
          {navIconElement}
          {titleElement}
          {rightIconElements}
          {children}
      </Paper>
    );
  },
});

module.exports = AppBar;
