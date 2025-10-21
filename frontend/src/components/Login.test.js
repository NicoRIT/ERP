import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';
import { authService } from '../services/api';

jest.mock('../services/api');

describe('Login Component', () => {
  beforeEach(() => {
    render(<Login />);
  });

  test('renders role selection', () => {
    expect(screen.getByText(/Select Your Role/i)).toBeInTheDocument();
  });

  test('allows role selection', () => {
    const adminButton = screen.getByText(/Admin/i);
    fireEvent.click(adminButton);
    expect(adminButton).toHaveClass('active');
  });

  test('displays error message for invalid credentials', async () => {
    authService.login.mockRejectedValueOnce({ response: { data: { msg: 'Invalid credentials' } } });
    
    const adminButton = screen.getByText(/Admin/i);
    fireEvent.click(adminButton);
    
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'admin@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'wrongpassword' } });
    
    fireEvent.click(screen.getByText(/Login/i));
    
    expect(await screen.findByText(/Invalid credentials/i)).toBeInTheDocument();
  });

  test('redirects to the correct dashboard on successful login', async () => {
    authService.login.mockResolvedValueOnce({ data: { user: { role: 'Admin' } } });
    
    const adminButton = screen.getByText(/Admin/i);
    fireEvent.click(adminButton);
    
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'admin@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'adminpassword' } });
    
    fireEvent.click(screen.getByText(/Login/i));
    
    // Assuming you have a way to check for redirection
    // This could be a mock of useNavigate or checking the URL
  });
});
