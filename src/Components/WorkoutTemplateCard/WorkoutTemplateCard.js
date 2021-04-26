import React from "react";
import "./WorkoutTemplateCard.css";

const WorkoutTemplateCard = (props) => {
  return (
    <div className="workout-template-card-container">
      <div className="template-card-title">{props.data.title}</div>
      <div className="template-card-categories">
        <div className="template-card-category shoulder-circle"></div>
        <div className="template-card-category back-circle"></div>
          <div className="template-card-category tricep-circle"></div>
      </div>
      <div className="template-exercise-count">Exercise Count: {props.data.templateSkeleton.length}</div>
    </div>
  );
};

export default WorkoutTemplateCard;
