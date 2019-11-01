import HttpStatus from 'http-status-codes';
import { navigation } from '../utilities';

const ErrorHandler = (error: any) => {
    if (!error.response) {
        // HttpStatus.INTERNAL_SERVER_ERROR
        // Show Toast error
        return;
    }

    switch (error.response.status) {
        case HttpStatus.BAD_REQUEST:
            break;
        case HttpStatus.UNAUTHORIZED:
            break;
        case HttpStatus.FORBIDDEN:
            // TODO: navigation.error403();
            break;
        case HttpStatus.NOT_FOUND:
            // TODO: navigation.error404();
            break;
        case HttpStatus.REQUEST_TIMEOUT:
        case HttpStatus.CONFLICT:
        case HttpStatus.INTERNAL_SERVER_ERROR:
        case HttpStatus.BAD_GATEWAY:
        case HttpStatus.GATEWAY_TIMEOUT:
            break;
    }
    return Promise.reject(error.response);
}

export default ErrorHandler;