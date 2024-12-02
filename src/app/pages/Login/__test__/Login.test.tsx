import { render, screen } from '@testing-library/react';
import Login from '../Login';

describe('Login Component', () => {
    it('should render the LoginCard component', () => {
        render(<Login />);

        const loginCardElement = screen.getByTestId('login-card');
        expect(loginCardElement).toBeInTheDocument();
    });
});
