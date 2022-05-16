import React from 'react';
import IconsViewModule from "./pages/IconsViewModule";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";

import { Routes, Route } from "react-router-dom";

function BaseRouteModule() {
    return (
        <Routes>
            <Route path="/" element={<IconsViewModule />} />
            <Route path="*" element={<IconsViewModule />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
        </Routes>
    );
}

export default BaseRouteModule;
