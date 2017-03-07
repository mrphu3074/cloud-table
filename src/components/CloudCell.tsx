import * as React from 'react';
import { compose, pure, onlyUpdateForKeys, withProps, withPropsOnChange } from 'recompose';
import { cell as cellStyle, cellActive } from '../styles';
interface CloudCellProps {
  style?: any;
  rowIndex: number;
  columnIndex: number;
  onSelect: Function;
  isActive: boolean;
}
const combineStyle = (isActive, style) => {
  let newStyle = Object.assign({}, style, cellStyle);
  if (isActive) {
    newStyle = Object.assign({}, style, cellActive, {
      // width: style.width - 1,
      // height: style.height - 1
    });
  };
  return newStyle;
}
const CloudCell: React.StatelessComponent<CloudCellProps> = ({
  style, isActive, rowIndex, columnIndex, onSelect
}) => (
    <div style={combineStyle(isActive, style)}
      onClick={onSelect.bind(this, rowIndex, columnIndex)} >
      {rowIndex},{columnIndex}
    </div>
  );
const enhance = compose<any, CloudCellProps>(
  onlyUpdateForKeys(['isActive']),
  pure,
)
export default enhance(CloudCell);