import React, { useEffect, useState } from "react";

export const InputForm = () => {
    const [seconds, setSeconds] = useState<number>(0);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [text, setText] = useState<string[]>([]);
    const [ex, setEx] = useState<string[]>([]);
    const paraph = "The greate power follows greate responsibility.";

    useEffect(() => {
        setEx(paraph.split(""));
    }, []);

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
        if(text.length !== ex.length) return;
        if(e.key === "Enter"){
            calculHandler(seconds, text.length)
        }
    }
    const calculHandler = (sec:number, length:number) => {
        const tmp = Math.floor(length / sec * 60);
        alert(tmp);
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
