import React from "react";
import { Navigate } from "react-router-dom";

 const ContactsProtectedRoute = ({ children }) => {
    const userId = localStorage.getItem("id");

    return (
        <React.Fragment>
            {userId ? (
                children
            ) : (
                <Navigate to={{ pathname: "/login" }} />
            )}
        </React.Fragment>
    );
};
 export default ContactsProtectedRoute;