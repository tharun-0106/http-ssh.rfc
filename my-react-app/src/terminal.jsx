import React, { useState, useRef } from "react";
import './styles/terminal.css';

const Terminal = () => {
  const [command, setcommand] = useState("");
  const [responseData, setResponseData] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const hideTimerRef = useRef(null);

  const term = async (command) => {
    try {
      const response = await fetch('http://localhost:5000/terminal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command }),
      });
      const data = await response.json();
      return { ok: response.ok, data };
    } catch (err) {
      return { ok: false, data: { message: 'Server error' } };
    }
  };

  const execute = async (e) => {
    e.preventDefault();
    const result = await term(command);
    if (result.ok) {
      setResponseData(result.data.output || result.data);
    } else {
      setResponseData(result.data.message);
    }
  };

  return (
    <>
    <div className="top">
      <div
        className="dropdown-container"
        onMouseEnter={() => {
          clearTimeout(hideTimerRef.current);
          setShowDropdown(true);
        }}
        onMouseLeave={() => {
          hideTimerRef.current = setTimeout(() => {
            setShowDropdown(false);
          }, 100000);
        }}
      >
        <h3>Command Suggestion Panel</h3>
        {showDropdown && (
          <ul className="dropdown-options">
            {["ls", "pwd", "whoami", "date", "uptime", "top"].map((cmd) => (
              <li key={cmd} onClick={() => setcommand(cmd)}>{cmd}</li>
            ))}
          </ul>
        )}
      </div>
      <h3>Command History</h3>
      </div>

      <div className="center">
        <h3>ENTER THE LINUX COMMAND:</h3>
        <input
          onChange={(e) => setcommand(e.target.value)}
          value={command}
          id="text-input"
          type="text"
        />
        <br />
        <button onClick={execute} className="execute-button">EXECUTE</button>
        <br />
        <p>{responseData}</p>
      </div>
    </>
  );
};

export default Terminal;
