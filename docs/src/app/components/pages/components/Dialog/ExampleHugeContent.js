import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class DialogExampleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Close"
        secondary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Huge Content Dialog" onTouchTap={this.handleOpen} />
        <Dialog
          title="Dialog With Huge Content"
          actions={actions}
          open={this.state.open}
          overflowInBody
          autoDetectWindowHeight={ false }
        >
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem error ex ipsa, maiores necessitatibus praesentium rem tempora unde! Aperiam esse in, itaque laudantium mollitia nam obcaecati odio officia quidem repellat.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores dignissimos dolores, explicabo fugit illum, libero maxime modi, sunt tempore vitae voluptatem. A aperiam eveniet illo labore laudantium optio sapiente.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae distinctio doloribus, et eveniet exercitationem ipsum minus modi nobis omnis quae quod repellat sint sunt voluptas voluptatem? Aliquam dolor enim explicabo?</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur deserunt eaque ex exercitationem fugiat molestiae, neque repudiandae tempora voluptatibus! Aliquam culpa cupiditate, dolores iusto magnam nisi repellat voluptate voluptates voluptatum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis culpa doloremque eaque ex libero magnam nulla quod vel. Ab debitis dicta earum illum incidunt iusto nemo nesciunt qui quod quos?</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores aut cum deserunt distinctio dolorem illo illum laudantium necessitatibus nobis non odit perspiciatis placeat qui quis, recusandae, tempore tenetur ut, vitae!</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At consectetur ea est expedita fugiat libero minus optio tempora unde vero. Architecto dignissimos facere iusto mollitia officia placeat rem repudiandae vero.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam architecto asperiores aspernatur assumenda eius eligendi eveniet ex expedita fugit id impedit nemo quam reiciendis repellendus sit, vero. Numquam, ullam.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aut autem corporis dolore enim eveniet excepturi ipsa itaque iusto labore molestiae, nihil quaerat sunt tempora tenetur. Accusamus amet dolores temporibus!</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A culpa distinctio dolor doloremque ea est, exercitationem impedit ipsa libero molestias officia perferendis perspiciatis possimus quidem quos repudiandae ullam ut voluptatem!</p>
        </Dialog>
      </div>
    );
  }
}
