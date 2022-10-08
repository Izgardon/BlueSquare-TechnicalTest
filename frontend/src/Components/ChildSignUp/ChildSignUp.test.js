import React, { useState } from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';
import { BrowserRouter } from 'react-router-dom';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Fetch from './fetch';

import { ChildSignUpModal } from '.';

describe('ChildSignUp', () => {
    test('username input value is updated', () => {
        const { getByLabelText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <ChildSignUpModal />
                </BrowserRouter>
            </Provider>
        );
        const usernameInput = getByLabelText('username');
        fireEvent.change(usernameInput, { target: { value: 'Fred' } });
        expect(usernameInput.value).toBe('Fred');
    });

    test('email input value is picked up', () => {
        const { getByLabelText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <ChildSignUpModal />
                </BrowserRouter>
            </Provider>
        );
        const emailInput = getByLabelText('email');
        fireEvent.change(emailInput, { target: { value: 'fred@gmail.com' } });
        expect(emailInput.value).toBe('fred@gmail.com');
    });

    test('setPassword value is updated', () => {
        const { getByLabelText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <ChildSignUpModal />
                </BrowserRouter>
            </Provider>
        );
        const passwordInput = getByLabelText('password');
        fireEvent.change(passwordInput, { target: { value: 'beautiful' } });
        expect(passwordInput.value).toBe('beautiful');
    });

    test('setConfirmPassword value is updated', () => {
        const { getByLabelText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <ChildSignUpModal />
                </BrowserRouter>
            </Provider>
        );
        const setConfirmPasswordInput = getByLabelText('confirm-password');
        fireEvent.change(setConfirmPasswordInput, {
            target: { value: 'beautiful' },
        });
        expect(setConfirmPasswordInput.value).toBe('beautiful');
    });

    test('toggle button exists for switching to login modal', () => {
        const { getByLabelText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <ChildSignUpModal />
                </BrowserRouter>
            </Provider>
        );
        const toggleButton = getByLabelText('toggle-to-log-in');
        fireEvent.click(toggleButton);
        expect(toggleButton).toBeInTheDocument();
    });
});

const server = setupServer(
    rest.post('/users/register', (req, res, ctx) => {
        return res(
            ctx.json({
                msg: 'You have successfully created a new account. Try to Login!',
            })
        );
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('allows the user to sign up', async () => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <ChildSignUpModal url="/users/register" />
            </BrowserRouter>
        </Provider>
    );

    const signupButton = screen.getByRole('button', { name: 'Sign up' });

    fireEvent.click(signupButton);

    await waitFor(() => screen.getByTestId('signup'));

    expect(screen.getByTestId('signup')).toHaveTextContent('Sign up');
});

test('', async () => {
    const { getByLabelText } = render(
        <Provider store={store}>
            <BrowserRouter>
                <ChildSignUpModal url="/users/login" />
            </BrowserRouter>
        </Provider>
    );

    const usernameInput = getByLabelText('username');
    const emailInput = getByLabelText('email');
    const passwordInput = getByLabelText('password');

    fireEvent.change(usernameInput, { target: { value: 'wolf' } });
    fireEvent.change(emailInput, { target: { value: 'wolf@wolf' } });
    fireEvent.change(passwordInput, { target: { value: 'wolf' } });

    const signupButton = screen.getByRole('button', { name: 'Sign up' });

    fireEvent.click(signupButton);

    await waitFor(() => screen.queryByText('Sign up'));

    expect(signupButton).toHaveTextContent('Sign up');
});
