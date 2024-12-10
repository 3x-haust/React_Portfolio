import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

interface App {
  id: number;
  icon: string;
  name: string;
}

interface DockItemProps {
  scale: number;
  isHovered: boolean;
}

interface TooltipProps {
  visible: boolean;
}

const DockContainer = styled.nav<{ width: string }>`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  padding: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(8px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: ${props => props.width};
  transition: width 0.2s ease;
  font-family: 'Pretendard';
`;

const DockItemWrapper = styled.div<DockItemProps>`
  position: relative;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: scale(${props => props.scale}) translateY(${props => props.isHovered ? '0px' : props.scale > 1 ? props.scale * -7 + 'px' : '0px'});
  flex: 1;
  display: flex;
  justify-content: center;
  font-family: 'Pretendard';
`;

const DockItem = styled.div<DockItemProps>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: ${props => props.isHovered ? 'translateY(-20px)' : 'translateY(0)'};
  font-family: 'Pretendard';

  &:hover {
    background: rgba(255, 255, 255, 1);
  }
`;

const IconWrapper = styled.span<DockItemProps>`
  font-size: ${props => props.isHovered ? '32px' : '24px'};
  transition: font-size 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  user-select: none;
  font-family: 'Pretendard';
`;

const Tooltip = styled.span<TooltipProps>`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.2s ease;
  pointer-events: none;
  font-family: 'Pretendard';

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid rgba(0, 0, 0, 0.75);
  }
`;

function Dock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [dockWidth, setDockWidth] = useState<string>('40%');

  const apps: App[] = [
    { id: 1, icon: "🌐", name: "Safari" },
    { id: 2, icon: "📝", name: "Notes" },
    { id: 3, icon: "📧", name: "Mail" },
    { id: 4, icon: "🗓️", name: "Calendar" },
    { id: 5, icon: "⚙️", name: "Settings" },
    { id: 6, icon: "🎵", name: "Music" }
  ];

  const getScale = useCallback((index: number): number => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(hoveredIndex - index);
    
    if (distance === 0) return 1.7;
    if (distance === 1) return 1.5;
    if (distance === 2) return 1.3;
    if (distance === 3) return 1.1;
    return 1;
  }, [hoveredIndex]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const itemWidth = rect.width / apps.length;
    const index = Math.floor(mouseX / itemWidth);
    setHoveredIndex(index);
    setDockWidth('50%');
  }, [apps.length]);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
    setDockWidth('35%');
  }, []);

  return (
    <DockContainer
      width={dockWidth}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {apps.map((app, index) => (
        <DockItemWrapper
          key={app.id}
          scale={getScale(index)}
          isHovered={hoveredIndex === index}
        >
          <Tooltip visible={hoveredIndex === index}>
            {app.name}
          </Tooltip>
          <DockItem isHovered={hoveredIndex === index} scale={getScale(index)}>
            <IconWrapper isHovered={hoveredIndex === index} scale={getScale(index)}>
              {app.icon}
            </IconWrapper>
          </DockItem>
        </DockItemWrapper>
      ))}
    </DockContainer>
  );
};

export default Dock;