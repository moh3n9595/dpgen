import { _nameValidation } from './index';

const mockExit = jest.spyOn(process, 'exit').mockImplementation();
const mockLog = jest.spyOn(console, 'log').mockImplementation();

beforeEach(() => {
    jest.clearAllMocks();
});

describe('name validation', () => {
    it('no space in name', () => {
        _nameValidation('4 test_test_123');
        expect(mockLog).toHaveBeenCalledTimes(1);
        expect(mockExit).toHaveBeenCalledWith(1);
    });
    it('no @ in name', () => {
        _nameValidation('@test_test_123');
        expect(mockLog).toHaveBeenCalledTimes(1);
        expect(mockExit).toHaveBeenCalledWith(1);
    });
    it("numbers aren't ok at first place", () => {
        _nameValidation('4_test_test_123');
        expect(mockLog).toHaveBeenCalledTimes(1);
        expect(mockExit).toHaveBeenCalledWith(1);
    });
    it('_ and numbers are ok', () => {
        _nameValidation('test_test_123');
        expect(mockLog).toHaveBeenCalledTimes(0);
        expect(mockExit).toHaveBeenCalledTimes(0);
    });
});
