import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function MyFunctionComponent() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('API_URL'); // ใส่ URL ของ API ที่คุณต้องการเรียก
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // ทำงานกับข้อมูลที่ได้รับ
      } catch (error) {
        console.error('Error fetching data:', error);
        // จัดการข้อผิดพลาด
      }
    };

    fetchData();
  }, []); // [] ทำให้ฟังก์ชันทำงานเพียงครั้งเดียวเมื่อ Component ถูกติดตั้ง

  return <div></div>;
}

function TopBar() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const navigate = useNavigate();

  const locations = [
    { value: 'เชียงใหม่', label: 'สนามบิน, เชียงใหม่' },
    { value: 'กรุงเทพ', label: 'มหาวิทยาลัยแม่โจ้, เชียงใหม่' },
  ];
  const [selectedLocation, setSelectedLocation] = useState(locations[0].value);

  const isLoggedIn = localStorage.getItem('isLoggedIn');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <div>
      <header className="top-bar-header">
        <h1 className="crental-title">CRental</h1>
        <div className="d-flex align-items-center">
          <span role="img" aria-label="user" className="me-2">👤</span>
          {isLoggedIn ? (
            <p className="login-text" style={{ color: 'black', cursor: 'pointer', margin: 0 }} onClick={handleLogout}>
              ออกจากระบบ
            </p>
          ) : (
            <p className="login-text" style={{ color: 'black', cursor: 'pointer', margin: 0 }} onClick={() => navigate('/loginPage')}>
              เข้าสู่ระบบ
            </p>
          )}
        </div>
      </header>

      <div className="top-bar container my-4">
        <div className="form-group row align-items-center">
          <label className="col-sm-5 col-form-label mb-0">จุดรับและส่งคืนรถ</label>
          <div className="col-sm-7">
            <select
              className="form-control"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {locations.map((loc, idx) => (
                <option key={idx} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date Pickers */}
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">วันที่รับรถ</label>
          <div className="col-sm-4">
            <div className="input-group">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="form-control"
              />
            </div>
          </div>
          <label className="col-sm-2 col-form-label">วันที่คืนรถ</label>
          <div className="col-sm-4">
            <div className="input-group">
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>

      {/* เรียกใช้ MyFunctionComponent ที่นี่ */}
      <MyFunctionComponent />
    </div>
  );
}

export default TopBar;
