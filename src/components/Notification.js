import React, { useState, useEffect, useContext } from 'react';
import { Toast } from 'react-bootstrap';
import { ThemeContext } from "./ThemeProvider";
function Notification({ show, onClose }) {
    const { theme, setTheme } = useContext(ThemeContext);
    const style = {
        backgroundColor: theme ? "hsl(0, 0%, 100%)" : "hsl(209, 23%, 22%)",
        color: theme ? "hsl(0, 0%, 52%)" : "white"
    };
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose(); // Close the notification after 3 seconds
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    return (
        <Toast show={show} onClose={onClose} delay={3000} autohide style={{ ...style,position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}>
            <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto">Country does not exist</strong>
                <small className="text-muted"></small>
            </Toast.Header>
            <Toast.Body>Check your spelling and try again</Toast.Body>
        </Toast>
    );
}

export default Notification;
