import React, { useState, useEffect, useCallback } from 'react';
import './styles/allStyles.scss';
import axios from 'axios';
import { Grid, Pagination } from '@mui/material';
import HeadBanner from './components/HeadBanner';
import FilterBar from './components/FilterBar';
import BoxCard from './components/BoxCard';
import CardModal from './components/CardModal';

function App() {
  const IsMobileInit = document.documentElement.clientWidth < 600;
  const [isMobile, setIsMobile] = useState(IsMobileInit);
  const [isLoading, setIsLoading] = useState(false);
  const [jobList, setJobList] = useState([]);
  const [eduList, setEduList] = useState([]);
  const [salaryList, setSalaryList] = useState([]);
  const [nowPage, setNowPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [perPage, setPerPage] = useState(IsMobileInit ? 4 : 6);
  const [nowFilter, setNowFilter] = useState({
    company_name: '',
    education_level: '',
    salary_level: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nowJobID, setNowJobID] = useState('');

  const getEduList = async () => {
    try {
      const res = await axios.get('/api/v1/educationLevelList');
      setEduList(res.data);
    } catch (e) {
      console.error('get edu list Error', e);
    }
  };
  const getSalaryList = async () => {
    try {
      const res = await axios.get('/api/v1/salaryLevelList');
      setSalaryList(res.data);
    } catch (e) {
      console.error('get salary list error', e);
    }
  };
  const getJobList = useCallback(async () => {
    try {
      const finalParams = {
        pre_page: perPage,
        page: nowPage,
        ...nowFilter,
      };
      setIsLoading(true);
      const res = await axios.get('/api/v1/jobs', { params: finalParams });
      setTotalCount(res.data.total);
      setJobList(res.data.data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.error('get job list error', e);
      setIsLoading(false);
    }
  }, [perPage, nowPage, nowFilter]);
  const updatePerPage = () => {
    const width = document.documentElement.clientWidth;
    if (width < 600) {
      setIsMobile(true);
      setPerPage(4);
    } else {
      setIsMobile(false);
      setPerPage(6);
    }
  };
  const pageHandler = (e, page) => {
    setNowPage(page);
  };
  const changeFilter = (params) => {
    setNowPage(1);
    setNowFilter(params);
  };
  const openModal = (id) => {
    setNowJobID(id);
    setIsModalOpen(true);
  };

  useEffect(() => {
    updatePerPage();
    window.addEventListener('resize', updatePerPage);
    return () => {
      window.removeEventListener('resize', updatePerPage);
    };
  }, []);
  useEffect(() => {
    getEduList();
    getSalaryList();
  }, []);
  useEffect(() => {
    getJobList();
  }, [nowPage, nowFilter, getJobList]);

  useEffect(() => {
    const total = Math.ceil(totalCount / perPage);
    setTotalPage(total);
  }, [totalCount, perPage]);

  return (
    <div className="main">
      <div className="portalView">
        <HeadBanner />
        <div className="container">
          <div className="topWork">
            <div className="title">適合前端工程師的好工作</div>
            {!isMobile && (
              <div className="filterBox">
                <FilterBar
                  FilterFn={changeFilter}
                  EduList={eduList}
                  SalaryList={salaryList}
                />
              </div>
            )}

            {jobList.length === 0 ? (
              <div className="emptyBlock">
                <div>無資料</div>
              </div>
            ) : (
              <div className="jobBox">
                <Grid container spacing={2}>
                  {jobList.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                      <BoxCard
                        CardInfo={item}
                        EduList={eduList}
                        SalaryList={salaryList}
                        IsLoading={isLoading}
                        OpenModalFn={openModal}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Pagination
                  count={totalPage}
                  page={nowPage}
                  onChange={pageHandler}
                  style={{
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <CardModal Open={isModalOpen} SetOpen={setIsModalOpen} JobID={nowJobID} />
    </div>
  );
}

export default App;
