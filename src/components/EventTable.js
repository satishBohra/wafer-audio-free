import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

const EventTable = ({ events }) => {
    return (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
                <TableHead sx={{ bgcolor: '#1976d2' }}>
                    <TableRow>
                        <TableCell sx={{ color: '#fff' }}>Date of AI Phone Call</TableCell>
                        <TableCell sx={{ color: '#fff' }}>Phone Number</TableCell>

                        <TableCell sx={{ color: '#fff' }}>Company Name</TableCell>
                        <TableCell sx={{ color: '#fff' }}>Founder POC Name</TableCell>
                        <TableCell sx={{ color: '#fff' }}>Interested in LV Debt</TableCell>
                        <TableCell sx={{ color: '#fff' }}>Interested in Follow-up Call</TableCell>
                        <TableCell sx={{ color: '#fff' }}>Scheduled Meeting Date</TableCell>
                        <TableCell sx={{ color: '#fff' }}>Scheduled Meeting Time</TableCell>
                        <TableCell sx={{ color: '#fff' }}>Company Duration Grater Then 1 Year</TableCell>
                        <TableCell sx={{ color: '#fff' }}>Email</TableCell>
                        <TableCell sx={{ color: '#fff' }}>Summary of Call</TableCell>
                        <TableCell sx={{ color: '#fff' }}>Call End Reason</TableCell>
                        <TableCell sx={{ color: '#fff' }}>Call Picked Up by Recipient</TableCell>
                        <TableCell sx={{ color: '#fff' }}>Call Duration (Min)</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {events.map((event) => {
                        // Convert the timestamp to the desired timezone (e.g., IST)
                        const istTime = toZonedTime(new Date(event.timestamp), 'Asia/Kolkata');
                        const callDate = format(istTime, 'dd MMMM yyyy');

                        return (
                            <TableRow key={event.id}>
                                <TableCell>{callDate} Time :- {event.TimeOfAIPhoneCall}</TableCell>
                                <TableCell>{event.phoneNumber}</TableCell>

                                <TableCell>{event.companyName}</TableCell>
                                <TableCell>{event.FounderPOCName}</TableCell>
                                <TableCell>{event.InterestedInLVDebt}</TableCell>
                                <TableCell>{event.InterestedInSchedulingFollowUpCall}</TableCell>
                                <TableCell>{event.DateOfScheduledMeeting}</TableCell>
                                <TableCell>{event.TimeOfScheduledMeeting}</TableCell>
                                <TableCell>{event.CompanyDurationGreaterThan1Year}</TableCell>
                                <TableCell>{event.email}</TableCell>
                                <TableCell>{event.SummaryOfCall}</TableCell>
                                <TableCell>{event.CallEndReason}</TableCell>
                                <TableCell>{event.CallPickedUpByRecipient}</TableCell>
                                <TableCell>{event.CallDurationInMint.toFixed(2)}</TableCell>

                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EventTable;
