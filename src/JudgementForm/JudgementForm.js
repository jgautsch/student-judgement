// @ts-check
import React from "react";
import Slider from "rc-slider";

const JudgementForm = ({ selectedStudent, qualityValues, onQualityUpdate }) => {
  return (
    <div style={{ margin: "0 1.5rem" }}>
      <div style={{ margin: "1rem 0" }}>
        <h4>Judge {selectedStudent.name} on:</h4>
      </div>
      {Object.keys(qualityValues).map(quality => (
        <div className="field" key={`${selectedStudent.id}${quality}`}>
          <label className="label">{quality}</label>
          <div className="control">
            <Slider
              value={qualityValues[quality]}
              onChange={newValue => onQualityUpdate(quality, newValue)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default JudgementForm;
