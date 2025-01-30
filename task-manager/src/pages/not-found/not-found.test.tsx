// React import
import React from "react";

// Imports Testing tools 
import { render, screen } from "@testing-library/react";

// Import test objective page
import NotFound from "./not-found";

// Test area
describe("Check not found text", () =>
  test('should render "Not Found" text', () => {
    render(<NotFound />);
    expect(screen.getByText(/No encontrada/i)).toBeDefined();
  }));
{
}
