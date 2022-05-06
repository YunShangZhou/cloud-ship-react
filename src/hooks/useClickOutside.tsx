import {useEffect,RefObject} from 'react';

function useClickOutside(ref: RefObject<HTMLElement>,handler: Function){
    useEffect(()=>{
        const listener = (event: MouseEvent) =>{
            // 通过 ref.current.contains,容器是否含有 事件目标
            if (!ref.current || ref.current.contains(event.target as HTMLElement)){
                return
            }
            handler(event);
        }
        document.addEventListener('click',listener);
        return () => {
            document.removeEventListener('click',listener);
        }
    },[ref,handler])

}

export default useClickOutside;