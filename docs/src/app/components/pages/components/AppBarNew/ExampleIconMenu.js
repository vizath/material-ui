import React from 'react';
import AppBarNew from 'material-ui/app-bar-new';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import NavigationArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';

const AppBarExampleIconMenu = () => (
  <AppBarNew
    title="A Vert Long Title"
    titleStyle={{color: 'black'}}
    navIcon={<IconButton><NavigationArrowBack /></IconButton>}
    filterIcon={
      <IconMenu iconButtonElement={
        <IconButton><NavigationArrowDropDown /></IconButton>
      }>
        <MenuItem primaryText="Inbox" />
        <MenuItem primaryText="Sent" />
        <MenuItem primaryText="Trash" />
      </IconMenu>
    }
    actionIcons={[
      <IconButton key="expand"><ActionSearch /></IconButton>,
      <IconButton key="close"><ActionFavorite /></IconButton>,
    ]}
    moreIcon={
      <IconMenu key="more" iconButtonElement={
        <IconButton><MoreVertIcon /></IconButton>
      }>
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    }
  />
);

export default AppBarExampleIconMenu;
