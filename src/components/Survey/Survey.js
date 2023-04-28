import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Radio from "./Radio";
import RadioGroup from "./RadioGroup";
import Checkbox from "./CheckBox";
import CheckboxGroup from "./CheckboxGroup";
import InputBox from "./InputBox";
import Card from "react-bootstrap/Card";
import Question from "./Question";
import TypeQuestion from "./TypeQuestion";
import QuestionGenerator from "./QuestionGenerator";
import { RiQuestionAnswerFill } from "react-icons/ri";

function Survey() {
  const [pages, setPages] = React.useState(["home"]);
  const [visibility, setVisibility] = useState('');
  const [GPS, setGPS] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState("");
  const [showQuestionGenerator, setShowQuestionGenerator] = useState(false);
  const [questions, setQuestions] = useState([]);


  const handleShowQuestionGenerator = () => {
    setShowQuestionGenerator(true);
  }

  function handleVisibility(event) {
    setVisibility(event.target.value);
  }
  function handleGPS(event) {
    setGPS(event.target.value);
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleTypeChange = (event) => {
    setType(event.target.value);

    if (event.target.value === "찬반식") {
      setOptions( ["True", "False" ]);
    }

    if (event.target.value === "서술형") {
      setOptions( null );
    }
  }

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setOptions((prevOptions) => [...prevOptions, value]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      id: questions.length + 1, // 새로운 질문의 id는 배열 길이 + 1
      title: title,
      text: question,
      type: type,
      options: options,
      visibility: visibility,
      GPS: GPS,
    };

    console.log({ newQuestion })

    setQuestions([...questions, newQuestion]);
    setTitle('');
    setQuestion('');
    setType('');
    setOptions([]);
    setMessage('설문조사가 제출되었습니다.');

    setTimeout( () => {
      setMessage('');
    }, 3000);
  }

  const handleAddOption = () => {
    if (question !== "" && type === "객관식") {
      setOptions([...options, ""]);
    }
  };

  const handleOptionTextChange = (index, event) => {
    const updateOptions = [...options];
    updateOptions[index] = event.target.value;
    setOptions(updateOptions);
  }

  return (
    <Container fluid className="survey-header" >
      <Container>
        <form onSubmit={handleSubmit}>
          <h1 className="project-heading">
            Our <strong className="yellow">Survey </strong>
          </h1>
          <p>
            Here is a survey we're working on recently.
          </p><br />
          <Card className="survey-card-view ">
            <Card.Body>
              <Question question="Survey Title" />
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Survey title" />
            </Card.Body>
          </Card>

          <Card className="survey-card-view">
            <Card.Body>
              <Question question="Option" />
              <input
                type='radio'
                id='public'
                name='visibility'
                value='public'
                onChange={handleVisibility}
                checked={visibility === 'public'} />
              <label for='public'>public</label><br />
              <input
                type='radio'
                id='private'
                name='visibility'
                value='private'
                onChange={handleVisibility}
                checked={visibility === 'private'} />
              <label for='private'>private</label>
              <br />
            </Card.Body>
          </Card>

          {(visibility === 'public') && <Card className="survey-card-view">
            <Card.Body>
              <Question question="설문조사 공개 여부" />
              <input
                type='radio'
                id='GPSO'
                name='gps'
                value='GPSO'
                onChange={handleGPS}
                checked={GPS === 'GPSO'} />
              <label for='GPSO'>YES!</label><br />
              <input
                type='radio'
                id='GPSX'
                name='gps'
                value='GPSX'
                onChange={handleGPS}
                checked={GPS === 'GPSX'} />
              <label for='GPSX'>NO!</label>
              <br />
            </Card.Body>
          </Card>}

          <Card className="survey-card-view">
            <Card.Body>
              <Question question="Question Type" />
              <select value={type} onChange={handleTypeChange}>
                <option value="">Select type</option>
                <option value="객관식">객관식</option>
                <option value="찬반식">찬반식</option>
                <option value="서술형">서술형</option>
              </select>
            </Card.Body>
          </Card>

          {type && (
            <Card className="survey-card-view">
              <Card.Body>
                <Question question="Question" />
                <input
                  type="text"
                  value={question}
                  onChange={handleQuestionChange}
                  placeholder="Enter the question"
                />
              </Card.Body>
            </Card>
          )}

          {type === "객관식" && (
            <Card className="survey-card-view">
              <Card.Body>
                <h3 htmlFor="optionsInput"><b>Options</b></h3>
                {options.map((option, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      value={option}
                      onChange={(event) => handleOptionTextChange(index, event)}
                      placeholder="Enter an option"
                    />
                  </div>
                ))}
                <br />
                <button type="button" onClick={handleAddOption}>
                  Add Option
                </button>
              </Card.Body>
            </Card>
          )}

          <button type="submit" class="btn btn-primary">Submit</button><br />
          <p>{message}</p>
        </form>
      </Container>
    </Container>
  );
}

export default Survey;



{/* <div>
<h1>질문 생성기</h1>
{showQuestionGenerator ? (
  <QuestionGenerator />
) : (
  <button class="btn btn-primary" onClick={handleShowQuestionGenerator}>+</button>
)}
</div> */}