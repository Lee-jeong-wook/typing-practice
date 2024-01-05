import React, { useEffect, useState } from "react";

export const InputForm = () => {
    const [seconds, setSeconds] = useState<number>(0);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [text, setText] = useState<string[]>([]);
    const [ex, setEx] = useState<string[]>([]);
    const paraph:string[] = ["The greate power follows greate responsibility.", 
    "Life is from the inside out. When you shift on the inside, life shifts on the outside.", 
    "Nothing in more despicable than respect based on fear.", 
    "If you are not willing to risk the usual, you will have to settle for the ordinary."
    ];
    const[pIdx, setPIdx] = useState(0);

    useEffect(() => {
        setEx(paraph[pIdx].split(""));
    }, [pIdx]);

    const onBlur = () => {
        setIsTyping(false);
    };

    const onFocus = () => {
        setIsTyping(true);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setText(value.split(""));
    };

    const onSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            let err:number = 0;
            ex.map((element, idx) => {
                if(element !== text[idx]){
                    err++;
                }
            })
            calculHandler(seconds, ex.length, err);
            paragraphHandler();
        }
    }

    const calculHandler = (sec:number, length:number, err:number) => {
        const tmp = Math.floor(length / sec * 60);
        const errPer = Math.floor(err / length * 100)
        alert(`${tmp}타 오타 ${errPer}%`);
    }

    const paragraphHandler = () => {
        const length: number = paraph.length;
        const rIdx = Math.floor(Math.random() * length);
        console.log(ex);
        console.log(paraph[rIdx]);
        setPIdx(rIdx);
        console.log(paraph[rIdx]);
    }
    

    useEffect(() => {
        if (isTyping) {
            setSeconds(0);
            const intervalId = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
            return () => {
                clearInterval(intervalId);
            };
        } else{
            setText([]);
        }
    }, [isTyping]);

    return (
        <>
            <div>
                {ex.map((element, idx) => (
                    <span
                        key={idx}
                        style={{
                            color: text[idx] === element ? "green" : "red",
                            fontSize:"35px"
                        }}
                    >
                        {element}
                    </span>
                ))}
            </div>
            <span>{seconds}초</span>
            <input type="text" onBlur={onBlur} onChange={onChange} onFocus={onFocus} onKeyDown={onSubmit} value={text.join("")}/>
        </>
    );
};
