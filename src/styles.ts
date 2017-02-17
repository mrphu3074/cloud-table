import {CSSProperties} from './interfaces';
export const cellHeader: CSSProperties = {
  display: 'inline-block',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  cursor: 'default',
  color: '#333',
  height: 32,
  lineHeight: '22px',
  padding: '5px 4px 0',
  borderRight: '1px solid #e3e3ea',
  borderBottom: '2px solid #e3e3ea',
  background: '#fff',
  fontSize: 14,
  backgroundColor: '#fff',
};

export const cell: CSSProperties = {
  fontSize: 13,
  display: 'inline-block',
  height: 32,
  padding: 0,
  margin: 0,
  verticalAlign: 'top',
  color: '#333333',
  cursor: 'default',
  outline: 'none',
  borderTop: '1px solid transparent',
  borderRight: '1px solid #dde1e3',
  borderBottom: '1px solid #dde1e3',
  borderLeft: '1px solid transparent',
  backgroundColor: '#ffffff',
};

export const currentRow: CSSProperties = {
  fontSize: 13,
  display: 'inline-block',
  height: 32,
  margin: 0,
  verticalAlign: 'top',
  color: '#333333',
  cursor: 'default',
  outline: 'none',
  borderTop: '1px solid transparent',
  borderRight: '1px solid #dde1e3',
  borderBottom: '1px solid #dde1e3',
  borderLeft: '1px solid transparent',
  backgroundColor: '#f4f8fa',
  
}

export const currentCell: CSSProperties = {
  display: 'inline-block',
  height: 'auto',
  minHeight: 32,
  border: '1px solid #00b9e6',
  zIndex: 100000,
  fontSize: 13,
  padding: 0,
  margin: 0,
  verticalAlign: 'top',
  color: '#333333',
  cursor: 'default',
  outline: 'none',
  backgroundColor: '#f4f8fa'
}