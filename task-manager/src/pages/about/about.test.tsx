// Imports React
import React from "react";

// Imports Testing tools
import { render, screen } from "@testing-library/react";

// Import test objective page
import About from "./about";

// Test area
describe("Check about text", () =>
    test('should render "Acerca de nosotros" text', () => {
      render(<About />);
      expect(screen.getByText(/Acerca de nosotros/i)).toBeDefined();
    }));
  {
  }