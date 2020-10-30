import { assertEquals } from "https://deno.land/std@0.75.0/testing/asserts.ts";
import { batchGcd, isSafe } from "./mod.ts";

const tests = {
    compromisedNumbers: {
        values: [1909, 2923, 291, 205, 989, 62, 451, 1943, 1079, 2419],
        safe: false,
    },
    safeNumbers: {
        values: [31, 20, 23, 17, 7, 1943, 2923],
        safe: true,
    },
    compromisedBigInts: {
        values: [
            25038314505597418388604179860714882614422127221251218177941776125015689371532451551557722822779861514286865970561700890769410837794552279780894040971681449790189738120494762398098503047701616242475762981354313653156463175331781125874293360045915132235764863288864747541282023275387998977407018508297149675595304174341886297829510919156113134724990705054150334874817413167581344324356249627636194769737894270567486253744397192956160407687982171825401928678510505084953368705697352744228476065201717951229499104950867686930789094269124851025527376333803161319757591738338778253379215524298964187264321873120734958619653n,
            23059679755339534539549909513661873597408677221640155658839615785509119112009043194313571427643482649150132291734097747570645287455652608098526532580442566000624616765853942177789425736323630736573413624847022720940915666639345795779456001203332620907061566267698144781735643790652509353408563496179148027220927225258167263896174835432948175437995629522668273232670765924579147658312818399320446640961617110405749215621511571238446845672193279143647724859001991542878587093617067119793151800141312912398214070065575333713998598705751646434878425534165900031951870037703007494499440362232339609003304229296513932861479n,
            22987283158017544797974151072415586962382298842474046813881974674015639327070613834519923793590458928104310575177451748909259999450719231892060210228296435542238793528260522229970339479083411600563709991535817572568291745291026806771379401205003212339213558446258502170235238642202797132111675055711150406243721124114961571171715746800443474584551054173372997696209601684312532670948440416088010251919574426115463208552382643657982609216863269566077440456457344512843619556555526396335634220176219298631381050895246173940522536120230562505424819406794571408014797205160865928595517915966644377369933428669125985409931n,
            27121970108189099360228261678201263342707091730364397311032221245943522992751053304812715143431546858776719482158469766710430673370473997353257853373405367527988992918236836164061258776167851329125513362623862384484177894838845561269725350653675725175660534847477363934575457113811142301988387473159739820138568312443806587393595214146651927801641965143310242363503559069514937683463336971848458929084975697855008243885897124034621549471398415634513019852059170981205395015833196965795430544235469054739018551538121458790169976197298225165232027466882635022963620149051290573252939065278931677064321171388745076097051n,
        ],
        safe: false,
    },
    safeBigInts: {
        values: [
            119445732379544598056145200053932732877863846799652384989588303737527328743970559883211146487286317168142202446955508902936035124709397221178664495721428029984726868375359168203283442617134197706515425366188396513684446494070223079865755643116690165578452542158755074958452695530623055205290232290667934914919n,
            0x3081880281805e51b5868634307c969fddd3376996cb96fcc7319c91e33e37400e88e82bde3cb30d532f68cdb0be62008bc6ae9690c47e4d48346ae8850fa0817013aa21a1bc9bef6b4ba001061db8d3eb39e5ea1f287e6bdafb831feadf5f8f791f6b57e9c60f4ed7c6927a335b33759d07c30079a8d7d62a25f6d1ac8fa25a2fde37f3ed1b0203010001n,
            166474209931996603560678044090702017338933152507779290148332389671949064450555961570210310815016132963831406007625861322961694877121950071683739020545812548557694821556867398312518638560536790405319569470327872697516392992275491190670744513975777611770512252263258343428215700383730640702266628698701594477453n,
        ],
        safe: true,
    },
};

for (const [name, testData] of Object.entries(tests)) {
    Deno.test({
        name,
        fn(): void {
            const result: number[] | bigint[] = batchGcd(testData.values);
            const safe = isSafe(result);
            assertEquals(safe, testData.safe);
        },
    });
}
