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
    navIcon: React.PropTypes.element,
    filterIcon: React.PropTypes.element,
    moreIcon: React.PropTypes.element,
    actionIcons: React.PropTypes.array,
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
        display: 'inline',
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
    let navIconElement;
    let filterIconElement;
    let rightIconElements;
    let rightIcons = [];
    let styles = this.getStyles();
    let title = props.title;
    let iconRightStyle = this.mergeAndPrefix(styles.iconButton.style, {
      marginRight: -16,
      marginLeft: 'auto',
    }, props.iconStyleRight);
    let titleElement;

    if (props.navIcon) {
      let navIcon = props.navIcon;

      if (navIcon.type.displayName === 'IconButton') {
        navIcon = React.cloneElement(navIcon, {
          iconStyle: this.mergeAndPrefix(styles.iconButton.iconStyle, navIcon.props.iconStyle),
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
        title = <h1 style={this.mergeAndPrefix(styles.title)}>{title}</h1>;
      }
    }

    // Filter Icon
    if (props.filterIcon) {
      let filterIcon = props.filterIcon;

      if (filterIcon.type.displayName === 'IconButton' || filterIcon.type.displayName === 'IconMenu') {
        filterIcon = React.cloneElement(filterIcon, {
          iconStyle: this.mergeAndPrefix(styles.iconButton.iconStyle, filterIcon.props.iconStyle),
        });
      }

      filterIconElement = (
        <div style={this.mergeAndPrefix({ display: 'inline-block', verticalAlign: 'sub' })}>
          {filterIcon}
        </div>
      );
    }

    // Builded title (text and filter icon)
    titleElement = (
      <div style={this.mergeAndPrefix(styles.mainElement)}>
        {title}
        {filterIconElement}
      </div>
    );

    // Action Icons
    if (props.actionIcons) {
      let actionIcons = props.actionIcons;

      actionIcons = actionIcons.map(function(icon) {
        if (icon.type.displayName === 'IconButton') {
          icon = React.cloneElement(icon, {
            iconStyle: this.mergeAndPrefix(styles.iconButton.iconStyle, icon.props.iconStyle),
          });
        }
        else if (icon.type.displayName === 'FlatButton') {
          icon = React.cloneElement(icon, {
            style: this.mergeAndPrefix(styles.flatButton, icon.props.style),
          });
        }
        return icon;
      }.bind(this));

      rightIcons = rightIcons.concat(actionIcons);
    }

    // More Icon
    if (props.moreIcon) {
      let moreIcon = props.moreIcon;

      if (moreIcon.type.displayName === 'IconButton' || moreIcon.type.displayName === 'IconMenu') {
        moreIcon = React.cloneElement(moreIcon, {
          iconStyle: this.mergeAndPrefix(styles.iconButton.iconStyle, moreIcon.props.iconStyle),
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
        rounded={false}
        className={props.className}
        style={this.mergeAndPrefix(styles.root, props.style)}
        zDepth={props.zDepth}>
          {navIconElement}
          {titleElement}
          {rightIconElements}
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
