import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ItemRow } from '../../../export';

describe('ItemRow', () => {
  const mockActionColumnChange = jest.fn();
  const mockHandleActionColumn = jest.fn();
  const mockActionColumnKeyDown = jest.fn();
  const mockClickeableRow = jest.fn();
  const setLabel = jest.fn();

  let user;

  const defaultProps = {
    headers: [
      {
        label: 'Column 1',
        value: 'column1',
      },
    ],
    alternateRowColor: undefined,
    rowIndex: 0,
    classRowGrid: undefined,
    defaultStyleTable: {},
    bordered: undefined,
    classCell: {},
    data: [],
    row: { id: '1' },
    selectableRows: undefined,
    actionColumnChange: mockActionColumnChange,
    handleActionColumn: mockHandleActionColumn,
    actionColumnKeyDown: mockActionColumnKeyDown,
    label: 'Label',
    setLabel: setLabel,
    hoveredRow: undefined,
    clickeableRow: mockClickeableRow,
  };

  beforeEach(() => {
    user = userEvent.setup();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('render itemRow', () => {
    const props = {
      ...defaultProps,
      headers: [
        {
          label: 'Columna 1',
          value: 'Columna 1',
          ariaGetter: jest.fn(),
        },
      ],
    };
    render(<ItemRow {...props} />);
    expect(screen.getByRole('cell')).toBeInTheDocument();
  });

  test('The event function column should be called when the enter key is pressed on a cell', async () => {
    const props = {
      ...defaultProps,
      headers: [
        {
          label: 'Selectable',
          value: 'Selectable',
          valueGetter: jest.fn(),
        },
      ],
      classRowGrid: {
        gridTemplateColumns: '1fr 1fr',
      },
      alternateRowColor: true,
      bordered: true,
      hoveredRow: true,
      selectableRows: true,
    };
    render(<ItemRow {...props} />);

    const cell = screen.getByRole('cell');
    fireEvent.keyDown(cell, { key: 'Enter' });

    await user.hover(cell);
    await user.unhover(cell);

    expect(mockActionColumnKeyDown).toHaveBeenCalledTimes(1);
  });

  test('The event function column should be called when the click is pressed in a cell', async () => {
    const props = {
      ...defaultProps,
      headers: [
        {
          label: 'Selectable',
          value: 'Selectable',
        },
      ],
      classRowGrid: {
        gridTemplateColumns: '1fr 1fr',
      },
      alternateRowColor: true,
      bordered: true,
      hoveredRow: true,
      selectableRows: true,
    };
    render(<ItemRow {...props} />);

    const cell = screen.getByRole('cell');
    await user.click(cell);

    expect(mockActionColumnChange).toHaveBeenCalledTimes(1);
  });

  test('It should render the component provided in renderComponent', async () => {
    const props = {
      ...defaultProps,
      headers: [
        {
          label: 'Action',
          value: 'Action',
          renderComponent: jest
            .fn()
            .mockReturnValue(<div>renderComponent</div>),
        },
      ],
    };
    render(<ItemRow {...props} />);
    const renderComponent = screen.getByText('renderComponent');
    expect(renderComponent).toBeInTheDocument();
  });

  test('The clickeableRow function should be called when a click is made on the row', async () => {
    render(<ItemRow {...defaultProps} />);
    const row = screen.getByRole('row');
    await user.click(row);
    expect(defaultProps.clickeableRow).toHaveBeenCalledTimes(1);
  });
});
