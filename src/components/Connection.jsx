import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addconnection } from '../utils/connectionslice';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Base_url } from '../utils/helper';

const Connection = () => {
  const connectiondata = useSelector((store) => store.connection.connection);
  const dispatch = useDispatch();

  const handleAcceptedRequest = async () => {
    try {
      const response = await axios.get(Base_url+"/userdata/pending/accepted", {
        withCredentials: true
      });
      dispatch(addconnection(response.data.data));
    } catch (error) {
      console.error("Error fetching accepted requests:", error);
    }
  };

  useEffect(() => {
    (async () => {
      await handleAcceptedRequest();
    })();
  }, [dispatch]);

  if (!connectiondata) return null;

  if (connectiondata.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='h-screen flex flex-col justify-center items-center text-center bg-white'
      >
        <h1 className='text-3xl font-bold text-gray-800'>No Connections Found</h1>
        <p className='text-gray-600 mt-2'>You will receive connections when someone accepts your request.</p>
        <Link to="/feed">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300'
          >
            Go to Home
          </motion.button>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-screen bg-gray-100 py-6"
    >
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Connections</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {connectiondata.map((user) => {
          const { _id, firstName, lastName, age, gender, skills, photoUrl, about } = user;
          return (
            <motion.div
              key={_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center shadow-lg rounded-lg p-4 w-full max-w-md border border-gray-300 hover:shadow-xl transition duration-300 bg-white"
            >
              <img
                className="w-20 h-20 rounded-full border-2 border-gray-300"
                src={photoUrl}
                alt="User"
              />
              <div className="ml-4 flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  {firstName} {lastName}
                </h3>
                <p className="text-gray-600 text-sm">{age} years old, {gender}</p>
                <p className="text-gray-700 text-sm">About: {about}</p>
                <p className="text-gray-700 text-sm">Skills: {skills}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300"
              >
                See
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Connection;