import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './AnalysisBox.module.scss';

const cx = classNames.bind(styles);

const AnalysisBox = ({ title, number }) => {
    return (
        <div className={cx('box')}>
            <div className={cx('title')}>{title}</div>
            <div className={cx('number')}>{number}</div>
        </div>
    );
};

AnalysisBox.propTypes = {
    title: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
};

export default AnalysisBox;
