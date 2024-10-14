import React from 'react';
import GoogleMapReact from 'google-map-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Marker = ({ text }) => <div style={{ color: 'blue' }}>{text}</div>;

function CarDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { car, rentalStartDate, rentalEndDate } = location.state || {
    car: { name: '', price: 0, seats: '', image: '' },
    rentalStartDate: '',
    rentalEndDate: '',
  };

  // ฟังก์ชันคำนวณจำนวนวันระหว่างวันที่จอง
  const calculateTotalDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const difference = end - start;
    const totalDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
    return totalDays > 0 ? totalDays : 1; // การันตีว่าขั้นต่ำคือ 1 วัน
  };

  // คำนวณจำนวนวัน
  const totalDays = calculateTotalDays(rentalStartDate, rentalEndDate);

  // คำนวณราคาทั้งหมด
  const totalPrice = totalDays * car.price;

  const handleConfirmBooking = () => {
    // ส่งข้อมูลไปยังหน้าชำระเงิน
    navigate('/payment', { state: { car, rentalStartDate, rentalEndDate, totalDays, totalPrice } });
  };

  const defaultProps = {
    center: {
      lat: 18.7666,
      lng: 98.9627,
    },
    zoom: 13,
  };

  return (
    <div className="details-page">
      <div className="car-details">
        <div className="car-info">
          <h1>{car.name}</h1>
          <img src={car.image} alt={car.name} />
          <p>Price per day: {car.price} THB</p>
          <p>Seats: {car.seats}</p>
          <p>Total Days: {totalDays}</p>
          <p>Total Price: {totalPrice} THB</p>
          <p>Rental Dates: {rentalStartDate} to {rentalEndDate}</p>
        </div>

        <div className="driver-info">
          <h2>Driving information/ข้อมูลผู้ขับขี่</h2>
          <form>
            <label>Name/ชื่อ:</label>
            <input type="text" placeholder="ชื่อ" />
            <label>Last Name/นามสกุล:</label>
            <input type="text" placeholder="นามสกุล" />
            <label>Age/อายุ:</label>
            <input type="number" placeholder="อายุ" />
            <label>Country/ประเทศ:</label>
            <input type="text" placeholder="กรุณากรอกข้อมูล" />
            <label>Phone Number/เบอร์โทรศัพท์:</label>
            <input type="text" placeholder="กรุณากรอกเบอร์โทรศัพท์ของท่าน" />
            <button type="button" onClick={handleConfirmBooking}>Confirm Booking</button>

          </form>
        </div>
      </div>

      <div className="map-container">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAXQhoQnGB-PuzkgD1djLBIFsbtvZFfEy0' }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <Marker lat={18.7666} lng={98.9627} text="Chiang Mai Airport" />
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default CarDetailsPage;
