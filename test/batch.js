const { expect } = require("chai");
const parse = require("../index").parse;

describe("Parsing batch/isBatch", () => {
    it("should detect season pack as batch", () => {
        const releaseName = "[Group] Show S01 [1080p]";
        expect(parse(releaseName)).to.deep.include({ isBatch: true });
    });

    it("should detect episode range as batch", () => {
        const releaseName = "[Group] Show - 01-26 [720p]";
        expect(parse(releaseName)).to.deep.include({ isBatch: true, episodeRangeStart: 1, episodeRangeEnd: 26 });
    });

    it("should NOT mark single episode as batch", () => {
        const releaseName = "[Group] Show - 05 [1080p]";
        expect(parse(releaseName).isBatch).to.not.be.true;
    });

    it("should detect Donghua pipe episode", () => {
        const releaseName = "[VipapkStudios] Swallowed Star | 024 | (1080p)";
        expect(parse(releaseName)).to.deep.include({ episode: 24 });
    });

    it("should detect batch label", () => {
        const releaseName = "[Group] Show S02 [BATCH][1080p]";
        expect(parse(releaseName)).to.deep.include({ isBatch: true });
    });

    it("should NOT mark movie as batch", () => {
        const releaseName = "Dragon Ball Z Movie 09 Bojack Unbound 1080p";
        expect(parse(releaseName).isBatch).to.not.be.true;
    });
});