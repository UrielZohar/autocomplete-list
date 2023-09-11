import { useState } from 'react';
import { useDebounce } from './hooks/useDebounce/useDebounce';
import { AutocompleteList } from './components/autucompleteList/AutocompleteList';
import './App.css';

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState(null);
  const fetchItems = useDebounce(async (key) => {
    try {
      return await fetch(`https://jsonplaceholder.typicode.com/users?name_like=${key}&_start=0&_limit=20`)
        .then(response => response.json());
    } catch (e) {
      alert('Something went wrong!');
    }
  }, 500);

  const onSelect = (item) => {
    setSelectedItem(item);
  }

  const onChange = async (value) => {
    if (value === '') {
      setItems(null);
    } else {
      setLoading(true);
      const items = await fetchItems(value);
      setItems(items);
      setLoading(false);
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
        value={selectedItem?.name || ''}  
      />
    </div>
  );
}

export default App;
