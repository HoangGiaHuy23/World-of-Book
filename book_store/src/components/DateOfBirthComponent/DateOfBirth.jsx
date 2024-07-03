import React, { useState, useEffect } from 'react';
import { Select } from 'antd';

const { Option } = Select;

const generateOptions = (count, start = 1) => {
  const options = [];
  for (let i = start; i <= count; i++) {
    options.push(
      <Option key={i} value={i}>
        {i}
      </Option>
    );
  }
  return options;
};

const getDaysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

const DateOfBirth = ({ Day = '', Month = '', Year = '', onChange }) => {
  const [day, setDay] = useState(Day || undefined);
  const [month, setMonth] = useState(Month || undefined);
  const [year, setYear] = useState(Year || undefined);
  const [daysInMonth, setDaysInMonth] = useState(31);

  useEffect(() => {
    onChange && onChange(day, month, year)
  }, [day, month, year]);

  useEffect(() => {
    if (Day !== '' && Month !== '' && Year !== '') {
      setDay(Day)
      setMonth(Month)
      setYear(Year)
    }
  }, [Day, Month, Year]);

  useEffect(() => {
    if (month && year) {
      setDaysInMonth(getDaysInMonth(month, year));
    }
  }, [month, year]);

  const handleChangeDay = (value) => setDay(value);
  const handleChangeMonth = (value) => setMonth(value);
  const handleChangeYear = (value) => setYear(value);

  return (
    <div style={{ display: 'flex', gap: '10px', marginTop: '0px' }}>
        <Select
            placeholder="Ngày"
            value={day}
            onChange={handleChangeDay}
            style={{ width: 100 }}
        >
            {generateOptions(daysInMonth)}
        </Select>
        <Select
            placeholder="Tháng"
            value={month}
            onChange={handleChangeMonth}
            style={{ width: 100 }}
        >
            {generateOptions(12)}
        </Select>
        <Select
            placeholder="Năm"
            value={year}
            onChange={handleChangeYear}
            style={{ width: 100 }}
        >
            {generateOptions(new Date().getFullYear(), 1900)}
        </Select>
    </div>
  );
};

export default DateOfBirth;