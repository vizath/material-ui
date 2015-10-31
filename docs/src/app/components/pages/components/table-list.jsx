let React = require('react');
let { Avatar, IconButton, Styles, TableList, Utils } = require('material-ui');

let ComponentDoc = require('../../component-doc');
let Code = require('progress-code');
let CodeExample = require('../../code-example/code-example');

let IconMenu = require('menus/icon-menu');
let MenuItem = require('menus/menu-item');
let MoreVertIcon = require('svg-icons/navigation/more-vert');

let ProgressPage = React.createClass({

  render() {

    let componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'mode',
            type: 'one of: determinate, indeterminate',
            header: 'default: indeterminate',
            desc: 'The mode of show your progress, indeterminate for when there is no value for progress. ',
          },
          {
            name: 'value',
            type: 'number',
            header: 'default: 0',
            desc: 'The value of progress, only works in determinate mode. ',
          },
          {
            name: 'max',
            type: 'number',
            header: 'default: 100',
            desc: 'The max value of progress, only works in determinate mode. ',
          },
          {
            name: 'min',
            type: 'number',
            header: 'default: 0',
            desc: 'The min value of progress, only works in determinate mode. ',
          },
          {
            name: 'size',
            type: 'number',
            header: 'default: 1',
            desc: 'The size of the progress.',
          },
        ],
      },
    ];

    const menu = (
      <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Send feedback" />
        <MenuItem primaryText="Settings" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    );
// "images/raquelromanp-128.jpg",
// "images/chexee-128.jpg",
// "images/jsa-128.jpg",
// "images/chexee-128.jpg",
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

    const grey = Utils.ColorManipulator.fade(Styles.Colors.darkBlack, 0.4);
    const headers = [
      { text: '', key: 'picture', size: 40 },
      { text: 'Name', key: 'name', style:{ paddingLeft:16 } },
      { text: 'Group', key: 'group', size:'50%', style:{ paddingLeft:16, color:grey } },
      { text: 'Last Modified', key: 'date', size:'50%', style:{ paddingLeft:16, color:grey } },
      { text: '', key: 'options', size:48+16, style:{ paddingLeft:16 } },
    ];

    return (
      <ComponentDoc
        name="TableList"
        componentInfo={componentInfo}>
        <CodeExample code={Code}>

          <TableList
            data={data}
            headers={headers}
            onHeaderClick={this._onHeaderClick}
            />

        </CodeExample>
      </ComponentDoc>
    );
  },

  _onHeaderClick(header) {
    console.log('Header clicked:', header);
  },

});

module.exports = ProgressPage;
