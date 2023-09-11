import { useState } from 'react';
import { AutocompleteList } from './components/autucompleteList/AutocompleteList';
import './App.css';

function App() {
  const [selectedItem, setSelectedItem] = useState({ id: 1, name: 'John' });
  const [loading, setLoading] = useState(false);

  const items = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Jack' },
    { id: 4, name: 'Jill' },
    { id: 5, name: 'James' },
    { id: 6, name: 'Jenny' },
    { id: 7, name: 'Jesse' },
    { id: 8, name: 'Jasmine' },
    { id: 9, name: 'Jared' },
    { id: 10, name: 'Jocelyn' },
    { id: 11, name: 'Jasper' },
    { id: 12, name: 'Jade' },
    { id: 13, name: 'Javier' },
    
  ];

  const onSelect = (item) => {
    setSelectedItem(item);
  }

  const onChange = (value) => {
    
  };

  return (
    <div className="App">
      <AutocompleteList 
        items={items}
        onSelect={onSelect}  
        onChange={onChange}
        displayItem={(item) => item.name}
        value={selectedItem.name || ''}  
      />
    </div>
  );
}

export default App;
