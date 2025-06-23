import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedMakers() {
    await prisma.maker.createMany({
        data: [
            {
                "name": "Nippon Steel Trading Matex Co.,LTD"
            },
            {
                "name": "Tounetsu Thai Co  Ltd"
            },
            {
                "name": "ARO"
            },
            {
                "name": "LOKAL"
            },
            {
                "name": "TOYOOKI"
            },
            {
                "name": "Wahyu Artha"
            },
            {
                "name": "SMC"
            },
            {
                "name": "NICHEI"
            },
            {
                "name": "TEMPSENS"
            },
            {
                "name": "JAPAN VALVE"
            },
            {
                "name": "KROM SCHRODER"
            },
            {
                "name": "Toyotsu Machinery Corporation"
            },
            {
                "name": "TSUBAKI"
            },
            {
                "name": "CKD"
            },
            {
                "name": "AZBIL"
            },
            {
                "name": "SANKEN"
            },
            {
                "name": "NISSIN RIKEN"
            },
            {
                "name": "HOPE"
            },
            {
                "name": "THERMAL INSULATION TECH"
            },
            {
                "name": "NTN"
            },
            {
                "name": "TAIYO"
            },
            {
                "name": "NACHI"
            },
            {
                "name": "HANYOUNG"
            },
            {
                "name": "TAIWAN"
            },
            {
                "name": "SANLI/ TAIWAN"
            },
            {
                "name": "YUKEN"
            },
            {
                "name": "KCL"
            },
            {
                "name": "Lucky Dragon International Co., Ltd."
            },
            {
                "name": "PM ELECTRIC"
            },
            {
                "name": "SUMITOMO"
            },
            {
                "name": "DID"
            },
            {
                "name": "HORIUCHI"
            },
            {
                "name": "THK"
            },
            {
                "name": "NBK"
            },
            {
                "name": "MARTIN"
            },
            {
                "name": "SHINPO"
            },
            {
                "name": "KHK"
            },
            {
                "name": "CHANTO\nTAIWAN"
            },
            {
                "name": "Hirose Valves"
            },
            {
                "name": "CML"
            },
            {
                "name": "YOSHITAKE"
            },
            {
                "name": "FYH"
            },
            {
                "name": "MISUMI"
            },
            {
                "name": "CLC"
            },
            {
                "name": "HER YIH HYDRAULIC"
            },
            {
                "name": "COOLBIT"
            },
            {
                "name": "MODENA"
            },
            {
                "name": "EUROTECH"
            },
            {
                "name": "NIPPON FOW CELL"
            },
            {
                "name": "FAWWAZ"
            },
            {
                "name": "YKT GEAR"
            },
            {
                "name": "KITZ"
            },
            {
                "name": "SINTO"
            },
            {
                "name": "NOHKEN"
            },
            {
                "name": "MIKI PULLY"
            },
            {
                "name": "FBN"
            },
            {
                "name": "Kiwa Machinery Co., Ltd"
            },
            {
                "name": "ABBA"
            },
            {
                "name": "KASUGA"
            },
            {
                "name": "OILES"
            },
            {
                "name": "TUFFIADI"
            },
            {
                "name": "TAIHEI BOEKI"
            },
            {
                "name": "OSAKA NISSYO INSTRUMENT CO. LTD"
            },
            {
                "name": "NABEYA"
            },
            {
                "name": "TAKIGEN"
            },
            {
                "name": "NAGANO KEIKI"
            },
            {
                "name": "NOK"
            },
            {
                "name": "GERONIMO"
            },
            {
                "name": "NIKKI"
            },
            {
                "name": "FUJI SEIMITSU"
            },
            {
                "name": "FAG"
            },
            {
                "name": "MITSUBOSHI"
            },
            {
                "name": "KANZAKI KOKYUKOKI MFG CO LTD"
            },
            {
                "name": "KOSMEK"
            },
            {
                "name": "KWANGJIN"
            },
            {
                "name": "BANDO"
            },
            {
                "name": "KITAGAWA"
            },
            {
                "name": "TOWA SEIDEN"
            },
            {
                "name": "MIHATA SEIKO"
            },
            {
                "name": "Sinar Artha Technic"
            },
            {
                "name": "OKUMA"
            },
            {
                "name": "RIX CO,.LTD."
            },
            {
                "name": "FANUC"
            },
            {
                "name": "IKO"
            },
            {
                "name": "TSUBAKIMOTO CHAIN CORPORATION"
            },
            {
                "name": "FUJI KOATSU FLEXIBLE HOSE CO.,LTD."
            },
            {
                "name": "PANASONIC"
            },
            {
                "name": "PRONA"
            },
            {
                "name": "DAIMA II"
            },
            {
                "name": "WIKA"
            },
            {
                "name": "TSUBAKI / HITACHI"
            },
            {
                "name": "KUO CHUAN MACHINERY"
            },
            {
                "name": "VENN"
            },
            {
                "name": "Asahi Sunac"
            },
            {
                "name": "TACMINA"
            },
            {
                "name": "LAFERT"
            },
            {
                "name": "SHOWA"
            },
            {
                "name": "MITSUBISHI ELECTRIC"
            },
            {
                "name": "UNI-D"
            },
            {
                "name": "C-KING"
            },
            {
                "name": "MIGISHITA"
            },
            {
                "name": "ORION"
            },
            {
                "name": "YAMAMOTO KEIKI"
            },
            {
                "name": "NKS"
            },
            {
                "name": "HORIBA"
            },
            {
                "name": "PARKINS"
            },
            {
                "name": "DUNGS"
            },
            {
                "name": "RIELLO"
            },
            {
                "name": "SIEMENS"
            },
            {
                "name": "BRAHMA"
            },
            {
                "name": "KAEL"
            },
            {
                "name": "Stark Asia"
            },
            {
                "name": "GIULIANI ANELLO"
            },
            {
                "name": "TLV"
            },
            {
                "name": "KOBELCO"
            },
            {
                "name": "KEYENCE"
            },
            {
                "name": "OMRON"
            },
            {
                "name": "TAKENAKA JAPAN"
            },
            {
                "name": "PATLITE"
            },
            {
                "name": "PHILIPS"
            },
            {
                "name": "KAWASAKI"
            },
            {
                "name": "ORIENTAL MOTOR"
            },
            {
                "name": "FUJI ELECTRIC"
            },
            {
                "name": "Nord-Lock"
            },
            {
                "name": "Omron"
            },
            {
                "name": "TDK -LAMBADA"
            },
            {
                "name": "IDEC"
            },
            {
                "name": "TOKYO RIKOSHO"
            },
            {
                "name": "NIPRON"
            },
            {
                "name": "SANYO DENKI"
            },
            {
                "name": "Chubu Meikiko"
            },
            {
                "name": "LS"
            },
            {
                "name": "LEGRAND"
            },
            {
                "name": "COSMOS"
            },
            {
                "name": "MATSUYOSHI"
            },
            {
                "name": "DAIWA DENGYO"
            },
            {
                "name": "SAGINOMIYA"
            },
            {
                "name": "PLUS ELECTCRIC"
            },
            {
                "name": "MARPOSS"
            },
            {
                "name": "COSEL"
            },
            {
                "name": "YUTAKA"
            },
            {
                "name": "JSK"
            },
            {
                "name": "MIRO"
            },
            {
                "name": "LECIP"
            },
            {
                "name": "IAI CORPORATION"
            },
            {
                "name": "SKYKIN"
            },
            {
                "name": "BUSMAN"
            },
            {
                "name": "ONO SOKI"
            },
            {
                "name": "APMATIC"
            },
            {
                "name": "IMF"
            },
            {
                "name": "HONEYWELL"
            },
            {
                "name": "MEIJI DENKI"
            },
            {
                "name": "PEPPERL FUCHS"
            },
            {
                "name": "ABC ALKALINE"
            },
            {
                "name": "FORT"
            },
            {
                "name": "IFM"
            },
            {
                "name": "NSK"
            },
            {
                "name": "NIHANA SEISAKUSHO"
            },
            {
                "name": "ASCO"
            },
            {
                "name": "Senta Andalan Kimia"
            },
            {
                "name": "ROTAMETER"
            },
            {
                "name": "SKF"
            },
            {
                "name": "YU-SHING"
            },
            {
                "name": "AICHI TOKEI"
            },
            {
                "name": "ELMECON"
            },
            {
                "name": "ORIGINAL ORION"
            },
            {
                "name": "AFE"
            },
            {
                "name": "HINODE"
            },
            {
                "name": "EURAS TECHNO"
            },
            {
                "name": "SCHUH"
            },
            {
                "name": "KOGANEI"
            },
            {
                "name": "MITSUBISHI MOTOR"
            },
            {
                "name": "DAIKIN"
            },
            {
                "name": "YOKOHAMA"
            },
            {
                "name": "JTEKT"
            },
            {
                "name": "Isuzu MFG Co Ltd"
            },
            {
                "name": "GTR"
            },
            {
                "name": "FUJI HENSOKUKI"
            },
            {
                "name": "MASUDA"
            },
            {
                "name": "TAISEI KOGYO"
            },
            {
                "name": "IHI"
            },
            {
                "name": "FUJIKIN"
            },
            {
                "name": "DAIICHI KEIKI"
            },
            {
                "name": "NISSEI"
            },
            {
                "name": "LINE SEIKI"
            },
            {
                "name": "SCHNEIDER"
            },
            {
                "name": "YASKAWA"
            },
            {
                "name": "TOSHIBA"
            },
            {
                "name": "CIC"
            },
            {
                "name": "Autonics"
            },
            {
                "name": "SIKA"
            },
            {
                "name": "MELCO TECHNOREX"
            },
            {
                "name": "Tsubaki"
            },
            {
                "name": "ASB"
            },
            {
                "name": "OPTIBELT"
            },
            {
                "name": "UNITTA"
            },
            {
                "name": "PERKINS"
            },
            {
                "name": "SINFONIA"
            },
            {
                "name": "BUSCH"
            },
            {
                "name": "YUEMA"
            },
            {
                "name": "EVACH"
            },
            {
                "name": "PARKER CORPORATION"
            },
            {
                "name": "American Meter Company"
            },
            {
                "name": "NIDEC"
            },
            {
                "name": "NSD"
            },
            {
                "name": "ASAHI YUKIZAI KOGYO"
            },
            {
                "name": "SANKO"
            },
            {
                "name": "Shimada Electric"
            },
            {
                "name": "KYORITSU"
            },
            {
                "name": "MARELLIMOTORI"
            },
            {
                "name": "HISAKA"
            },
            {
                "name": "NIKKEN"
            },
            {
                "name": "Chiyoda Kogyo"
            },
            {
                "name": "JPC"
            },
            {
                "name": "DAIDO"
            },
            {
                "name": "Misumi"
            },
            {
                "name": "INGERSOLL"
            },
            {
                "name": "Wilisindomas Indah Makmur"
            },
            {
                "name": "Valco"
            },
            {
                "name": "Kurita"
            },
            {
                "name": "NBR"
            },
            {
                "name": "SWIF ASIA"
            },
            {
                "name": "HITACHI"
            },
            {
                "name": "Philips"
            },
            {
                "name": "Gandox"
            },
            {
                "name": "FUKUTA"
            },
            {
                "name": "NSV"
            },
            {
                "name": "OTG"
            },
            {
                "name": "COGNEX"
            },
            {
                "name": "MIHARA"
            },
            {
                "name": "KOYO"
            },
            {
                "name": "MAXITROL"
            },
            {
                "name": "CORGHI"
            },
            {
                "name": "GRAYHILL"
            },
            {
                "name": "DELTA"
            },
            {
                "name": "LIANG CHI"
            },
            {
                "name": "BOSTIK"
            },
            {
                "name": "Yu Shine Precision"
            },
            {
                "name": "JAKI"
            },
            {
                "name": "KIT"
            },
            {
                "name": "NITTO KOHKI"
            },
            {
                "name": "BRIDGESTONE"
            },
            {
                "name": "YODOGAWA KEIKI"
            },
            {
                "name": "AXEL"
            },
            {
                "name": "HOWA"
            },
            {
                "name": "PASCAL"
            },
            {
                "name": ""
            },
            {
                "name": "UENO"
            },
            {
                "name": "SAN-S INDUSTRY"
            },
            {
                "name": "AMANO"
            },
            {
                "name": "ITOH DENKI"
            },
            {
                "name": "NICHIDEN"
            },
            {
                "name": "ISK"
            },
            {
                "name": "Azbil"
            },
            {
                "name": "Martin"
            },
            {
                "name": "ELEKTRIM"
            },
            {
                "name": "ONDA"
            },
            {
                "name": "PARKER TAIYO"
            },
            {
                "name": "SANWA DENKI"
            },
            {
                "name": "Sumitomo"
            },
            {
                "name": "HAKUSAN KIKO"
            },
            {
                "name": "WALRUZ"
            },
            {
                "name": "TUNG LEE ELECTRICAL CO., LTD"
            },
            {
                "name": "SAN ACE"
            },
            {
                "name": "HERATON"
            },
            {
                "name": "IMPA"
            },
            {
                "name": "JUFAN"
            },
            {
                "name": "Sougou Plant Co;LTD"
            },
            {
                "name": "COBE"
            },
            {
                "name": "SKCL"
            },
            {
                "name": "PARKER"
            },
            {
                "name": "PHOENIX"
            },
            {
                "name": "RPM"
            },
            {
                "name": "UTICON"
            },
            {
                "name": "BROCO"
            },
            {
                "name": "NMB"
            },
            {
                "name": "PAPST"
            },
            {
                "name": "LAMBDA"
            },
            {
                "name": "MITSUWA"
            },
            {
                "name": "WINSAN"
            },
            {
                "name": "Nanaboshi"
            },
            {
                "name": "MADOKA"
            },
            {
                "name": "Keyence"
            },
            {
                "name": "SHIHLIN"
            },
            {
                "name": "KSP"
            },
            {
                "name": "NICHIFU"
            },
            {
                "name": "NBS"
            },
            {
                "name": "TOYOKIGEN"
            },
            {
                "name": "NITTA"
            },
            {
                "name": "NITTO"
            },
            {
                "name": "3M ( SCOTH )"
            },
            {
                "name": "LLFA"
            },
            {
                "name": "SENQCIA"
            },
            {
                "name": "PILAR PLATINUM MULIA"
            },
            {
                "name": "NORMAX"
            },
            {
                "name": "ROTEK"
            },
            {
                "name": "GRUNDFOS"
            },
            {
                "name": "EBARA"
            },
            {
                "name": "MEITOMO"
            },
            {
                "name": "EZO"
            },
            {
                "name": "IJK"
            },
            {
                "name": "MOK"
            },
            {
                "name": "KOYO / FAG / NTN"
            },
            {
                "name": "NSK/NTN"
            },
            {
                "name": "tuffiadi"
            },
            {
                "name": "FAG / NTN /KOYO"
            },
            {
                "name": "HIWIN"
            },
            {
                "name": "smc"
            },
            {
                "name": "THK/IKO"
            },
            {
                "name": "NB"
            },
            {
                "name": "TTO"
            },
            {
                "name": "KAWAMURA"
            },
            {
                "name": "VALQUA"
            },
            {
                "name": "NQK"
            },
            {
                "name": "TIGER SEAL"
            },
            {
                "name": "SAKAGAMI"
            },
            {
                "name": "VITON"
            },
            {
                "name": "TOKYO HATSUJYO"
            },
            {
                "name": "Herry & Co"
            },
            {
                "name": "TECO"
            },
            {
                "name": "AC MOTOREN GMBH"
            },
            {
                "name": "TATUNG"
            },
            {
                "name": "DAIMA"
            },
            {
                "name": "HAMMERINDO"
            },
            {
                "name": "MAKISHINKO"
            },
            {
                "name": "CNP"
            },
            {
                "name": "SHINTO"
            },
            {
                "name": "MONDYLIA AMERTA"
            },
            {
                "name": "CHUAN FAN"
            },
            {
                "name": "CV Beta Gaberta Mekanindo"
            },
            {
                "name": "SIGA"
            },
            {
                "name": "YUTAKA DENSHI"
            },
            {
                "name": "MEZ MOHELNICE"
            },
            {
                "name": "Yutaka Denshi"
            },
            {
                "name": "APISTE"
            },
            {
                "name": "MCN"
            },
            {
                "name": "Central Motor Wheel Of America"
            },
            {
                "name": "DAIKI CO. LTD"
            },
            {
                "name": "KITO"
            },
            {
                "name": "TKR"
            },
            {
                "name": "ANES IWATA"
            },
            {
                "name": "SHOWA DENKI"
            },
            {
                "name": "BEST"
            },
            {
                "name": "Ebara"
            },
            {
                "name": "Wahana Engineering/Geronimo"
            },
            {
                "name": "YAMAHA"
            },
            {
                "name": "HITECH"
            },
            {
                "name": "MEITOKU-WADAYAMA INDONESIA"
            },
            {
                "name": "BONFIG"
            },
            {
                "name": "ARIFABA"
            },
            {
                "name": "ULVAC"
            }
        ],
        skipDuplicates: true
    });
}
