import '@testing-library/jest-dom';
// @ts-ignore
import { render } from '@testing-library/react';
import App from '../renderer/Drive';

describe('App', () => {
  it('should render', () => {
    expect(render(<App />)).toBeTruthy();
  });
});
