import React from 'react';
import { render } from '@testing-library/react';
import Login from './Login';

describe('Login component', () => {
  test('should render without errors', () => {
    render(<Login />);
    // If the component renders without throwing any errors, the test passes
  });
});