import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ItemHeader } from '../../../export';

describe('ItemHeader', () => {
  const mockHandleChangeSelectAllRows = jest.fn();
  const mockHandleOnkeyDownSelectedAllRows = jest.fn();
  const mockHandleOnKeyDownSort = jest.fn();
  const mockHandleFilterOnClick = jest.fn();

  let user;

  const defaultProps = {
    index: 0,
    header: {
      label: 'Column 1',
      value: 'column1',
    },
    findFilter: undefined,
    isDescending: false,
    bordered: undefined,
    selectableRows: undefined,
    allRowsSelected: false,
    columnSelected: '',
    handleChangeSelectAllRows: mockHandleChangeSelectAllRows,
    handleOnkeyDownSelectedAllRows: mockHandleOnkeyDownSelectedAllRows,
    handleOnKeyDownSort: mockHandleOnKeyDownSort,
    handleFilterOnClick: mockHandleFilterOnClick,
    classCell: {},
  };

  beforeEach(() => {
    user = userEvent.setup();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the header label when not filtering or selecting rows', () => {
    render(<ItemHeader {...defaultProps} />);
    expect(screen.getByLabelText('Columna column1')).toBeInTheDocument();
  });

  test('renders the checkbox when selectableRows is true', async () => {
    const props = {
      ...defaultProps,
      header: {
        label: 'Selectable',
        value: 'column1',
      },
      allRowsSelected: true,
    };

    render(<ItemHeader {...props} selectableRows={true} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    await user.click(checkbox);

    expect(mockHandleChangeSelectAllRows).toHaveBeenCalledTimes(1);
  });

  test('calls handleOnkeyDownSelectedAllRows when a key is pressed on the checkbox', async () => {
    const props = {
      ...defaultProps,
      header: {
        label: 'Selectable',
        value: 'column1',
      },
    };
    render(<ItemHeader {...props} selectableRows={true} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.keyDown(checkbox, { key: 'Enter' });

    expect(mockHandleOnkeyDownSelectedAllRows).toHaveBeenCalledTimes(2);
  });

  test('calls handleOnKeyDownSort when a key is pressed on the header cell', () => {
    render(
      <ItemHeader
        {...defaultProps}
        findFilter={{ filter: jest.fn() }}
        header={{ label: 'Column 1', value: 'column1' }}
      />
    );

    const headerCell = screen.getByLabelText('Columna column1');
    fireEvent.keyDown(headerCell, { key: 'Enter' });
    expect(mockHandleOnKeyDownSort).toHaveBeenCalledTimes(1);
  });

  test('calls handleFilterOnClick when the header cell is clicked', async () => {
    render(
      <ItemHeader
        {...defaultProps}
        findFilter={{ filter: jest.fn() }}
        header={{ label: 'Column 1', value: 'column1' }}
        bordered={true}
        isDescending={true}
      />
    );

    const headerCell = screen.getByLabelText('Columna column1');
    await user.click(headerCell);
    expect(mockHandleFilterOnClick).toHaveBeenCalledTimes(1);
  });

  test('calls handleFilterOnClick when the header cell is cl3icked', async () => {
    const props = {
      ...defaultProps,
      header: {
        tooltip: jest.fn(),
        label: 'Column 1',
        value: 'column1',
      },
    };

    render(
      <ItemHeader
        {...props}
        findFilter={{ filter: jest.fn() }}
        bordered={true}
        isDescending={true}
      />
    );

    const headerCell = screen.getByLabelText('Columna column1');
    await user.click(headerCell);
    expect(mockHandleFilterOnClick).toHaveBeenCalledTimes(1);
  });
});
