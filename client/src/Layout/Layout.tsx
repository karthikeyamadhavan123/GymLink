import React from "react";


interface ChildrenProps {
    children: React.ReactNode; // Supports multiple elements and text
}

const Layout: React.FC<ChildrenProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">{children}</main>
        </div>
    );
};

export default Layout;
