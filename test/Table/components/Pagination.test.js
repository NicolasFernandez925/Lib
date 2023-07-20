import { render, screen } from '@testing-library/react';
import { Pagination } from '../../../export';
import userEvent from '@testing-library/user-event';

describe('Pagination', () => {
  let user;
  const mockPagination = {
    setCurrentPage: jest.fn(),
    setCurrentItemsPerPage: jest.fn(),
    canGoPrevious: true,
    handlePageChange: jest.fn(),
    currentPage: 1,
    totalPages: 5,
    canGoNext: true,
    currentItemsPerPage: 10,
  };

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<Pagination {...mockPagination} />);
    user = userEvent.setup();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders pagination buttons correctly', async () => {
    const previousButton = screen.getByLabelText('Página anterior');
    const nextButton = screen.getByLabelText('Página siguiente');

    expect(previousButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    await user.click(previousButton);
    await user.click(nextButton);

    expect(mockPagination.handlePageChange).toHaveBeenCalledTimes(2);
    expect(mockPagination.handlePageChange).toHaveBeenCalledWith(0);
    expect(mockPagination.handlePageChange).toHaveBeenCalledWith(2);
  });

  it('renders page buttons correctly', async () => {
    const pageButtons = screen.getAllByRole('button', {
      name: /Ir a la página/i,
    });

    expect(pageButtons.length).toBe(5);

    await user.click(pageButtons[2]);

    expect(mockPagination.handlePageChange).toHaveBeenCalledTimes(1);
  });

  it('renders select element correctly', async () => {
    const selectElement = screen.getByRole('combobox');

    await userEvent.selectOptions(selectElement, '15');

    expect(mockPagination.setCurrentPage).toHaveBeenCalledTimes(1);
    expect(mockPagination.setCurrentPage).toHaveBeenCalledWith(1);
    expect(mockPagination.setCurrentItemsPerPage).toHaveBeenCalledTimes(1);
    expect(mockPagination.setCurrentItemsPerPage).toHaveBeenCalledWith(15);
  });
});
