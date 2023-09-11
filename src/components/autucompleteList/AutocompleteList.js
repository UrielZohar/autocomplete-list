import { useCallback, useEffect, useState } from 'react';
import { SuggestionsList } from './components/suggestionsList/SuggestionsList.js';
import { displayItem as displayItemDefault, handleKeyPress as handleKeyPressUtils } from './AutocompleteList.utils.js';
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

  const handleOnBlur = () => {
    setCurrentValue(value);
    setIsShowSuggestionsList(false);
  };

  const onEsc = () => { 
    setIsShowSuggestionsList(false);
  };
  return (
    <div className={styles.autocompleteList}>
      <div className={styles.autocompleteListInputSection}>
        <div className={styles.autocompleteListSearchIcon}>
          🔎
        </div>
        <input 
          value={currentValue}
          className={styles.autocompleteListInput} 
          disabled={loading}
          onBlur={handleOnBlur}
          onChange={(e) => onChange(e.target.value)} 
        />
        <div className={`${styles.autocompleteListIcon} ${styles.autocompleteListClearIcon}`}>
          ✖
        </div>
      </div>
      {
        isShowSuggestionsList && (<SuggestionsList 
          items={items} 
          displayItem={displayItem}
          handleOnSelect={handleOnSelect}
          onEsc={handleOnBlur}
        />)
      }
    </div>
  );

};

export {AutocompleteList }