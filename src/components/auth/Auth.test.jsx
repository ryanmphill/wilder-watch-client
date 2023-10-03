import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import { Login } from './Login';
import { Register } from './Register';

describe('Login Page', () => {
    it('Renders Login Page', () => {

        render(<AuthProvider>
            <Login title="Login" />
        </AuthProvider>, { wrapper: BrowserRouter });

        expect(screen.getByLabelText('Username')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();

        // check if Login component renders properly with title displayed
    });
});

describe('Register Page', () => {
    it('Renders Register Page', () => {

        render(<AuthProvider>
            <Register title="Register" />
        </AuthProvider>, { wrapper: BrowserRouter });

        expect(screen.getByLabelText('Username')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByLabelText('First Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();

        // check if Login component renders properly with title displayed
    });
});

describe('Register Validation', () => {
    it('Provides useful feedback to user when register form input is invalid', async () => {

        const user = userEvent.setup()
        
        render(<AuthProvider>
            <Register title="Register" />
        </AuthProvider>, { wrapper: BrowserRouter });

        await user.click(screen.getByRole('button', {name: "Submit"}))

        expect(screen.getByText('** Please ensure all fields are filled in **')).toBeInTheDocument();

        // check if error messages are presented to user when submitting a blank form
    });
});