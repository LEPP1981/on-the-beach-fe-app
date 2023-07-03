import React from 'react';
import { render, screen, act } from '@testing-library/react';
import TravelBundles from '../components/otb-sorted-bundles';

describe('TravelBundles Component', () => {
  test('renders sorting options', () => {
    render(<TravelBundles />);

    // Check if sorting options are rendered
    const priceOption = screen.getByText(/Sort by Price/i);
    const alphabeticalOption = screen.getByText(/Sort Alphabetically/i);
    const ratingOption = screen.getByText(/Sort by Star Rating/i);

    expect(priceOption).toBeInTheDocument();
    expect(alphabeticalOption).toBeInTheDocument();
    expect(ratingOption).toBeInTheDocument();
  });

  test('renders bundle cards', async () => {
    render(<TravelBundles />);
  
    setTimeout(() => {
      const bundleCards = screen.queryAllByTestId('bundle-card');
      console.log('Number of bundle cards:', bundleCards.length);
      expect(bundleCards.length).toBeGreaterThan(0);
    }, 1000); // Wait for 1 second before making the assertion
  });
  

  test('changes sorting option', () => {
    render(<TravelBundles />);

    // Click on sorting options
    const priceOption = screen.getByText(/Sort by Price/i);
    const alphabeticalOption = screen.getByText(/Sort Alphabetically/i);
    const ratingOption = screen.getByText(/Sort by Star Rating/i);

    // Check if the default active option is "price"
    expect(priceOption).toHaveClass('active');

    // Click on "alphabetically" option
    act(() => {
      alphabeticalOption.click();
    });
    expect(alphabeticalOption).toHaveClass('active');
    expect(priceOption).not.toHaveClass('active');
    expect(ratingOption).not.toHaveClass('active');

    // Click on "rating" option
    act(() => {
      ratingOption.click();
    });
    expect(ratingOption).toHaveClass('active');
    expect(alphabeticalOption).not.toHaveClass('active');
    expect(priceOption).not.toHaveClass('active');
  });
});
