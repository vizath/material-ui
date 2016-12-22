import React from 'react';
import AppBarNew from 'material-ui/app-bar-new';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import FlatButton from 'material-ui/FlatButton';

function handleTouchTap() {
  alert('onTouchTap triggered on the title component');
}

const styles = {
  title: {
    cursor: 'pointer',
  },
};

const AppBarExampleIconButton = () => (
  <AppBarNew
    title="A Vert Long Title Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod"
    navIcon={<IconButton><NavigationMenu /></IconButton>}
    actionIcons={[<FlatButton key="button" label="Save" />]}
  />
);

export default AppBarExampleIconButton;
