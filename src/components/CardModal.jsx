/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import axios from 'axios';

function CardModal({ Open, SetOpen, JobID }) {
  const [isLoading, setIsLoading] = useState(false);
  const [dataInfo, setDataInfo] = useState({
    companyName: '',
    companyPhoto: [],
    jobTitle: '',
    description: '',
  });


  const getJobInfo = async (id) => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/api/v1/jobs/${id}`);
      setDataInfo(res.data);
      setIsLoading(false);
    } catch (e) {
      console.error('get job info error', e);
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (SetOpen) {
      SetOpen(false);
    }
  };
  useEffect(() => {
    if (JobID) {
      getJobInfo(JobID);
    }
  }, [JobID]);

  return (
    <Dialog
      open={Open}
      className="cardDialog"
      PaperProps={{ style: { maxWidth: '750px', width: '100%' } }}
      fullWidth
    >
      <DialogTitle className="dialogTitle">詳細資訊</DialogTitle>
      <DialogContent className="dialogContent">
        {isLoading ? (
          <div className="loadingBox">
            <div className="loadingSpinner" />
          </div>
        ) : (
          <>
            <h2 className="contentTitle">
              <span>{dataInfo.companyName}</span>
              <span>{dataInfo.jobTitle}</span>
            </h2>
            <div className="swiperContainer" style={{ height: '170px' }}>
              <Swiper
                modules={[Pagination, Autoplay]}
                slidesPerView="auto"
                spaceBetween={8}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                className="cardSwiper"
              >
                {dataInfo.companyPhoto.map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <SwiperSlide key={index}>
                    <img src={item} alt="" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div
              className="contentBox"
              dangerouslySetInnerHTML={{ __html: dataInfo.description }}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button className="dialogBtn" onClick={handleClose}>
          關閉
        </Button>
      </DialogActions>
    </Dialog>
  );
}
CardModal.propTypes = {
  Open: PropTypes.bool.isRequired,
  SetOpen: PropTypes.func.isRequired,
  JobID: PropTypes.string.isRequired,
};
export default CardModal;
