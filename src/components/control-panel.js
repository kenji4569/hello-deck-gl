import React from 'react';

const styles = {
  wrapper: {
    backgroundColor: 'white', 
    opacity: 0.8, 
    position: 'absolute', 
    top: 10, 
    right: 10,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  }
};

// Define a panel for interactions
export default function ControlPanel({ title, action1Label, onAction1 }) {
  return (
    <div style={styles.wrapper}>
      <div>
        <text style={styles.title}>{title}</text>
      </div>
      <div>
        <button onClick={onAction1}>
          {action1Label}
        </button>
      </div>
    </div>
  )
}