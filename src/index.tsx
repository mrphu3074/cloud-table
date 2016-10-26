import * as React from 'react';
import * as _ from 'lodash';
import { List, Grid, ScrollSync, InfiniteLoader } from 'react-virtualized';
import * as mousetrap from 'mousetrap';
import { scrollbarSize } from './helpers';
import * as Rnd from 'react-rnd';
import {AutoNumberCell} from './components/AutoNumberCell';
import { ExpandEditor } from './components/ExpandEditor';
import { ExpandButton } from './components/ExpandButton';
import * as styles from './styles';

import { CSSProperties, CloudTableProps } from './interfaces';

export class CloudTable extends React.Component<CloudTableProps, any> {
  static defaultProps = {
    width: 800,
    height: 400,
    rows: [],
    rowCount: 0,
    columns: [],
    onLoadMore: args => null,
  }
  private containerId: string = 'cloud-table-' + Date.now();
  private container: any;
  private header: any;


  constructor(props) {
    super(props);

    this.state = {
      currentRowIndex: null,
      currentColumnIndex: null,
      editing: false,
      loading: false,
      showExpandEditor: false,
      expandEditorContent: null
    };

    // Setup fetch data in the first time
    this.props.onLoadMore({ start: 0, end: 19 });
    // Setup interactive events
    this.setupKeyboardShortcuts();
  }

