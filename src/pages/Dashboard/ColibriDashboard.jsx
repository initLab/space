import { useTranslation } from 'react-i18next';

const ColibriDashboard = () => {
    const { t } = useTranslation();

    return (<>
        <p>{t('views.dashboard.colibri_message_info')}</p>
        <p>{t('views.dashboard.colibri_message_contact')}</p>
        <p>{t('views.dashboard.colibri_message_emergency')}</p>
    </>);
};

export default ColibriDashboard;
