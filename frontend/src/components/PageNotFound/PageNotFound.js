import React, { useState, useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy';
import { v4 as uuid  } from 'uuid';

const PageNotFound = () => {
  return (
    <div>
      <h2>PageNotFound</h2>
    </div>
  );
};

export default PageNotFound;
