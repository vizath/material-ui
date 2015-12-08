const React = require('react');
const StylePropable = require('./mixins/style-propable');
const Transitions = require('./styles/transitions');
const DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
const ColorManipulator = require('./utils/color-manipulator');
const ThemeManager = require('./styles/theme-manager');
const EnhancedButton = require('./enhanced-button');
const ListDivider = require('./lists/list-divider');
const Colors = require('./styles/colors');

const TableItem = React.createClass({
  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    children: React.PropTypes.node,
    innerDivStyle: React.PropTypes.object,
    onKeyboardFocus: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onNestedListToggle: React.PropTypes.func,
    onTouchStart: React.PropTypes.func,
    onTouchTap: React.PropTypes.func,
    style: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      onKeyboardFocus: () => {},
      onMouseEnter: () => {},
      onMouseLeave: () => {},
      onTouchStart: () => {},
    };
  },

  getInitialState() {
    return {
      hovered: false,
      isKeyboardFocused: false,
      touch: false,
    };
  },

  render() {
    const {
      children,
      onTouchTap,
      style,
      innerDivStyle,
      ...other,
    } = this.props;

    const textColor = this.context.muiTheme.rawTheme.palette.textColor;
    const hoverColor = ColorManipulator.fade(textColor, 0.1);
    const styles = {
      root: {
        backgroundColor: (this.state.isKeyboardFocused || this.state.hovered) ? hoverColor : null,
        color: textColor,
        display: 'block',
        fontSize: 16,
        lineHeight: '16px',
        position: 'relative',
        transition: Transitions.easeOut(),
      },

      //This inner div is needed so that ripples will span the entire container
      innerDiv: {
        padding: 16,
        position: 'relative',
      },
    };

    return (
      <EnhancedButton
        {...other}
        linkButton={true}
        containerElement="div"
        onKeyboardFocus={this._handleKeyboardFocus}
        onMouseLeave={this._handleMouseLeave}
        onMouseEnter={this._handleMouseEnter}
        onTouchStart={this._handleTouchStart}
        onTouchTap={onTouchTap}
        ref="enhancedButton"
        style={this.mergeStyles(styles.root, style)}>
        <div style={this.prepareStyles(styles.innerDiv, innerDivStyle)}>
          {children}
        </div>
      </EnhancedButton>
    );
  },

  _handleKeyboardFocus(e, isKeyboardFocused) {
    this.setState({isKeyboardFocused: isKeyboardFocused});
    this.props.onKeyboardFocus(e, isKeyboardFocused);
  },

  _handleMouseEnter(e) {
    if (!this.state.touch) this.setState({hovered: true});
    this.props.onMouseEnter(e);
  },

  _handleMouseLeave(e) {
    this.setState({hovered: false});
    this.props.onMouseLeave(e);
  },

  _handleNestedListToggle(e) {
    e.stopPropagation();
    this.setState({open : !this.state.open});
    this.props.onNestedListToggle(this);
  },

  _handleTouchStart(e) {
    this.setState({touch: true});
    this.props.onTouchStart(e);
  },
});

const TableCell = React.createClass({
  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    children: React.PropTypes.node,
    style: React.PropTypes.object,
    width: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
  },

  render() {
    const mergedStyles = this.mergeAndPrefix(this.props.style, {
      width: this.props.width || '100%',
    });

    return (
      <div style={mergedStyles}>
        {this.props.children}
      </div>
    );
  },
});

const TableList = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: this.context.muiTheme,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.context.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  propTypes: {
    data: React.PropTypes.array,
    headers: React.PropTypes.array,
    onHeaderClick: React.PropTypes.func,
    onItemClick: React.PropTypes.func,
    style: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      data: [],
      headers: [],
    };
  },

  render() {
    const {
      data,
      headers,
      style,
      ...other,
    } = this.props;

    const styles = {
      root: {
      },
      cell: {
        width: '100%',
      },
    };
    const rowStyle = {
      display: 'flex',
      justifyContent: 'space-around',
      flexFlow: 'row nowrap',
      alignItems: 'center',
    };

    const rows = data.map(function(d, i) {
      const cells = headers.map(function(header, j) {
        return (
          <TableCell width={header.size} key={'header' + i + j}>
            <div style={header.style}>
              {d[header.key]}
            </div>
          </TableCell>
        );
      }.bind(this));

      return (
        <TableItem key={'data' + i} onTouchTap={this._onItemClick.bind(this, d)}>
          <div style={rowStyle}>
            {cells}
          </div>
        </TableItem>
      );
    }.bind(this));

    // props or theme ?
    const grey = ColorManipulator.fade(Colors.darkBlack, 0.4);

    const rowHeaders = headers.map(function(header, i) {
      const hover = header.text ?
        <TableItem
          onTouchTap={this._onHeaderClick.bind(this, header)}
          style={{color:grey}}>
          {header.text}
        </TableItem> :
        <div style={{width:header.size}} />;
      return (
        <TableCell width={header.size} key={'header' + i}>
          {hover}
        </TableCell>
      );
    }.bind(this));

    return (
      <div {...other} style={this.prepareStyles(styles.root, style)}>
        <div style={{paddingLeft:16, paddingRight:16}}>
          <div style={rowStyle}>
            {rowHeaders}
          </div>
        </div>
        <ListDivider />
        {rows}
      </div>
    );
  },

  _onHeaderClick(header) {
    this.props.onHeaderClick(header);
  },

  _onItemClick(item) {
    this.props.onItemClick(item);
  },

});

module.exports = TableList;
