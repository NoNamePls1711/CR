import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // เพิ่ม useNavigate
import './PaymentPage.css';

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate(); // ใช้ useNavigate เพื่อเปลี่ยนเส้นทาง

  const { car, rentalStartDate, rentalEndDate, totalPrice, totalDays } = location.state || {
    car: { name: '', price: 0, seats: '', image: '' },
    rentalStartDate: '',
    rentalEndDate: '',
    totalPrice: 0,
    totalDays: 0,
  };

  const handlePayment = () => {
    // เปลี่ยนเส้นทางไปยังหน้า ConfirmationPage หลังจากการจ่ายเงินสำเร็จ
    navigate('/confirmation', {
      state: {
        car,
        rentalStartDate,
        rentalEndDate,
        totalPrice,
        totalDays,
      },
    });
  };

  return (
    <div className="payment-page">
      <h1>Payment for {car.name}</h1>
      <img src={car.image} alt={car.name} className="car-image" />
      <p>Rental Dates: {rentalStartDate} to {rentalEndDate}</p>
      <p>Total Days: {totalDays}</p>
      <p>Total Price: {totalPrice} THB</p>

      <div className="payment-form">
        <label>Cardholder Name:</label>
        <input type="text" placeholder="Name on card" />
        <label>Card Number:</label>
        <input type="text" placeholder="Card Number" />
        <label>Expiration Date:</label>
        <input type="text" placeholder="MM/YY" />
        <label>CVV:</label>
        <input type="text" placeholder="CVV" />
        <button onClick={handlePayment}>Pay Now</button> {/* เรียกฟังก์ชัน handlePayment */}
      </div>
    </div>
  );
}

export default PaymentPage;
