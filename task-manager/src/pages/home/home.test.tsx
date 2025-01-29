/**
 * @jest-environment jsdom
 */
import React from "react";

import { render, screen } from "@testing-library/react";
import Home from "./home";

test('should render "Bienvenido" text', () => {
  render(<Home />);
  expect(screen.getByText(/Bienvenido/i)).toBeDefined();
});
