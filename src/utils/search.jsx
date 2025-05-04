import { TextInput } from "@mantine/core";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

const Search = ({ placeholder, value, onSearch, onEnter }) => {
  const [query, setQuery] = useState(value || "");

  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  const debouncedSearch = useCallback(
    debounce((newValue) => {
      if (onSearch) onSearch(newValue);
    }, 300),
    [onSearch]
  );

  const handleChange = (e) => {
    const newValue = e.target.value;
    setQuery(newValue);
    debouncedSearch(newValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && onEnter) {
      onEnter(query);
    }
  };

  return (
    <TextInput
      placeholder={placeholder}
      value={query}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      size="md"
    />
  );
};

export default Search;