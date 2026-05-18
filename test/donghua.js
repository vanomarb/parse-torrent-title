const { expect } = require("chai");
const parse = require("../index").parse;

describe("Parsing donghua (Chinese animation) torrent titles", () => {

    // ── FSP / FSP DN group patterns ────────────────────────────────────────

    it("should detect episode from '[FSP] Battle Through The Heavens NF - 198 [4K]'", () => {
        const result = parse("[FSP] Battle Through The Heavens NF - 198 [4K]");
        expect(result.episode).to.equal(198);
        expect(result.resolution).to.equal("4k");
    });

    it("should detect arc season and episode range from '[FSP] Battle Through The Heavens - Nian Fan III (106-157) [4K]'", () => {
        const result = parse("[FSP] Battle Through The Heavens - Nian Fan III (106-157) [4K]");
        expect(result.season).to.equal(3);
        expect(result.episodeRangeStart).to.equal(106);
        expect(result.episodeRangeEnd).to.equal(157);
    });

    it("should detect SP episode from '[FSP] Battle Through The Heavens SP1 [1080p]'", () => {
        const result = parse("[FSP] Battle Through The Heavens SP1 [1080p]");
        expect(result.episode).to.equal(1);
    });

    it("should detect season from '[FSP][斗破苍穹 第3季] Battle Through The Heavens - Season 3 [1080p]'", () => {
        const result = parse("[FSP][斗破苍穹 第3季] Battle Through The Heavens - Season 3 [1080p]");
        expect(result).to.deep.include({ title: "Battle Through The Heavens", season: 3 });
    });

    it("should detect season 2 and episode from '[FSP] Douluo Dalu II - Soul Land 2 - 112 [1080p]'", () => {
        const result = parse("[FSP] Douluo Dalu II - Soul Land 2 - 112 [1080p]");
        expect(result.season).to.equal(2);
        expect(result.episode).to.equal(112);
    });

    it("should detect season 2 and episode range from '[FSP] Douluo Dalu II - Soul Land 2 - 01-111 [1080p] (batch)'", () => {
        const result = parse("[FSP] Douluo Dalu II - Soul Land 2 - 01-111 [1080p] (batch)");
        expect(result.season).to.equal(2);
        expect(result.episodeRangeStart).to.equal(1);
        expect(result.episodeRangeEnd).to.equal(111);
    });

    it("should detect episode from '[FSP] Mushen Ji (Tales of Herding Gods) - 80 [1080p] (GB_CN)'", () => {
        const result = parse("[FSP] Mushen Ji (Tales of Herding Gods) - 80 [1080p] (GB_CN)");
        expect(result.episode).to.equal(80);
    });

    it("should detect episode from '[FSP DN] A Record of a Mortal's Journey to Immortality - 176 (1080p)'", () => {
        const result = parse("[FSP DN] A Record of a Mortal's Journey to Immortality - 176 (1080p) | 凡人修仙传");
        expect(result.episode).to.equal(176);
    });

    it("should detect episode range from '[FSP DN] A Record … - EP 125-153 (1080p)'", () => {
        const result = parse("[FSP DN] A Record of a Mortal's Journey to Immortality - EP 125-153 (1080p) | 凡人修仙传 (batch)");
        expect(result.episodeRangeStart).to.equal(125);
        expect(result.episodeRangeEnd).to.equal(153);
    });

    it("should detect episode range from '[FSP DN] The Gate of Mystical Realm - 01-05 (4K) V2'", () => {
        const result = parse("[FSP DN] The Gate of Mystical Realm - 01-05 (4K) V2 | 玄界之门");
        expect(result.episodeRangeStart).to.equal(1);
        expect(result.episodeRangeEnd).to.equal(5);
    });

    // ── Multiple alt-title with | separator ──────────────────────────────

    it("should prefer last segment from '[YueHuang] 神印王座 | Shen Yin Wangzuo | Throne of Seal - 87'", () => {
        const result = parse("[YueHuang] 神印王座 | Shen Yin Wangzuo | Throne of Seal - 87 (4K | 2160p)");
        expect(result.title).to.equal("Throne of Seal");
        expect(result.episode).to.equal(87);
    });

    it("should prefer last segment and detect season from '[YueHuang] … | Against the Gods S1 (2023)'", () => {
        const result = parse("[YueHuang] 逆天邪神 | Ni Tian Xie Shen | Against the Gods S1 (2023) (4K | 2160p) (HuangSubs)");
        expect(result.title).to.equal("Against the Gods");
        expect(result.season).to.equal(1);
    });

    it("should prefer last segment from '[HuangSubs] 完美世界 | Wanmei Shijie | Perfect World Season 2'", () => {
        const result = parse("[HuangSubs] 完美世界 | Wanmei Shijie | Perfect World Season 2 ENG [1080p]");
        expect(result.title).to.equal("Perfect World");
        expect(result.season).to.equal(2);
    });

    it("should prefer last segment from '[SanKyuu] 百炼成神 | Bai Lian Cheng Shen | Apotheosis (036-040)'", () => {
        const result = parse("[SanKyuu] 百炼成神 | Bai Lian Cheng Shen | Apotheosis (036-040) [1080p]");
        expect(result.title).to.equal("Apotheosis");
        expect(result.episodeRangeStart).to.equal(36);
        expect(result.episodeRangeEnd).to.equal(40);
    });

    it("should prefer last segment from '[x39] … | Apotheosis S2 01-10 (053-062)'", () => {
        const result = parse("[x39] 百炼成神 2 | Bai Lian Cheng Shen 2 | Apotheosis S2 01-10 (053-062) [1080p HEVC AAC]");
        expect(result.title).to.equal("Apotheosis");
        expect(result.season).to.equal(2);
    });

    it("should prefer last segment from '[BlueSilverSect] Tunshi Xingkong - Swallowed Star | 041'", () => {
        const result = parse("[BlueSilverSect] Tunshi Xingkong - Swallowed Star | 041 | (1080p) | Better Subs | [x264]");
        expect(result.episode).to.equal(41);
    });

    it("should preserve pipe-separated slash-form title from '吞噬星空 | Tunshi Xingkong | Swallowed Star (26-85)'", () => {
        const result = parse("吞噬星空 | Tunshi Xingkong | Swallowed Star (26-85) (S2-S3) (4K | 2160p No-Chi-Hardsub)");
        expect(result.title).to.equal("Swallowed Star");
        expect(result.episodeRangeStart).to.equal(26);
        expect(result.episodeRangeEnd).to.equal(85);
    });

    // ── GM-Team all-bracket format ────────────────────────────────────────

    it("should extract English title from GM-Team all-bracket: Shrouding the Heavens ep 122", () => {
        const result = parse("[GM-Team][国漫][遮天][Shrouding the Heavens][2023][122][AVC][GB][1080P]");
        expect(result.title).to.equal("Shrouding the Heavens");
        expect(result.episode).to.equal(122);
    });

    it("should extract English title and range from GM-Team all-bracket: Shrouding the Heavens 148-161", () => {
        const result = parse("[GM-Team][国漫][遮天][Shrouding the Heavens][2023][148-161][AVC][GB][1080P]");
        expect(result.title).to.equal("Shrouding the Heavens");
        expect(result.episodeRangeStart).to.equal(148);
        expect(result.episodeRangeEnd).to.equal(161);
    });

    it("should extract English title and detect season+range from GM-Team: Apotheosis Ⅲ 01-10", () => {
        const result = parse("[GM-Team][国漫][百炼成神 第3季][Apotheosis Ⅲ][2025][01-10][GB][4K HEVC 10Bit]");
        expect(result.title).to.equal("Apotheosis Ⅲ");
        expect(result.season).to.equal(3);
        expect(result.episodeRangeStart).to.equal(1);
        expect(result.episodeRangeEnd).to.equal(10);
    });

    it("should extract English title and detect season+ep from GM-Team: Apotheosis Ⅲ ep 11", () => {
        const result = parse("[GM-Team][国漫][百炼成神 第3季][Apotheosis Ⅲ][2025][11][GB][4K HEVC 10Bit]");
        expect(result.title).to.equal("Apotheosis Ⅲ");
        expect(result.season).to.equal(3);
        expect(result.episode).to.equal(11);
    });

    // ── Hall_of_C pattern: Chinese | Romanized | English ────────────────

    it("should detect season from '[Hall_of_C] 灵笼 Spirit Cage (Ling Long) Incarnation - Season 1'", () => {
        const result = parse("[Hall_of_C] 灵笼 Spirit Cage (Ling Long) Incarnation - Season 1 [4K]");
        expect(result.season).to.equal(1);
    });

    it("should detect episodes from 'Ling Long (Spirit Cage) Incarnation - Episodes 13-15'", () => {
        const result = parse("Ling Long (Spirit Cage) Incarnation - Episodes 13-15");
        expect(result.episodeRangeStart).to.equal(13);
        expect(result.episodeRangeEnd).to.equal(15);
    });

    it("should detect episode from '[Impromptu] Ling Long/ Spirit Cage/ Ling Cage - Incarnation 10 (1080p)'", () => {
        const result = parse("[Impromptu] Ling Long/ Spirit Cage/ Ling Cage - Incarnation 10 (1080p)");
        expect(result.episode).to.equal(10);
    });

    it("should detect season 2 and ep 1 from '[FSP DN] Ling Cage S2 - 01 [1080p AVC]'", () => {
        const result = parse("[FSP DN] Ling Cage S2 - 01 [1080p AVC] (B-Global) | 灵笼");
        expect(result.season).to.equal(2);
        expect(result.episode).to.equal(1);
    });

    it("should detect season from '[Hall_of_C] … (A Will Eternal) S3 - Episode 111'", () => {
        const result = parse("[Hall_of_C] 一念永恒 Yi Nian Yong Heng (A Will Eternal) S3 - Episode 111");
        expect(result.season).to.equal(3);
        expect(result.episode).to.equal(111);
    });

    it("should detect episode from '[Hall_of_C] 仙逆 Xian Ni (Renegade Immortal) - Episode 57'", () => {
        const result = parse("[Hall_of_C] 仙逆 Xian Ni (Renegade Immortal) - Episode 57");
        expect(result.episode).to.equal(57);
    });

    it("should detect season 2 ep 24 from '[Hall_of_C] 诛仙 Zhu Xian (Jade Dynasty) - Season 2 Episode 24'", () => {
        const result = parse("[Hall_of_C] 诛仙 Zhu Xian (Jade Dynasty) - Season 2 Episode 24");
        expect(result.season).to.equal(2);
        expect(result.episode).to.equal(24);
    });

    it("should detect season from '[Hall_of_C] 枕刀歌 Zhen Dao Ge - Season 2'", () => {
        const result = parse("[Hall_of_C] 枕刀歌 Zhen Dao Ge - Season 2");
        expect(result.season).to.equal(2);
    });

    // ── Fan-sub season-in-parens patterns ─────────────────────────────────

    it("should detect season 2 from '[FSP DN] Jian Lai 2 (Sword of Coming 2) - 22 [4K]'", () => {
        const result = parse("[FSP DN] Jian Lai 2 (Sword of Coming 2) - 22 [4K] | 剑来");
        expect(result.season).to.equal(2);
        expect(result.episode).to.equal(22);
    });

    it("should detect season 2 from '[FSP] Shen Mu 2 (Tomb of Fallen Gods) S2 EP 13-18 (1080p)'", () => {
        const result = parse("[FSP] Shen Mu 2 (Tomb of Fallen Gods) S2 EP 13-18 (1080p) | 神墓");
        expect(result.season).to.equal(2);
        expect(result.episodeRangeStart).to.equal(13);
        expect(result.episodeRangeEnd).to.equal(18);
    });

    // ── AniArchive / resolution-tag ───────────────────────────────────────

    it("should detect 4k resolution from '[AniArchive] Zhan Shen Fanchen Shenyu [www][3840x1776]…'", () => {
        const result = parse("[AniArchive] Zhan Shen Fanchen Shenyu [www][3840x1776][HEVC 10bit] (斩神之凡尘神域) (Slay The Gods)");
        expect(result.resolution).to.equal("4k");
    });

    // ── tlh1138 / BlueSilverSect dual-title patterns ───────────────────

    it("should detect episode from '[tlh1138] Swallowed Star - Tunshi Xingkong - 183 (2160p)'", () => {
        const result = parse("[tlh1138] Swallowed Star - Tunshi Xingkong - 183 (2160p)");
        expect(result.episode).to.equal(183);
    });

    // ── Dotted name with parenthesised pinyin season+season range ─────────

    it("should detect season and ep from 'Throne.Of.Seal.(Shen.Yin.Wangzuo).S01E001-S02E093'", () => {
        const result = parse("Throne.Of.Seal.(Shen.Yin.Wangzuo).S01E001-S02E093.Chinese.Donghua.w.English.HardSubs");
        expect(result.season).to.equal(1);
        expect(result.episode).to.equal(1);
    });

    it("should detect episode range from 'Swallowed.Star.(Tunshi.Xingkong).E027-E104.AX-Corrected.Series.1080p'", () => {
        const result = parse("Swallowed.Star.(Tunshi.Xingkong).E027-E104.AX-Corrected.Series.1080p");
        expect(result.episodeRangeStart).to.equal(27);
        expect(result.episodeRangeEnd).to.equal(104);
    });

    it("should detect episode range from 'Perfect World ep. 79-231'", () => {
        const result = parse("Perfect World ep. 79-231");
        expect(result.title).to.equal("Perfect World");
        expect(result.episodeRangeStart).to.equal(79);
        expect(result.episodeRangeEnd).to.equal(231);
    });

    // ── Batch markers ─────────────────────────────────────────────────────

    it("should detect batch from '[FSP] Over the Divine Realms S1 [4K] | 神国之上 (batch)'", () => {
        const result = parse("[FSP] Over the Divine Realms S1 [4K] | 神国之上 (batch)");
        expect(result.season).to.equal(1);
        expect(result.batch).to.equal(true);
    });

    it("should detect batch and bracketed episode range from '[FSP DN] Charm of Soul Pets (01-16) [1080P AVC] (batch)'", () => {
        const result = parse("[FSP DN] Charm of Soul Pets (01-16) [1080P AVC] (batch)");
        expect(result.episodeRangeStart).to.equal(1);
        expect(result.episodeRangeEnd).to.equal(16);
    });

    // ── Chinese season marker 第X季 ────────────────────────────────────────

    it("should detect season 3 from Chinese 第3季 marker in title", () => {
        const result = parse("[FSP][斗破苍穹 第3季] Battle Through The Heavens - Season 3 [1080p]");
        expect(result.season).to.equal(3);
    });
});
