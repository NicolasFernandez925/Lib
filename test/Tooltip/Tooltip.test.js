import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from '../../export';

describe('Tooltip', () => {
  test('shows tooltip on mouse enter and hides on mouse leave', async () => {
    const user = userEvent.setup();

    const content = 'Tooltip content';
    const childText = 'Hover me';

    render(
      <Tooltip content={content} classNames={{ background: 'red' }}>
        <span>{childText}</span>
      </Tooltip>
    );

    const childElement = screen.getByText(childText);
    const tooltipElement = screen.getByRole('tooltip', { hidden: true });

    await user.hover(childElement);
    await waitFor(() => {
      expect(tooltipElement).toHaveTextContent(content);
    });

    await user.unhover(childElement);
  });

  test('shows tooltip on mouse enter and hides on mouse leave3', async () => {
    const user = userEvent.setup();

    const content = 'Tooltip content';
    const childText = 'Hover me';

    const { rerender } = render(
      <Tooltip position={'left'} content={content}>
        <span>{childText}</span>
      </Tooltip>
    );

    ['top', 'right', 'bottom'].forEach((i) => {
      rerender(
        <Tooltip position={i} content={content}>
          <span>{childText}</span>
        </Tooltip>
      );
    });

    const childElement = screen.getByText(childText);
    const tooltipElement = screen.getByRole('tooltip', { hidden: true });

    await user.hover(childElement);
    await waitFor(() => {
      expect(tooltipElement).toHaveTextContent(content);
    });
  });
});
