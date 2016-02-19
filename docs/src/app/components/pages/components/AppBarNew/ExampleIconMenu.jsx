import React from 'react';
import AppBarNew from 'material-ui/lib/app-bar-new';
import IconButton from 'material-ui/lib/icon-button';
import NavigationArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back';
import NavigationArrowDropDown from 'material-ui/lib/svg-icons/navigation/arrow-drop-down';
import ActionSearch from 'material-ui/lib/svg-icons/action/search';
import ActionFavorite from 'material-ui/lib/svg-icons/action/favorite';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';

const AppBarExampleIconMenu = () => (
  <AppBarNew
    title="A Vert Long Title"
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
