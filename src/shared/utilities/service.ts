import HttpStatus from 'http-status-codes';

export class BaseService {
    public handleService(resolve: any, reject: any, context: any, mutationEvent: any, serviceFn: Promise<any>, mutationEventOptional?: string) {
        this.mutationEventFn(context, true, mutationEventOptional);
        serviceFn.then((response) => {
            if (response && response.status === HttpStatus.OK) {
                context.commit(mutationEvent, response.data);
                this.mutationEventFn(context, false, mutationEventOptional);
                resolve(response);
            } else {
                this.mutationEventFn(context, false, mutationEventOptional);
                reject(response);
            }
        }).catch((error) => {
            this.mutationEventFn(context, false, mutationEventOptional);
            reject(error);
        });
    }

    private mutationEventFn(context: any, value: any, mutationEventOptional?: string) {
        if (mutationEventOptional) {
            context.commit(mutationEventOptional, value);
        }
    }
}

