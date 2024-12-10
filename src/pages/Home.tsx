import React, { useEffect, useState } from 'react';
import { styled } from "styled-components";
import Folder from '../components/folder/Folder';
import { useFolderStore } from '../utils/store/folder';

const Container = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  background-image: url('images/background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const ContextMenu = styled.nav<{ position: { x: number; y: number } }>`
  position: absolute;
  top: ${({ position }) => position.y}px;
  left: ${({ position }) => position.x}px;
  background: rgb(50, 50, 50);
  color: rgb(255, 255, 255);
  font-family: 'Pretendard';
  font-size: 0.75rem;
  padding: 0.5rem;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: flex;
  flex-direction: column;

  > div {
    padding: 0.2rem 0.5rem;
    cursor: pointer;

    &:hover {
      background: rgb(70, 70, 70);
    }
  }
`;

const MenuItem = styled.div`
  padding: 5px 10px;
  font-family: 'Pretendard';
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

function Home() {
  const {
    folders,
    createFolder,
    handleResize,
    handleDragEnd,
    deleteFolder,
    autoSort,
    updateEditing,
  } = useFolderStore();
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    targetId: string | null;
  } | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (contextMenu && !(event.target as HTMLElement).closest('[data-context-menu]')) {
        setContextMenu(null);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [handleResize, contextMenu]);

  const handleRightClick = (event: React.MouseEvent, targetId: string | null = null) => {
    event.preventDefault();
    event.stopPropagation();
    setContextMenu({ x: event.clientX, y: event.clientY, targetId });
  };

  const handleFolderContextMenu = (event: React.MouseEvent, folderId: string) => {
    handleRightClick(event, folderId);
  };

  const handleBackgroundContextMenu = (event: React.MouseEvent) => {
    handleRightClick(event, null);
  };

  const handleCreateFolder = () => {
    if (contextMenu) {
      createFolder(contextMenu.x, contextMenu.y);
      setContextMenu(null);
    }
  };

  const handleRenameFolder = () => {
    if (contextMenu && contextMenu.targetId) {
      const folderToRename = folders.find(f => f.id === contextMenu.targetId);
      if (folderToRename) {
        updateEditing(contextMenu.targetId);
        setContextMenu(null);
      }
    }
  };

  const handleDeleteFolder = () => {
    if (contextMenu && contextMenu.targetId) {
      deleteFolder(contextMenu.targetId);
      setContextMenu(null);
    }
  };

  const handleAutoSort = () => {
    autoSort();
    setContextMenu(null);
  };

  return (
    <Container 
      onContextMenu={handleBackgroundContextMenu}
      data-context-menu="background"
    >
      {folders.map((folder) => (
        <Folder
          key={folder.id}
          folder={folder}
          onContextMenu={(e: React.MouseEvent) => handleFolderContextMenu(e, folder.id)}
          onDragEnd={(newPosition) => handleDragEnd(folder.id, newPosition)} 
        />
      ))}

      {contextMenu && (
        <ContextMenu 
          position={{ x: contextMenu.x, y: contextMenu.y }}
          data-context-menu="menu"
        >
          {contextMenu.targetId === null ? (
            <>
              <MenuItem onClick={handleCreateFolder}>
                새 폴더
              </MenuItem>
              <MenuItem onClick={handleAutoSort}>
                자동 정렬
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={handleRenameFolder}>
                이름 변경
              </MenuItem>
              <MenuItem onClick={handleDeleteFolder}>
                삭제
              </MenuItem>
            </>
          )}
        </ContextMenu>
      )}
    </Container>
  );
}

export default Home;