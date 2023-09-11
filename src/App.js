import { useState } from 'react';
import { useDebounce } from './hooks/useDebounce/useDebounce';
import { AutocompleteList } from './components/autucompleteList/AutocompleteList';
import './App.css';

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState(null);
  
  const onSelect = (item) => {
    setSelectedItem(item);
  }

  const onChangeWithFetch = useDebounce(async (key) => {
    try {
      setLoading(true);
      const items = await fetch(`https://jsonplaceholder.typicode.com/users?name_like=${key}&_start=0&_limit=20`)
        .then(response => response.json());
      setItems(items);
      setLoading(false);
    } catch (e) {
      alert('Something went wrong!');
    }
  }, 500);

  const onChange = (value) => {
    if (value === '') {
      setItems(null);
      setValue('');
    } else {
      setValue(value);
      onChangeWithFetch(value);
    }
  };

  return (
    <div className="App">
      <AutocompleteList 
        items={items}
        onSelect={onSelect}  
        onChange={onChange}
        loading={loading}
        displayItem={(item) => item.name}
        value={selectedItem?.name || value}  
      />
    </div>
  );
}

export default App;
