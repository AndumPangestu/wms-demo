import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedSuppliers() {
    await prisma.supplier.createMany({
        data: [
            {
                "name": "PT Suryacipta Swadaya"
            },
            {
                "name": "PT Jaya Sentosa Sistimindo"
            },
            {
                "name": "Dodik Susilo Hardoyo / Ruko Race Karawang"
            },
            {
                "name": "PT. Serasi Autoraya"
            },
            {
                "name": "PT Nusantara Secom Infotech"
            },
            {
                "name": "H.Nurdin Yahya"
            },
            {
                "name": "KUO CHUAN MACHINERY INDUSTRIAL CO.,LTD."
            },
            {
                "name": "PT Astra Graphia, Tbk"
            },
            {
                "name": "PT JAC Business Center"
            },
            {
                "name": "Smart Bimantara"
            },
            {
                "name": "PT OS Selnajaya Indonesia"
            },
            {
                "name": "Grand Royal Panghegar"
            },
            {
                "name": "PT. Jinzai Haken Indonesia"
            },
            {
                "name": "PT. JAC Consulting Indonesia"
            },
            {
                "name": "PT Swif Asia"
            },
            {
                "name": "Lucky Dragon International Co., Ltd."
            },
            {
                "name": "PT JobStreet Indonesia"
            },
            {
                "name": "PT Kawan Lama Sejahtera"
            },
            {
                "name": "PT Indonesia Road Development"
            },
            {
                "name": "KAP Tanudiredja, Wibisana, Rintis & Rekan"
            },
            {
                "name": "Central Motor Wheel Co. LTD"
            },
            {
                "name": "PT Central Motor Wheel Indonesia"
            },
            {
                "name": "PT Amano Indonesia"
            },
            {
                "name": "PT Kaliguma Transindo"
            },
            {
                "name": "Sankensangyo Co., Ltd"
            },
            {
                "name": "PT Asuka Engineering Indonesia"
            },
            {
                "name": "PT. SANANGA LISYAVIRA MAULANA"
            },
            {
                "name": "PT Hitachi Plant Technologies Indonesia"
            },
            {
                "name": "Tounetsu Thai Co., Ltd"
            },
            {
                "name": "Izutech Corporation"
            },
            {
                "name": "PT. Panel Bakti Sinarindo"
            },
            {
                "name": "PT Setsuyo Astec"
            },
            {
                "name": "PT Forta Inti Travelindo"
            },
            {
                "name": "PT Crown Line"
            },
            {
                "name": "PT Ume Persada Indonesia"
            },
            {
                "name": "Sumikin Bussan Matex Corporation"
            },
            {
                "name": "Toyotsu Machinery Corporation"
            },
            {
                "name": "Kiwa Machinery Co., Ltd"
            },
            {
                "name": "Yu Shine Precision Machine Co., Ltd"
            },
            {
                "name": "PT Zahwan Mitrateknindo"
            },
            {
                "name": "PT Agape Trikarsa Libratama"
            },
            {
                "name": "PT Hemel Electric"
            },
            {
                "name": "PT Andalan Mutu Energi"
            },
            {
                "name": "PT Shinanoa Indonesia"
            },
            {
                "name": "Isuzu MFG Co Ltd"
            },
            {
                "name": "Toyota Yuki Co Ltd"
            },
            {
                "name": "Toyota Tsusho Corporation"
            },
            {
                "name": "PT Riyadi Putera Makmur"
            },
            {
                "name": "PT Citra Kencana Hotelindo"
            },
            {
                "name": "PT Mandiri Anugerah Abadi"
            },
            {
                "name": "PT Inti Surya Lasindo"
            },
            {
                "name": "CV Sinar Khatulistiwa Corporation"
            },
            {
                "name": "PT Amco Multitech"
            },
            {
                "name": "PT Rexton Indocoating (Indiana Group)"
            },
            {
                "name": "CV Cahaya Citrasurya Indoprima"
            },
            {
                "name": "PT Sinar Buana"
            },
            {
                "name": "PT Atlas Petrochem Indo"
            },
            {
                "name": "BIRO TEHNIK NAIB"
            },
            {
                "name": "PT Sugimura Chemical Indonesia"
            },
            {
                "name": "PT Trustindo Mekatronics Mulya"
            },
            {
                "name": "Regional Tech PTE Ltd"
            },
            {
                "name": "PT Wasa Mitra Engineering"
            },
            {
                "name": "Lampu Utama Electric"
            },
            {
                "name": "CV Dwimanunggal Filter"
            },
            {
                "name": "PT Berkat Keselamatan Dunia"
            },
            {
                "name": "PT Geronimo Sukses Mandiri"
            },
            {
                "name": "Daima II"
            },
            {
                "name": "Plus Electric CO.LTD"
            },
            {
                "name": "CV Sinar Makmur"
            },
            {
                "name": "PT Sentral Koneksi Internasional"
            },
            {
                "name": "PT Home Center Indonesia"
            },
            {
                "name": "Koperasi Jasa Keselamatan Radiasi Dan Lingkungan"
            },
            {
                "name": "PT YanaSurya BhaktiPersada"
            },
            {
                "name": "PT Asrico Putra perdana"
            },
            {
                "name": "PT ISK Indonesia"
            },
            {
                "name": "PT Taiyo Sinar Raya Teknik"
            },
            {
                "name": "Parker Engineering CO,LTD"
            },
            {
                "name": "PT MAKMUR META GRAHA DINAMIKA"
            },
            {
                "name": "CV Puji Sarana Jaya"
            },
            {
                "name": "PT Industrial Chemitomo Nusantara"
            },
            {
                "name": "PT. SUPERINTENDING COMPANY OF INDONESIA"
            },
            {
                "name": "Chubu Meikiko . Co.Ltd"
            },
            {
                "name": "PT Prima Wahana Caraka"
            },
            {
                "name": "Shimadzu Rika Corporation"
            },
            {
                "name": "PT Tiki Jalur Nugraha Ekakurir"
            },
            {
                "name": "PT Repex Perdana International"
            },
            {
                "name": "PT. Puninar MSE Indonesia"
            },
            {
                "name": "PT Sinar Inti Indopratama"
            },
            {
                "name": "PT Mitrasukses Engineering Indonesia"
            },
            {
                "name": "CV Djaya Bersama"
            },
            {
                "name": "PT Prolabmas Murni Swadaya"
            },
            {
                "name": "CV Herry & Co"
            },
            {
                "name": "PT Antareja Prima Antaran"
            },
            {
                "name": "PT Iwatani Industrial Gas Indonesia"
            },
            {
                "name": "Miroku Industry Co.,Ltd"
            },
            {
                "name": "Home & Office Furniture"
            },
            {
                "name": "PT Panducakrawala Buana Pertiwi"
            },
            {
                "name": "PT Foseco Indonesia"
            },
            {
                "name": "PT Fuji Presisi Tool Indonesia"
            },
            {
                "name": "Haidar Interior & Furniture"
            },
            {
                "name": "PT Toyota Tsusho Indonesia"
            },
            {
                "name": "PT Forklift Rental Indonesia"
            },
            {
                "name": "CV Padamas Inti Sentosa"
            },
            {
                "name": "Mulyati/Hasta Translation & Education Agency"
            },
            {
                "name": "CV. Wahana Engineering"
            },
            {
                "name": "PT Moresco Indonesia"
            },
            {
                "name": "PT Krisbow Indonesia"
            },
            {
                "name": "Nihon Kohnetsu Industrial Co Ltd"
            },
            {
                "name": "Kanzaki Kokyukoki Mfg Co Ltd"
            },
            {
                "name": "PT Toyota Tsusho Insurance Broker Indonesia"
            },
            {
                "name": "PT Anugerah Metal Mitra Mandiri"
            },
            {
                "name": "PT Preshion Engineering Plastec"
            },
            {
                "name": "Hitachi Plant-Wasa Mitra Joint Operation"
            },
            {
                "name": "Keyence Singapore Pte.,Ltd"
            },
            {
                "name": "Asahi Sunac Corporation"
            },
            {
                "name": "PT Kansai Prakarsa Coating"
            },
            {
                "name": "INFORMA"
            },
            {
                "name": "Muria Pilar Abadi"
            },
            {
                "name": "Yutaka Denshi"
            },
            {
                "name": "CV Wira Griya Mustika"
            },
            {
                "name": "Kyoei Kogyo"
            },
            {
                "name": "CV Kautsar Insan Mandiri"
            },
            {
                "name": "PT Indonesia Comnets Plus"
            },
            {
                "name": "PT Sinergi Solusi Indonesia"
            },
            {
                "name": "Hitachi Ltd"
            },
            {
                "name": "Nihon Parkerizing Co, Ltd"
            },
            {
                "name": "PT Secom Indonesia"
            },
            {
                "name": "Yutaka Electronics Industry Co Ltd"
            },
            {
                "name": "PT Parker Engineering Indonesia"
            },
            {
                "name": "PT Tri Mulia Sejahtera"
            },
            {
                "name": "PT Wisma Karawang"
            },
            {
                "name": "Logics Company"
            },
            {
                "name": "CV Senta Andalan Kimia"
            },
            {
                "name": "PT Dwikarsa Jaya Utama"
            },
            {
                "name": "PT Saritech Pratama Mandiri"
            },
            {
                "name": "PT Toyota Tsusho Mechanical & Engineering Service Indonesia"
            },
            {
                "name": "Koperasi Pegawai RI UPT Balai LIN-LIPI Bandung (Kolin)"
            },
            {
                "name": "PT Tirta Investama"
            },
            {
                "name": "PT Nusantara Parkerizing"
            },
            {
                "name": "Lintas Buana"
            },
            {
                "name": "PT Kanefusa Indonesia"
            },
            {
                "name": "PT Dita Utama"
            },
            {
                "name": "PT Jaya Induksi Elektrik"
            },
            {
                "name": "PT Kalden Indonesia"
            },
            {
                "name": "PT Yamazen Indonesia"
            },
            {
                "name": "RONY SETIAWAN"
            },
            {
                "name": "Setiawan Tehnik"
            },
            {
                "name": "CV Bintang Mayoki"
            },
            {
                "name": "Kurnia Asih"
            },
            {
                "name": "PT Mol Logistic Indonesia"
            },
            {
                "name": "PT May Technos Indonesia"
            },
            {
                "name": "CV Anugrah Sejahtera"
            },
            {
                "name": "PT Astra Daido Steel Indonesia"
            },
            {
                "name": "PT Axalta Powder Coating Systems Indonesia"
            },
            {
                "name": "PT Himalaya Everest Jaya"
            },
            {
                "name": "PT Pelita Karya Suplindo"
            },
            {
                "name": "PT Kobelindo Compressors"
            },
            {
                "name": "CV Karya Utama"
            },
            {
                "name": "CHIO Medical Center"
            },
            {
                "name": "CV Berdikary Stationery"
            },
            {
                "name": "PT Yutaka Robot System Indonesia"
            },
            {
                "name": "PT Indoserako Sejahtera"
            },
            {
                "name": "PT Sentosa Metalurgi Indomas"
            },
            {
                "name": "PT Honshu Indonesia"
            },
            {
                "name": "PT. Nippon Express Indonesia"
            },
            {
                "name": "Tounetsu Co Ltd"
            },
            {
                "name": "PT Birotika Semesta"
            },
            {
                "name": "PT Kurita Indonesia"
            },
            {
                "name": "CV Kutanegara Jaya Mandiri ( Dedi Kusnaedi)"
            },
            {
                "name": "CV Karya Putra Mandiri"
            },
            {
                "name": "PT Rukun Sejahtera Teknik"
            },
            {
                "name": "PT Kharisma Surya Semesta"
            },
            {
                "name": "PT Inox Prima"
            },
            {
                "name": "PT Nishinihon Techno"
            },
            {
                "name": "PT Fanuc Indonesia"
            },
            {
                "name": "Nippon Steel & Sumikin Bussan Matex Co , LTD"
            },
            {
                "name": "PT Veneta Nusantara"
            },
            {
                "name": "PT Melindo Dipta"
            },
            {
                "name": "CV Beta Gaberta Mekanindo"
            },
            {
                "name": "PT Hikari Automation Indonesia"
            },
            {
                "name": "PT Creative Mitra selaras Indonesia"
            },
            {
                "name": "PT Precision Tools Service Indonesia"
            },
            {
                "name": "PT Misumi Indonesia"
            },
            {
                "name": "PT. Uniair Indotama Cargo"
            },
            {
                "name": "PT Kamigumi Indonesia"
            },
            {
                "name": "PT Solusindo Mandiri Indonesia"
            },
            {
                "name": "PT Traktor Nusantara"
            },
            {
                "name": "PT Tridinamika Jaya Instrument"
            },
            {
                "name": "PT Azbil Berca Indonesia"
            },
            {
                "name": "PT Ume Sembada"
            },
            {
                "name": "PT Mutiara Safetyndo"
            },
            {
                "name": "PT Jaly Indonesia Utama"
            },
            {
                "name": "PT Surya Internusa Hotels"
            },
            {
                "name": "Kroeplin GmbH"
            },
            {
                "name": "PT Elmecon Multikencana"
            },
            {
                "name": "PT Asahi Seiren Indonesia"
            },
            {
                "name": "PT Sumbertama Jaya Teknik"
            },
            {
                "name": "PT Keyence Indonesia"
            },
            {
                "name": "PT Mitutoyo Indonesia"
            },
            {
                "name": "PT Kito Indonesia"
            },
            {
                "name": "PT Numacindo Karsakharisma"
            },
            {
                "name": "PT Central Elektrindo Mandiri"
            },
            {
                "name": "PT Dasa Windu Agung"
            },
            {
                "name": "PT Mondylia Amerta"
            },
            {
                "name": "PT Surrama Tridaya Mandiri"
            },
            {
                "name": "PT. Pyramida Weka Solutions"
            },
            {
                "name": "PT Hashimoto Sansho Indonesia"
            },
            {
                "name": "PT Sadikun Niagamas Raya"
            },
            {
                "name": "PT TNT Skypak International Express"
            },
            {
                "name": "PT Kawamura Indah"
            },
            {
                "name": "Fiefie Pieter SH"
            },
            {
                "name": "PT Jasa Niaga Ekspres Karawang"
            },
            {
                "name": "PT Crown Line"
            },
            {
                "name": "Iwatani Corporation"
            },
            {
                "name": "PT Ditek Jaya"
            },
            {
                "name": "CV Sinar Artha Technic"
            },
            {
                "name": "CV Wahyu Arta Technic"
            },
            {
                "name": "Rumah Sakit Cito Karawang"
            },
            {
                "name": "CV Kobana Mitratech"
            },
            {
                "name": "TT Network Integration Asia PTE ltd"
            },
            {
                "name": "PT Sinar Mas Sakti"
            },
            {
                "name": "PT Flexindomas"
            },
            {
                "name": "PT Heisei M&E Engineering"
            },
            {
                "name": "Okuma Corporation"
            },
            {
                "name": "PT Permata Budi"
            },
            {
                "name": "PT Threebond Garpan Sales Indonesia"
            },
            {
                "name": "PT Cipta Prima Jaya"
            },
            {
                "name": "PT Kanzaki Tjokro Machine Tools Indonesia"
            },
            {
                "name": "PT Amanah Lintas Buana Kargotama"
            },
            {
                "name": "PT Gandox Jaya Chemical"
            },
            {
                "name": "PT Wilisindomas Indah Makmur"
            },
            {
                "name": "PT Pusaco International"
            },
            {
                "name": "Ryoka Sangyo Co;LTd"
            },
            {
                "name": "PT Roda Hammerindo Jaya"
            },
            {
                "name": "PT Multiple Varindo"
            },
            {
                "name": "PT. Dian Dinamika"
            },
            {
                "name": "Masterdiatek Visual Sistimindo"
            },
            {
                "name": "CV Aircon Delta Service"
            },
            {
                "name": "PT Water Laboratory Nusantara Indonesia"
            },
            {
                "name": "Yayasan Pemeliharaan Sekolah Jepang"
            },
            {
                "name": "Residence 8 Senopati Apartment"
            },
            {
                "name": "Big Bird Pustaka"
            },
            {
                "name": "Axell Giken Co;LTD"
            },
            {
                "name": "PT Umetoku Indonesia"
            },
            {
                "name": "DELOITTE TOUCHE SOLUTIONS"
            },
            {
                "name": "Eminence at Essence Apartment"
            },
            {
                "name": "PT Santoso Teknindo"
            },
            {
                "name": "PT Delta Cipta Mandiri"
            },
            {
                "name": "Merdeka Jaya"
            },
            {
                "name": "PT Darmawan Alvinindo"
            },
            {
                "name": "PT. Amplasindo Jatra Tama"
            },
            {
                "name": "PT Nittsu Lemo Indonesia Logistik"
            },
            {
                "name": "Sentra Kantor"
            },
            {
                "name": "PT Mitra Buana Internasional Logistindo"
            },
            {
                "name": "PT. PLN Karawang"
            },
            {
                "name": "PT Malaka Jaya Abadi"
            },
            {
                "name": "PT Techno Triireka"
            },
            {
                "name": "BPJS Kesehatan"
            },
            {
                "name": "PT Uap Air"
            },
            {
                "name": "PT Dwi Cipta Mandiri"
            },
            {
                "name": "PT Indo makmur Mandiri"
            },
            {
                "name": "Sakura Park Residence"
            },
            {
                "name": "PT Sahabat Waskita Tehnik"
            },
            {
                "name": "PT. Wiratama Bhakti Anugrah"
            },
            {
                "name": "PT Bukit Mas Bearindo"
            },
            {
                "name": "PT Smessindo Lubritech"
            },
            {
                "name": "Surya Djaya Abadi"
            },
            {
                "name": "CV United Controls"
            },
            {
                "name": "Meiwa e-TEC Co.,LTD"
            },
            {
                "name": "PT. Daya Maju Utama"
            },
            {
                "name": "PT Pandu Hydro Pneumatics"
            },
            {
                "name": "PT Indobearing Perkasa"
            },
            {
                "name": "PT SM-Cyclo Indonesia"
            },
            {
                "name": "CV Mandiri Makmur Abadi"
            },
            {
                "name": "CV Mitra Dunia Palletindo"
            },
            {
                "name": "PT Auto Aska Indonesia"
            },
            {
                "name": "PT Tuffiadi Semesta"
            },
            {
                "name": "PT Hast Tehcno Manufacturing"
            },
            {
                "name": "Mocasell Germany"
            },
            {
                "name": "PT Astra International Tbk"
            },
            {
                "name": "PT Intan Pertiwi Industri"
            },
            {
                "name": "PT. Astra International Tbk - Daihatsu"
            },
            {
                "name": "PT SURYA ENERGI PARAHITA"
            },
            {
                "name": "CV Kharisma Era Sejahtera"
            },
            {
                "name": "PT Essa Satyagrap Abbid"
            },
            {
                "name": "PT. Sinar Agung Gumilang Sejahtera"
            },
            {
                "name": "PT. Netmarks Indonesia"
            },
            {
                "name": "PT Himawan Putra"
            },
            {
                "name": "Prisma Computer"
            },
            {
                "name": "PT ASURANSI ASTRA BUANA"
            },
            {
                "name": "PT Parba Nusantara"
            },
            {
                "name": "PT Primalayan Citra Mandiri"
            },
            {
                "name": "PT. Nexus Thermal Technology Indonesia"
            },
            {
                "name": "PT. NIKKO TEKNIK INDONESIA"
            },
            {
                "name": "CV Dulank Sejahtera Cida"
            },
            {
                "name": "PT Brasali Realty"
            },
            {
                "name": "PT. Sumber Alfaria Trijaya, TBK"
            },
            {
                "name": "PT. Arianto Darmawan"
            },
            {
                "name": "PT. Astragraphia Xprins Indonesia"
            },
            {
                "name": "CV. Cahaya Nusantara Express"
            },
            {
                "name": "PT Sinto Indonesia"
            },
            {
                "name": "PT. Alemega Sejahtera"
            },
            {
                "name": "PT Almega Sejahtera"
            },
            {
                "name": "PT Fawwazindo Ghina Persada"
            },
            {
                "name": "PT. Sumber Surya Kalvari"
            },
            {
                "name": "PT Prismas Jamintara"
            },
            {
                "name": "PT. Tetha Alphindo"
            },
            {
                "name": "CV. Cahaya Mitra Prima"
            },
            {
                "name": "Nirwana Engineering"
            },
            {
                "name": "PT Sandimitra Agung Sejahtera"
            },
            {
                "name": "PT. Indomarco Prismatama"
            },
            {
                "name": "PT. Pahaman Engineering Makmur"
            },
            {
                "name": "PT. Pamahan Engineering Makmur"
            },
            {
                "name": "Nanang Widianto"
            },
            {
                "name": "PT. HASTA PRIMA SEJATI"
            },
            {
                "name": "PT. Sankyu Indonesia International"
            },
            {
                "name": "PT. Sinergi Mega Karya"
            },
            {
                "name": "PT. AKI NOO SORA"
            },
            {
                "name": "PT Dyas Marto Perkasa"
            },
            {
                "name": "Simpati Stationary"
            },
            {
                "name": "Karunia Line"
            },
            {
                "name": "CV Mulia Megah Perkasa"
            },
            {
                "name": "CV. Cahaya Penta Jaya"
            },
            {
                "name": "PT. Herico Jaya Lestari"
            },
            {
                "name": "CV. Asrindo Mega Perkasa"
            },
            {
                "name": "CV Qistech Plasindo"
            },
            {
                "name": "PT. Toyota Tsusho Indonesia"
            },
            {
                "name": "PT. SGS Indonesia"
            },
            {
                "name": "Rumah Sakit Jasa Kartini"
            },
            {
                "name": "PT Uli Karawang"
            },
            {
                "name": "Angel Cell"
            },
            {
                "name": "PT Medialab Indonesia"
            },
            {
                "name": "PT. Galtys Jayanti Mandiri"
            },
            {
                "name": "PT. Indovisual Sistem Integrasi"
            },
            {
                "name": "Taisei Trading Co., Ltd"
            },
            {
                "name": "PT Multicord Karyasakti"
            },
            {
                "name": "PT Bravo Satya Kencana"
            },
            {
                "name": "Bintang Mandiri Teknik"
            },
            {
                "name": "PT. Adisha"
            },
            {
                "name": "Widodo"
            },
            {
                "name": "H. Ato Karmo"
            },
            {
                "name": "PT. OSG Indonesia"
            },
            {
                "name": "PT. Linde Indonesia"
            },
            {
                "name": "WitaCam"
            },
            {
                "name": "PT TUV SUD Indonesia"
            },
            {
                "name": "CV winco Indonesia"
            },
            {
                "name": "PT. Sava Jaya Anugerah"
            },
            {
                "name": "PT. Pyrotek Indonesia"
            },
            {
                "name": "PT. Duta Wahana Karawang"
            },
            {
                "name": "General Shop"
            },
            {
                "name": "Central Motor Wheel Of America"
            },
            {
                "name": "Kantor Konsultan Aktuaria Halim dan Rekan"
            },
            {
                "name": "PT. Mitra Jaya Toolsindo"
            },
            {
                "name": "PT HAZAMA ANDO MURINDA"
            },
            {
                "name": "CV. Makmur Jaya Teknik"
            },
            {
                "name": "PT. Athran Bama Logistic"
            },
            {
                "name": "CV. Sentra Abadi Sejahtera"
            },
            {
                "name": "PT Sejahtera Visitama"
            },
            {
                "name": "PD. Mitra Sarana Sejahtera"
            },
            {
                "name": "Balai Besar Bahan & Barang Teknik"
            },
            {
                "name": "PT. Pilar Platinum Mulia"
            },
            {
                "name": "Hotel Sahid Jaya International"
            },
            {
                "name": "Sutisna"
            },
            {
                "name": "CV. Diyatama Polyurethane"
            },
            {
                "name": "CV. Yudhistira"
            },
            {
                "name": "Atim Asep Permana"
            },
            {
                "name": "PT Schenker Petrolog Utama"
            },
            {
                "name": "PT Kyoritsu Electric Indonesia"
            },
            {
                "name": "PT. Yokoten Trading Indonesia"
            },
            {
                "name": "Shan Long Mechanical Engineering CO,.LTD"
            },
            {
                "name": "PT. Sinar Kharisma Mitra Agung"
            },
            {
                "name": "PT. PUSAT INDUSTRI INDONESIA"
            },
            {
                "name": "PT Radiant Jaya Bersama"
            },
            {
                "name": "PT Suma Delta Utama"
            },
            {
                "name": "CV Intisupplies Mega Perkasa"
            },
            {
                "name": "PT Itatsu Indonesia"
            },
            {
                "name": "PT. NEW MODULE INTERNATIONAL"
            },
            {
                "name": "CV. Surya Catering"
            },
            {
                "name": "CV. Nurul Hikmah Catering"
            },
            {
                "name": "PT TTL Residences"
            },
            {
                "name": "PT. Kreasi Semesta Nusa"
            },
            {
                "name": "Ray Corporation Tokyo Branch"
            },
            {
                "name": "PT.Microvision Indonesia"
            },
            {
                "name": "PT. Solution Centre Indonesia"
            },
            {
                "name": "Fathi Bawazier (Cipta Grafika)"
            },
            {
                "name": "PT. Repro Konsultan Indonesia (Ascott Kuningan Apartment)"
            },
            {
                "name": "PT Pancadaya Manunggal Sentosa"
            },
            {
                "name": "Yushi-Seihin CO.,LTD."
            },
            {
                "name": "PT Harum Tirta Jaya"
            },
            {
                "name": "PT. Pandu Siwi Sentosa"
            },
            {
                "name": "CV. Guna Wahana Mandiri"
            },
            {
                "name": "PT. Mitra Asmoco Utama"
            },
            {
                "name": "PT. Win Electro Heat"
            },
            {
                "name": "PT Bantrunk Murni Indonesia"
            },
            {
                "name": "PT. Dynatech International"
            },
            {
                "name": "FAHMI IDRIS"
            },
            {
                "name": "PT. Biotech Indo Gemilang"
            },
            {
                "name": "PT. Master Hose Raya"
            },
            {
                "name": "CV Asahi Family"
            },
            {
                "name": "PT. Taurina Travel Djaya"
            },
            {
                "name": "CV. Mutiara Teknik"
            },
            {
                "name": "PT Sinar Mutiara Cakrabuana"
            },
            {
                "name": "PT Patra Kiumbara Perdana"
            },
            {
                "name": "PT. Dehosi Wahana Perkasa"
            },
            {
                "name": "Japan Green Hospital Pte Ltd"
            },
            {
                "name": "Setiabudi Sky Garden Apartement (Teshima)"
            },
            {
                "name": "Yoga"
            },
            {
                "name": "PT Sentral Tehnologi Managemen"
            },
            {
                "name": "PT. Horenso Abadi Indonesia"
            },
            {
                "name": "PT. JAC Indonesia"
            },
            {
                "name": "Sougou Plant Co., LTD"
            },
            {
                "name": "Christopher E.A. Dano"
            },
            {
                "name": "CV Hyosindo Zatech Suppliesindo"
            },
            {
                "name": "PT Agung Mandiri Global"
            },
            {
                "name": "PT. Reeracoen Indonesia"
            },
            {
                "name": "CV. Paltech Hegusatama"
            },
            {
                "name": "PT. Pohon Graha Indah"
            },
            {
                "name": "PT. Yamasoji Indonesia"
            },
            {
                "name": "CV Buana Sinergi Engineering"
            },
            {
                "name": "PT. Sarana Cipta Unggul"
            },
            {
                "name": "PT. Sanko Soflan Indonesia"
            },
            {
                "name": "Ueda Trading Co.,LTD"
            },
            {
                "name": "PT Anugrah Karya Dianti"
            },
            {
                "name": "PT Mega Suksesindo Sejati"
            },
            {
                "name": "PT. Bandung Indah Permai"
            },
            {
                "name": "PT. Karawang City Development"
            },
            {
                "name": "PT Stark Asia Corporindo"
            },
            {
                "name": "PT Miura Indonesia"
            },
            {
                "name": "PT. Rasuna Setiabudi Raya"
            },
            {
                "name": "CV. Mandiri Megah Perkasa"
            },
            {
                "name": "PT Harapan Utama Indonesia"
            },
            {
                "name": "PT Duta Firza"
            },
            {
                "name": "PT. YKT Gear Indonesia"
            },
            {
                "name": "PT. Adhimukti Satya Anargya"
            },
            {
                "name": "Percetakan Prima Mandiri"
            },
            {
                "name": "PT Kirana Sakti Komputindo"
            },
            {
                "name": "CV Ran Indonesia"
            },
            {
                "name": "PT Andalan Dunia Semesta"
            },
            {
                "name": "PT. Himalaya Everest Jaya"
            },
            {
                "name": "PT Mitsubishi Corporation Indonesia"
            },
            {
                "name": "Setiabudi Sky Garden Apartement (Mori)"
            },
            {
                "name": "PT Mega Tekhnik Dhealfian"
            },
            {
                "name": "PT Forta Larese"
            },
            {
                "name": "PT Cipta Niaga Gas"
            },
            {
                "name": "PT Sayap Biru Ekspres"
            },
            {
                "name": "PT Kintetsu World Express Indonesia"
            },
            {
                "name": "CV. Saira Teknik"
            },
            {
                "name": "PT. SOKKA MULIA ABADI"
            },
            {
                "name": "PT Balina Agung Perkasa"
            },
            {
                "name": "PT Asahi Diamond Industrial Indonesia"
            },
            {
                "name": "PT. Hanwa Indonesia"
            },
            {
                "name": "PT. Wellbe Indonesia"
            },
            {
                "name": "PT 978 Energi Indonesia"
            },
            {
                "name": "CV H.K Airconindo"
            },
            {
                "name": "PT IRON BIRD TRANSPORT"
            },
            {
                "name": "PT Berlian Global Teknik"
            },
            {
                "name": "PT. Sarana Construction Indonesia"
            },
            {
                "name": "CV. Dina Catering"
            },
            {
                "name": "CV. Aneka Kreasi Design"
            },
            {
                "name": "PT. Ariake Cerako Indonesia"
            },
            {
                "name": "PT Minezawa Trading Indonesia"
            },
            {
                "name": "Park Avenue Apartment (Mr Yamada)"
            },
            {
                "name": "PT. SURYA MULIA PRIMA"
            },
            {
                "name": "PT Trust Tech Engineering Service"
            },
            {
                "name": "PT. Barkode"
            },
            {
                "name": "PT Asia Hoda Indonesia"
            },
            {
                "name": "PT Kahaya Sinergi Gemilang"
            },
            {
                "name": "PT Daiichi Mandiri Automation"
            },
            {
                "name": "PT Alvini Sumber Anugerah"
            },
            {
                "name": "Supramono"
            },
            {
                "name": "PT. Harum Indah Sari Tours & Travel"
            },
            {
                "name": "Akhmad Fatikhin (Agus H)"
            },
            {
                "name": "CV. Sopyan Jaya Cemerlang"
            },
            {
                "name": "Tri Pinang Sari"
            },
            {
                "name": "PT Ardhana Galuh Synergy"
            },
            {
                "name": "PT Sadikun BBM"
            },
            {
                "name": "PT Tempsens Asia Jaya"
            },
            {
                "name": "CV. Industri Konsultan Indonesia"
            },
            {
                "name": "PT. Leo Indokreasi"
            },
            {
                "name": "PT. Sarana Sehat Bersama"
            },
            {
                "name": "CV Qualitek Semesta Raya"
            },
            {
                "name": "CV Ayu Group"
            },
            {
                "name": "Miracle Consultant"
            },
            {
                "name": "PT. Bhumi Mahardika Jaya"
            },
            {
                "name": "Romadhon Asari"
            },
            {
                "name": "PT. Kanaya Utama Jaya"
            },
            {
                "name": "PT. Sakama Arsa Jayasri"
            },
            {
                "name": "Sopyan Sadri"
            },
            {
                "name": "PT Axia Multi Sarana"
            },
            {
                "name": "PT Gading Murni"
            },
            {
                "name": "PT. Altek Metalinti Jaya"
            },
            {
                "name": "CV Delta Instrument Jaya"
            },
            {
                "name": "Hakusankiko CO LTD"
            },
            {
                "name": "PT ILC Logistics Indonesia"
            },
            {
                "name": "Tounetsu CO.LTD (Chubu Office)"
            },
            {
                "name": "PT Laboratorium Medio Pratama"
            },
            {
                "name": "PT CAHAYA KASIH ANUGERAH"
            },
            {
                "name": "Minezawa CO.,LTD"
            },
            {
                "name": "PT Mandiri Transforma Global"
            },
            {
                "name": "Takenaka Electric Corporation"
            },
            {
                "name": "PT. SOMAGEDE INDONESIA"
            },
            {
                "name": "PT Makmur Tritama Selaras Indonesia"
            },
            {
                "name": "PT. VisaHQ Jasa Indonesia"
            },
            {
                "name": "Asep Suhendar"
            },
            {
                "name": "PT. Mitsubishi Electric Indonesia"
            },
            {
                "name": "PT Sertifikasi Profesi Indonesia"
            },
            {
                "name": "Kusnadi Permana (Saxon Techniciant)"
            },
            {
                "name": "CV DHARMALINDO"
            },
            {
                "name": "PT. Galuh Kelola Wahana"
            },
            {
                "name": "PT. Mitra Pinasthika Mustika Rent"
            },
            {
                "name": "PT. Putra Karawang"
            },
            {
                "name": "PT. Sahabat Indonesia Inti Mandiri"
            },
            {
                "name": "Iin Julianti"
            },
            {
                "name": "Dede Cahya"
            },
            {
                "name": "PT. Singgasana Maju Sukses"
            },
            {
                "name": "Supiati Rahmah"
            },
            {
                "name": "PT Yakinmaju Sentosa"
            },
            {
                "name": "PT. PUTRA HATIM MANDIRI"
            },
            {
                "name": "PT. Autorent Lancar Sejahtera"
            },
            {
                "name": "PT Qinthar Resindo Lestari"
            },
            {
                "name": "PT KARYA BESAR TEKNOLOGI INDONESIA"
            },
            {
                "name": "PT. CALTESYS INDONESIA"
            },
            {
                "name": "GAYA TRENDY JAYA COLECTION"
            },
            {
                "name": "PT. FPC Indonesia"
            },
            {
                "name": "PT Mandiri Sempurna Pangan"
            },
            {
                "name": "PT. SURVEYOR INDONESIA"
            },
            {
                "name": "PT. Sentra Suksestama Sentosa"
            },
            {
                "name": "KSO SUCOFINDO-SURVEYOR INDONESIA"
            },
            {
                "name": "PT. Prima Adhitama International Development"
            },
            {
                "name": "PT IDAKA INDONESIA"
            },
            {
                "name": "Ranti Burhayelti"
            },
            {
                "name": "PT. Solusi Rekatama Makmur"
            },
            {
                "name": "PT. NHK JAYA MANDIRI"
            },
            {
                "name": "PT. SANKYU LOGISTIK INDONESIA"
            },
            {
                "name": "PT. Olympia Kogyou Indonesia"
            },
            {
                "name": "CV PERKASA"
            },
            {
                "name": "PT. Mitsubishi Motors Krama Yudha Indonesia"
            },
            {
                "name": "PT. MITRA MAS INDONESIA"
            },
            {
                "name": "Nippon Steel Trading Matex Co.,LTD"
            },
            {
                "name": "PT. Global Mega Indonesia"
            },
            {
                "name": "PT Zenbi Machinery And Electronics Indonesia"
            },
            {
                "name": "PT. Talenta Guna Nusantara"
            },
            {
                "name": "PT Chiyoda Kogyo Indonesia"
            },
            {
                "name": "PT DUTA SWARNA DWIPA"
            },
            {
                "name": "PT. TRISAPTA EKA MAJU"
            },
            {
                "name": "PT MEITOKU-WADAYAMA INDONESIA"
            },
            {
                "name": "CV. Indo Cipta Persada"
            },
            {
                "name": "PT INA NUSANTARA ABADI"
            },
            {
                "name": "PT MORITA TJOKRO GEARINDO"
            },
            {
                "name": "PT EKADHARMA INTERNATIONAL TBK"
            },
            {
                "name": "PT. UNITEK STANDARINDO ENGINERING"
            },
            {
                "name": "PT. Syavira Putri Destars"
            },
            {
                "name": "PT. SHERICH INTERNATIONAL SUPPLY"
            },
            {
                "name": "Dadang Arifin"
            },
            {
                "name": "CV Embun Pagi"
            },
            {
                "name": "PT Aneka Infokom Tekindo"
            },
            {
                "name": "SAXON Test- and Tank- Equipment GmbH"
            },
            {
                "name": "PT. Delta Furindotama"
            },
            {
                "name": "CV. Tujuh Delapan Enam"
            },
            {
                "name": "Suntari"
            },
            {
                "name": "PT OTOMASI SOLUSI INTI"
            },
            {
                "name": "PT. ANUGERAH SEJAHTERA BERDIKARI"
            },
            {
                "name": "PT GUNJAYA DUA BERSAUDARA"
            },
            {
                "name": "PT. HANNA INSTRUMENTS INDOTAMA"
            },
            {
                "name": "PT Interarts Graha Selaras"
            },
            {
                "name": "CV AGUNG MITRA TEKNIK"
            },
            {
                "name": "CV. Putera Hawai Mandiri"
            },
            {
                "name": "PT. Mitek Solusi Abadi"
            },
            {
                "name": "Johan Silitonga"
            },
            {
                "name": "PT Brian Langgeng Sejahtera"
            },
            {
                "name": "PT FEDEX EXPRESS INTERNATIONAL"
            },
            {
                "name": "PT. Segoro Jaya Makmur Abadi"
            },
            {
                "name": "PT BAROKAH GLOBAL SOLUSI"
            },
            {
                "name": "PT ARPHUS REKA MANDIRI"
            },
            {
                "name": "PT. Bisa Mandiri Strategi Investasi"
            },
            {
                "name": "PT. SYSCAL"
            },
            {
                "name": "PT SARANA MITRA LUAS"
            },
            {
                "name": "Agus Budiwaluyo"
            },
            {
                "name": "PT ARTIUM ALBA RAYA"
            },
            {
                "name": "PT. SRIWIJAYA KONTRINDO PERKASA"
            },
            {
                "name": "CV ANUGERAH TEKNIKTAMA"
            },
            {
                "name": "PT Uli Karawang Mandiri"
            },
            {
                "name": "PT Bintang Tujuh Delapan Enam"
            },
            {
                "name": "PT MITRAINDO TEKNIKA CEMERLANG"
            },
            {
                "name": "PT. Bromindo Mekar Mitra"
            },
            {
                "name": "BALAI BESAR PENGEMBANGAN INDUSTRI LOGAM DAN MESIN"
            },
            {
                "name": "PT CHANDRA KARYA MANDIRI"
            },
            {
                "name": "PT INDONESIA ASAHAN ALUMINIUM (PERSERO)"
            },
            {
                "name": "PT ADITAMA GLOBAL INDUSTRI"
            },
            {
                "name": "PT DAIDO DMS INDONESIA"
            },
            {
                "name": "Sudjadi"
            },
            {
                "name": "PT SHURIYAMA GLOBAL INDONESIA"
            },
            {
                "name": "PT Finia Raya Utama"
            },
            {
                "name": "PT Qerja Manfaat Bangsa"
            },
            {
                "name": "PT TRI PUTRA KENTJANA SAKTI"
            },
            {
                "name": "Kantor Akuntan Publik Habib Basuni dan Heryadi"
            },
            {
                "name": "PT METALURGI MITRA ABADI"
            },
            {
                "name": "PT INTEC INSTRUMENTS"
            },
            {
                "name": "Djulita Viverico"
            },
            {
                "name": "BADAN PENGAWAS TENAGA NUKLIR (BAPETEN)"
            },
            {
                "name": "Bea & Cukai Soekarno-Hatta, Tangerang"
            },
            {
                "name": "PT. NNR RPX GLOBAL LOGISTICS INDONESIA"
            },
            {
                "name": "KJPP Ruky, Safrudin & Rekan"
            },
            {
                "name": "PT. Ganesha Inti Persada"
            },
            {
                "name": "PT SANYO SPECIAL STEEL INDONESIA"
            },
            {
                "name": "CV. Santoso Teknik"
            },
            {
                "name": "PT. Bangun Berkat Bersama"
            },
            {
                "name": "PT ZIEKA TEKNIKATAMA INDONESIA"
            },
            {
                "name": "PT BENISO MAKMUR PERKASA"
            },
            {
                "name": "PT SINAR UTAMA PACKINDO"
            },
            {
                "name": "Toyota Tsusho Systems Singapore PTE. LTD"
            },
            {
                "name": "PT. Prabu Budi Mulia"
            },
            {
                "name": "PT. Total Enviro Solusindo"
            },
            {
                "name": "PT RAFANSA PRIMA USAHA"
            },
            {
                "name": "PT. CIPTA TOOLSINDO MANDIRI"
            },
            {
                "name": "PT ELESKA IATKI"
            },
            {
                "name": "PT COMINIX INDONESIA"
            },
            {
                "name": "PT BERKAH LANGGENG MANDIRI"
            },
            {
                "name": "PT KURNIA AZZAHRA ARSYA"
            },
            {
                "name": "PT. CEMERLANG ABADI TEKINDO"
            },
            {
                "name": "PT. Fortuna Anugerah Sehati"
            },
            {
                "name": "PT Melchers Melindo Indonesia"
            },
            {
                "name": "PT Munasa Kreasi Nusantara"
            },
            {
                "name": "PT. WAHANA DIRGANTARA"
            },
            {
                "name": "PT Cardindo Citrabuana"
            },
            {
                "name": "PT Garuda Indonesia (Persero) Tbk"
            },
            {
                "name": "PT. Unex Rajawali Indonesia"
            },
            {
                "name": "PT. Kintetsu World Express Indonesia"
            },
            {
                "name": "PT. Dharma Yudha Pratama"
            },
            {
                "name": "PT GAPURA ANGKASA"
            },
            {
                "name": "PT. YUASA SHOJI INDONESIA"
            },
            {
                "name": "PT. AVATAR EXPRESS INDONESIA"
            },
            {
                "name": "PT AMARTA BANGUN INDONESIA"
            },
            {
                "name": "PT SAMATOR"
            },
            {
                "name": "PT BUMI REKAYASA MANDIRI"
            },
            {
                "name": "PT Toyota Tsusho Real Estate Cikarang"
            },
            {
                "name": "RS. MANDAYA"
            },
            {
                "name": "PT. Bio Farma"
            },
            {
                "name": "PT PUTRA PARUNG JAYA"
            },
            {
                "name": "PT. CITRA SATRIAWIDYA ANDHIKA"
            },
            {
                "name": "PT Asteria Riksa Indonesia"
            },
            {
                "name": "PT Inti Surya Laboratorium"
            },
            {
                "name": "PT Inti Permata Indonesia"
            },
            {
                "name": "PT Perkasa Abadi Transport"
            },
            {
                "name": "PT KARYAMANIS GLOBAL MANDIRI"
            },
            {
                "name": "PT JASA ANGKASA SEMESTA Tbk"
            },
            {
                "name": "PT YOTANO TEKNIK INDONESIA"
            },
            {
                "name": "PT. Akiruno Plumeria Indonesia"
            },
            {
                "name": "PT. PELANGI SAUDARA BERKAH"
            },
            {
                "name": "PT. Jakarta Kyoai Medical Center"
            },
            {
                "name": "PT Karawang Sports Centre Indonesia"
            },
            {
                "name": "PT TOYOTA TSUSHO LOGISTIC CENTER"
            },
            {
                "name": "PT. DITA NANDA CERIA (DNC CATERING)"
            },
            {
                "name": "PT. Atrindo Asia Global"
            },
            {
                "name": "PT Niki Four"
            },
            {
                "name": "PT. MASAJI KARGOSENTRA TAMA"
            },
            {
                "name": "PT HERVINDO INTI NUSANTARA"
            },
            {
                "name": "PT. SOLUSI EXPRESS LOGISTICS"
            },
            {
                "name": "PT ATLANTIC CONTAINER LINI"
            },
            {
                "name": "PT BINA GLOBAL TRANSPORT"
            },
            {
                "name": "PT. Telekomunikasi Selular"
            },
            {
                "name": "PT Hankyu Hanshin Express Indonesia"
            },
            {
                "name": "CV Aksel Service"
            },
            {
                "name": "PT MORITA PRECISION INDONESIA"
            },
            {
                "name": "PT. KINARYA NUSANTARA SUKSESTY"
            },
            {
                "name": "PT PRISMA TANAKA"
            },
            {
                "name": "PT SAMUDERA PACIFIC MAJU"
            },
            {
                "name": "PT TERMINAL PETIKEMAS KOJA"
            },
            {
                "name": "PT Mitra Sinergi International"
            },
            {
                "name": "PT INTAN SUKSES GLOBALINDO"
            },
            {
                "name": "PT MAKMUR WIJAYA SEJAHTERA"
            },
            {
                "name": "PT. PUTRA NAYORA SEJAHTERA"
            },
            {
                "name": "PT. KARANA LINE"
            },
            {
                "name": "PT. ORUGG VISION INDONESIA"
            },
            {
                "name": "PT. Sulzar Inovasi Indonesia"
            },
            {
                "name": "Sabaryah (Agustian)"
            },
            {
                "name": "PT. NTL NAIGAI TRANS LINE INDONESIA"
            },
            {
                "name": "PT. FAJAR BUANA INTERNUSA TRANS"
            },
            {
                "name": "PT BINTANG LOGISTIK INDONUSA"
            },
            {
                "name": "PT GATEWAY CONTAINER LINE"
            },
            {
                "name": "PT. GEMMA MULTI SARANA"
            },
            {
                "name": "PT. URANO ANZEN INDONESIA"
            },
            {
                "name": "PT. PRIMA BERKARYA DWIJAYA"
            },
            {
                "name": "PT. MESHINDO ALLOY WHEEL"
            },
            {
                "name": "PT. YUTAKA ASIA INDONESIA"
            },
            {
                "name": "PT. MISHA CIPTA NUSANTARA"
            },
            {
                "name": "PT. METROPOLITAN BAYUTAMA"
            },
            {
                "name": "PT. SAHABAT INTI SOLUSINDO"
            },
            {
                "name": "PT. CAHAYA MAS UTAMA"
            },
            {
                "name": "PT. ALBATROS LOGISTIK EXPRESS"
            },
            {
                "name": "PT. ARMAS LOGISTIC SERVICE"
            },
            {
                "name": "PT. WIN TERMAL SOLUSINDO"
            },
            {
                "name": "PT. Hipernet Indodata"
            },
            {
                "name": "PT SARANA HEKSA AUTOMASI FOKUSINDO"
            },
            {
                "name": "RAKA DWI ERIANTO"
            },
            {
                "name": "Diky Zunianto"
            },
            {
                "name": "PT. SAMUDRA METALINDO SEJAHTERA"
            },
            {
                "name": "PT STR MANDIRI INDONESIA"
            },
            {
                "name": "Haikal Rendi"
            },
            {
                "name": "PT. RAN ANDALAN INDONESIA"
            },
            {
                "name": "PT. DWIDAKA UNO INDONESIA TECHNOLOGY"
            },
            {
                "name": "PT. ASIAN BEARINDO JAYA"
            },
            {
                "name": "PT. Izdihaar Makmur Abadi"
            },
            {
                "name": "PT. Pusat Studi Apindo"
            },
            {
                "name": "OCEAN NETWORK EXPRESS PTE. LTD"
            },
            {
                "name": "PT. ASL TRANSPORT"
            },
            {
                "name": "PT. K LINE MOBARU DIAMOND INDONESIA"
            },
            {
                "name": "PT. NEW PRIOK CONTAINER TERMINAL ONE"
            },
            {
                "name": "PT. GFC INDONESIA TERMINAL"
            },
            {
                "name": "PT. PELABUHAN INDONESIA (PERSERO)"
            },
            {
                "name": "PT. DELTA CONTAINER DEPOT"
            },
            {
                "name": "PT. SOLID LOGISTICS"
            },
            {
                "name": "SINOKOR MERCHANT MARINE CO., LTD"
            },
            {
                "name": "PT Asuransi MSIG Indonesia"
            },
            {
                "name": "PT. YUSEN LOGISTICS INDONESIA"
            },
            {
                "name": "PT SDI Properties Indonesia"
            },
            {
                "name": "PT. Marensa Boga Raya"
            },
            {
                "name": "Chandra Wirabrata"
            },
            {
                "name": "PT. TIGA REKSA PERDANA INDONESIA"
            },
            {
                "name": "PT. PUJI SARANA JAYA"
            },
            {
                "name": "PT. CIPTA SELAMAT MANDIRI"
            },
            {
                "name": "CV. STARS OFFICIAL"
            },
            {
                "name": "Asosiasi Pengusaha Indonesia"
            },
            {
                "name": "PT MARS GLOBAL PRATAMA"
            },
            {
                "name": "PT TUV Rheinland Indonesia"
            },
            {
                "name": "PT. KHARISMA ANUGERAH TEKNOLOGI"
            },
            {
                "name": "PT Lens Maju Jaya"
            },
            {
                "name": "PT. MACOLINE INDONESIA"
            },
            {
                "name": "PT. UNIKARGO INDOTAMA TIMUR"
            },
            {
                "name": "PT. ASTOMO BERKAH SINERGI"
            },
            {
                "name": "Badan Pendapatan Daerah Pemerintah Kabupaten Karawang"
            },
            {
                "name": "PT. BINTANG FASTECH INDONESIA"
            },
            {
                "name": "PT. ALIFINDO MITRA BERSAMA"
            },
            {
                "name": "PT. MATAHARI WASISO TAMA"
            },
            {
                "name": "DJONI ARIANTO"
            },
            {
                "name": "PT. ERA AWAN DIGITAL"
            },
            {
                "name": "PT. INDODEV NIAGA INTERNET"
            },
            {
                "name": "PT. BUNGA PLUM LOGISTIK"
            },
            {
                "name": "Maulisa Sarasiya Putri"
            },
            {
                "name": "PT. ORIENTAL LOGISTICS INDONESIA"
            },
            {
                "name": "PT. Lelucky Wisata Indonesia"
            },
            {
                "name": "Forum HR Suryacipta"
            },
            {
                "name": "PT. WELLINDO JAYA PERSADA"
            },
            {
                "name": "PT. NISSHO INDONESIA"
            },
            {
                "name": "PT. ARTHA BUANA MAS"
            },
            {
                "name": "Dinas Pekerjaan Umum dan Penataan Ruang"
            },
            {
                "name": "PT. SAHABAT INDONESIA GROUP"
            },
            {
                "name": "PT. SURYA GEMILANG TRIDAYA"
            },
            {
                "name": "KHS Law Firm & Partners"
            },
            {
                "name": "PT. Gaweku Human Technology"
            },
            {
                "name": "PT. LESTARI RITA JASA BOGA"
            },
            {
                "name": "PT. ZAHDAN KAMAL SENTOSA"
            },
            {
                "name": "PT. SEKISO SUKSES INDONESIA"
            },
            {
                "name": "PT. UMETOKU INDONESIA ENGINEERING"
            },
            {
                "name": "PT. HIDUP SEJAHTERA ENGINEERING"
            },
            {
                "name": "PT. Medika Husada (RS. Lira Medika)"
            },
            {
                "name": "Rumah Sakit DR. Hasan Sadikin"
            },
            {
                "name": "PT. Tempero Jasa Prima"
            },
            {
                "name": "PT. HERMON PANCAKARSA LIBRATAMA"
            },
            {
                "name": "PT. INTERNUSA ALFINDO VENTURA"
            },
            {
                "name": "PT. Y-TEC AUTOPARTS INDONESIA"
            },
            {
                "name": "PT. EMANAGEMENT KLINIK INDONESIA"
            },
            {
                "name": "Cikarang Japanese School"
            },
            {
                "name": "ECOVADIS SAS"
            },
            {
                "name": "PT. NAOTO JAYA ABADI"
            },
            {
                "name": "KPU Bea & Cukai Tanjung Priok"
            },
            {
                "name": "PT. ITOCHU LOGISTICS INDONESIA"
            },
            {
                "name": "PT. TIRTA MANDIRI JASATAMA"
            },
            {
                "name": "JAKARTA INTERNATIONAL CONTAINER TERMINAL"
            },
            {
                "name": "PT. KAWAN LAMA SOLUSI"
            },
            {
                "name": "PT. VICTORY WIN SOLUSINDO"
            },
            {
                "name": "YAMAHA FINE TECHNOLOGIES CO., LTD"
            },
            {
                "name": "PT. TOYOTA MOTOR MANUFACTURING INDONESIA"
            },
            {
                "name": "SUPRIYADI"
            },
            {
                "name": "PT. DASINDO MEDIA"
            },
            {
                "name": "PT. MITRA INTI BANGKIT UNDAGI"
            },
            {
                "name": "CBM Institute (PT. CENDEKIA BINA MADANI)"
            },
            {
                "name": "YOGI ISKANDAR"
            },
            {
                "name": "PT. SAMANA JAYA PROPERTINDO"
            },
            {
                "name": "PT. KURETAKESO HOTEL INDONESIA"
            },
            {
                "name": "PT. CANDI REKATAMA SANTOSA"
            },
            {
                "name": "PT. RECOMM BUSINESS SOLUTIONS INDONESIA"
            },
            {
                "name": "PT. MULTILINK TRANS INDONESIA"
            },
            {
                "name": "SANGGA INDRA BUMI"
            },
            {
                "name": "PT. KMDI CONTAINER DEPOT"
            },
            {
                "name": "TOYOTA MANUFACTURERS CLUB (SANGGA INDRA BUMI)"
            },
            {
                "name": "PT. POS INDONESIA (PERSERO)"
            },
            {
                "name": "PT. EVERGREEN SHIPPING AGENCY INDONESIA"
            },
            {
                "name": "PT. MULTI BINA PURA INTERNATIONAL"
            },
            {
                "name": "PT. GAHARU SAFETY SOLUTION"
            },
            {
                "name": "CV. MILENIAL CREATIVE LABS"
            },
            {
                "name": "PT.INTEGRASI IDE INDONESIA"
            },
            {
                "name": "CV. MITRA WIJAYA BERKAH"
            },
            {
                "name": "PT. FAIRMOUNT BERSAUDARA SEJAHTERA"
            },
            {
                "name": "PT Tulip Tonata Indonesia"
            },
            {
                "name": "PT Cahaya Bunga Mawar"
            },
            {
                "name": "PT Maxxis Pratama Caterindo"
            },
            {
                "name": "PT Simply Dimensi Indonesia"
            },
            {
                "name": "Toko RJ GV"
            },
            {
                "name": "PT Berkah Teknik Naib"
            },
            {
                "name": "PT Pixel Perdana Jaya"
            },
            {
                "name": "PT Daya Anugrah Mandiri"
            },
            {
                "name": "PT Reksa Daya Indonesia"
            },
            {
                "name": "Deddy Intertrans"
            },
            {
                "name": "B-Ress Production"
            },
            {
                "name": "PT Daikin Airconditioning Indonesia"
            },
            {
                "name": "PT Dharma Metal Indonesia"
            },
            {
                "name": "PT Manunggal Sumber Daya"
            },
            {
                "name": "CV Abdul Basit (ABD Kaum 1)"
            },
            {
                "name": "CV Lebak Sari Indah"
            },
            {
                "name": "Ulud"
            },
            {
                "name": "Oyeh"
            },
            {
                "name": "PT Wahanatama Teknik Indojaya"
            },
            {
                "name": "CV Tri Jaya Engineering"
            },
            {
                "name": "PT Kutanegara Jaya Mandiri"
            },
            {
                "name": "PT Citra Ardhita Medifarma"
            },
            {
                "name": "PT. GLOBAL TERMINAL MARUNDA"
            },
            {
                "name": "PT. COSCO SHIPPING LINES INDONESIA"
            },
            {
                "name": "PT Brenson Citra Abadi"
            },
            {
                "name": "RS Mitra Family ( Pratiwi Medika Utama )"
            },
            {
                "name": "RS Helsa Cikampek ( Tunas Harapan Medika )"
            },
            {
                "name": "Primaya Hospital Karawang ( Fortuna Anugerah Sehati )"
            },
            {
                "name": "RS. Dewi Sri"
            },
            {
                "name": "Logics , Co."
            },
            {
                "name": "Toyota Tsusho (Thailand) Co Ltd"
            },
            {
                "name": "PT Fujicon Priangan Perdana"
            },
            {
                "name": "Integral Data Prima"
            },
            {
                "name": "PT HUTAMA PANCA PERKASA"
            },
            {
                "name": "PT Pembangunan Deltamas"
            },
            {
                "name": "PT Indomobil Prima Energi"
            },
            {
                "name": "PT Multi Jaya Mesindotama"
            },
            {
                "name": "Rheza Zanitra"
            },
            {
                "name": "PT Pramono Triputra Manunggal"
            },
            {
                "name": "PT Novialiano Husada"
            },
            {
                "name": "PT Smart Mitra Solutions"
            },
            {
                "name": "CV CG TRAINING NETWORK"
            },
            {
                "name": "PT. CITTADINANZA CAKRA SEMESTA (PT. CCS LOGISTICS)"
            },
            {
                "name": "PT Cycloneindo Pasifik Sukses Makmur"
            },
            {
                "name": "PT. DAMIER (BINUS CENTER)"
            },
            {
                "name": "CV Dinamika Manunggal"
            },
            {
                "name": "PT Medika Loka Karawang (RS Hermina Karawang)"
            },
            {
                "name": "PT. Amanda Citra Medica"
            },
            {
                "name": "PT Karya Mandiri Medika Utama (RSU Fikri Medika)"
            },
            {
                "name": "PT Eonchemicals Putra"
            },
            {
                "name": "PT. Famon Global Awal Bros (RS Primaya Bekasi Barat)"
            },
            {
                "name": "PT Mulia Pratama Selaras"
            },
            {
                "name": "PT Schenker Logistics Indonesia"
            },
            {
                "name": "PT Agung Jasa Logistik"
            },
            {
                "name": "PT Sae Berkah Mandiri"
            },
            {
                "name": "PT Fuji System Indonesia"
            },
            {
                "name": "PT Toho Technology Indonesia"
            },
            {
                "name": "PT Alfa Dinamis Indonesia"
            },
            {
                "name": "PT INTIMAP"
            },
            {
                "name": "PT Fokus Kreasi Gemilang"
            },
            {
                "name": "PT Nuklir Indonesia Laboratorium"
            },
            {
                "name": "PT Intergy Indonesia"
            },
            {
                "name": "Nippon Steel Trading Matex Co.,LTD"
            },
            {
                "name": "PT MEITOKU WADAYAMA INDONESIA"
            },
            {
                "name": "CV Wahyu Arta Technic"
            },
            {
                "name": "PT Fawwazindo Ghina Persada"
            },
            {
                "name": "PT UMETOKU INDONESIA"
            },
            {
                "name": "CV Beta Gaberta Mekanindo"
            },
            {
                "name": "PT Precision Tools Service Indonesia"
            },
            {
                "name": "PT Sinar Mutiara Cakrabuana"
            },
            {
                "name": "PT Swif Asia"
            },
            {
                "name": "PT Tempsens Asia Jaya"
            },
            {
                "name": "PT TEMPSENS ASIA JAYA"
            },
            {
                "name": "Toyotsu Machinery Corporation"
            },
            {
                "name": "Sankensangyo Co., Ltd"
            },
            {
                "name": "CV United Controls"
            },
            {
                "name": "PT Zenbi Machinery And Electronics Indonesia"
            },
            {
                "name": "PT Minezawa Trading Indonesia"
            },
            {
                "name": "CV Sinar Artha Technic"
            },
            {
                "name": "PT KINARYA NUSANTARA SUKSESTY"
            },
            {
                "name": "PT Bukit Mas Bearindo"
            },
            {
                "name": "PT Inox Prima"
            },
            {
                "name": "PT Pandu Hydro Pneumatics"
            },
            {
                "name": "CV Intisupplies Mega Perkasa"
            },
            {
                "name": "Lucky Dragon International Co., Ltd."
            },
            {
                "name": "Mitsui Kiko Co., Ltd"
            },
            {
                "name": "PT Zahwan Mitrateknindo"
            },
            {
                "name": "PT DUTA SWARNA DWIPA"
            },
            {
                "name": "PT ARTIUM ALBA RAYA"
            },
            {
                "name": "PT ARPHUS REKA MANDIRI"
            },
            {
                "name": "PT Misumi Indonesia"
            },
            {
                "name": "-"
            },
            {
                "name": "Tounetsu Thai Co  Ltd"
            },
            {
                "name": "PT. STAHLINDO SURFACING INDONESIA"
            },
            {
                "name": "CV. BUANA SINERGI ENGINEERING"
            },
            {
                "name": "PT. YKT GEAR"
            },
            {
                "name": "PT Sinto Indonesia"
            },
            {
                "name": "PT Himalaya Everest Jaya"
            },
            {
                "name": "Kiwa Machinery Co., Ltd"
            },
            {
                "name": "PT Indobearing Perkasa"
            },
            {
                "name": "PT Tuffiadi Semesta"
            },
            {
                "name": "PT Geronimo Sukses Mandiri"
            },
            {
                "name": "PT. PUSACO INTERNATIONAL"
            },
            {
                "name": "Kanzaki Kokyukoki Mfg Co Ltd"
            },
            {
                "name": "PT AMCO Multitech"
            },
            {
                "name": "PT Fanuc Indonesia"
            },
            {
                "name": "PT Numacindo Karsakharisma"
            },
            {
                "name": "CV Wira Griya Mustika"
            },
            {
                "name": "DAIMA II"
            },
            {
                "name": "KUO CHUAN MACHINERY INDUSTRIAL CO.,LTD."
            },
            {
                "name": "CV Senta Andalan Kimia"
            },
            {
                "name": "PT Setsuyo Astec"
            },
            {
                "name": "PT Flexindomas"
            },
            {
                "name": "CV Qistech Plasindo"
            },
            {
                "name": "PT. KOBELINDO COMPRESSORS"
            },
            {
                "name": "PT Traktor Nusantara"
            },
            {
                "name": "PT Axia Multi Sarana"
            },
            {
                "name": "PT. Creative Mitra Selaras Indonesia"
            },
            {
                "name": "PT Stark Asia Corporindo"
            },
            {
                "name": "PT Daiichi Mandiri Automation"
            },
            {
                "name": "PT Mega Tekhnik Dhealfian"
            },
            {
                "name": "PT Panel Bakti Sinarindo"
            },
            {
                "name": "PT Keyence Indonesia"
            },
            {
                "name": "PT Elmecon Multikencana"
            },
            {
                "name": "PT Azbil Berca Indonesia"
            },
            {
                "name": "PT Toyota Tsusho Mechanical & Engineering Service Indonesia"
            },
            {
                "name": "PT Hikari Automaton Indonesia"
            },
            {
                "name": "Chubu Meikiko . Co.Ltd"
            },
            {
                "name": "TOYOTA TSUSHO CORPORATION"
            },
            {
                "name": "PT Kawan Lama Sejahtera"
            },
            {
                "name": "PT Yutaka Robot System Indonesia"
            },
            {
                "name": "Ray Corporation Tokyo Branch"
            },
            {
                "name": "PT Amano Indonesia"
            },
            {
                "name": "PT. SETIAWAN TEKNIK"
            },
            {
                "name": "Shan Long Mechanical Engineering CO. Ltd"
            },
            {
                "name": "PT. Kobelindo Compressors"
            },
            {
                "name": "PT Taiyo Sinar Raya Teknik"
            },
            {
                "name": "PT. BIOTECH INDO GEMILANG"
            },
            {
                "name": "PT Sinar Buana"
            },
            {
                "name": "PT Orugg Vision Indonesia"
            },
            {
                "name": "CV Bintang Mayoki"
            },
            {
                "name": "CV HERRY & CO"
            },
            {
                "name": "Isuzu MFG Co Ltd"
            },
            {
                "name": "PT PUTRA PARUNG JAYA"
            },
            {
                "name": "PT. Daichi Mandiri Automation"
            },
            {
                "name": "PT ZIEKA TEKNIKATAMA INDONESIA"
            },
            {
                "name": "PT MORITA PRECISION INDONESIA"
            },
            {
                "name": "PT Kyoritsu Electric Indonesia"
            },
            {
                "name": "PT OTOMASI SOLUSI INTI"
            },
            {
                "name": "PT YOTANO TEKNIK INDONESIA"
            },
            {
                "name": "PT Wilisindomas Indah Makmur"
            },
            {
                "name": "PT Kurita Indonesia"
            },
            {
                "name": "PT. Victory Win Solusindo"
            },
            {
                "name": "PT Gandox Jaya Chemical"
            },
            {
                "name": "CV BINTANG MAYOKI"
            },
            {
                "name": "PT. INDONESIA ROAD DEVELOPMENT"
            },
            {
                "name": "SAXON Test- and Tank- Equipment GmbH"
            },
            {
                "name": "PT. HIMAWAN PUTRA"
            },
            {
                "name": "Yu Shine Precision"
            },
            {
                "name": "PT Pelita Karya Suplindo"
            },
            {
                "name": ""
            },
            {
                "name": "PT ISK"
            },
            {
                "name": "SWIF ASIA"
            },
            {
                "name": "PT Jaya Induksi Elektrik"
            },
            {
                "name": "Sougou Plant Co;LTD"
            },
            {
                "name": "PT Parker Engineering Indonesia"
            },
            {
                "name": "PT SARANA HEKSA AUTOMASI FOKUSINDO"
            },
            {
                "name": "PT Arphus Reka Mandiri"
            },
            {
                "name": "CV Herry & Co"
            },
            {
                "name": "PT. PILAR PLATINUM MULIA"
            },
            {
                "name": "PT Kawamura Indah"
            },
            {
                "name": "PT. HIDUP SEJAHTERA ENGINEERING"
            },
            {
                "name": "PT SM-Cyclo Indonesia"
            },
            {
                "name": "PT. RODA HAMMERINDO JAYA"
            },
            {
                "name": "PT. MONDYLIA AMERTA"
            },
            {
                "name": "YUTAKA DENSHI"
            },
            {
                "name": "Yutaka Denshi"
            },
            {
                "name": "Central Motor Wheel Of America"
            },
            {
                "name": "PT MAKMUR META GRAHA DINAMIKA"
            },
            {
                "name": "PT Geronimo Sukses MAndiri"
            },
            {
                "name": "CV. Wahana Engineering/Geronimo"
            }
        ],
        skipDuplicates: true
    });
}
