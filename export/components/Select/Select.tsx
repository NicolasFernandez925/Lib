import React, {
  useState,
  useRef,
  useEffect,
  MouseEvent,
  CSSProperties,
  KeyboardEvent,
} from 'react';
import Icon from '@mdi/react';
import { mdiChevronDown, mdiAlertCircleOutline, mdiChevronUp } from '@mdi/js';
import '../../styles/global-style.css';
import './Select.css';

interface SelectOption {
  value: string;
  label: string;
}

type onChangeProps = {
  value: string;
  name: string;
};

type onErrorChangeProps = {
  error: boolean;
  name: string;
};

interface SelectInputProps {
  options: SelectOption[];
  value: string;
  onChange: ({ value, name }: onChangeProps) => void;
  error?: string;
  label?: string;
  placeHolder?: string;
  styles?: CSSProperties;
  messageRequiredField?: string;
  disabled?: boolean;
  name: string;
  onErrorChange: ({ error, name }: onErrorChangeProps) => void;
}

export const Select: React.FC<SelectInputProps> = ({
  options,
  value,
  onChange,
  error,
  label,
  placeHolder = 'Seleccione una opción',
  styles,
  messageRequiredField,
  disabled,
  onErrorChange,
  name,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [showErrorAccesibility, setShowErrorAccesibility] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);
  const optionsListRef = useRef<HTMLDivElement>(null);
  const countFocused = useRef<number>(0);

  const handleSelectChange = (selectedValue: string) => {
    onChange({ value: selectedValue, name });
    countFocused.current = 0;
    setIsOptionsOpen(false);
    setIsFocused(false);
  };

  const handleFocus = () => {
    if (!disabled) {
      setShowErrorAccesibility(false);
      setIsFocused(true);
      setIsOptionsOpen((prev) => !prev);
    }
  };

  const handleOptionClick = (selectedValue: string, event: any) => {
    event.stopPropagation();
    onErrorChange({ error: false, name });
    setShowErrorAccesibility(false);
    handleSelectChange(selectedValue);
    setIsOptionsOpen(false);
    selectRef.current?.focus();
    setSelectedIndex(-1);
  };

  const showError =
    isFocused &&
    !options.find((option) => option.value === value) &&
    !error &&
    countFocused.current === 0;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!disabled) {
      setShowErrorAccesibility(false);
      if (event.key === 'Enter') {
        setIsOptionsOpen((prev) => !prev);

        if (selectedIndex >= 0 && isOptionsOpen) {
          handleOptionClick(options[selectedIndex].value, event);
        }
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : options.length - 1
        );
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex < options.length - 1 ? prevIndex + 1 : 0
        );
      } else if (event.key === 'Escape') {
        setIsOptionsOpen(false);
        selectRef.current?.focus();
      }
    }
  };

  useEffect(() => {
    if (isOptionsOpen) {
      setSelectedIndex(options.findIndex((option) => option.value === value));
    }
  }, [isOptionsOpen, options, value]);

  useEffect(() => {
    if (disabled) return;
    const handleBlur = (event: any) => {
      event.preventDefault();
      if (!isOptionsOpen) {
        setShowErrorAccesibility(!value);
        onErrorChange({ error: !value, name });
      }
    };

    const selectElement = selectRef.current;
    if (selectElement) {
      selectElement.addEventListener('blur', handleBlur);
    }

    return () => {
      if (selectElement) {
        selectElement.removeEventListener('blur', handleBlur);
      }
    };
  }, [value, isOptionsOpen, disabled, onErrorChange, name]);

  useEffect(() => {
    const optionsList = document.querySelectorAll('.option');
    const selectedOption = optionsList[selectedIndex] as HTMLElement;
    if (selectedOption) {
      selectedOption.focus();
    }
  }, [selectedIndex, disabled]);

  useEffect(() => {
    if (disabled) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOptionsOpen(false);
        countFocused.current = 0;
      } else {
        countFocused.current = 1;
      }
    };

    const handleClickOutsideRef =
      handleClickOutside as unknown as EventListener;
    document.addEventListener('mousedown', handleClickOutsideRef);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideRef);
    };
  }, [value, disabled]);

  return (
    <div className="select-container" style={styles ? styles : {}}>
      {label && (
        <label className="select-label">
          {label}
          <span className="select-required">*</span>
        </label>
      )}
      <div
        className={`select ${disabled ? 'select-disabled' : ''} ${
          isFocused ? 'focused' : ''
        } ${showError || error || showErrorAccesibility ? 'error' : ''}`}
        onClick={handleFocus}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        ref={selectRef}
        role="combobox"
        aria-expanded={isOptionsOpen}
        aria-haspopup="listbox"
        aria-owns="options-list"
        aria-controls="options-list"
      >
        {(showError || error || showErrorAccesibility) && (
          <Icon
            className="icon-error"
            color={'var(--color-secondary-base-red)'}
            path={mdiAlertCircleOutline}
            size={1}
          />
        )}
        {isOptionsOpen ? (
          <Icon className="icon-arrow" path={mdiChevronUp} size={1} />
        ) : (
          <Icon className="icon-arrow" path={mdiChevronDown} size={1} />
        )}

        <div
          data-testid="selected-option"
          className="selected-option body-2"
          aria-labelledby="selected-option-label"
          aria-selected={isOptionsOpen}
        >
          {options.find((option) => option.value === value)?.label ||
            placeHolder}
        </div>
        {isOptionsOpen && (
          <div
            ref={optionsListRef}
            className="options-list"
            id="options-list"
            role="listbox"
          >
            {options.map((option, index) => (
              <div
                tabIndex={0}
                key={option.value}
                className={`option body-2 ${
                  option.value === value ? 'selected' : ''
                }`}
                onClick={(event) => handleOptionClick(option.value, event)}
                role="option"
                aria-selected={option.value === value}
                aria-labelledby={`option-label-${option.value}`}
                id={`option-${index}`}
              >
                <span id={`option-label-${option.value}`}>{option.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {(showError || error || showErrorAccesibility) && (
        <div id="error-message" aria-live="assertive" className="error-message">
          {error || messageRequiredField}
        </div>
      )}
    </div>
  );
};
