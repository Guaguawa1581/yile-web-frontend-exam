/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';

function FilterBar(props) {
  const [formValue, setFormValue] = useState({});
  const [eduList, setEduList] = useState([]);
  const [salaryList, setSalaryList] = useState([]);
  const { FilterFn, EduList, SalaryList } = props;
  useEffect(() => {
    if (EduList) {
      setEduList(EduList);
    }
  }, [EduList]);
  useEffect(() => {
    if (SalaryList) {
      setSalaryList(SalaryList);
    }
  }, [SalaryList]);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const submitFilters = () => {
    if (FilterFn) {
      FilterFn(formValue);
    }
  };

  return (
    <div id="filterBar">
      <div>
        <FormControl size="medium" variant="outlined" fullWidth>
          <TextField
            name="company_name"
            className="comName"
            label="公司名稱"
            InputLabelProps={{ shrink: true }}
            placeholder="請輸入公司名稱"
            InputProps={{
              className: 'comInput',
            }}
            onChange={handleChange}
          />
        </FormControl>
      </div>
      <div>
        <FormControl
          size="medium"
          variant="outlined"
          fullWidth
          onChange={handleChange}
        >
          <InputLabel>教育程度</InputLabel>
          <Select
            label="教育程度"
            defaultValue={0}
            name="education_level"
            onChange={handleChange}
          >
            <MenuItem value={0}>不限</MenuItem>
            {eduList.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl
          size="medium"
          variant="outlined"
          fullWidth
          onChange={handleChange}
        >
          <InputLabel>薪水範圍</InputLabel>
          <Select
            label="薪水範圍"
            defaultValue={0}
            name="salary_level"
            onChange={handleChange}
          >
            <MenuItem value={0}>不限</MenuItem>
            {salaryList.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <Button
          variant="contained"
          className="formBtn"
          fullWidth
          onClick={submitFilters}
        >
          條件搜尋
        </Button>
      </div>
    </div>
  );
}

FilterBar.propTypes = {
  FilterFn: PropTypes.func.isRequired,
  EduList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
  SalaryList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
};
FilterBar.defaultProps = {
  EduList: [],
  SalaryList: [],
};
export default FilterBar;
