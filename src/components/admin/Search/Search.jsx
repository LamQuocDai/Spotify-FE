import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const Search = ({ placeholder }) => {
  return (
    <TextInput
      leftSectionPointerEvents="none"
      leftSection={<IconSearch width={18} height={18} />}
      placeholder={placeholder}
    />
  );
};

export default Search;
