import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

describe('App Rendering', () => {
  test('renders HomePage content after loading', async () => {
    render(<App/>);
    await waitFor(() => {
      expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
      expect(screen.getByText(/Search recipes/i)).toBeInTheDocument();
    });
  });

});