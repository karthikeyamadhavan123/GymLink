import React from "react";
import Footer from "../components/Footer";

interface ChildrenProps {
    children: React.ReactNode; // Supports multiple elements and text
}

const Layout: React.FC<ChildrenProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
