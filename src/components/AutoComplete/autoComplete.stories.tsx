import React from "react";
import { storiesOf } from "@storybook/react";
import { AutoComplete, DataSourceType } from "./autoComplete";
import { action } from "@storybook/addon-actions";

interface LakerPlayerProps {
  value: string;
  number: number;
}

const SimpleComplete = () => {
  // const lakerWithNumbers = [
  //   { value: "bradley", number: 11 },
  //   { value: "james", number: 12 },
  //   { value: "AD", number: 13 },
  //   { value: "green", number: 14 },
  //   { value: "howard", number: 15 },
  //   { value: "kuzma", number: 16 },
  //   { value: "McGee", number: 17 },
  //   { value: "cousins", number: 81 },
  //   { value: "cook", number: 19 },
  //   { value: "pope", number: 12 },
  // ];

  //   const handleFetch = (query: string) => {
  //     return lakers.filter((item) => item.includes(query));
  //   };

  const handleFetch = async (query: string) => {
    let res = await fetch(`https://api.github.com/search/users?q=${query}`);

    return res.json().then(({ items }) => {
    
      return items.map((item:any) => ({ value: item.login, ...item }));
    });
  };

  const renderOption = (item: DataSourceType) => {
    return <h2>Name: {item.value}</h2>;
    // return <h2>{JSON.stringify(item)}</h2>;
  };

  return (
    <>
      <AutoComplete
        onSelect={action("seleted")}
        fetchSuggestions={handleFetch}
        renderOption={renderOption}
      />
    </>
  );
};

storiesOf("AutoComplete", module).add("SimpleComplete", SimpleComplete);
