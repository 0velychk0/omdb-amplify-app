import React from 'react';
import TableSearchModule from "./TableSearchModule";
import DetailsViewModule from "./DetailsViewModule";
import { Routes, Route } from "react-router-dom";

function BaseRouteModule() {
    return (
        <Routes>
            <Route path="/" element={<TableSearchModule />} />
            <Route path="*" element={<TableSearchModule />} />
            <Route path="/detailsViewModule" element={<DetailsViewModule />} />
        </Routes>
    );
}

export default BaseRouteModule;
