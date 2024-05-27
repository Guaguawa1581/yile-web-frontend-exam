import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import PersonIcon from '../images/personIcon.svg';
import BookIcon from '../images/bookIcon.svg';
import SalaryIcon from '../images/salaryIcon.svg';

function BoxCard(props) {
  const { CardInfo, EduList, SalaryList, IsLoading, OpenModalFn } = props;
  const [data, setData] = useState({
    id: '',
    companyName: '',
    salaryId: 0,
    jobTitle: '',
    preview: '',
    educationId: 0,
  });
  const [eduName, setEduName] = useState('');
  const [salaryName, setSalaryName] = useState('');
  useEffect(() => {
    if (CardInfo) {
      setData(CardInfo);
    }
  }, [CardInfo]);
  useEffect(() => {
    if (Array.isArray(EduList)) {
      const match = EduList.find((item) => {
        if (item.id && data.educationId) {
          return item.id === data.educationId.toString();
        }
        return false;
      });
      setEduName(match ? match.label : '');
    }
  }, [EduList, data]);
  useEffect(() => {
    if (Array.isArray(SalaryList)) {
      const match = SalaryList.find((item) => {
        if (item.id && data.salaryId) {
          return item.id === data.salaryId.toString();
        }
        return false;
      });
      setSalaryName(match ? match.label : '');
    }
  }, [SalaryList, data]);
  const openModal = () => {
    if (OpenModalFn) {
      OpenModalFn(data.id);
    }
  };
  return (
    <div className={`boxCard ${IsLoading ? 'flipping' : ''}`}>
      <h2 className="cardTitle">{data.companyName}</h2>
      <div>
        <p className="cardInfo">
          <span>
            <img src={PersonIcon} alt="" />
          </span>
          <span>{data.jobTitle}</span>
        </p>
        <p className="cardInfo">
          <span>
            <img src={BookIcon} alt="" />
          </span>
          <span>{eduName}</span>
        </p>
        <p className="cardInfo">
          <span>
            <img src={SalaryIcon} alt="" />
          </span>
          <span>{salaryName}</span>
        </p>
      </div>
      <div className="cardContent">
        <p>{data.preview}</p>
      </div>
      <div className="detailBtn">
        <button type='button' onClick={openModal}>查看細節</button>
      </div>
    </div>
  );
}

BoxCard.propTypes = {
  CardInfo: PropTypes.shape({
    id: PropTypes.string,
    companyName: PropTypes.string,
    salaryId: PropTypes.number,
    jobTitle: PropTypes.string,
    preview: PropTypes.string,
    educationId: PropTypes.number,
  }).isRequired,
  EduList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
  SalaryList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
  IsLoading: PropTypes.bool.isRequired,
  OpenModalFn: PropTypes.func.isRequired,
};

export default BoxCard;
