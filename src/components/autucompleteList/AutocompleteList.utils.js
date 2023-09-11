const displayItem = (item) => item;

const handleKeyPress = ({handleOnSelect, currentSuggestionHovered, setCurrentSuggestionHovered, items, setIsShowSuggestionsList, onChange, e}) => {
  if (e.key === 'Enter') {
    handleOnSelect(items[currentSuggestionHovered]);
  } else if (e.key === 'ArrowDown') {
    setCurrentSuggestionHovered(((currentSuggestionHovered + 1)) % items.length);
  } else if (e.key === 'ArrowUp') {
    setCurrentSuggestionHovered((currentSuggestionHovered - 1) % items.length);
  } else if (e.key === 'Escape') {
    setCurrentSuggestionHovered(-1);
    setIsShowSuggestionsList(false);
  } else {
    onChange(`${e.target.value}${e.key}`);
  }
  
}

export { 
  displayItem,
  handleKeyPress, 
};