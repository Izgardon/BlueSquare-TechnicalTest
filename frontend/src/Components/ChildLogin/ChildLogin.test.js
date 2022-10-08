import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React, { useSelector } from "react";
import store from "../../store";

import { rest, setupWorker } from "msw";
import { setupServer } from "msw/node";

import "@testing-library/jest-dom";

import { ChildLoginModal } from "./index";
import { Navbar } from "../Navbar";

import Fetch from "./fetch";

describe("ChildLogin", () => {
  test("email input value is updated", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ChildLoginModal />
        </BrowserRouter>
      </Provider>
    );
    const emailInput = getByLabelText("login-email");
    fireEvent.change(emailInput, { target: { value: "Fred@test.com" } });
    expect(emailInput.value).toBe("Fred@test.com");
  });
  test("setPassword value is updated", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ChildLoginModal />
        </BrowserRouter>
      </Provider>
    );
    const passwordInput = getByLabelText("password");
    fireEvent.change(passwordInput, { target: { value: "beautiful" } });
    expect(passwordInput.value).toBe("beautiful");
  });
  test("create account button exists", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ChildLoginModal />
        </BrowserRouter>
      </Provider>
    );
    expect(
      screen.getByRole("button", { name: "toggle-to-sign-up" })
    ).not.toBeDisabled();
  });
  test("toggle button exists for switching to signup modal", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ChildLoginModal />
        </BrowserRouter>
      </Provider>
    );
    const toggleButton = getByRole("button", {
      name: "toggle-to-sign-up",
    });
    fireEvent.click(toggleButton);
    expect(toggleButton).toBeInTheDocument();
  });
});

// describe('ChildLogin following msw example', () => {
//     const worker = setupWorker(rest.post('/users/login'), (req, res, ctx) => {
//         return res(ctx.json({ userInput: 'bunny' }));
//     });
//     const server = setupServer(
//         rest.post('/users/login', (req, res, ctx) => {
//             return res(ctx.json({ token: 'mocked_user_token' }));
//         })
//     );

//     beforeAll(() => server.listen());
//     afterEach(() => server.resetHandlers());
//     afterAll(() => server.close());

//     test('allows the user to log in', async () => {
//         render(
//             <Provider store={store}>
//                 <BrowserRouter>
//                     <ChildLoginModal />
//                 </BrowserRouter>
//             </Provider>
//         );
//         userEvent.type(screen.getByLabelText('login-email'), 'bunny');

//         userEvent.type(screen.getByLabelText('password'), 'secret');

//         fireEvent.click(
//             screen.getByRole('button', {
//                 name: 'Sign in',
//             })
//         );
//         const button = await screen.findByRole('button', {
//             name: 'Sign in',
//         });

//         // Assert successful login state
//         expect(button).toHaveTextContent(/Sign in/i);
//         window.sessionStorage.setItem('token', 'mocked_user_token');
//         expect(window.sessionStorage.getItem('token')).toEqual(
//             'mocked_user_token'
//         );
//     });
// });

// test('handles login exception', () => {
//     server.use(
//         rest.post('/users/login', (req, res, ctx) => {
//             return res(
//                 ctx.status(500),
//                 ctx.json({ message: 'Internal Server Error' })
//             );
//         })
//     );
// });

const server = setupServer(
  rest.get("/users/login", (req, res, ctx) => {
    return res(ctx.json({ greeting: "succcess" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("on signin modal sign in button exists", async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ChildLoginModal url="/users/login" />
      </BrowserRouter>
    </Provider>
  );

  const signinButton = screen.getByRole("button", { name: "Sign in" });

  expect(signinButton).toBeInTheDocument();
});

test("loads and displays greeting", async () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <BrowserRouter>
        <ChildLoginModal url="/users/login" />
      </BrowserRouter>
    </Provider>
  );

  const emailInput = getByLabelText("login-email");
  const passwordInput = getByLabelText("password");

  fireEvent.change(emailInput, { target: { value: "23" } });
  fireEvent.change(passwordInput, { target: { value: "23" } });

  const signinButton = screen.getByRole("button", { name: "Sign in" });

  fireEvent.click(signinButton);

  await waitFor(() => screen.queryByTestId("login-error"));

  expect(screen.queryByTestId("login-error")).not.toBeInTheDocument();
});
