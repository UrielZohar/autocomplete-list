import { useState } from 'react';
import { useKeyPress } from '../../../../hooks/useKeyPress/useKeyPress';
import { ArrowUp, ArrowDown, Enter, Escape } from '../../../../hooks/useKeyPress/useKeyPress.constants';
import styles from './SuggestionsList.module.css';

const SuggestionsList = ({displayItem, items, handleOnSelect, onEsc}) => {
  const [currentSuggestionHoveredIndex, setCurrentSuggestionHoveredIndex] = useState(-1);
  useKeyPress(ArrowDown, () => {
    setCurrentSuggestionHoveredIndex((currentSuggestionHoveredIndex + 1) % items.length);
  });

  useKeyPress(ArrowUp, () => {
    setCurrentSuggestionHoveredIndex(((currentSuggestionHoveredIndex - 1) >= 0) ? (currentSuggestionHoveredIndex - 1) : (items.length - 1));
  });

  useKeyPress(Escape, onEsc);
  
  useKeyPress(Enter, () => {
    handleOnSelect(items[currentSuggestionHoveredIndex]);
  });
  
  return (
    <div 
      className={styles.autocompleteListItemsSection}
    >
      {
        items.map((item, index) => (
          <div
            key={index}
            onMouseEnter={() => setCurrentSuggestionHoveredIndex(index)}
            className={`${styles.autocompleteListItem} ${currentSuggestionHoveredIndex === index ? styles.autocompleteListItemHovered : ''}`} 
            onClick={() => handleOnSelect(item)}>
            {displayItem(item)}
          </div>
        ))
      }
      {
        items.length === 0 && (
          <div 
            className={`${styles.autocompleteListItem}`} 
          >
            No Optios
          </div>)
      }
    </div>
  );
};

export { SuggestionsList };