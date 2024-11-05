import React, { useState } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { CheckCircleFill } from 'react-bootstrap-icons';

const CardTitle = ({ children }) => (
  <h2 className="text-center my-3">{children}</h2>
);

const StateVoteTracker = () => {
  // Include electoral votes for each state
  const stateData = {
    'Alabama': 9,
    'Alaska': 3,
    'Arizona': 11,
    'Arkansas': 6,
    'California': 54,
    'Colorado': 10,
    'Connecticut': 7,
    'Delaware': 3,
    'Florida': 30,
    'Georgia': 16,
    'Hawaii': 4,
    'Idaho': 4,
    'Illinois': 19,
    'Indiana': 11,
    'Iowa': 6,
    'Kansas': 6,
    'Kentucky': 8,
    'Louisiana': 8,
    'Maine': 4,
    'Maryland': 10,
    'Massachusetts': 11,
    'Michigan': 15,
    'Minnesota': 10,
    'Mississippi': 6,
    'Missouri': 10,
    'Montana': 4,
    'Nebraska': 5,
    'Nevada': 6,
    'New Hampshire': 4,
    'New Jersey': 14,
    'New Mexico': 5,
    'New York': 28,
    'North Carolina': 16,
    'North Dakota': 3,
    'Ohio': 17,
    'Oklahoma': 7,
    'Oregon': 8,
    'Pennsylvania': 19,
    'Rhode Island': 4,
    'South Carolina': 9,
    'South Dakota': 3,
    'Tennessee': 11,
    'Texas': 40,
    'Utah': 6,
    'Vermont': 3,
    'Virginia': 13,
    'Washington': 12,
    'West Virginia': 4,
    'Wisconsin': 10,
    'Wyoming': 3
  };

  const states = Object.keys(stateData).sort();

  const [stateResults, setStateResults] = useState(
    states.reduce((acc, state) => ({
      ...acc,
      [state]: {
        harrisVotes: 0,
        trumpVotes: 0,
        shareReported: 0,
        calledForHarris: false,
        calledForTrump: false
      }
    }), {})
  );

  const handleUpdate = (state, field, value) => {
    setStateResults(prev => ({
      ...prev,
      [state]: {
        ...prev[state],
        [field]: value
      }
    }));
  };

  const handleToggleCall = (state, candidate) => {
    setStateResults(prev => ({
      ...prev,
      [state]: {
        ...prev[state],
        calledForHarris: candidate === 'Harris' ? !prev[state].calledForHarris : false,
        calledForTrump: candidate === 'Trump' ? !prev[state].calledForTrump : false
      }
    }));
  };

  const getLeadingCandidate = (state) => {
    const result = stateResults[state];
    if (result.harrisVotes === result.trumpVotes) return null;
    return result.harrisVotes > result.trumpVotes ? 'Harris' : 'Trump';
  };

  const getTotals = () => {
    return Object.entries(stateResults).reduce((totals, [state, data]) => ({
      popularHarris: totals.popularHarris + (data.harrisVotes || 0),
      popularTrump: totals.popularTrump + (data.trumpVotes || 0),
      electoralHarris: totals.electoralHarris + (data.calledForHarris ? stateData[state] : 0),
      electoralTrump: totals.electoralTrump + (data.calledForTrump ? stateData[state] : 0),
      calledHarris: totals.calledHarris + (data.calledForHarris ? 1 : 0),
      calledTrump: totals.calledTrump + (data.calledForTrump ? 1 : 0)
    }), {
      popularHarris: 0,
      popularTrump: 0,
      electoralHarris: 0,
      electoralTrump: 0,
      calledHarris: 0,
      calledTrump: 0
    });
  };

  const totals = getTotals();
  const totalReportingStates = Object.values(stateResults).filter(state => state.shareReported > 0).length;

  return (
    <Card className="m-4">
      <Card.Header>
        <CardTitle>2024 Election Results Tracker</CardTitle>
      </Card.Header>
      <Card.Body>
        <Row className="mb-4">
          <Col md={6} className="text-center border-end">
            <h4>Electoral College</h4>
            <Row>
              <Col>
                <div className="text-primary fs-4 fw-bold">{totals.electoralHarris}</div>
                <div>Harris</div>
                <div className="text-muted">{totals.calledHarris} states</div>
              </Col>
              <Col>
                <div className="text-danger fs-4 fw-bold">{totals.electoralTrump}</div>
                <div>Trump</div>
                <div className="text-muted">{totals.calledTrump} states</div>
              </Col>
            </Row>
            <div className="text-muted mt-2">270 needed to win</div>
          </Col>
          <Col md={6} className="text-center">
            <h4>Popular Vote</h4>
            <Row>
              <Col>
                <div className="text-primary fs-5">{totals.popularHarris.toLocaleString()}</div>
                <div>Harris</div>
              </Col>
              <Col>
                <div className="text-danger fs-5">{totals.popularTrump.toLocaleString()}</div>
                <div>Trump</div>
              </Col>
            </Row>
            <div className="text-muted mt-2">{totalReportingStates} states reporting</div>
          </Col>
        </Row>

        {states.map(state => {
          const leader = getLeadingCandidate(state);
          const result = stateResults[state];

          return (
            <Row key={state} className="align-items-center mb-3">
              <Col xs={3} className={`fw-bold ${leader === 'Harris' ? 'text-primary' : leader === 'Trump' ? 'text-danger' : ''}`}>
                {state} ({stateData[state]} EV)
              </Col>
              <Col>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="Harris votes"
                  value={result.harrisVotes || ''}
                  onChange={(e) => handleUpdate(state, 'harrisVotes', Number(e.target.value))}
                />
              </Col>
              <Col xs="auto">
                <Button
                  variant={result.calledForHarris ? 'primary' : 'outline-secondary'}
                  onClick={() => handleToggleCall(state, 'Harris')}
                  title="Call state for Harris"
                >
                  <CheckCircleFill />
                </Button>
              </Col>
              <Col>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="Trump votes"
                  value={result.trumpVotes || ''}
                  onChange={(e) => handleUpdate(state, 'trumpVotes', Number(e.target.value))}
                />
              </Col>
              <Col xs="auto">
                <Button
                  variant={result.calledForTrump ? 'danger' : 'outline-secondary'}
                  onClick={() => handleToggleCall(state, 'Trump')}
                  title="Call state for Trump"
                >
                  <CheckCircleFill />
                </Button>
              </Col>
              <Col>
                <Form.Control
                  type="number"
                  min="0"
                  max="100"
                  placeholder="% Counted"
                  value={result.shareReported || ''}
                  onChange={(e) => handleUpdate(state, 'shareReported', Number(e.target.value))}
                />
                {result.shareReported > 0 && <div className="text-muted">{result.shareReported}% counted</div>}
              </Col>
            </Row>
          );
        })}
      </Card.Body>
    </Card>
  );
};

export default StateVoteTracker;