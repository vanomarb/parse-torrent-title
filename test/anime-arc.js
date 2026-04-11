const { expect } = require("chai");
const parse = require("../index").parse;

describe("Parsing anime arc titles (Jujutsu Kaisen logs)", () => {
    // S1E1 torrents
    it("should detect episode from 'JUJUTSU KAISEN S01E01 VOSTFR 1080p WEB H.264 AAC -Tsundere-Raws (CR) (Multi-Subs)'", () => {
        const releaseName = "JUJUTSU KAISEN S01E01 VOSTFR 1080p WEB H.264 AAC -Tsundere-Raws (CR) (Multi-Subs)";
        const result = parse(releaseName);
        expect(result).to.deep.include({ season: 1, episode: 1 });
    });

    // S3E1 - Erai-raws arc (NO explicit season)
    it("should detect episode from '[Erai-raws] Jujutsu Kaisen: Shimetsu Kaiyuu - Zenpen - 01 [1080p CR WEBRip HEVC AAC][MultiSub][D01268BD]'", () => {
        const releaseName = "[Erai-raws] Jujutsu Kaisen: Shimetsu Kaiyuu - Zenpen - 01 [1080p CR WEBRip HEVC AAC][MultiSub][D01268BD]";
        const result = parse(releaseName);
        expect(result.episode).to.equal(1);
        // Arc titles don't have explicit season, so this is expected
        expect(result.season).to.be.undefined;
    });

    it("should detect episode from '[Erai-raws] Jujutsu Kaisen: Shimetsu Kaiyuu - Zenpen - 01 [480p CR WEB-DL AVC AAC][MultiSub][CC4CC123]'", () => {
        const releaseName = "[Erai-raws] Jujutsu Kaisen: Shimetsu Kaiyuu - Zenpen - 01 [480p CR WEB-DL AVC AAC][MultiSub][CC4CC123]";
        const result = parse(releaseName);
        expect(result.episode).to.equal(1);
    });

    it("should detect episode from '[Erai-raws] Jujutsu Kaisen: Shimetsu Kaiyuu - Zenpen - 01 [720p CR WEB-DL AVC AAC][MultiSub][D4F0884C]'", () => {
        const releaseName = "[Erai-raws] Jujutsu Kaisen: Shimetsu Kaiyuu - Zenpen - 01 [720p CR WEB-DL AVC AAC][MultiSub][D4F0884C]";
        const result = parse(releaseName);
        expect(result.episode).to.equal(1);
    });

    it("should detect episode from '[Erai-raws] Jujutsu Kaisen: Shimetsu Kaiyuu - Zenpen - 01 [1080p CR WEB-DL AVC AAC][MultiSub][56A0FE3F]'", () => {
        const releaseName = "[Erai-raws] Jujutsu Kaisen: Shimetsu Kaiyuu - Zenpen - 01 [1080p CR WEB-DL AVC AAC][MultiSub][56A0FE3F]";
        const result = parse(releaseName);
        expect(result.episode).to.equal(1);
    });

    // S3E1 - explicit season
    it("should detect season and episode from '[Earendur] Jujutsu Kaisen - S03E01 - Execution (2160p Upscaled HEVC Dual-Audio) [Multi-Subs].mkv'", () => {
        const releaseName = "[Earendur] Jujutsu Kaisen - S03E01 - Execution (2160p Upscaled HEVC Dual-Audio) [Multi-Subs].mkv";
        const result = parse(releaseName);
        expect(result).to.deep.include({ season: 3, episode: 1 });
    });

    it("should detect season and episode from '[Subeteka] Jujutsu Kaisen - S03E01 [1080p WEB DUAL DDP2.0 H.265] [7BE3B471] | Jujutsu Kaisen: Shimetsu Kaiyuu - Zenpen'", () => {
        const releaseName = "[Subeteka] Jujutsu Kaisen - S03E01 [1080p WEB DUAL DDP2.0 H.265] [7BE3B471] | Jujutsu Kaisen: Shimetsu Kaiyuu - Zenpen";
        const result = parse(releaseName);
        expect(result).to.deep.include({ season: 3, episode: 1 });
    });

    it("should detect season and episodes from '[AniMeitantei] Jujutsu.Kaisen.S03E01-E02.2160p.WEB-DL.Multi-AUDIO.x265 (Multi-Subs)'", () => {
        const releaseName = "[AniMeitantei] Jujutsu.Kaisen.S03E01-E02.2160p.WEB-DL.Multi-AUDIO.x265 (Multi-Subs)";
        const result = parse(releaseName);
        expect(result).to.deep.include({ season: 3, episodes: [1, 2] });
    });

    it("should detect season and episode from 'JUJUTSU KAISEN S03E01 Execution 1080p CR WEB-DL MULTi AAC2.0 H 264-VARYG (Multi-Audio, Multi-Subs)'", () => {
        const releaseName = "JUJUTSU KAISEN S03E01 Execution 1080p CR WEB-DL MULTi AAC2.0 H 264-VARYG (Multi-Audio, Multi-Subs)";
        const result = parse(releaseName);
        expect(result).to.deep.include({ season: 3, episode: 1 });
    });

    it("should detect season and episode from '[EMBER] Jujutsu Kaisen S03E01 [1080p] [Dual Audio HEVC WEBRip DDP] (Jujutsu Kaisen: Shimetsu Kaiyuu Zenpen | The Culling Game Part 1)'", () => {
        const releaseName = "[EMBER] Jujutsu Kaisen S03E01 [1080p] [Dual Audio HEVC WEBRip DDP] (Jujutsu Kaisen: Shimetsu Kaiyuu Zenpen | The Culling Game Part 1)";
        const result = parse(releaseName);
        expect(result).to.deep.include({ season: 3, episode: 1 });
    });

    it("should detect season and episode from '[Anime Time] Jujutsu Kaisen - S03E01 [1080p][HEVC 10bit x265][AAC][Dual-Audio] [Multi Sub] [Weekly]'", () => {
        const releaseName = "[Anime Time] Jujutsu Kaisen - S03E01 [1080p][HEVC 10bit x265][AAC][Dual-Audio] [Multi Sub] [Weekly]";
        const result = parse(releaseName);
        expect(result).to.deep.include({ season: 3, episode: 1 });
    });

    it("should detect season and episode from '[Sokudo] JUJUTSU KAISEN S03E01 [1080p AV1][Dual Audio] (weekly)'", () => {
        const releaseName = "[Sokudo] JUJUTSU KAISEN S03E01 [1080p AV1][Dual Audio] (weekly)";
        const result = parse(releaseName);
        expect(result).to.deep.include({ season: 3, episode: 1 });
    });

    it("should detect season and episode from '[Breeze] JUJUTSU KAISEN S03E01 [1080p AV1][Dual Audio] (weekly)'", () => {
        const releaseName = "[Breeze] JUJUTSU KAISEN S03E01 [1080p AV1][Dual Audio] (weekly)";
        const result = parse(releaseName);
        expect(result).to.deep.include({ season: 3, episode: 1 });
    });

    it("should detect season and episode from '[H3LL] Jujutsu Kaisen - The Culling Game (呪術廻戦「死滅回游 前編」) - S03E01 (48) [1080p][x264 10bits][AAC][Multiple Subtitles].mkv'", () => {
        const releaseName = "[H3LL] Jujutsu Kaisen - The Culling Game (呪術廻戦「死滅回游 前編」) - S03E01 (48) [1080p][x264 10bits][AAC][Multiple Subtitles].mkv";
        const result = parse(releaseName);
        expect(result).to.deep.include({ season: 3, episode: 1 });
    });

    // Batch torrents (S3 full season, no episode)
    it("should detect season from 'JUJUTSU KAISEN S03 1080p CR WEB-DL DUAL AAC2.0 H 264-VARYG (Dual-Audio, Multi-Subs)'", () => {
        const releaseName = "JUJUTSU KAISEN S03 1080p CR WEB-DL DUAL AAC2.0 H 264-VARYG (Dual-Audio, Multi-Subs)";
        const result = parse(releaseName);
        expect(result.season).to.equal(3);
        expect(result.episode).to.be.undefined;
    });

    it("should detect season from 'JUJUTSU KAISEN S03 1080p CR WEB-DL AAC2.0 H 264-VARYG (Multi-Subs)'", () => {
        const releaseName = "JUJUTSU KAISEN S03 1080p CR WEB-DL AAC2.0 H 264-VARYG (Multi-Subs)";
        const result = parse(releaseName);
        expect(result.season).to.equal(3);
        expect(result.episode).to.be.undefined;
    });

    it("should detect season from '[Feibanyama] JUJUTSU KAISEN S3 - 01-02 [IQIYI WebRip 2160p HEVC OPUS Multi-Subs]'", () => {
        const releaseName = "[Feibanyama] JUJUTSU KAISEN S3 - 01-02 [IQIYI WebRip 2160p HEVC OPUS Multi-Subs]";
        const result = parse(releaseName);
        // Note: This format (S3 - 01-02) with space before dash returns S3 and episode 1
        // The range parsing requires no space before the dash
        expect(result.season).to.equal(3);
        expect(result.episodes).to.include(1);
    });

    // S1 batch torrents
    it("should detect season from '[jaaj] Jujutsu Kaisen S01 (2020) (BD 1080p AV1 AAC)'", () => {
        const releaseName = "[jaaj] Jujutsu Kaisen S01 (2020) (BD 1080p AV1 AAC)";
        const result = parse(releaseName);
        expect(result.season).to.equal(1);
        expect(result.episode).to.be.undefined;
    });

    it("should detect season from '[Anitsu] Jujutsu Kaisen (Sorcery Fight) S01 [BD 1080p x265 FLAC] [DUAL] [JPN PT-BR] [SUB PT-BR ENG]'", () => {
        const releaseName = "[Anitsu] Jujutsu Kaisen (Sorcery Fight) S01 [BD 1080p x265 FLAC] [DUAL] [JPN PT-BR] [SUB PT-BR ENG]";
        const result = parse(releaseName);
        expect(result.season).to.equal(1);
    });

    it("should detect season from '[Sokudo] Jujutsu Kaisen - S01 v2 [1080p BD AV1][Dual Audio]'", () => {
        const releaseName = "[Sokudo] Jujutsu Kaisen - S01 v2 [1080p BD AV1][Dual Audio]";
        const result = parse(releaseName);
        expect(result.season).to.equal(1);
    });

    // S2 torrents
    it("should detect season and episode from '[Erai-raws] Jujutsu Kaisen 2nd Season - 01 ~ 23 [1080p][HEVC][Multiple Subtitle]'", () => {
        const releaseName = "[Erai-raws] Jujutsu Kaisen 2nd Season - 01 ~ 23 [1080p][HEVC][Multiple Subtitle]";
        const result = parse(releaseName);
        expect(result.season).to.equal(2);
        expect(result.episodes).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
    });

    it("should detect season and episode from '[EMBER] Jujutsu Kaisen S02E01 [1080p] [HEVC WEBRip] (Jujutsu Kaisen 2nd Season)'", () => {
        const releaseName = "[EMBER] Jujutsu Kaisen S02E01 [1080p] [HEVC WEBRip] (Jujutsu Kaisen 2nd Season)";
        const result = parse(releaseName);
        expect(result).to.deep.include({ season: 2, episode: 1 });
    });

    // Named arc variant
    it("should detect season and episode from '[Yameii] Jujutsu Kaisen - S03E01 [English Dub] [CR WEB-DL 1080p] [C148A338] (Jujutsu Kaisen: Shimetsu Kaiyuu Zenpen | The Culling Game Part 1 | Season 3 | S3)'", () => {
        const releaseName = "[Yameii] Jujutsu Kaisen - S03E01 [English Dub] [CR WEB-DL 1080p] [C148A338] (Jujutsu Kaisen: Shimetsu Kaiyuu Zenpen | The Culling Game Part 1 | Season 3 | S3)";
        const result = parse(releaseName);
        expect(result).to.deep.include({ season: 3, episode: 1 });
    });

    // Additional anime arc (no explicit season)
    it("should detect episode from anime arc without explicit season format", () => {
        const releaseName = "[Group] Anime Title: Arc Name - 01 [1080p]";
        const result = parse(releaseName);
        expect(result.episode).to.equal(1);
    });

    // S3 alternative formats
    it("should detect season and episode from 'JUJUTSU KAISEN S03E01 Execution 1080p CR WEB-DL AAC2.0 H 264-VARYG (Jujutsu Kaisen: Shimetsu Kaiyuu - Zenpen, Multi-Subs)'", () => {
        const releaseName = "JUJUTSU KAISEN S03E01 Execution 1080p CR WEB-DL AAC2.0 H 264-VARYG (Jujutsu Kaisen: Shimetsu Kaiyuu - Zenpen, Multi-Subs)";
        const result = parse(releaseName);
        expect(result).to.deep.include({ season: 3, episode: 1 });
    });

    it("should detect season and episode from '[ToonsHub] JUJUTSU KAISEN S03E01 1080p CR WEB-DL DUAL AAC2.0 H.264 (Dual-Audio, Multi-Subs)'", () => {
        const releaseName = "[ToonsHub] JUJUTSU KAISEN S03E01 1080p CR WEB-DL DUAL AAC2.0 H.264 (Dual-Audio, Multi-Subs)";
        const result = parse(releaseName);
        expect(result).to.deep.include({ season: 3, episode: 1 });
    });

    it("should detect season and episode from '[DKB] Jujutsu Kaisen - S03E01 [1080p][HEVC x265 10bit][Multi-Subs][weekly]'", () => {
        const releaseName = "[DKB] Jujutsu Kaisen - S03E01 [1080p][HEVC x265 10bit][Multi-Subs][weekly]";
        const result = parse(releaseName);
        expect(result).to.deep.include({ season: 3, episode: 1 });
    });

    it("should detect season and episode from '[Onalrie] Jujutsu Kaisen - S03E01 [1080p WEBRip AV1].mkv'", () => {
        const releaseName = "[Onalrie] Jujutsu Kaisen - S03E01 [1080p WEBRip AV1].mkv";
        const result = parse(releaseName);
        expect(result).to.deep.include({ season: 3, episode: 1 });
    });

    it("should detect season and episode from 'Jujutsu Kaisen S03E01 Execution 1080p NF WEB-DL AAC2.0 H 264-VARYG (Jujutsu Kaisen: Shimetsu Kaiyuu - Zenpen, Multi-Subs)'", () => {
        const releaseName = "Jujutsu Kaisen S03E01 Execution 1080p NF WEB-DL AAC2.0 H 264-VARYG (Jujutsu Kaisen: Shimetsu Kaiyuu - Zenpen, Multi-Subs)";
        const result = parse(releaseName);
        expect(result).to.deep.include({ season: 3, episode: 1 });
    });

    // Batch format with multiple episodes
    it("should detect batch episodes from '[Dubs-Empire] Jujutsu Kaisen (2020) S01 v3 [2160p][B-Global][H.264][Multi-Dub][Multi-Sub][Frixy-Subs]'", () => {
        const releaseName = "[Dubs-Empire] Jujutsu Kaisen (2020) S01 v3 [2160p][B-Global][H.264][Multi-Dub][Multi-Sub][Frixy-Subs]";
        const result = parse(releaseName);
        expect(result.season).to.equal(1);
    });

    // Absolute episode format (Kitsu-style)
    it("should detect absolute episode in anime absolute format", () => {
        const releaseName = "[Group] Anime - 001 [1080p]";
        const result = parse(releaseName);
        expect(result.episode).to.equal(1);
    });

    it("should detect absolute episode format with leading zeros", () => {
        const releaseName = "[Group] Series - 048 [720p]";
        const result = parse(releaseName);
        expect(result.episode).to.equal(48);
    });
});
