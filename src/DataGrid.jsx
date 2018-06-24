import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FixedBox from './FixedBox';

export default class DataGrid extends Component {
  constructor(props) {
    super(props);
    this.isSelected = this.isSelected.bind(this);
    this.setSelected = this.setSelected.bind(this);
    this.state = { selected: null };
  }

  isSelected = (string) => {
    return string === this.state.selected;
  }

  setSelected = (selected) => {
    const newVal = this.isSelected(selected) ? null : selected;
    this.setState({ selected: newVal });
  }

  render () {
    const { xLabels, yLabels, data, descriptions, xLabelWidth, height, yLabelTextAlign, unit, handleClick } = this.props;
    const flatArray = data.reduce((i, o) => [...o, ...i], []);
    const max = Math.max(...flatArray);
    const min = Math.min(...flatArray);

    return (
      <div className="heat-data-grid">
        {yLabels.map((y, yi) => (
          <div key={y} style={{display: 'flex'}}>
            <FixedBox width={xLabelWidth}>
              <div className="heat-y-label" style={{textAlign: yLabelTextAlign, paddingRight: '5px', paddingTop:`${height/3.7}px`}}>{y}</div>
            </FixedBox>
            {xLabels.map((x, xi) => (
              <div
                title={`${data[yi][xi]}` + ' ' + unit}
                onClick={() => this.setSelected(`${xi}-${yi}`)}
                key={`${x}_${y}`}
                style={{
                  margin: '1px 1px 0 0',
                  height: this.isSelected(`${xi}-${yi}`) ? 'unset' : height,
                  flex: 1,
                  background: data[yi][xi] || '#f1f1f1',
                  color: '#fff',
                }}
              >
                { this.isSelected(`${xi}-${yi}`) && descriptions && descriptions[yi][xi] }
                { !this.isSelected(`${xi}-${yi}`) && <span>&nbsp;</span> }
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
};

DataGrid.propTypes = {
  xLabels: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  yLabels: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
  descriptions: PropTypes.arrayOf(PropTypes.array),
  height: PropTypes.number.isRequired,
  xLabelWidth: PropTypes.number.isRequired,
  yLabelTextAlign: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};

DataGrid.defaultProps = {
  handleClick: null,
  descriptions: null,
}
