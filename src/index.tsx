import * as React from 'react';
import * as _ from 'lodash';
import { List, Grid, ScrollSync, InfiniteLoader, AutoSizer, MultiGrid } from 'react-virtualized';
import * as mousetrap from 'mousetrap';
import { scrollbarSize } from './helpers';
import * as Rnd from 'react-rnd';

const CELL_STYLE = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: '1px solid #eee',
  borderRight: '1px solid #eee',
};
const STYLE = {
  border: '1px solid #ddd',
  overflow: 'hidden'
}
const STYLE_BOTTOM_LEFT_GRID = {
  borderRight: '2px solid #aaa',
  backgroundColor: '#f7f7f7'
}
const STYLE_TOP_LEFT_GRID = {
  borderBottom: '2px solid #aaa',
  borderRight: '2px solid #aaa',
  fontWeight: 'bold'
}
const STYLE_TOP_RIGHT_GRID = {
  borderBottom: '2px solid #aaa',
  fontWeight: 'bold'
}

class CloudCell extends React.Component<any, any> {
  render() {
    let {style, rowIndex, columnIndex, currentColumn, currentRow, onSelectCell} = this.props;
    if (currentRow === rowIndex && currentColumn === columnIndex) {
      style = {
        ...style,
        backgroundColor: 'red'
      }
    }
    return (
      <div style={style} onClick={() => onSelectCell(rowIndex, columnIndex)}>{rowIndex},{columnIndex}</div>
    );
  }
}

class CloudTable extends React.Component<any, any> {
  private cloudTable;
  state = {
    currentRow: 0,
    currentColumn: 0
  }
  getColumnWidth = () => {
    return 150;
  }
  renderHeaderCell = (cellProps) => {
    return <CloudCell {...cellProps} {...this.state} onSelectCell={this.onSelectCell} />;
  }
  renderRowCell = ({style, rowIndex, columnIndex, key}) => {

    return (
      <div style={{ ...style, ...CELL_STYLE }} key={key}>
        Row {rowIndex}|{style.top}
      </div>
    );
  }
  onSelectCell = (rowIndex, columnIndex) => {
    this.setState({
      currentRow: rowIndex,
      currentColumn: columnIndex
    }, () => this.cloudTable.recomputeGridSize())
  }
  componentDidMount() {
    this.setupKeyboardShortcuts();
  }
  setupKeyboardShortcuts = () => {
    mousetrap.bind('up', () => this.navigateCell('UP'));
    mousetrap.bind('down', () => this.navigateCell('DOWN'));
    mousetrap.bind('left', () => this.navigateCell('LEFT'));
    mousetrap.bind('right', () => this.navigateCell('RIGHT'));
    // mousetrap.bind('enter', () => this.setEditMode(true));
    // mousetrap.bind('esc', () => this.setEditMode(false));
  }
  navigateCell = (which) => {
    let {currentRow, currentColumn} = this.state;
    const MAX_ROW = 100;
    const MAX_COL = 50;
    switch (which) {
      case 'UP':
        currentRow -= 1;
        if (currentRow < 0) currentRow = 0;
        break;
      case 'DOWN':
        currentRow += 1;
        if (currentRow > MAX_ROW) {
          currentRow = MAX_ROW;
        }
        break;
      case 'LEFT':
        currentColumn -= 1;
        if (currentColumn < 0) currentColumn = 0;
        break;
      case 'RIGHT':
        currentColumn += 1;
        if (currentColumn > MAX_COL - 1) {
          currentColumn = MAX_COL - 1;
        }
        break;
    }
    this.setState({
      currentColumn: currentColumn,
      currentRow: currentRow
    }, () => {
      this.cloudTable.recomputeGridSize()
    })
  }
  render() {
    const {rows, columns, height} = this.props;
    return (
      <AutoSizer disableHeight>
        {({width}) => (
          <ScrollSync>
            {({ clientHeight, clientWidth, onScroll, scrollHeight, scrollLeft, scrollTop, scrollWidth }) => (
              <MultiGrid
                ref={_ref => {
                  this.cloudTable = _ref;
                }}
                scrollToRow={this.state.currentRow}
                scrollToColumn={this.state.currentColumn}
                fixedRowCount={1}
                fixedColumnCount={1}
                cellRenderer={this.renderHeaderCell}
                columnWidth={75}
                columnCount={50}
                height={300}
                rowHeight={40}
                rowCount={100}
                style={STYLE}
                styleBottomLeftGrid={STYLE_BOTTOM_LEFT_GRID}
                styleTopLeftGrid={STYLE_TOP_LEFT_GRID}
                styleTopRightGrid={STYLE_TOP_RIGHT_GRID}
                width={width}
              />
            )}
          </ScrollSync>
        )}
      </AutoSizer>
    );
  }
}

/**
 * EXPORT
 */
export { CloudTable };