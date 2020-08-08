import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Link, useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import AuthButton from "../AuthButtons/AuthButtons";

const Settings = () => {
  return (
    <div>
      <h2>Settings</h2>

      <h3>Logout?</h3>
      <AuthButton />
    </div>
  );
};

export default Settings;
