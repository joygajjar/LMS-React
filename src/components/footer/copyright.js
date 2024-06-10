import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

export const FooterRow = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const { t } = useTranslation();
   
    useEffect(() => {
        // Update the year when the component mounts
        setYear(new Date().getFullYear());
    }, []);
   
    return (
        <React.Fragment>
            <div className="copyright bg-primary py-3">
                <p className="text-white mb-0">
                    {t('Copyright © 2024. All Rights Reserved', { year })} | {t('Education Department')}, {t('Government of Uttar Pradesh')}
                </p>
            </div>
        </React.Fragment>
    );
};
