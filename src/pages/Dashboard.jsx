import { useVariant } from '../hooks/useVariant.js';
import InitLabDashboard from './Dashboard/InitLabDashboard.jsx';
import ColibriDashboard from './Dashboard/ColibriDashboard.jsx';

const Dashboard = () => {
    const variant = useVariant();

    return (<>
        {variant === 'initlab' && <InitLabDashboard />}
        {variant === 'colibri' && <ColibriDashboard />}
    </>);
};

export default Dashboard;
