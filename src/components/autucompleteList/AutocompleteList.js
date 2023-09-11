import { useCallback, useEffect, useState } from 'react';
import { SuggestionsList } from './components/suggestionsList/SuggestionsList.js';
import { displayItem as displayItemDefault } from './AutocompleteList.utils.js';
import styles from './AutocompleteList.module.css';

const AutocompleteList = ({ items, displayItem = displayItemDefault, onChange, loading, value, onSelect }) => {
  const [isShowSuggestionsList, setIsShowSuggestionsList] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  useEffect(() => {
    setCurrentValue(value);
  }, [value, setCurrentValue]);

  useEffect(() => {
    setIsShowSuggestionsList(true);
  }, [items]);
  
  const handleOnSelect = useCallback((item) => {
    onSelect(item);
    setIsShowSuggestionsList(false);
  }, [onSelect, setIsShowSuggestionsList]);

  const handleOnEsc = () => {
    setCurrentValue(value);
    setIsShowSuggestionsList(false);
  };

  const onClear = () => { 
    setIsShowSuggestionsList(false);
    onChange('');
    onSelect(null);
  };

  return (
    <div className={`${styles.autocompleteList} ${loading ? styles.autocompleteListLoading : ''}`}>
      <div className={styles.autocompleteListInputSection}>
        <div className={styles.autocompleteListSearchIcon}>
          {loading ? `🔃` : `🔎`}
        </div>
        <input 
          value={currentValue}
          className={`${styles.autocompleteListInput} ${loading ? styles.autocompleteListInputLoading : ''}`}
          onChange={(e) => onChange(e.target.value)}
        />
        <div
          onClick={onClear}
          className={`${styles.autocompleteListClearIcon}`}>
          ✖
        </div>
      </div>
      {
        (isShowSuggestionsList && !loading && items) && (<SuggestionsList 
          items={items} 
          displayItem={displayItem}
          handleOnSelect={handleOnSelect}
          onEsc={handleOnEsc}
        />)
      }
    </div>
  );

};

export {AutocompleteList }