import React, { Component } from 'react';
import PropTypes from 'prop-types';
import XLabels from './XLabels';
import DataGrid from './DataGrid';

export default class HeatMap extends Component {
  render() {
    const {xLabels, yLabels, data, descriptions, background, height, xLabelWidth, yLabelTextAlign, unit, handleClick} = this.props;

    return (
      <div>
        <XLabels labels={xLabels} width={xLabelWidth} />
        <DataGrid
          {...{xLabels, yLabels, data, descriptions, background, height, xLabelWidth, yLabelTextAlign, unit, handleClick}}
        />
      </div>
    );
  };
}

HeatMap.propTypes = {
  xLabels: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  yLabels: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
  descriptions: PropTypes.arrayOf(PropTypes.array),
  height: PropTypes.number,
  xLabelWidth: PropTypes.number,
  yLabelTextAlign: PropTypes.string,
  unit: PropTypes.string,
  handleClick: PropTypes.func,
};

HeatMap.defaultProps = {
  height: 30,
  xLabelWidth: 60,
  yLabelTextAlign: 'right',
  unit: '',
  handleClick: null,
  descriptions: null,
};
