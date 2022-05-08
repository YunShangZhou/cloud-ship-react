import React, {
  FC,
  useEffect,
  useState,
  useRef,
  KeyboardEvent,
  ChangeEvent,
  ReactElement,
} from "react";
import Input, { InputProps } from "../Input/Input";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
import Transition from '../Transition/transition';
import classNames from "classnames";

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;

/**
 * Omit忽略原生回调onSelect
 * */
export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, renderOption, value, ...restProps } =
    props;

  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showList,setShowList] = useState(false);

  const isSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const debounceValue = useDebounce(inputValue, 300);
  useClickOutside(componentRef, () => {
    setShowList(false);
  });

  console.log("suggestions", suggestions);

  useEffect(() => {
    if (debounceValue && !isSearch.current) {
      const results = fetchSuggestions(debounceValue);
      if (results instanceof Promise) {
        console.log("trigger");
        setLoading(true);
        results.then((data) => {
          setLoading(false);
          setSuggestions(data);
          setShowList(true);
        });
      } else {
        setSuggestions(results);
        setShowList(true);
      }
    } else {
      setShowList(false);
    }
    setHighlightIndex(-1);
  }, [debounceValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    isSearch.current = false;
  };

  const hanldeHighlight = (index: number) => {
    if (index < 0) {
      setHighlightIndex(0);
      return;
    }
    if (index > suggestions.length - 1) return;
    setHighlightIndex(index);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:
        handleSelect(suggestions[highlightIndex]);
        break;
      case 38:
        hanldeHighlight(highlightIndex - 1);
        break;
      case 40:
        hanldeHighlight(highlightIndex + 1);
        break;
      case 27:
        setShowList(false);
        break;
      default:
        break;
    }
  };
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setShowList(false);
    
    isSearch.current = true;
    if (onSelect) {
      console.log("存在且使用onSELECT");
      onSelect(item);
    }
  };

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  // 下拉框模板
  const generateDropdown = () => {
   
    return (
      <Transition in={loading || showList} onExited={()=>{setSuggestions([])}} timeout={300} animation="zoom-in-top" >
      <ul className="drop-down">
        {loading ? (
          <div className="loading-container">
            {loading && <Icon icon="spinner" spin size="2x" />}
          </div>
        ) : (
          suggestions.map((item, index) => {
            const cnames = classNames("suggestions-item",{
              "highlight-item": index === highlightIndex,
            });
        
            return (
              <li
                key={index}
                className={cnames}
                onClick={() => {
                  handleSelect(item);
                }}
              >
                {renderTemplate(item)}
              </li>
            );
          })
        )}
      </ul>
      </Transition>
    );
  };

  return (
    <div className="viking-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        {...restProps}
      />

      {suggestions.length > 0 && generateDropdown()}
    </div>
  );
};
