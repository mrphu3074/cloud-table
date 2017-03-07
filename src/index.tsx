import * as React from 'react';
/**
 * Import utils
 */
import * as _ from 'lodash';
import { scrollbarSize } from './helpers';

/**
 * Import views
 */
import { List, InfiniteLoader, AutoSizer, MultiGrid } from 'react-virtualized';
import * as Rnd from 'react-rnd';
/**
 * Import custom views
 */
import * as styles from './styles';
import CloudCell from './components/CloudCell';
import enhance from './enhance';
import 'react-virtualized/styles.css';

class CloudTable extends React.Component<any, any> {
  private cloudTable;
  private _dom;
  getColumnWidth = () => {
    return 150;
  }
  renderCell = ({ style, rowIndex, columnIndex, key }) => {
    const { selectedRowIndex, selectedColIndex } = this.props.cloudTable;
    let isActive: boolean = selectedRowIndex === rowIndex && selectedColIndex === columnIndex;
    return (
      <CloudCell
        key={key}
        style={style}
        rowIndex={rowIndex}
        columnIndex={columnIndex}
        isActive={isActive}
        onSelect={this.onSelectCell}
      />
    );
  }
  onSelectCell = (rowIndex, columnIndex) => {
    this.props.handleSelectCell(rowIndex, columnIndex);
    this.cloudTable.recomputeGridSize();
  }
  componentDidMount() {
    this.props.bindKeyboardEvents(() => {
      setTimeout(() => {
        this.cloudTable.recomputeGridSize();
      }, 200)
    });
    window.addEventListener('click', (e) => {
      if (!this._dom.contains(e['target'])) {
        this.props.handleDeselectCell();
      }
    })
  }
  render() {
    const { height, rowCount, columnCount, cloudTable } = this.props;
    return (
      <AutoSizer disableHeight>
        {({ width }) => (
          <div ref={_dom => this._dom = _dom}>
            <MultiGrid
              ref={_ref => this.cloudTable = _ref}
              fixedRowCount={1}
              fixedColumnCount={2}
              scrollToRow={cloudTable.selectedRowIndex}
              scrollToColumn={cloudTable.selectedColIndex}
              cellRenderer={this.renderCell}
              columnWidth={75}
              columnCount={columnCount}
              height={height}
              rowHeight={40}
              rowCount={rowCount}
              style={styles.multiGrid}
              styleBottomLeftGrid={styles.gridBottomLeft}
              styleTopLeftGrid={styles.gridTopLeft}
              styleTopRightGrid={styles.gridTopRight}
              width={width}
            />
          </div>
        )}
      </AutoSizer>
    );
  }
}

const CloudTableSmart = enhance(CloudTable);
/**
 * EXPORT
 */
export {
  CloudTableSmart as CloudTable
};