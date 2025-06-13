import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function showToast(message, type = 'success') {
    if (type === 'success') {
        toast.success(message);
    } else if (type === 'error') {
        toast.error(message);
    } else {
        toast(message);
    }
}