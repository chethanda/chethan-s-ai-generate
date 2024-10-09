import './App.css';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';

const Modal = ({ onClose, onInsert }) => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [showRegenerate, setShowRegenerate] = useState(false);
  const [isInserted, setIsInserted] = useState(false); 

  const handleGenerateClick = () => {
    if (inputText.trim()) {
      setMessages(prevMessages => [
        ...prevMessages,
        { type: 'user', text: inputText },
        { type: 'ai', text: 'Thank you for the opportunity! If you have any more questions or if there\'s anything else I can help you with, feel free to ask.' }
      ]);
      setInputText(''); 
      setShowRegenerate(true); 
      setIsInserted(false); 
    }
  };

  const handleRegenerateClick = () => {
    if (!inputText.trim()) {
      return;
    }

    setMessages(prevMessages => [
      ...prevMessages,
      { type: 'user', text: inputText },
      { type: 'ai', text: 'Thank you for the opportunity! If you have any more questions or if there\'s anything else I can help you with, feel free to ask.' }
    ]);
    setInputText('');
    setIsInserted(false);
  };

  const handleInsertClick = () => {
    if (!isInserted) {
      const lastResponse = messages[messages.length - 1]?.text || '';
      onInsert(lastResponse);
      setIsInserted(true); 
    } else {
      alert('Response already inserted.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {messages.map((message, index) => (
          <div
            key={index}
            className='card'
            style={{
              textAlign: message.type === 'user' ? 'right' : 'left',
              width: '70%',
              marginLeft: message.type === 'user' ? 'auto' : '0',
              marginBottom: '10px',
              backgroundColor: message.type === 'user' ? '#f1f1f1' : '#e0e0e0',
              padding: '10px'
            }}
          >
            <label>{message.text}</label>
          </div>
        ))}
        <input
          placeholder='Your Prompt'
          name='modelText'
          id='modelText'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ width: '100%', marginTop: '10px', padding: '5px' }}
        />
        {!showRegenerate ? (
          <button name='generate' onClick={handleGenerateClick} style={{ marginTop: '10px' ,display:'inherit'}}>
            <img
              src={require('../src/Assests/image.png')}
              alt='.'
              style={{ height: "13px" }}
            />
            Generate
          </button>
        ) : (
          <div style={{marginLeft:'auto',display:'flex'}}>
             <button
              name='insert'
              onClick={handleInsertClick} 
          
              style={{ marginTop: '10px' ,marginLeft:'45%'}}
            >
             <img
              src={require('../src/Assests/insertLogo.png')}
              alt='.'
              style={{ height: "13px",paddingRight:'10px'}}
            />
              Insert
            </button>
            <button name='regenerate' onClick={handleRegenerateClick} style={{ marginTop: '10px' }}>
            <img
              src={require('../src/Assests/Regenrateimg.png')}
              alt='.'
              style={{ height: "13px" }}
            />
              Regenerate
            </button>
           
          </div>
        )}
      </div>
    </div>
  );
};

const Login = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [insertedResponses, setInsertedResponses] = useState([]);
  const [textFieldValue, setTextFieldValue] = useState(''); 
  const [timeoutId, setTimeoutId] = useState(null); 

  const handleFocus = () => {
    setIsFocused(true);
    if (timeoutId) {
      clearTimeout(timeoutId); 
    }
  };

  const handleBlur = () => {
    const id = setTimeout(() => {
      setIsFocused(false); 
    }, 10000);
    setTimeoutId(id); 

  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
 if (!isModalOpen) {
      setTextFieldValue(''); 
    }
  };

  const handleClickOutside = (event) => {
    if (event.target.closest('.modal-content') === null) {
      setIsModalOpen(false);
    }
  };

  const handleInsert = (aiResponse) => {
    if (aiResponse) {
      setInsertedResponses(prevResponses => [...prevResponses, aiResponse]);
      setTextFieldValue(aiResponse); 
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener('mousedown', handleClickOutside);
    } else {
      window.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div className='container'>
      <h2>LinkedIn</h2>

      <div className='card' style={{ width: '20%' }}>
        {insertedResponses.map((response, index) => (
          <div >
         
          </div>
        ))}
        <TextField
          style={{ width: '100%',height:'auto' }}
          value={textFieldValue}
          variant="outlined"
          placeholder='Write a message'
          onFocus={handleFocus}
          onBlur={handleBlur} 
          multiline={true}
          InputProps={{
            style: { whiteSpace: 'pre-wrap' },
            endAdornment: isFocused && (
              <InputAdornment position="end">
                <img
                  src={require('../src/Assests/imageIcon.png')}
                  style={{
                    borderRadius: "50%",
                    border: 'none',
                    cursor: "pointer",
                    width: "30px",
                    height: "30px",
                  }}
                  alt='AI icon'
                  onClick={toggleModal}
                />
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </div>

      {isModalOpen && (
        <div className="modal">
          <Modal onClose={toggleModal} onInsert={handleInsert} />
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <div>
      <Login />
    </div>
  );
}

export default App;
