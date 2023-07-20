import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from '../../export';

describe('Select', () => {
  let user;
  let options;
  let onChangeMock;
  let onErrorChangeMock;
  let rerender;

  beforeEach(() => {
    user = userEvent.setup();
    onChangeMock = jest.fn();
    onErrorChangeMock = jest.fn();
    options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ];
    // eslint-disable-next-line testing-library/no-render-in-setup
    const { rerender: rerenderFn } = render(
      <Select
        options={options}
        onChange={onChangeMock}
        onErrorChange={onErrorChangeMock}
        name="select"
      />
    );
    rerender = rerenderFn;
  });

  test('shows options list on click and selects option on click', async () => {
    const selectElement = screen.getByRole('combobox');

    await user.click(selectElement);

    const optionElement = await screen.findByRole('option', {
      name: 'Option 3',
    });

    const optionsListElement = await screen.findByRole('listbox');

    expect(optionsListElement).toBeInTheDocument();

    await user.click(optionElement);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith({
      name: 'select',
      value: 'option3',
    });
  });

  test('Focus should be placed on the combobox elements via keyboard arrow navigation', async () => {
    const selectElement = screen.getByRole('combobox');

    await user.click(selectElement);

    fireEvent.keyDown(selectElement, { key: 'ArrowDown' });
    expect(
      await screen.findByRole('option', { name: 'Option 1' })
    ).toHaveFocus();

    fireEvent.keyDown(selectElement, { key: 'ArrowUp' });
    expect(
      await screen.findByRole('option', { name: 'Option 3' })
    ).toHaveFocus();

    fireEvent.keyDown(selectElement, { key: 'ArrowUp' });
    expect(
      await screen.findByRole('option', { name: 'Option 2' })
    ).toHaveFocus();

    fireEvent.keyDown(selectElement, { key: 'Escape' });

    const optionsListElement = screen.queryByRole('listbox');

    expect(optionsListElement).not.toBeInTheDocument();
  });

  test('The element should be displayed in the combobox when navigating with the keyboard and pressing ENTER on a combo option', async () => {
    const selectElement = screen.getByRole('combobox');

    await user.click(selectElement);

    fireEvent.keyDown(selectElement, { key: 'ArrowDown' });
    expect(
      await screen.findByRole('option', { name: 'Option 1' })
    ).toHaveFocus();

    fireEvent.keyDown(selectElement, { key: 'Enter' });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith({
      name: 'select',
      value: 'option1',
    });
  });

  test('Should not perform any action when a keyboard key is pressed that is not valid for user interaction', async () => {
    const selectElement = screen.getByRole('combobox');

    await user.click(selectElement);

    fireEvent.keyDown(selectElement, { key: 'ArrowDown' });
    expect(
      await screen.findByRole('option', { name: 'Option 1' })
    ).toHaveFocus();

    fireEvent.keyDown(selectElement, { key: 'OtherKey' });

    expect(onChangeMock).not.toHaveBeenCalledTimes(1);
    expect(onChangeMock).not.toHaveBeenCalledWith('option1');
  });

  test('No element should be selected if the ENTER key was pressed and without first having pressed any of the arrow keys to select an element of the combo', async () => {
    const selectElement = screen.getByRole('combobox');

    await user.click(selectElement);

    fireEvent.keyDown(selectElement, { key: 'Enter' });
    expect(
      screen.queryByRole('option', { name: 'Option 1' })
    ).not.toBeInTheDocument();
  });

  test('It should not be possible to click on the combobox since it has the disabled value', async () => {
    const selectElement = screen.getByRole('combobox');
    rerender(<Select options={options} disabled onChange={onChangeMock} />);
    await user.click(selectElement);

    fireEvent.keyDown(selectElement, { key: 'Enter' });

    const optionsListElement = screen.queryByRole('listbox');

    expect(optionsListElement).not.toBeInTheDocument();
  });

  test('It should n3ot be possible to click on the combobox since it has the disabled value', async () => {
    rerender(
      <Select
        options={options}
        error="Error message select"
        onChange={onChangeMock}
      />
    );

    const errorMessage = await screen.findByText('Error message select');

    expect(errorMessage).toBeInTheDocument();
  });
});
