import { createDefaultCovid19State } from "./Covid19State";

describe('Covid19State', () => {
    describe('createDefaultCovid19State', () => {
        it('creates a default state with a 0 time frame', () => {
            expect(createDefaultCovid19State()).toEqual(expect.objectContaining({
                timeFrame: 0,
            }));
        });

        it('creates a default state with no data', () => {
            expect(createDefaultCovid19State()).toEqual(expect.objectContaining({
                data: {}
            }));
        });
    });
});