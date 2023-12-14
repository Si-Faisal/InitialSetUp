import React from 'react';
import {
    VerticalTimeline as VT,
  VerticalTimelineElement as VTE,
  } from 'react-vertical-timeline-component';
  import 'react-vertical-timeline-component/style.min.css'
  
interface CustomVerticalTimelineElementProps {
    className?: string;
    contentStyle?: React.CSSProperties;
    contentArrowStyle?: React.CSSProperties;
    date: string;
    iconStyle?: React.CSSProperties;
    icon: React.ReactNode;
    children?: React.ReactNode; // Include children prop in the interface
  }

  const WorkIcon = () => <div>WorkIcon</div>; // Define your WorkIcon component
  const SchoolIcon = () => <div>SchoolIcon</div>; // Define your SchoolIcon component
  const StarIcon = () => <div>StarIcon</div>; // Define your StarIcon component
  

  


const CustomVerticalTimelineElement: React.FC<CustomVerticalTimelineElementProps> = ({
    className,
    contentStyle,
    contentArrowStyle,
    date,
    iconStyle,
    icon,
    children,
  }) => {
    return (
      <div className={className}>
        <div style={contentStyle}>
          <div style={contentArrowStyle}></div>
          <span>{date}</span>
          <span>{icon}</span>
          {children}
        </div>
      </div>
    );
  };



  interface CustomVerticalTimelineProps {
    children?: React.ReactNode;
  }

  const CustomVerticalTimeline: React.FC<CustomVerticalTimelineProps> = ({ children}) => {
    return <div>{children}</div>;
  };
  
  // Usage:
  const TimelineComponent:React.FC = () => {
    return (
      <VT>
         <VTE
        date="2008 - 2010" 
        icon={<WorkIcon />}
      >
        <h3>Creative Director</h3>
        <h4>Miami, FL</h4>
        <p>Creative Direction, User Experience, Visual Design, Project Management, Team Leading</p>
      </VTE>
      {/* Add other VerticalTimelineElements */}
      <VTE
       date="2008 - 2010" 
        icon={<StarIcon />}
      >
        <h3>Creative Director</h3>
        <h4>Miami, FL</h4>
        <p>Creative Direction, User Experience, Visual Design, Project Management, Team Leading</p>
      </VTE>
      </VT>
    );
  };
  
  export default TimelineComponent;
  