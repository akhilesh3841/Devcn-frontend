import React from 'react';
import axios from 'axios';
import { Base_url } from '../utils/helper';

const Premium = () => {
  const handlebuyclick = async (type) => {
    try {
      const res = await axios.post(
        `${Base_url}/payment/createpay`,
        { membershipType: type },
        { withCredentials: true }
      );

      const { amount, keyId, currency, notes, orderId } = res.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: 'DEVcn',
        description: 'Connect to developers',
        order_id: orderId,
        prefill: {
          name: notes.firstName + ' ' + notes.lastName,
          email: notes.emailId,
          contact: '9999999999',
        },
        theme: {
          color: '#6366f1', // Tailwind indigo-500
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('❌ Razorpay error:', error);
      alert('Payment failed. Check console.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center items-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Silver Membership */}
        <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center text-center hover:scale-105 transition duration-300">
          <h2 className="text-3xl font-extrabold text-indigo-600 mb-4">Silver Membership</h2>
          <ul className="text-gray-700 mb-6 space-y-2">
            <li>💬 Chat with people</li>
            <li>✅ Get blue ticks</li>
            <li>⏱️ 2 months plan</li>
          </ul>
          <button
            onClick={() => handlebuyclick('silver')}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold shadow-md"
          >
            Buy Silver
          </button>
        </div>

        {/* Gold Membership */}
        <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center text-center hover:scale-105 transition duration-300">
          <h2 className="text-3xl font-extrabold text-yellow-500 mb-4">Gold Membership</h2>
          <ul className="text-gray-700 mb-6 space-y-2">
            <li>💬 Chat with people</li>
            <li>✅ Get blue ticks</li>
            <li>⏱️ 6 months plan</li>
          </ul>
          <button
            onClick={() => handlebuyclick('gold')}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-full font-semibold shadow-md"
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
