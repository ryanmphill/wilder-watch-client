import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom';
import { NavBar } from './NavBar';
import { AuthProvider } from '../../context/AuthContext';

describe('NavBar', () => {
    it('renders Navbar', () => {

        render(<AuthProvider>
            <NavBar title="NavBar" />
        </AuthProvider>, { wrapper: BrowserRouter });

        expect(screen.getByText('WilderWatch')).toBeInTheDocument();

        // check if NavBar component renders properly with title displayed
    });
});

describe('DropDownMenu', () => {
    it('Renders dropdown menu when user clicks hamburger', async () => {

        const user = userEvent.setup()

        render(<AuthProvider>
            <NavBar title="NavBar" />
        </AuthProvider>, { wrapper: BrowserRouter });

        await user.click(screen.getByRole('button', {name: "hamburger menu"}))
        expect(screen.getByText('Home')).toBeInTheDocument();

        // check if NavBar component renders Dropdown menu when user clicks button
    });
});