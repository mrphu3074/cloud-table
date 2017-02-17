import React from 'react';
import {CloudTable} from '../dist'
import _ from 'lodash';

const styles = {
  main: {
    margin: 15,
    maxWidth: 600,
    lineHeight: 1.4,
    fontFamily: '"Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif',
  },

  logo: {
    width: 200,
  },

  link: {
    color: '#1474f3',
    textDecoration: 'none',
    borderBottom: '1px solid #1474f3',
    paddingBottom: 2,
  },

  code: {
    fontSize: 15,
    fontWeight: 600,
    padding: "2px 5px",
    border: "1px solid #eae9e9",
    borderRadius: 4,
    backgroundColor: '#f3f2f2',
    color: '#3a3a3a',
  },
};

const rows = _.range(0, 100).map(r => ({
  id: r,
  value: r
}))
const columns = _.range(0, 50).map(r => ({
  label: 'Header ' + r,
  key: 'value'
}))

export default class Welcome extends React.Component {
  showApp(e) {
    e.preventDefault();
    if(this.props.showApp) this.props.showApp();
  }

  render() {
    return (
      <div>
        <CloudTable 
          height={400}
          columns={[
            {header: 'Header 1', key: 'value'},
            {header: 'Header 2'},
            {header: 'Header 3'},
            {header: 'Header 4'},
            {header: 'Header 5'},
            {header: 'Header 6'},
            {header: 'Header 7'},
            {header: 'Header 8'},
            {header: 'Header 9'},
            {header: 'Header 10'},
            {header: 'Header 11'},
            {header: 'Header 12'},
            {header: 'Header 13'},
            {header: 'Header 14'},
            {header: 'Header 15'},
            {header: 'Header 16'},
            {header: 'Header 17'},
            {header: 'Header 18'},
            {header: 'Header 19'},
            {header: 'Header 20'},
            {header: 'Header 21'},
          ]}
          rows={rows}
        />
      </div>
    );
  }
}
