export const eventually = (done: jest.DoneCallback) => (fn: Function) => {
    const tryAgain = () => {
        try {
            fn();
            done();
        } catch(e) {
            setInterval(tryAgain, 100);
        }
    };
    tryAgain();
}