import * as React from 'react';

export class AutoNumberCell extends React.Component<any, any> {
  state = { isHover: false };
  onMouseEnter = (event: MouseEvent) => {
    this.setState({ isHover: true });
  }

  onMouseLeave = (event: MouseEvent) => {
    this.setState({ isHover: false });
  }

  onClickFullEditor = (event: MouseEvent) => {
    event.preventDefault();
    alert(11);
  }

  render() {
    const {value} = this.props;
    const {isHover} = this.state;
    let content = value;
    if (isHover) {
      content = <FullEditorButton onClick={this.onClickFullEditor} />;
    }
    return (
      <div style={styles.container} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        {content}
      </div>
    );
  }
}

export const FullEditorButton = ({onClick = () => null}) => (
  <span style={styles.button} onClick={onClick}>
    <svg width="12" version="1.1" xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 64 64" enableBackground="new 0 0 64 64">
      <g>
        <g fill="#1D1D1B">
          <path d="M25.255,35.905L4.016,57.145V46.59c0-1.108-0.897-2.008-2.008-2.008C0.898,44.582,0,45.481,0,46.59v15.402    c0,0.261,0.053,0.521,0.155,0.767c0.203,0.492,0.594,0.882,1.086,1.087C1.486,63.947,1.747,64,2.008,64h15.403    c1.109,0,2.008-0.898,2.008-2.008s-0.898-2.008-2.008-2.008H6.855l21.238-21.24c0.784-0.784,0.784-2.055,0-2.839    S26.039,35.121,25.255,35.905z" />
          <path d="m63.845,1.241c-0.203-0.491-0.594-0.882-1.086-1.087-0.245-0.101-0.506-0.154-0.767-0.154h-15.403c-1.109,0-2.008,0.898-2.008,2.008s0.898,2.008 2.008,2.008h10.556l-21.238,21.24c-0.784,0.784-0.784,2.055 0,2.839 0.392,0.392 0.906,0.589 1.42,0.589s1.027-0.197 1.419-0.589l21.238-21.24v10.555c0,1.108 0.897,2.008 2.008,2.008 1.109,0 2.008-0.899 2.008-2.008v-15.402c0-0.261-0.053-0.522-0.155-0.767z" />
        </g>
      </g>
    </svg>
  </span>
)

const styles = {
  container: {
    padding: '5px 3px',
    fontSize: 13,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  button: {
    boxShadow: '0 1px 3px 0 rgba(0,0,0,0.43),0 0 1px 0 rgba(0,0,0,0.43)',
    width: 24,
    height: 24,
    padding: '2px 6px',
    borderRadius: 24,
    cursor: 'pointer',
    background: '#fff'
  }
};