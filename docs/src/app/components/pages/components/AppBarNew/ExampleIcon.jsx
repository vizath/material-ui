import React from 'react';
import AppBarNew from 'material-ui/lib/app-bar-new';
import IconButton from 'material-ui/lib/icon-button';
import NavigationExpandMore from 'material-ui/lib/svg-icons/navigation/expand-more';

const AppBarExampleIcon = () => (
  <AppBarNew
    title="Title"
    moreIcon={<IconButton key="more"><NavigationExpandMore /></IconButton>}
  />
);

export default AppBarExampleIcon;
