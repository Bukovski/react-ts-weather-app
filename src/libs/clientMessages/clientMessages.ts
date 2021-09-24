import { createToast } from "vercel-toast";
import "./clientMessages.css";


const messageError = (text: string, delay: number = 5000) => createToast(text, {
	timeout: delay,
	type: 'error'
});


export {
	messageError
}

