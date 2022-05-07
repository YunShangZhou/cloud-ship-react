import { useEffect } from 'react';
function useClickOutside(ref, handler) {
    useEffect(function () {
        var listener = function (event) {
            // 通过 ref.current.contains,容器是否含有 事件目标
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener('click', listener);
        return function () {
            document.removeEventListener('click', listener);
        };
    }, [ref, handler]);
}
export default useClickOutside;
