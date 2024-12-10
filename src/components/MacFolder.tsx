import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from 'styled-components';
import TechnologyStack from './contents/TechnologyStack';
import Projects from './contents/Projects';
import SelfIntroduction from './contents/SelfIntroduction';

const FolderModal = styled(motion.section)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(20px);
  width: 80%;
  max-width: 800px;
  height: 80%;
  max-height: 600px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalHeader = styled(motion.header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: rgba(242, 242, 242, 0.8);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  cursor: move;
`;

const WindowControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 3px;
`;

const WindowButton = styled.button<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  padding: 0;
  background-color: ${props => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const ModalContent = styled(motion.main)`
  flex-grow: 1;
  padding: 16px;
  overflow-y: auto;
`;

interface MacFolderProps {
  isOpen: boolean;
  onClose: () => void;
  folderName: string;
  children?: React.ReactNode;
}

const MacFolder: React.FC<MacFolderProps> = ({ 
  isOpen, 
  onClose, 
  folderName, 
  children 
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current && 
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const handleFullScreen = () => setIsFullScreen(!isFullScreen);
  const handleMinimize = () => setIsMinimized(!isMinimized);

  const modalVariants = {
    fullScreen: {
      width: '100%',
      height: '100%',
      top: 33,
      left: 0,
      transform: 'translate(0, 0)',
      borderRadius: 0,
    },
    normal: {
      width: '80%',
      height: '80%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: 12,
    },
    minimized: {
      width: 300,
      height: 200,
      bottom: 20,
      left: 20,
      top: 'auto',
      transform: 'none',
      borderRadius: 12,
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <FolderModal
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              ...(isFullScreen ? modalVariants.fullScreen : 
                  isMinimized ? modalVariants.minimized : 
                  modalVariants.normal)
            }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <ModalHeader>
              <WindowControls>
                <WindowButton 
                  color="#FF5F57" 
                  onClick={onClose}
                  title="닫기"
                />
                <WindowButton 
                  color="#FFBD2E" 
                  onClick={() => {}}
                  title="최소화"
                />
                <WindowButton 
                  color="#27CA41" 
                  onClick={() => {}}
                  title={isFullScreen ? "기본 창으로" : "전체 화면"}
                />
              </WindowControls>
              <div>{folderName}</div>
              <div style={{ width: '45px' }}></div>
            </ModalHeader>
            {!isMinimized && (
              <ModalContent
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {
                  folderName === '기술스택' ? 
                    <TechnologyStack /> : 
                      folderName === '프로젝트' ?
                        <Projects /> : 
                          folderName === '자기소개' ?
                            <SelfIntroduction /> : children || <p>No content available</p>
                }
              </ModalContent>
            )}
          </FolderModal>
        </>
      )}
    </AnimatePresence>
  );
};

export default MacFolder;
