// @ts-check
import React from "react";
import andyKingSrc from "./andy_king.png";
import JudgementForm from "./JudgementForm";
import JudgementViz from "./JudgementViz";
import "./App.css";
import QualitiesList from "./QualitiesList";
import StudentsList from "./StudentsList";

function uid() {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}

const initQualities = [
  "Creativity",
  "Quietness in class",
  "Coloring Ability",
  "Roadkill painting ability",
  "Vision"
];

const initStudents = [
  {
    id: "jg",
    name: "Jon"
  },
  {
    id: "kp",
    name: "Kp"
  },
  {
    id: "andy",
    name: "Andy"
  }
];

const initStudentQualities = initStudents.map(s => s.id).reduce(
  (acc, elem) => ({
    ...acc,
    [elem]: initQualities.reduce(
      (acc2, q) => ({
        ...acc2,
        [q]: Math.random() * 60 + 40
      }),
      {}
    )
  }),
  {}
);

class App extends React.Component {
  state = {
    qualities: initQualities,
    students: initStudents,
    studentQualities: initStudentQualities,
    selectedStudent: initStudents[0]
  };

  addQuality = quality => {
    this.setState(state => ({
      qualities: [...state.qualities, quality]
    }));
  };

  removeQuality = quality => {
    this.setState(state => ({
      qualities: state.qualities.filter(q => q !== quality)
    }));
  };

  addStudent = name => {
    const newStudent = {
      id: uid(),
      name
    };
    this.setState(state => ({
      students: [...state.students, newStudent]
    }));
  };

  removeStudent = studentId => {
    // not going to both removing from studentQualities hash, this app is just a fun hack
    this.setState(state => ({
      students: state.students.filter(s => s.id !== studentId)
    }));
  };

  selectStudent = student => this.setState({ selectedStudent: student });

  updateQualityValue = (quality, value) => {
    this.setState(state => {
      if (!!state.selectedStudent) {
        return {
          studentQualities: {
            ...state.studentQualities,
            [state.selectedStudent.id]: {
              ...state.studentQualities[state.selectedStudent.id],
              [quality]: value
            }
          }
        };
      }
      return {};
    });
  };

  selectedStudyQualities = () => {
    const { qualities, selectedStudent, studentQualities } = this.state;
    if (!selectedStudent) {
      return null;
    } else {
      return this.syncStudentQualitiesWithQualities(
        studentQualities[selectedStudent.id] || {},
        qualities
      );
    }
  };

  /**
   * @param {any} a single student's qualities object
   * @param {any} a list of qualities
   */
  syncStudentQualitiesWithQualities = (studentQualities, qualities) => {
    // iterate through present `qualities` list, ensure value set for each one (and implicity no others)
    return qualities.reduce(
      (acc, quality) => ({
        ...acc,
        [quality]:
          typeof studentQualities[quality] === "number"
            ? studentQualities[quality]
            : 10
      }),
      {}
    );
  };

  render() {
    const { selectedStudent, qualities, students } = this.state;
    const selectedStudentQualities = !!selectedStudent
      ? this.selectedStudyQualities()
      : null;

    return (
      <div className="App">
        <header className="App-header">
          <div className="App-logo-container">
            <img src={andyKingSrc} className="App-logo" alt="andy king" />
          </div>
          <h1 className="App-title">Welcome to Andy King's Judgement App</h1>
        </header>

        <div className="columns is-desktop">
          <div className="column">
            <h2 className="color-header orange">
              <span
                style={{ fontSize: "1.5em" }}
                role="img"
                aria-label="qualities"
              >
                🏅
              </span>{" "}
              Qualities to Judge
            </h2>
            <QualitiesList
              addQuality={this.addQuality}
              removeQuality={this.removeQuality}
              qualities={qualities}
            />
          </div>

          <div className="column">
            <h2 className="color-header green">
              <span
                style={{ fontSize: "1.5em" }}
                role="img"
                aria-label="students"
              >
                👫
              </span>{" "}
              Students to Judge
            </h2>
            <StudentsList
              selectedStudent={selectedStudent}
              students={students}
              addStudent={this.addStudent}
              removeStudent={this.removeStudent}
              selectStudent={this.selectStudent}
            />
          </div>

          <div className="column">
            <h2 className="color-header purple">
              <span style={{ fontSize: "1.5em" }} role="img" aria-label="judge">
                🤔
              </span>{" "}
              Judge a Student
            </h2>
            {!!selectedStudentQualities ? (
              <JudgementForm
                selectedStudent={selectedStudent}
                qualityValues={selectedStudentQualities}
                onQualityUpdate={this.updateQualityValue}
              />
            ) : (
              <h2 className="subtitle is-2 has-text-grey-light">
                Please select a student
              </h2>
            )}
          </div>

          <div className="column" style={{ minWidth: 600 }}>
            <h2 className="color-header pink">
              <span style={{ fontSize: "1.5em" }} role="img" aria-label="chart">
                📊
              </span>{" "}
              Visualize Judgement
            </h2>
            {!!selectedStudentQualities ? (
              <JudgementViz studentQualities={selectedStudentQualities} />
            ) : (
              <h1>Please select a student</h1>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
