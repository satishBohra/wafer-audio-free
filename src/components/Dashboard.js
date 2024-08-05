import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, CircularProgress, Container, Typography, Paper } from '@mui/material';
import EventTable from './EventTable';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
    useAuth();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://myriad-admin-server.azurewebsites.net/dashboard/event', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.isSuccessful) {
                    setEvents(response.data.result.filteredRecords);
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Dashboard
                </Typography>
                <EventTable events={events} />
            </Paper>
        </Container>
    );
};

export default Dashboard;
