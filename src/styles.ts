import { CSSProperties } from './interfaces';

export const multiGrid: CSSProperties = {
  border: '1px solid #ddd',
  overflow: 'hidden'
}
export const gridBottomLeft: CSSProperties = {
  borderRight: '1px solid #00b9e6',
  backgroundColor: '#f7f7f7'
}
export const gridTopLeft: CSSProperties = {
  borderBottom: '1px solid #00b9e6',
  borderRight: '1px solid #00b9e6',
  fontWeight: 'bold'
};
export const gridTopRight: CSSProperties = {
  borderBottom: '1px solid #00b9e6',
  fontWeight: 'bold'
};
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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: '1px solid #eee',
  borderLeft: '1px solid #eee',
  borderTop: 'none',
  borderRight: 'none',
  cursor: 'default',
  outline: 'none',
};
export const cellActive: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: '1px solid #00b9e6',
  borderRight: '1px solid #00b9e6',
  borderTop: '1px solid #00b9e6',
  borderLeft: '1px solid #00b9e6',
  zIndex: 100000,
  cursor: 'default',
  outline: 'none',
  marginTop: -1,

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