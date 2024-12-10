import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface FolderState {
  id: string;
  name: string;
  color: string;
  position: { x: number; y: number };
  edit: boolean;
  onDoubleClick: () => void;
}

interface FolderStore {
  folders: FolderState[];
  setFolders: (folders: FolderState[]) => void;
  resolveCollision: (position: { x: number; y: number }, folders: FolderState[]) => { x: number; y: number };
  createFolder: (x: number, y: number) => void;
  deleteFolder: (id: string) => void;
  updateFolderName: (id: string, newName: string) => void;
  handleDragEnd: (id: string, newPosition: { x: number; y: number }) => void;
  handleResize: () => void;
  updateEditing: (id: string) => void;
  autoSort: () => void;
}

export const useFolderStore = create<FolderStore>()(
  persist(
    (set) => ({
      folders: [
        { id: '1', name: '자기소개', color: 'rgb(238,188,17)', position: { x: 20, y: 50 }, onDoubleClick: () => console.log('자기소개 double clicked'), edit: false },
        { id: '2', name: '기술스택', color: 'rgb(224,64,47)', position: { x: 100, y: 50 }, onDoubleClick: () => console.log('기술스택 double clicked'), edit: false },
        { id: '3', name: '프로젝트', color: 'rgb(46,142,214)', position: { x: 180, y: 50 }, onDoubleClick: () => console.log('프로젝트 double clicked'), edit: false },
      ],
      setFolders: (folders) => set({ folders }),

      resolveCollision: (position, folders) => {
        const buffer = 10;
        let adjustedPosition = { ...position };
        let collisionDetected = true;

        while (collisionDetected) {
          collisionDetected = folders.some((folder) => {
            return !(
              adjustedPosition.x + 50 + buffer < folder.position.x ||
              adjustedPosition.x > folder.position.x + 50 + buffer ||
              adjustedPosition.y + 50 + buffer < folder.position.y ||
              adjustedPosition.y > folder.position.y + 50 + buffer
            );
          });

          if (collisionDetected) {
            adjustedPosition.x += 60;
            if (adjustedPosition.x > window.innerWidth - 50) {
              adjustedPosition.x = 0;
              adjustedPosition.y += 60;
            }
          }
        }
        return adjustedPosition;
      },

      createFolder: (x, y) => {
        set((state) => {
          const newFolder: FolderState = {
            id: Date.now().toString(),
            name: 'untitled folder',
            color: `hsl(${Math.random() * 360}, 70%, 60%)`,
            position: { x, y },
            edit: true,
            onDoubleClick: () => console.log('Folder double clicked'),
          };

          const adjustedPosition = state.resolveCollision(newFolder.position, state.folders);
          newFolder.position = adjustedPosition;

          return { folders: [...state.folders, newFolder] };
        });
      },

      updateEditing: (id) => {
        set((state) => ({
          folders: state.folders.map((folder) =>
            folder.id === id ? { ...folder, edit: !folder.edit } : folder
          ),
        }));
      },

      deleteFolder: (id) => {
        set((state) => ({
          folders: state.folders.filter((folder) => folder.id !== id),
        }));
      },

      updateFolderName: (id, newName) => {
        set((state) => ({
          folders: state.folders.map((folder) =>
            folder.id === id ? { ...folder, name: newName } : folder
          ),
        }));
      },

      handleDragEnd: (id, newPosition) => {
        set((state) => {
          const folderIndex = state.folders.findIndex((folder) => folder.id === id);
          if (folderIndex === -1) return state;

          const updatedFolder = { ...state.folders[folderIndex] };
          updatedFolder.position = state.resolveCollision(newPosition, state.folders.filter((_, i) => i !== folderIndex));

          const updatedFolders = [...state.folders];
          updatedFolders[folderIndex] = updatedFolder;

          return { folders: updatedFolders };
        });
      },

      handleResize: () => {
        set((state) => ({
          folders: state.folders.map((folder) => ({
            ...folder,
            position: {
              x: Math.min(folder.position.x, window.innerWidth - 50),
              y: Math.min(folder.position.y, window.innerHeight - 80),
            },
          })),
        }));
      },
      
      autoSort: () => {
        set((state) => ({
          folders: state.folders.map((folder, index) => ({
            ...folder,
            position: {
              x: 20 + (index % 6) * 90,
              y: 50 + Math.floor(index / 6) * 90,
            },
          })),
        }))
      },
    }),
    {
      name: 'folder-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
