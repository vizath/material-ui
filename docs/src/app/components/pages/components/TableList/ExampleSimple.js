import React from 'react';

import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import TableList from 'material-ui/table-list';
import {fade} from 'material-ui/utils/colorManipulator';

import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';

import {
darkBlack,
} from 'material-ui/styles/colors';

const propContainerStyle = {
  width: 200,
  overflow: 'hidden',
  margin: '20px auto 0 auto',
};

export default class TableExampleSimple extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      height: '300px',
    };
  }

  _stopMenuPropagation(e) {
    // Stop the event from bubbling up to the list-item
    e.stopPropagation();
  }

  render() {

    const menuHandlers = {
      onKeyboardFocus: this._stopMenuPropagation,
      onTouchTap: this._stopMenuPropagation,
      onMouseDown: this._stopMenuPropagation,
      onMouseUp: this._stopMenuPropagation,
    };

    const menu = (
      <IconMenu
        targetOrigin={{vertical:'top', horizontal:'right'}}
        anchorOrigin={{vertical:'center', horizontal:'middle'}}
        iconButtonElement={<IconButton {...menuHandlers}><MoreVertIcon /></IconButton>}>
        <MenuItem {...menuHandlers} primaryText="Refresh" />
        <MenuItem {...menuHandlers} primaryText="Send feedback" />
        <MenuItem {...menuHandlers} primaryText="Settings" />
        <MenuItem {...menuHandlers} primaryText="Help" />
        <MenuItem {...menuHandlers} primaryText="Sign out" />
      </IconMenu>
    );

    const data = [
      {
        picture: <Avatar src="images/ok-128.jpg" />,
        name: "Brendan Lim",
        group: 'Family',
        date: 'Jun 5, 2015',
        options: menu,
      },
      {
        picture: <Avatar src="images/kolage-128.jpg" />,
        name: "Eric Hoffman",
        group: 'Family',
        date: 'Jun 5, 2015',
        options: menu,
      },
      {
        picture: <Avatar src="images/uxceo-128.jpg" />,
        name: "Grace Ng",
        group: 'Work',
        date: 'Jun 5, 2015',
        options: menu,
      },
      {
        picture: <Avatar src="images/kerem-128.jpg" />,
        name: "Kerem Suer",
        group: 'Friends',
        date: 'Jun 5, 2015',
        options: menu,
      },
    ];

    const grey = fade(darkBlack, 0.4);

    // Add paddingTop and paddingBottom to center for IE
    const headers = [
      { text: '', key: 'picture', size: 40 },
      { text: 'Name', key: 'name', style:{ paddingTop:10, paddingBottom:10, paddingLeft:16 } },
      { text: 'Group', key: 'group', style:{ paddingTop:10, paddingBottom:10, paddingLeft:16, color:grey } },
      { text: 'Last Modified', key: 'date', style:{ paddingTop:10, paddingBottom:10, paddingLeft:16, color:grey } },
      { text: '', key: 'options', size:48+16, style:{ paddingLeft:16 } },
    ];

    return (
      <div>
        <TableList
          data={data}
          headers={headers}
          onHeaderClick={(header) => console.log('onHeaderClick', header)}
          onItemClick={(item) => console.log('onItemClick', item)}
        />
      </div>
    );
  }
}
