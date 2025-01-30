/**
 * @jest-environment jsdom
 */

// Import React
import React from "react";

// Imports Testing Tools
import { render, screen } from "@testing-library/react";

// Import test objective page
import Home from "./home";

// Test area
describe("Check welcome text", () =>
  test('should render "Bienvenido" text', () => {
    render(<Home />);
    expect(screen.getByText(/Bienvenido/i)).toBeDefined();
  }));
{
}