  getRealContentEl = () => {
    var container = document.getElementById('cloud-table-main-content');
    var contentEl = container.getElementsByClassName('ReactVirtualized__Grid__innerScrollContainer')
    if (!contentEl.length) return null;
    return contentEl[0];
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickDocument);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickDocument);
  }

  onClickDocument = (event: MouseEvent) => {
    var contentEl = this.getRealContentEl();
    if (!contentEl) return;
    const {currentRowIndex, currentColumnIndex} = this.state;
    if (!currentRowIndex === null || currentColumnIndex === null) return;
    const node: any = event.target;
    const isClickedOutside = !contentEl.contains(node);
    if (isClickedOutside) {
      this.setState({
        currentRowIndex: null,
        currentColumnIndex: null,
        editing: false
      });
    }
  }

  setupKeyboardShortcuts() {
    mousetrap.bind('up', () => this.navigateCell('UP'));
    mousetrap.bind('down', () => this.navigateCell('DOWN'));
    mousetrap.bind('left', () => this.navigateCell('LEFT'));
    mousetrap.bind('right', () => this.navigateCell('RIGHT'));
    mousetrap.bind('enter', () => this.setEditMode(true));
    mousetrap.bind('esc', () => this.setEditMode(false));
  }
  /**
   * navigate handler
   */
  navigateCell = (which: string) => {
    const {currentRowIndex, currentColumnIndex} = this.state;
    let nextRowIndex = currentRowIndex;
    let nextColumnIndex = currentColumnIndex;
    if (currentRowIndex === null || currentColumnIndex === null) {
      nextRowIndex = nextColumnIndex = 0;
    } else {
      switch (which) {
        case 'UP':
          nextRowIndex -= 1;
          if (nextRowIndex < 0) nextRowIndex = 0;
          break;
        case 'DOWN':
          nextRowIndex += 1;
          if (nextRowIndex > this.props.rows.length) {
            nextRowIndex = this.props.rows.length;
          }
          break;
        case 'LEFT':
          nextColumnIndex -= 1;
          if (nextColumnIndex < 0) nextColumnIndex = 0;
          break;
        case 'RIGHT':
          nextColumnIndex += 1;
          if (nextColumnIndex > this.props.columns.length - 1) {
            nextColumnIndex = this.props.columns.length - 1;
          }
          break;
      }
    }

    this.setState({
      currentRowIndex: nextRowIndex,
      currentColumnIndex: nextColumnIndex
    });
  }
  /**
   * Toggle edit mode
   */
  setEditMode = (value: boolean) => {
    if (!value) {
      this.setState({
        editing: value,
        currentRowIndex: null,
        currentColumnIndex: null,
      });
    } else {
      this.setState({ editing: value });
    }
  }

  /**
   * Check row was loaded
   * 
   * @param args {Object}
   * @param args.index {Number} is row index
   * @return {Boolean}
   */
  isRowLoaded = ({index: rowIndex}) => {
    if (rowIndex > this.props.rows.length - 1) return false;
    return !!this.props.rows[rowIndex];
  }

  onCellClick = (key, rowIndex, columnIndex, style) => {
    if (this.state.currentRowIndex != rowIndex || this.state.currentColumnIndex != columnIndex) {
      var row = this.props.rows[rowIndex];
      var column = this.props.columns[columnIndex];
      console.log(column)
      var expandEditor = null;
      if (column.expandEditor) {
        const Expand = column.expandEditor;
        const value = row[column.key];
        expandEditor = (
          <Expand
            value={value}
            onChange={value => {
              column.onChange({ rowIndex, columnIndex, row, column, value });
            } }
            />
        );
      }
      this.setState({
        currentRowIndex: rowIndex,
        currentColumnIndex: columnIndex,
        editing: false,
        expandEditorContent: expandEditor
      });
    }
  }

  onCellDoubleClick = (key, rowIndex, columnIndex, style) => {
    this.setState({
      currentRowIndex: rowIndex,
      currentColumnIndex: columnIndex,
      editing: true,
    });
  }

  showExpandEditor = () => {
    this.setState({
      currentRowIndex: null,
      currentColumnIndex: null,
      showExpandEditor: true
    });
  }
  /**
   * Fetch more data
   * 
   * @param args {Object}
   * @param args.startIndex {Number} fetch from index
   * @param args.stopIndex {Number} fetch to index
   * 
   * @return {Void}
   */
  onLoadMoreRows = ({startIndex: start, stopIndex: end}) => {
    this.props.onLoadMore({ start, end });
  }
  /**
   * Get column width
   * @param args {Object}
   * @param args.index {Number} is column index
   * @return {Number} column width
   */
  getColumnWidth = ({index: columnIndex}) => {
    const column = this.props.columns[columnIndex];
    return column ? column.width : 50;
  }

  /**
   * Render fake list item
   */
  renderFakeListItem = ({key, index, style}) => {
    return (
      <div key={key} style={style}>
      </div>
    )
  }
  /**
   * Header renderer
   */
  renderHeader = ({key, isScrolling, columnIndex, style}) => {
    style = _.assign(style, styles.cellHeader);
    const column = this.props.columns[columnIndex];
    if (column && column.type == "AutoInc") {
      style = _.assign(style, { textAlign: 'center' });
    }

    return (
      <Rnd 
        key={key} 
        initial={{
          width: style.width,
          height: style.height, 
        }}
        style={style}
        maxHeight={32}
        moveAxis={'none'}
        isResizable={{
          top: false,
          right: true,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
        onResizeStart={() => {
          console.log('on start')
        }}
        onResizeStop={() => {
          console.log('on stop')
        }}
        onResize={(direction, styleSize, clientSize, delta, newPos) => {
          console.log('on resize');
          this.props.onColumnResize(columnIndex, styleSize.width);
          this.header.recomputeGridSize({columnIndex});
          this.container.recomputeGridSize({columnIndex});
        }}
      >
        <span>{column ? column.label : ''}</span>
      </Rnd>
    );

    // return (
    //   <div key={key} style={style}>
    //     {column ? column.label : 'Header'}
    //     <span
    //       draggable={true}
    //       onDragOver={e => e.preventDefault()}
    //       onDrag={(e) => {
    //         console.log('drag', e);
    //       }}
    //       onDragStart={(e) => {
    //         console.log('start', e);
    //       }}
    //       onDragEnd={(e) => {
    //         console.log('end', e);
    //       }}
    //       onDrop={e => {
    //         console.log('drop', e);
    //       }}
    //     >||</span>
    //   </div>
    // );
  }

  /**
   * Render cell
   */
  renderCell = ({key, columnIndex, rowIndex, isScrolling, style}) => {
    let readOnly = true;
    let editing = false;
    let hasExpandEditor = false;
    let isAutoNumberCell = false;
    let current = false;
    let inlineEditor = null;
    let fullEditorTrigger = null;
    let events = {};
    const {currentRowIndex, currentColumnIndex} = this.state;
    let cellStyle = {};

    if (currentRowIndex == rowIndex) {
      cellStyle = Object.assign(JSON.parse(JSON.stringify(style)), styles.currentRow);
      if (currentColumnIndex == columnIndex) {
        cellStyle = Object.assign(JSON.parse(JSON.stringify(style)), styles.currentCell);
        current = true;

        if (this.state.editing) {
          editing = true;
        }
      }
    } else {
      cellStyle = Object.assign(JSON.parse(JSON.stringify(style)), styles.cell);
    }

    let row = this.props.rows[rowIndex];
    let column = this.props.columns[columnIndex];
    let value = '';
    let content = null;
    let selectable = column['selectable'] === false ? false : true;
    if (row && column) {
      var View: any = column.view || null;
      var Editor: any = column.inlineEditor || null;
      if (Editor) {
        readOnly = false;
      }
      if (column.expandEditor) {
        hasExpandEditor = true;
      }

      if (column.type === "AutoInc") {
        isAutoNumberCell = true;
        View = AutoNumberCell;
        value = rowIndex + 1;
        cellStyle = Object.assign({ textAlign: 'center' }, cellStyle);
      } else {
        value = row[column.key];
      }

      if (editing && Editor) {
        const onChange = column.onChange || function () { };
        content = (
          <Editor
            item={row}
            value={value}
            width={column.width}
            onChange={(value) => onChange({ rowIndex, columnIndex, row, column, value })}
            onNextRow={() => {
              this.setState({
                showExpandEditor: false,
                expandEditorContent: null,
                editing: false,
                currentRowIndex: this.state.currentRowIndex + 1
              });
            }}
            onNextColumn={() => {
              this.setState({
                showExpandEditor: false,
                expandEditorContent: null,
                editing: false,
                currentColumnIndex: this.state.currentColumnIndex + 1,
              });
            }}
            onDismiss={() => {
              this.setState({
                showExpandEditor: false,
                expandEditorContent: null,
                editing: false
              });
            }}
          />
        );
      } else {
        content = <View value={value} item={row} option={column.viewOption || {}} />;
      }
    }
    if (selectable) {
      if (!readOnly) {
        events = {
          onClick: (e: MouseEvent) => {
            e.preventDefault();
            this.onCellClick(key, rowIndex, columnIndex, _.assign({}, style));
          },
          onDoubleClick: (e: MouseEvent) => {
            e.preventDefault();
            this.onCellDoubleClick(key, rowIndex, columnIndex, _.assign({}, style));
          }
        };
      } else {
        events = {
          onClick: () => this.onCellClick(key, rowIndex, columnIndex, _.assign({}, style))
        };
      }
    }

    return (
      <div
        key={key}
        className="cloud-table-cell"
        style={cellStyle}
        {...events}
        >
        {fullEditorTrigger}
        {content}
        {current && editing && hasExpandEditor && (
          <ExpandButton
            onClick={this.showExpandEditor}
            />
        )}
      </div>
    );
  }

  /**
   * Main renderer
   */
  render() {
    const {
      width, height,
      rows, columns
    } = this.props;
    return (
      <div id={this.containerId}>
        <style dangerouslySetInnerHTML={{
          __html: `
            #${this.containerId} * {
              box-sizing: inherit;
            }
          `
        }}>
        </style>

        <ScrollSync>
          {({ clientHeight, clientWidth, onScroll, scrollHeight, scrollLeft, scrollTop, scrollWidth }) => (
            <div style={{ overflow: 'auto' }}>
              <div style={{ float: 'left', width: 0 }}>
                <InfiniteLoader
                  isRowLoaded={this.isRowLoaded}
                  loadMoreRows={this.onLoadMoreRows}
                  rowCount={this.props.rowCount}
                  minimumBatchSize={20}
                  threshold={1}
                  >
                  {({ onRowsRendered, registerChild }) => (
                    <List
                      rowCount={this.props.rows.length}
                      className="list-checkbox"
                      height={this.props.height}
                      onRowsRendered={onRowsRendered}
                      ref={registerChild}
                      rowHeight={32}
                      rowRenderer={this.renderFakeListItem}
                      width={1}
                      onScroll={onScroll}
                      scrollTop={scrollTop}
                      style={{ overflow: 'hidden' }}
                      />

                  )}
                </InfiniteLoader>
              </div>
              <div style={{ float: 'left' }}>
                <Grid
                  ref={_ref => this.header = _ref}
                  className="grid-header"
                  cellRenderer={this.renderHeader}
                  width={width - 1 - scrollbarSize()}
                  height={32}
                  rowHeight={32}
                  columnWidth={this.getColumnWidth}
                  rowCount={1}
                  columnCount={this.props.columns.length}
                  scrollLeft={scrollLeft}
                  style={{ outline: 'none', background: '#f1f1f1', overflow: 'hidden' }}
                  />
                <Grid
                  id="cloud-table-main-content"
                  ref={_ref => this.container = _ref}
                  width={width - 1}
                  height={height - 32}
                  columnCount={columns.length}
                  columnWidth={this.getColumnWidth}
                  overscanColumnCount={0}
                  overscanRowCount={0}
                  cellRenderer={this.renderCell}
                  rowCount={rows.length}
                  rowHeight={32}
                  onScroll={onScroll}
                  scrollTop={scrollTop}
                  style={{ outline: 'none', background: '#f1f1f1' }}
                  />
              </div>

              <ExpandEditor
                show={this.state.showExpandEditor}
                content={this.state.expandEditorContent}
                onDismiss={() => {
                  this.setState({
                    showExpandEditor: false,
                    expandEditorContent: null
                  });
                } }
                />
            </div>
          )}
        </ScrollSync>
      </div>
    );
  }
}