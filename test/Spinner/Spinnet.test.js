import { render, screen } from '@testing-library/react';
import { Spinner } from '../../export';

describe('Spinner', () => {
  test('renders spinner', () => {
    render(<Spinner styles={{ height: '100p' }} />);

    const spinnerElement = screen.getByRole('status');

    expect(spinnerElement).toBeInTheDocument();
  });

  test('render spiner without styles', () => {
    render(<Spinner />);

    const spinnerElement = screen.getByRole('status');

    expect(spinnerElement).toBeInTheDocument();
  });
});
