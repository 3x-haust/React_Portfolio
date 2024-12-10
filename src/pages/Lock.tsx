import { styled } from "styled-components";
import fireAuth from "../utils/firebase/fireAuth";
import { useNavigate } from "react-router-dom";
import React from "react";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  background-image: url('images/background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;


const ProfileName = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: white;
  font-family: 'Pretendard';
  text-align: center;
`;

const ProfileSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 99px;
  transition: opacity 0.2s ease;
  margin-bottom: 2.5px;
`;

const LoginButton = styled.button`
  margin-top: 20px;
  margin-bottom: 80px;
  padding: 5px 30px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #cccccc;
  border: none;
  border-radius: 99px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #aaaaaa;
  }
`;

const InformationSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const TimeDisplay = styled.time`
  font-family: 'Pretendard';
  font-size: 140px;
  font-weight: 700;
  letter-spacing: -10px;
  color: white;
`;

const DateDisplay = styled.time`
  font-family: 'Pretendard';
  font-size: 24px;
  font-weight: 500;
  color: white;
  margin-top: 20px;
`;

function Lock() {
  const [currentTime, setCurrentTime] = React.useState(new Date().toLocaleTimeString());
  const [currentDate, setCurrentDate] = React.useState(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false }).replace(/^0+/, ''));
      setCurrentDate(new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/home');
  };
  
  return(
    <Container>
      <InformationSection>
        <DateDisplay>{currentDate}</DateDisplay>
        <TimeDisplay>{currentTime}</TimeDisplay>
      </InformationSection>
      <ProfileSection>
        <ProfileImage src={fireAuth.currentUser?.photoURL || ''} alt="Profile" />
        <ProfileName>{fireAuth.currentUser?.displayName}</ProfileName>
        <LoginButton onClick={handleLogin}>Login</LoginButton>
      </ProfileSection>
    </Container>
  )
}

export default Lock;