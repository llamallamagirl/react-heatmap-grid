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
    const newVal = (selected === this.getSelected()) ? null : selected;
    this.setState({ selected: newVal });
  }

  render () {
    const { xLabels, yLabels, data, objects, xLabelWidth, background, height, yLabelTextAlign, unit, handleClick } = this.props;
    const flatArray = data.reduce((i, o) => [...o, ...i], []);
    const max = Math.max(...flatArray);
    const min = Math.min(...flatArray);
    const selected = this.isSelected(`${xi}-${yi}`);

    return (
      <div>
        {yLabels.map((y, yi) => (
          <div key={y} style={{display: 'flex'}}>
            <FixedBox width={xLabelWidth}>
              <div style={{textAlign: yLabelTextAlign, paddingRight: '5px', paddingTop:`${height/3.7}px`}}>{y}</div>
            </FixedBox>
            {xLabels.map((x, xi) => (
              <div
                title={`${data[yi][xi]}` + ' ' + unit}
                onClick={() => this.setSelected(`${xi}-${yi}`)}
                key={`${x}_${y}`}
                style={{
                  background,
                  margin: '1px 1px 0 0',
                  height: selected ? height + 100 : height,
                  flex: 1,
                  opacity: (data[yi][xi] - min) / (max - min) || 0,
                }}
              >
                &nbsp;
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
  objects: PropTypes.arrayOf(PropTypes.object).isRequired,
  background: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  xLabelWidth: PropTypes.number.isRequired,
  yLabelTextAlign: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};

DataGrid.defaultProps = {
  handleClick: null,
}
