import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ isAllowed, redirectPath = '/login', children }) {
    const location = useLocation();

    if (!isAllowed) {
        return (
            <Navigate
                to={redirectPath}
                replace
                state={{ from: location }}
            />
        );
    }

    return children;
}

// Ajoute cette ligne à la fin
export default ProtectedRoute;
