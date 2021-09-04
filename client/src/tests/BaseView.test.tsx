import React from "react";
import { render, screen } from "@testing-library/react";
import BaseView from "../views/BaseView";

test("check that jest is working", () => {
    expect(1).toBe(1);
});

test("renders BaseView", () => {
    render(<BaseView />);
    const textElement = screen.getByText(/hello world/i);
    expect(textElement).toBeInTheDocument();
});
