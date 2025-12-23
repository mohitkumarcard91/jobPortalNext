const SuggestionsList = ({ items, onSelect }) => {
  return (
    <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ listStyle: 'none', padding: 0 }}>
      {items.map((item) => (
        <li className=""
          key={item}
          onClick={() => onSelect(item)} 
          style={{
            padding: '10px',
            border: '2px solid #ccc',
            margin: '5px 0',
            cursor: 'pointer',
            backgroundColor: 'white', 
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default SuggestionsList;
