import { compose, pure, mapProps, withProps, withHandlers, withReducer, lifecycle, onlyUpdateForKeys } from 'recompose';
import * as mousetrap from 'mousetrap';

const cloudTableInitialState = {
  selectedRowIndex: undefined,
  selectedColIndex: undefined,
};
const cloudTableReducer = (state = cloudTableInitialState, action) => {
  switch (action.type) {
    case 'CLOUD_TABLE_NAVIGATE_CELL':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
const enhance = compose(
  withProps(({rows, columns}) => {
    return {
      rowCount: rows.length, 
      columnCount: columns.length
    }
  }),
  withReducer('cloudTable', 'dispatch', cloudTableReducer, cloudTableInitialState),
  withHandlers({
    handleNavigateCell: ({ dispatch, rows, columns, cloudTable }) => (which, cb) => {
      const MAX_ROW = rows.length;
      const MAX_COL = columns.length;
      let { selectedRowIndex, selectedColIndex } = cloudTable;

      if (selectedRowIndex !== undefined && selectedColIndex !== undefined) {
        switch (which) {
          case 'UP':
            selectedRowIndex -= 1;
            if (selectedRowIndex < 1) selectedRowIndex = 1;
            break;
          case 'DOWN':
            selectedRowIndex += 1;
            if (selectedRowIndex > MAX_ROW) {
              selectedRowIndex = MAX_ROW;
            }
            break;
          case 'LEFT':
            selectedColIndex -= 1;
            if (selectedColIndex < 0) selectedColIndex = 0;
            break;
          case 'RIGHT':
            selectedColIndex += 1;
            if (selectedColIndex > MAX_COL - 1) {
              selectedColIndex = MAX_COL - 1;
            }
            break;
        }
        dispatch({
          type: 'CLOUD_TABLE_NAVIGATE_CELL',
          payload: { selectedRowIndex, selectedColIndex }
        });
        cb();
      }
    }
  }),
  withHandlers({
    bindKeyboardEvents: ({ handleNavigateCell }) => (cb) => {
      mousetrap.bind('up', () => handleNavigateCell('UP', cb));
      mousetrap.bind('down', () => handleNavigateCell('DOWN', cb));
      mousetrap.bind('left', () => handleNavigateCell('LEFT', cb));
      mousetrap.bind('right', () => handleNavigateCell('RIGHT', cb));
    },
    handleSelectCell: ({ dispatch }) => (selectedRowIndex, selectedColIndex) => {
      if(selectedRowIndex === 0) return;
      dispatch({
        type: 'CLOUD_TABLE_NAVIGATE_CELL',
        payload: { selectedRowIndex, selectedColIndex }
      });
    },
    handleDeselectCell: ({ dispatch }) => () => {
      dispatch({
        type: 'CLOUD_TABLE_NAVIGATE_CELL',
        payload: { selectedRowIndex: undefined, selectedColIndex: undefined }
      });
    }
  }),
  onlyUpdateForKeys(['cloudTable']),
  pure
);

export default enhance;