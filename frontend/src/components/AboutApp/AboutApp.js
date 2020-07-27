import React, { useState, useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Link, useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const AboutApp = () => {
  return (
    <div>
      <h2>AboutApp</h2>
      <h3>What does this do?</h3>
      <p>blah blah blah</p>
      
      <h3>How do i use it?</h3>
      <p>blah blah blah</p>

      <h3>Getting Started</h3>
      <p>blah blah blah</p>
    </div>
  );
};

export default AboutApp;
