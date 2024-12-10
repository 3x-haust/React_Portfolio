import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import 'firebase/auth';
import fireAuth from '../utils/firebase/fireAuth';

const MenuBarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 30px;
  background-color: #333;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  z-index: 10000;

  @media (min-width: 768px) {
    padding: 0 6px;
    height: 32px;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 30px;
  position: relative;
`;

const ProfileImage = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  margin-left: 8px;
  margin-bottom: 2.5px;

  &:hover {
    opacity: 0.8;
  }
`;

const TimeDisplay = styled.time`
  font-family: 'Pretendard';
  font-size: 0.8125rem;
  letter-spacing: 0.05em;
  font-weight: 300;
  white-space: nowrap;
  padding: 0 8px;
  min-width: 90px;
  text-align: right;

  @media (min-width: 768px) {
    font-size: .9375rem;
    min-width: 100px;
  }

  @media (min-width: 1024px) {
    font-size: 1.0625rem;
    min-width: 110px;
  }
`;

const Spacer = styled.div`
  flex: 1;
  min-width: 20px;
  margin-left: auto;
`;

const DropdownMenu = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  color: black;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  overflow: hidden;
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  flex-direction: column;
  z-index: 10001;
`;

const DropdownItem = styled.button`
  padding: 8px 16px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const MenuBar: React.FC = () => {
  const [currentTime, setCurrentTime] = React.useState(new Date().toLocaleTimeString());
  const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    fireAuth.signOut().then(() => {
      console.log('User signed out');
    }).catch((error) => {
      console.error('Sign out error', error);
    });
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownVisible]);

  return (
    <MenuBarContainer>
      <ProfileSection>
        <ProfileImage src={fireAuth.currentUser?.photoURL || ''} alt="Profile" onClick={toggleDropdown} />
        <DropdownMenu ref={dropdownRef} isVisible={isDropdownVisible}>
          <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
        </DropdownMenu>
      </ProfileSection>
      <Spacer />
      <TimeDisplay>{currentTime}</TimeDisplay>
    </MenuBarContainer>
  );
};

export default MenuBar;