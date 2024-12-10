import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styled } from "styled-components";
import AnimatedSvg from "./AnimatedSvg";
import { useFolderStore } from "../../utils/store/folder";
import MacFolder from "../MacFolder";

const FolderWrapper = styled(motion.article)`
  position: absolute;
  cursor: grab;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;

  &:active {
    cursor: grabbing;
  }
`;

const FileName = styled.span<{ isEditing: boolean }>`
  font-family: "Pretendard";
  font-size: 0.75rem;
  font-weight: 600;
  text-align: center;
  color: rgb(255, 255, 255);
  display: ${({ isEditing }) => (isEditing ? "none" : "block")};
  pointer-events: none;
  width: 5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const EditableInput = styled.input`
  font-family: "Pretendard";
  font-size: 0.75rem;
  font-weight: 600;
  text-align: center;
  color: rgb(255, 255, 255);
  background: none;
  border: none;
  outline: none;
  border-bottom: 1px solid rgb(255, 255, 255);
  width: 5rem;
  margin: 0 auto;
`;

interface FolderProps {
  folder: {
    id: string;
    name: string;
    color: string;
    position: { x: number; y: number };
    edit: boolean;
  };
  onDragEnd: (newPosition: { x: number; y: number }) => void;
  onContextMenu: (e: React.MouseEvent) => void;
  onRename?: (id: string, newName: string) => void;
}

function Folder({ 
  folder, 
  onDragEnd, 
  onContextMenu, 
  onRename 
}: FolderProps) {
  const { id, name, color, position } = folder;
  const { updateFolderName, updateEditing, folders } = useFolderStore();
  const [editing, setEditing] = useState(folder.edit);
  const [newName, setNewName] = useState(name);
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const folderData = folders.find(f => f.id === id);
    if (folderData) {
      setEditing(folderData.edit);
    }
  }, [folders, id]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const handleInputBlur = () => {
    if (editing) {
      const trimmedName = newName.trim();
      if (trimmedName) {
        updateFolderName(id, trimmedName);

        if (onRename) {
          onRename(id, trimmedName);
        }
      } else {
        setNewName(name);
      }

      setEditing(false);
      updateEditing(id);
    }
  };

  const startEdit = () => {
    setEditing(true);
    updateEditing(id);
  };

  const handleDragEnd = (_: any, info: { offset: { x: number; y: number } }) => {
    const newX = Math.max(0, Math.min(position.x + info.offset.x, window.innerWidth - 50));
    const newY = Math.max(50, Math.min(position.y + info.offset.y, window.innerHeight - 50));
    onDragEnd({ x: newX, y: newY });
  };

  const handleDoubleClick = () => {
    setIsFolderOpen(true);
  };

  const handleCloseFolder = () => {
    setIsFolderOpen(false);
  };

  return (
    <>
      <FolderWrapper
        drag
        dragMomentum={false}
        dragConstraints={{
          left: 0,
          right: window.innerWidth - 50,
          top: 50,
          bottom: window.innerHeight - 50,
        }}
        dragElastic={0.1}
        initial={{ x: position.x, y: position.y }}
        animate={{ x: position.x, y: position.y }}
        onDragEnd={handleDragEnd}
        onContextMenu={onContextMenu}
        onDoubleClick={handleDoubleClick}
      >
        <AnimatedSvg color={color} />
        {editing ? (
          <EditableInput
            ref={inputRef}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleInputBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleInputBlur();
              }
            }}
          />
        ) : (
          <FileName isEditing={editing} onClick={startEdit}>
            {name}
          </FileName>
        )}
      </FolderWrapper>

      <MacFolder 
        isOpen={isFolderOpen} 
        onClose={handleCloseFolder} 
        folderName={name}
      >        
        <div>
        </div>
      </MacFolder>
    </>
  );
}

export default Folder; 