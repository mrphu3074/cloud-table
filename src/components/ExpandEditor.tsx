import * as React from 'react';
var Modal = require('boron/ScaleModal');

var shallowCompare = require('react-addons-shallow-compare');

interface ExpandEditorProps {
  show?: boolean,
  content?: any,
  onChange?: Function,
  onDismiss?: Function,
}

export class ExpandEditor extends React.Component<ExpandEditorProps, any> {
  private modal: any;

  static defaultProps = {
    show: false,
    content: null,
    onChange: () => null,
    onDismiss: () => null,
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show != this.props.show) {
      if (nextProps.show) {
        this.modal.show();
      } else {
        this.modal.hide();
      }
    }
  }

  onDismiss = () => {
    this.props.onDismiss();
  }

  render() {
    const { content } = this.props;
    return (
      <Modal
        ref={_ref => this.modal = _ref}
        closeOnClick={true}
        keyboard={true}
        onHide={this.onDismiss}
        {...styles}
      >
        {content}
      </Modal>
    );
  }
}

const styles = {
  modalStyle: {
    width: 'auto',
    outline: 'none'
  },
  contentStyle: {
    outline: 'none'
  },
  backdropStyle: {
    backgroundColor: 'rgba(0,0,0,0.3)'
  }
};