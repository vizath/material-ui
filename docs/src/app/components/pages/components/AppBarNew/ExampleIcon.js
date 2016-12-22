import React from 'react';
import AppBarNew from 'material-ui/app-bar-new';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';

const AppBarExampleIcon = () => (
  <AppBarNew
    title="Title"
    moreIcon={<IconButton key="more"><NavigationExpandMore /></IconButton>}
  />
);

export default AppBarExampleIcon;
