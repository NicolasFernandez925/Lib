import { render, screen } from '@testing-library/react';
import { ContainerEmpty } from '../../export';

describe('ContainerEmpty', () => {
  test('renders title and description', () => {
    const title = 'Test Title';
    const description = 'Test Description';
    render(<ContainerEmpty title={title} description={description} />);

    const titleElement = screen.getByText(title);
    const descriptionElement = screen.getByText(description);

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  test('renders custom icon when icon is provided', () => {
    const customIcon = <span>Custom Icon</span>;
    render(<ContainerEmpty title="Test Title" icon={customIcon} />);

    const iconElement = screen.getByText('Custom Icon');

    expect(iconElement).toBeInTheDocument();
  });
});
