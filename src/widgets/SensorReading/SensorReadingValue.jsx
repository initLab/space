import PropTypes from 'prop-types';

const SensorReadingValue = ({
    isCurrent,
    formattedTimestamp,
    formattedValue,
}) => (<span className={'huge' + (isCurrent ? '' : ' text-decoration-line-through')}
    title={formattedTimestamp}>{formattedValue}</span>);

SensorReadingValue.propTypes = {
    isCurrent: PropTypes.bool.isRequired,
    formattedTimestamp: PropTypes.string.isRequired,
    formattedValue: PropTypes.string.isRequired,
};

export default SensorReadingValue;
