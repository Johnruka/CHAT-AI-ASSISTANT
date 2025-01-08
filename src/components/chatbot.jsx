import React, { useState } from 'react';

function Chatbot() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question) {
      alert('Please enter a question.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/chat?question=${encodeURIComponent(question)}`);
      const data = await res.text();
      setResponse(data);
    } catch (error) {
      setResponse('Error fetching response, please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    chatbot: {
      fontFamily: 'Arial, sans-serif',
      margin: '20px',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9f9f9',
      maxWidth: '600px',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '1rem',
      marginBottom: '10px',
      boxSizing: 'border-box',
    },
    button: {
      padding: '10px 20px',
      fontSize: '1rem',
      color: '#fff',
      backgroundColor: '#007BFF',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    buttonDisabled: {
      backgroundColor: '#cccccc',
      cursor: 'not-allowed',
    },
    response: {
      marginTop: '20px',
      backgroundColor: '#ffffff',
      padding: '10px',
      borderRadius: '4px',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
    }
  };

  return (
    <div style={styles.chatbot}>
      <h2>AI Assistant Chatbot</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          style={styles.textarea}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your question here..."
          rows="5"
        />
        <button
          style={loading ? {...styles.button, ...styles.buttonDisabled} : styles.button}
          type="submit"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Ask'}
        </button>
      </form>
      <div style={styles.response}>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default Chatbot;
