import React from 'react';
import TableSearchModule from "./TableSearchModule";
import IconsViewModule from "./IconsViewModule";
import DetailsViewModule from "./DetailsViewModule";
import { Routes, Route } from "react-router-dom";

function BaseRouteModule() {
    return (
        <Routes>
            <Route path="/" element={<IconsViewModule />} />
            <Route path="*" element={<IconsViewModule />} />
            <Route path="/detailsViewModule" element={<DetailsViewModule />} />
        </Routes>
    );
}

export default BaseRouteModule;
