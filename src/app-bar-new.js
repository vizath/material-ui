import React from 'react';
import Paper from './Paper';

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
    muiTheme: React.PropTypes.object.isRequired,
  },

  getDefaultProps() {
    return {
      title: '',
      zDepth: 1,
    };
  },

  getStyles() {
    const spacing = this.context.muiTheme.rawTheme.spacing;
    const themeVariables = this.context.muiTheme.appBar;
    const iconButtonSize = this.context.muiTheme.button.iconButtonSize;
    const flatButtonSize = 36;
    const styles = {
      root: {
        zIndex: 5,
        width: '100%',
        display: 'flex',
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
        fontWeight: this.context.muiTheme.appBar.titleFontWeight,
        color: themeVariables.textColor,
        lineHeight: themeVariables.height + 'px',
      },

      // http://jsfiddle.net/iamanubhavsaini/zWtBu/
      mainElement: {
        flex: '0 1 auto',
        minWidth: 0,
      },
      filterIcon: {
        marginTop: (themeVariables.height - iconButtonSize) / 2,
        flex: '1 0 auto',
      },
      rightContainer: {
        marginRight: -16,
        marginLeft: 0,
        flex: '0 0 auto',
      },

      iconButton: {
        style: {
          marginTop: (themeVariables.height - iconButtonSize) / 2,
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

    const {prepareStyles} = this.context.muiTheme;
    let styles = this.getStyles();
    let iconRightContainerStyle = prepareStyles(Object.assign({}, styles.iconButton.style, styles.rightContainer, iconStyleRight));

    if (navIcon) {
      if (navIcon.type.muiName === 'IconButton') {
        navIcon = React.cloneElement(navIcon, {
          iconStyle: Object.assign({}, styles.iconButton.iconStyle, navIcon.props.iconStyle),
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
        title = <h1 style={prepareStyles(Object.assign({}, styles.title, titleStyle))}>{title}</h1>;
      }
    }

    // Filter Icon
    if (filterIcon) {
      if (filterIcon.type.muiName === 'IconButton' || filterIcon.type.muiName === 'IconMenu') {
        filterIcon = React.cloneElement(filterIcon, {
          iconStyle: Object.assign({}, styles.iconButton.iconStyle, filterIcon.props.iconStyle),
        });
      }
    }
    filterIconElement = (
      <div style={prepareStyles(styles.filterIcon)}>
        {filterIcon}
      </div>
    );

    // Builded title (text and filter icon)
    titleElement = (
      <div style={prepareStyles(styles.mainElement)}>
        {title}
      </div>
    );

    // Action Icons
    if (actionIcons) {
      actionIcons = actionIcons.map(function(icon) {
        if (icon.type.muiName === 'IconButton') {
          icon = React.cloneElement(icon, {
            iconStyle: Object.assign({}, styles.iconButton.iconStyle, icon.props.iconStyle),
          });
        } else if (icon.type.muiName === 'FlatButton') {
          icon = React.cloneElement(icon, {
            style: Object.assign({}, styles.flatButton, icon.props.style),
          });
        }
        return icon;
      }.bind(this));

      rightIcons = rightIcons.concat(actionIcons);
    }

    // More Icon
    if (moreIcon) {
      if (moreIcon.type.muiName === 'IconButton' || moreIcon.type.muiName === 'IconMenu') {
        moreIcon = React.cloneElement(moreIcon, {
          iconStyle: Object.assign({}, styles.iconButton.iconStyle, moreIcon.props.iconStyle),
        });
      }

      rightIcons.push(moreIcon);
    }

    // Right-most Icon container
    if (rightIcons.length > 0) {
      rightIconElements = (
        <div style={iconRightContainerStyle}>
          {rightIcons}
        </div>
      );
    }

    return (
      <Paper
        {...other}
        rounded={false}
        className={className}
        style={Object.assign({}, styles.root, style)}
        zDepth={zDepth}
      >
          {navIconElement}
          {titleElement}
          {filterIconElement}
          {rightIconElements}
          {children}
      </Paper>
    );
  },
});

module.exports = AppBar;
