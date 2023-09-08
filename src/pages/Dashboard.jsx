import PresentUsersWrapper from '../widgets/PresentUsersWrapper/PresentUsersWrapper';
import SensorReadingsWrapper from '../widgets/SensorReadingsWrapper/SensorReadingsWrapper';
import { useVariant } from '../hooks/useVariant.js';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
    const variant = useVariant();

    if (variant === 'colibri') {
        return (<Navigate to="/doors" />);
    }

    return (<>
        <PresentUsersWrapper />
        <SensorReadingsWrapper />
    </>);
};

export default Dashboard;
