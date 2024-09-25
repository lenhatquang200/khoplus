import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native'

const RealTimeClock = ({ styleTime}) => {
  const [currentTime, setCurrentTime] = useState('');

  const updateCurrentTime = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    setCurrentTime(`${day}/${month}/${year} ${hours}:${minutes}:${seconds}`);
  };

  useEffect(() => {
    updateCurrentTime(); // Cập nhật thời gian lần đầu tiên khi component được mount

    const intervalId = setInterval(updateCurrentTime, 1000); // Cập nhật mỗi giây

    return () => clearInterval(intervalId); // Dọn dẹp interval khi component unmount
  }, []);

  return (
    <>
      <Text style={styleTime}>{currentTime}</Text>
    </>
  );
};

export default RealTimeClock;
