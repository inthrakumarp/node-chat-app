const expect = require('expect');

const {isRealString} = require('./validations');

describe('isRealString', () => {
    it("Should reject non-string values", () => {
        var name = 21;
        var room = 78;

        var isNameString = isRealString(name);
        var isRoomString = isRealString(room);

        expect(isNameString).toBe(false);
        expect(isRoomString).toBe(false);
    });

    it("Should reject string with only spaces", () => {
        var name = "  ";
        var room = "          ";

        var isNameString = isRealString(name);
        var isRoomString = isRealString(room);

        expect(isNameString).toBe(false);
        expect(isRoomString).toBe(false);
    });

    it("Should allow string with non-space chars", () => {
        var name = "    inthra    ";
        var room = "    developers    ";

        var isNameString = isRealString(name);
        var isRoomString = isRealString(room);

        expect(isNameString).toBe(true);
        expect(isRoomString).toBe(true);
    })
})