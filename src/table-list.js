import React from 'react';
import Transitions from './styles/transitions';
import Divider from './Divider';
import EnhancedButton from './internal/EnhancedButton';
import {fade} from './utils/colorManipulator';

import {
darkBlack,
} from './styles/colors';

const TableItem = React.createClass({
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

  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired,
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
    this.setState({open: !this.state.open});
    this.props.onNestedListToggle(this);
  },

  _handleTouchStart(e) {
    this.setState({touch: true});
    this.props.onTouchStart(e);
  },

  render() {
    const {
      children,
      onTouchTap,
      style,
      innerDivStyle,
      ...other,
    } = this.props;
    const {prepareStyles} = this.context.muiTheme;

    const textColor = this.context.muiTheme.rawTheme.palette.textColor;
    const hoverColor = fade(textColor, 0.1);
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
        containerElement="div"
        onKeyboardFocus={this._handleKeyboardFocus}
        onMouseLeave={this._handleMouseLeave}
        onMouseEnter={this._handleMouseEnter}
        onTouchStart={this._handleTouchStart}
        onTouchTap={onTouchTap}
        ref="enhancedButton"
        style={Object.assign({}, styles.root, style)}
      >
        <div style={prepareStyles(Object.assign({}, styles.innerDiv, innerDivStyle))}>
          {children}
        </div>
      </EnhancedButton>
    );
  },
});

const TableCell = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    style: React.PropTypes.object,
    width: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
  },

  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired,
  },

  render() {
    const {prepareStyles} = this.context.muiTheme;
    const mergedStyles = Object.assign({}, {
      flex: this.props.width ? null : 1,
    }, this.props.style);

    return (
      <div style={prepareStyles(mergedStyles)}>
        {this.props.children}
      </div>
    );
  },
});

const TableList = React.createClass({

  propTypes: {
    data: React.PropTypes.array,
    headers: React.PropTypes.array,
    onHeaderClick: React.PropTypes.func,
    onItemClick: React.PropTypes.func,
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired,
  },

  getDefaultProps() {
    return {
      data: [],
      headers: [],
    };
  },

  _onHeaderClick(header) {
    if (this.props.onHeaderClick) {
      this.props.onHeaderClick(header);
    }
  },

  _onItemClick(item) {
    if (this.props.onItemClick) {
      this.props.onItemClick(item);
    }
  },

  render() {
    const {
      data,
      headers,
      style,
      onHeaderClick,
      onItemClick,
      ...other,
    } = this.props;
    const {prepareStyles} = this.context.muiTheme;

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
    const grey = fade(darkBlack, 0.4);

    const rowHeaders = headers.map(function(header, i) {
      const hover = header.text ?
        <TableItem
          onTouchTap={this._onHeaderClick.bind(this, header)}
          style={{color: grey}}
        >
          {header.text}
        </TableItem> :
        <div style={{width: header.size}} />;
      return (
        <TableCell width={header.size} key={'header' + i}>
          {hover}
        </TableCell>
      );
    }.bind(this));

    return (
      <div {...other} style={prepareStyles(Object.assign({}, styles.root, style))}>
        <div style={{paddingLeft: 16, paddingRight: 16}}>
          <div style={rowStyle}>
            {rowHeaders}
          </div>
        </div>
        <Divider />
        {rows}
      </div>
    );
  },
});

module.exports = TableList;
