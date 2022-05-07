import { useState, useRef, useEffect } from "react";
function useDebounce2(value, delay) {
    var _a = useState(value), debounceValue = _a[0], setDebounceValue = _a[1];
    var tim = useRef(null);
    useEffect(function () {
        clearTimeout(tim.current);
        tim.current = setTimeout(function () {
            setDebounceValue(value);
        }, delay);
    }, [value, delay]);
    return debounceValue;
}
export default useDebounce2;
