// src/components/EventDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

function EventDetails({ events }) {
    const { id } = useParams();
    const event = events.find((e) => e.id === id);

    if (!event) return <p>Event not found!</p>;

    return (
        <div className="event-details">
            <h2>Event Details for {event.companyName}</h2>
            <p><strong>Founder:</strong> {event.FounderPOCName}</p>
            <p><strong>Phone:</strong> {event.phoneNumber}</p>
            <p><strong>Email:</strong> {event.email}</p>
            <p><strong>Call Duration:</strong> {event.CallDurationInMint} minutes</p>
            <p><strong>Scheduled Meeting:</strong> {event.DateOfScheduledMeeting} at {event.TimeOfScheduledMeeting}</p>
            <p><strong>Summary:</strong> {event.SummaryOfCall}</p>
            <p><strong>Call End Reason:</strong> {event.CallEndReason}</p>
        </div>
    );
}

export default EventDetails;
