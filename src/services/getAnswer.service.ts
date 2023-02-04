import type { Answer } from "@/interfaces/answer.interface";

const getAnswer = async () => {
        const URL: string = 'https://yesno.wtf/api';
        const response = await fetch( URL );
        const data: Answer = await response.json();
        return data;
}

export {
    getAnswer
}