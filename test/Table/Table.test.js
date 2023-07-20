import { render, screen, waitFor, within } from '@testing-library/react';
import TableWithForwardRef from '../../export/components/Table/Table';
import userEvent from '@testing-library/user-event';

const headers = [
  { label: 'Name', value: 'name' },
  { label: 'Age', value: 'age' },
];
const data = [
  { id: '1', Name: 'John Doe', Age: 25 },
  { id: '2', Name: 'Jane Smith', Age: 30 },
];

jest.mock('../../export/components/Table/hooks', () => ({
  ...jest.requireActual('../../export/components/Table/hooks'),
  useResizable: () => {},
  useSelectableRows: () => {},
  usePagination: () => ({
    currentItems: data,
    currentPage: 1,
    totalPages: 1,
    handlePageChange: jest.fn(),
    currentItemsPerPage: 5,
    setCurrentItemsPerPage: jest.fn(),
    canGoPrevious: true,
    canGoNext: true,
    setCurrentPage: jest.fn(),
  }),
}));

describe('Table', () => {
  const defaultProps = {
    headers,
    data,
    classCell: { padding: '20px' },
    bordered: true,
    filters: [
      {
        column: 'Name',
        filter: jest.fn(),
      },
    ],
    itemsPerPage: 5,
    showPagination: true,
    alternateRowColor: true,
    classHeaderGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 3fr 1fr 1fr 1.5fr 1fr 1fr',
    },
    classRowGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 3fr 1fr 1fr 1.5fr 1fr 1fr',
    },
    heigth: '500px',
    footer: <div>Footer</div>,
    selectableRows: true,
    onSelectedRowsChange: jest.fn(),
    isLoading: false,
    triggerData: true,
    generateScroll: true,
    headerFixed: true,
    componentLoading: <div>Loading...</div>,
    componentWithoutData: <div>No data available</div>,
    hoveredRow: '1',
  };

  test('renders the table component with mocked dependencies', () => {
    render(<TableWithForwardRef {...defaultProps} />);

    expect(screen.getByText('resultados')).toBeInTheDocument();
    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  test('should domponent container loading', async () => {
    const props = {
      ...defaultProps,
      isLoading: true,
    };
    render(<TableWithForwardRef {...props} />);

    const loading = screen.getByText('Loading...');

    expect(loading).toBeInTheDocument();
  });

  test('should domponent container empty', async () => {
    const props = {
      ...defaultProps,
      isLoading: false,
      data: [],
      triggerData: false,
    };
    render(<TableWithForwardRef {...props} />);

    const containerEmpty = screen.getByText('No data available');

    expect(containerEmpty).toBeInTheDocument();
  });

  test('triggers onClick when ItemHeader is clicked', async () => {
    const user = userEvent.setup();

    render(<TableWithForwardRef {...defaultProps} />);
    const itemHeader = screen.getAllByTestId('item-header')[0];
    await user.click(itemHeader);

    expect(defaultProps.filters[0].filter).toHaveBeenCalledTimes(1);
  });

  test('You should be able to click in the header checkbox to select/deselect all rows', async () => {
    const user = userEvent.setup();

    const props = {
      ...defaultProps,
      headers: [
        ...defaultProps.headers,
        { label: 'Selectable', value: 'Selectable' },
      ],
    };
    render(<TableWithForwardRef {...props} />);
    const itemRowWithCheckbox = screen.getAllByTestId('item-header')[2];
    const check = within(itemRowWithCheckbox).getByRole('checkbox');

    await user.click(check);

    expect(check.checked).toBe(true);
  });

  test('You should be able to hit enter in the header checkbox to select/deselect all rows', async () => {
    const user = userEvent.setup();

    const props = {
      ...defaultProps,
      headers: [
        ...defaultProps.headers,
        { label: 'Selectable', value: 'Selectable' },
      ],
    };
    render(<TableWithForwardRef {...props} />);
    const itemRowWithCheckbox = screen.getAllByTestId('item-header')[2];
    const check = within(itemRowWithCheckbox).getByRole('checkbox');

    const itemRow = screen.getAllByRole('row')[0];
    const headerCell = within(itemRow).getAllByRole('cell')[2];

    await user.type(headerCell, '{enter}');
    await user.click(headerCell);

    await user.type(check, '{enter}');

    await waitFor(() => expect(check.checked).toBe(true));
  });
});
