import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TermsConditionsPresenter from "./TermsPresenter";
import { termsData } from "@/utils/terms";

const TermsConditionsContainer = () => {
    const [activeSection, setActiveSection] = useState<string>('');
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const navigate = useNavigate();

    // Reset scroll position on mount
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, []);

    // Handle scroll for navbar styling
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Static terms data (will be fetched from DB later)


    const handleSectionClick = (sectionId: string) => {
        setActiveSection(activeSection === sectionId ? '' : sectionId);
    };

    const handleBackToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleContactSupport = () => {
        // Navigate to contact or support page
        navigate('/support');
    };

    return (
        <TermsConditionsPresenter
            termsData={termsData}
            activeSection={activeSection}
            isScrolled={isScrolled}
            onSectionClick={handleSectionClick}
            onBackToTop={handleBackToTop}
            onGoBack={handleGoBack}
            onContactSupport={handleContactSupport}
        />
    );
};

export default TermsConditionsContainer;