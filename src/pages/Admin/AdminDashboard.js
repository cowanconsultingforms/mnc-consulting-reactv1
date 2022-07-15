import React from 'react'
import { useState, useEffect } from 'react'
import { auth, db } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { query, where, getDoc, collection } from 'firebase/firestore'

export const AdminDashboard = () => {
    const [ user, loading, error ] = useAuthState(auth);
    const navigate = useNavigate();
    const [ admin, setAdmin ] = useState(false);
    const checkAdmin = async () => {
    }
    useEffect(() => {
        
    })
}
export default AdminDashboard;