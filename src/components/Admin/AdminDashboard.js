import React from 'react'
import { useState, useEffect } from 'react'
import { auth, db } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { query, where, getDoc, collection } from 'firebase/firestore'
import propTypes from 'prop-types';

AdminDashBoard.propTypes
