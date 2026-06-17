document.addEventListener('DOMContentLoaded', () => {
    const gameItems = document.querySelectorAll('.game-item');


    let currentGameId = null;


    const modal = document.getElementById('downloadModal');
    const modalGameTitle = document.getElementById('modalGameTitle');
    const modalDownloadLinksList = document.getElementById('modalDownloadLinks');
    const closeButton = modal.querySelector('.close-button');

    const searchBar = document.getElementById('searchBar');



    const detailsModal = document.getElementById('detailsModal');
    const detailsContent = document.getElementById('detailsContent');
    const detailsCloseButton = detailsModal.querySelector('.details-close-button');


    const partsModal = document.getElementById('partsModal');
    const partsModalTitle = document.getElementById('partsModalTitle');
    const partsContainer = document.getElementById('partsContainer');
    const partsCloseButton = partsModal.querySelector('.parts-close-button');


    let downloadedParts = JSON.parse(localStorage.getItem('downloadedParts')) || {};


    const TWENTY_DAYS_MS = 20 * 24 * 60 * 60 * 1000;
    const now = Date.now();
    let partsUpdated = false;

    Object.keys(downloadedParts).forEach(key => {
        const value = downloadedParts[key];
        if (value === true) {

            downloadedParts[key] = now;
            partsUpdated = true;
        } else if (typeof value === 'number') {

            if (now - value > TWENTY_DAYS_MS) {
                delete downloadedParts[key];
                partsUpdated = true;
            }
        }
    });

    if (partsUpdated) {
        localStorage.setItem('downloadedParts', JSON.stringify(downloadedParts));
    }




    function openPartsModal(parts, gameId) {

        const gameName = modalGameTitle.textContent;
        partsModalTitle.textContent = `Select Part`;
        partsContainer.innerHTML = '';

        parts.forEach((part, index) => {
            const partButton = document.createElement('button');
            partButton.className = 'part-button';
            partButton.textContent = part.text;


            const partKey = `${gameId}-${index}`;
            if (downloadedParts[partKey]) {
                partButton.classList.add('downloaded');
            }

            partButton.addEventListener('click', () => {

                downloadedParts[partKey] = Date.now();
                localStorage.setItem('downloadedParts', JSON.stringify(downloadedParts));
                partButton.classList.add('downloaded');


                window.open(part.url, '_blank', 'noopener');


            });

            partsContainer.appendChild(partButton);
        });

        partsModal.classList.add('is-open');
        document.body.classList.add('modal-blur-active');
    }

    function closePartsModal() {
        partsModal.classList.remove('is-open');
        document.body.classList.remove('modal-blur-active');
    }


    const gameDownloadLinksData = {
        'ion-fury': [
            { text: 'Download Ion Fury', url: 'https://drive.usercontent.google.com/download?id=1mHna_GXRcEDN6fr4zHoMCXF6Z7phlWOB&authuser=0' }
        ],
        'gta-vc': [
            { text: 'Download GTA Vice City', url: 'https://www.mediafire.com/file/negikbx0esjy4zb/GTAVC.iso/file' }
        ],
        'gta-iii': [
            { text: 'Download GTA III', url: 'https://www.mediafire.com/file/zdvttk6hzyv1ola/GTA-III.rar/file' }
        ],
        'cuphead': [
            { text: 'Download Cuphead', url: 'https://www.mediafire.com/file/z6qrhatejixijzs/CDE.rar/file' }
        ],
        'blood-knights': [
            { text: 'Download Blood Knights', url: 'https://www.mediafire.com/file/tz5n0miu2lqe0am/BKPC.7z/file' }
        ],
        'unmetal': [
            { text: 'Download Unmetal', url: 'https://www.mediafire.com/file/7rw1oidswulksof/UCP.rar/file' }
        ],
        'halo-ce': [
            { text: 'Download Halo: Combat Evolved', url: 'https://www.mediafire.com/file/jftpybq93hfqy26/HCE_2001.rar/file' }
        ],
        'portal': [
            { text: 'Download Portal', url: 'https://www.mediafire.com/file/keszhjrcvsx5jra/PPC.iso/file' }
        ],
        'portal2': [
            { text: 'Download Portal 2', url: 'https://www.mediafire.com/file/srerms85g91g4zw/P2PC.iso/file' }
        ],
        'killing-floor': [
            { text: 'Download Killing Floor', url: 'https://www.mediafire.com/file/zffmwemajvs09dq/KF1.rar/file' }
        ],
        'brotato': [
            { text: 'Download Brotato', url: 'https://www.mediafire.com/file/5okoinvbimse0h4' }
        ],
        'vampire-survivors': [
            { text: 'Download Vampire Survivors', url: 'https://www.mediafire.com/file/w7r10dc1rb85n4r/Vampi6reSurv1ivors-1.13.109-elamigos.rar/file' }
        ],
        'hct': [
            { text: 'Download Horizon Chase Turbo', url: 'https://www.mediafire.com/file/b7g6sh0gj0biort/HCT2018.Www.GamezFull.com.rar/file' }
        ],
        'barony': [
            { text: 'Download Barony', url: 'https://www.mediafire.com/file/zbdaq9intal95mf/BPC.rar/file' },
            { text: 'Download traducción al español', url: 'https://www.mediafire.com/file/sjw4si78r9wy2ae/Barony_Spanish_Mod.rar/file' }
        ],
        'dmc': [
            { text: 'Download DmC: Devil May Cry', url: 'https://rapidshare.co/en/d/QIkPCb4cBC3xXE' }
        ],
        'cod': [
            { text: 'Download Call of Duty', url: 'https://www.mediafire.com/file/kfvfuduqbzlhor2/COD.rar/file' }
        ],
        'dead-space': [
            {
                text: 'Download Dead Space',
                parts: [
                    { text: 'Part 1', url: 'https://rapidshare.co/en/d/yo8qFSaU3ICHXR' },
                    { text: 'Part 2', url: 'https://rapidshare.co/en/d/BmwqHhDb1IGqDq' },
                    { text: 'Part 3', url: 'https://rapidshare.co/en/d/mV6eSdjw1Li9qF' },
                    { text: 'Part 4', url: 'https://rapidshare.co/en/d/pv7v3WHN74JHIu' }
                ]
            }
        ],
        'dead-space2': [
            {
                text: 'Download Dead Space 2',
                parts: [
                    { text: 'Part 1', url: 'https://rapidshare.co/en/d/UeXMFiyuv1TmtQ' },
                    { text: 'Part 2', url: 'https://rapidshare.co/en/d/d0sauQDTj60K7x' },
                    { text: 'Part 3', url: 'https://rapidshare.co/en/d/I8Hn85I7H8QtFK' }
                ]
            }
        ],
        'dead-space3': [
            {
                text: 'Download Dead Space 3',
                parts: [
                    { text: 'Part 1', url: 'https://rapidshare.co/en/d/rb85h9EyANiqSI' },
                    { text: 'Part 2', url: 'https://rapidshare.co/en/d/fQjBweUPQS506q' },
                    { text: 'Part 3', url: 'https://rapidshare.co/en/d/sRdLy4NKcTfQIP' },
                    { text: 'Part 4', url: 'https://rapidshare.co/en/d/wcw67QeXI5gU5j' },
                    { text: 'Part 5', url: 'https://rapidshare.co/en/d/x0JLK54NwTWNGg' },
                    { text: 'Part 6', url: 'https://rapidshare.co/en/d/fO28odU9HPTiTv' },
                    { text: 'Part 7', url: 'https://rapidshare.co/en/d/b2gxytlfBi2zEk' }
                ]
            }
        ],
        'rcrdx': [
            { text: 'Download Retro City Rampage DX', url: 'https://mega.nz/file/vuwhTRQL#FdYuUSz8Nr1s7wuROhCb7nJ2Vt-p2qwxKC2QCl18drs' }
        ],
        'into-the-breach': [
            { text: 'Download Into the Breach', url: 'https://mega.nz/file/Nd0xlSIZ#28Tp9-1bQG2Wkjs80o-Q8CdBqoJGL2Dh3gmykAwpxtk' }
        ],
        'enter-the-gungeon': [
            { text: 'Download Enter the Gungeon', url: 'https://www.mediafire.com/file/rws1g4w546qauae/Enter.the.gun.v2.1.9.rar/file' }
        ],
        'postal2': [
            {
                text: 'Download Postal 2',
                parts: [
                    { text: 'Part 1', url: 'https://www.mediafire.com/file/mrsm05ufxazkehu/P2CPG.GamezFull.com.part1.rar/file' },
                    { text: 'Part 2', url: 'https://www.mediafire.com/file/2hc0bux8d192hs7/P2CPG.GamezFull.com.part2.rar/file' },
                    { text: 'Part 3', url: 'https://www.mediafire.com/file/xyy6kp1e2efcikp/P2CPG.GamezFull.com.part3.rar/file' },
                    { text: 'Part 4', url: 'https://www.mediafire.com/file/xc4xs641yb5f35w/P2CPG.GamezFull.com.part4.rar/file' },
                    { text: 'Part 5', url: 'https://www.mediafire.com/file/o13xhha8pinivp6/P2CPG.GamezFull.com.part5.rar/file' }
                ]
            }
        ],
        'cod4': [
            {
                text: 'Download Call of Duty 4: Modern Warfare',
                parts: [
                    { text: 'Part 1', url: 'https://drive.usercontent.google.com/download?id=1vR01prco1VXQ1YCEAVvFmTksLxyEvO7H&authuser=0' },
                    { text: 'Part 2', url: 'https://drive.usercontent.google.com/download?id=1LrtO1-MAxXZu6pzgo6IFFEM5FWFvSjgu&authuser=0' },
                    { text: 'Part 3', url: 'https://drive.usercontent.google.com/download?id=1du3nxQj5XTuolIm4CSNBWxjz9dQ7PKAx&authuser=0' },
                    { text: 'Part 4', url: 'https://drive.usercontent.google.com/download?id=1Q96yRNbcfTMU7FlcmIj-LdCCBaX0voti&authuser=0' },
                    { text: 'Part 5', url: 'https://drive.usercontent.google.com/download?id=1vfUhUkhT4zdYEKYQ_fxSLcAeF-kRuaHX&authuser=0' },
                    { text: 'Part 6', url: 'https://drive.usercontent.google.com/download?id=1hr4Hx3hKCjdcsXUrEbdYCi5I30b5_5kX&authuser=0' },
                    { text: 'Part 7', url: 'https://drive.usercontent.google.com/download?id=1Oh9-Csoiu6SBQg-wYhjWyn-JaO_Yzuof&authuser=0' },
                    { text: 'Part 8', url: 'https://drive.usercontent.google.com/download?id=1UezTWvP5uiIgcj_f1oDJ20YgK16N6Fev&authuser=0' },
                    { text: 'Part 9', url: 'https://drive.usercontent.google.com/download?id=1s02qBfEGUQPRPl05ipiMSpbSdYY4pgYr&authuser=0' }
                ]
            }
        ],
        'lis': [
            { text: 'Download Life is Strange', url: 'https://www.mediafire.com/file/0ccchy21bd51r51/L1f3_1s_Str4ng3.rar/file' }
        ],
        'slendyt': [
            { text: 'Download Slendytubbies', url: 'https://www.mediafire.com/file/55vwtdwziv20gg3/STB.zip/file' }
        ],
        'slendyt2': [
            { text: 'Download Slendytubbies 2', url: 'https://www.mediafire.com/file/13z3i2116t00m0g/' }
        ],
        'slendyt3': [
            { text: 'Download Slendytubbies 3 (Camapaña)', url: 'https://www.mediafire.com/file/249yxzi56wn17r6/Slendytubbies_3_V1_295_%252864bit%2529.zip/file' },
            { text: 'Download Slendytubbies 3 (Multijugador)', url: 'https://www.mediafire.com/file_premium/lqhyvva24iuinxc/Slendytubbies_3_Multiplayer_%2528x64%2529.zip/file' }
        ],
        'fnaf': [
            { text: 'Download FNAF (ORIGINAL)', url: 'https://www.mediafire.com/file/qa1jza71rr1uj9k/FNAF.exe/file' },
            { text: 'Download FNAF (FANDUB ESPAÑOL)', url: 'https://www.mediafire.com/file/k5pj0giyyfdwihe/Five_Nights_at_Freddys_Edicion_Ultra.exe/file' }
        ],
        'fnaf2': [
            { text: 'Download FNAF 2 (ORIGINAL)', url: 'https://www.mediafire.com/file/o0523msi4t3q4yk/FNAF2.exe/file' },
            { text: 'Download FNAF 2 (FANDUB ESPAÑOL)', url: 'https://www.mediafire.com/file/6nigs93pugt11z2/Five+Nights+at+Freddy%27s+2.exe' }
        ],
        'fnaf3': [
            { text: 'Download FNAF 3 (ORIGINAL)', url: 'https://www.mediafire.com/file/4wbu771d733e1f1/FNAF3.exe/file' },
            { text: 'Download FNAF 3 (FANDUB ESPAÑOL)', url: 'https://www.mediafire.com/file/1rxjwsgflvdmtq7/Five+Nights+at+Freddy%27s+3.exe' }
        ],
        'fnaf4': [
            { text: 'Download FNAF 4: Halloween Edition (ORIGINAL)', url: 'https://www.mediafire.com/file/k9uy7if04x7hjhr/FNAF4-HWE.exe/file' },
            { text: 'Download FNAF 4: Halloween Edition (FANDUB ESPAÑOL)', url: 'https://www.mediafire.com/file/hmmszewyab5t7fb/Five_Nights_at_Freddy%25C2%25B4s_4_Halloween_Edition.exe/file' }
        ],
        'fnaf5': [
            { text: 'Download FNAF: Sister Location', url: 'https://www.mediafire.com/file/ye20nk6wxgbk8ch/FNAF5.exe/file' }
        ],
        'aoe': [
            { text: 'Download Age of Empires', url: 'https://www.mediafire.com/file/07q3ddrnk95c436/AOEGE.iso/file' }
        ],
        'cs16': [
            { text: 'Download Counter Strike 1.6 (NO STEAM)', url: 'https://www.mediafire.com/file/8g8eh2v1xja2pju/CS16.rar/file' }
        ],
        'blur': [
            { text: 'Download Blur', url: 'https://www.mediafire.com/file/gg1jyyp0grgf8fk/BLR.iso/file' }
        ],
        'conan04': [
            { text: 'Download Conan (2004)', url: 'https://www.mediafire.com/file/xqlhnvi8pfggukf/C04.rar/file' }
        ],
        'assassinscreed': [
            {
                text: 'Download Assassin\'s Creed',
                parts: [
                    { text: 'Part 1', url: 'https://rapidshare.co/en/d/vEj0YHJOFHMgF8' },
                    { text: 'Part 2', url: 'https://rapidshare.co/en/d/trIeSL6rItGv1R' }
                ]
            }
        ],
        'cds': [
            { text: 'Download Conflict Desert Storm', url: 'https://www.mediafire.com/file/5x7es3quv6kyk0n/CDS.rar/file' }
        ],
        'cold-fear': [
            { text: 'Download Cold Fear', url: 'https://www.mediafire.com/file/yftik1nkpzrvykv/CFPC.rar/file' }
        ],
        'combat-chess': [
            { text: 'Download Combat Chess', url: 'https://www.mediafire.com/file/8am66wi60bfouzz/CCPC.rar/file' }
        ],
        'combat-tf121': [
            { text: 'Download Combat: Task Force 121', url: 'https://www.mediafire.com/file/i4resaqoost37ev/CTF.rar/file' }
        ],
        'commandos-sf': [
            { text: 'Download Commandos: Strike Force', url: 'https://www.mediafire.com/file/h3o7n9boad1hr38/CSF.rar/file' }
        ],
        'stick-fight': [
            { text: 'Download Stick Fight: The Game', url: 'https://www.mediafire.com/file/4ob4j8uxu6iauvo/SFtheGv05.06.2019.rar/file' }
        ],
        'lost-planet': [
            { text: 'Download Lost Planet', url: 'https://www.mediafire.com/file/br6xop7n9r3cicx/L8st_Pl9n3t_3xtr3m3_C8nd1t18n_C8l8n13s_3d1t18n.rar/file' }
        ],
        'battleblock-theater': [
            { text: 'Download BattleBlock Theater', url: 'https://drive.usercontent.google.com/download?id=16ZdlYUXGIYwPEzQHxt49jeuoYPMxKoH_&export=download&authuser=0' }
        ],
        'raft': [
            { text: 'Download Raft', url: 'https://www.mediafire.com/file/ps2j3etzmsl6zqb/Ra6f3t-1.09-elamigos.rar/file' }
        ],
        'garrys-mod': [
            { text: 'Download Garry\'s Mod', url: 'https://www.mediafire.com/file/53ubzb9a32lcu9u/Garrys_Mod_v1.5.80.0.rar/file' }
        ],
        'gta-sa': [
            { text: 'Download GTA: San Andreas', url: 'https://www.mediafire.com/file/mplrdftfwxmd0x0/GTA+San+Andreas+By+Sajord.zip/file' }
        ],
        'dusk': [
            { text: 'Download DUSK', url: 'https://www.mediafire.com/file/vch5x45tzoya7w4' }
        ],
        'hrot': [
            { text: 'Download HROT', url: 'https://www.mediafire.com/file/x7tg4a8fzsqca9r' }
        ],
        'devil-daggers': [
            { text: 'Download Devil Daggers', url: 'https://www.mediafire.com/file/pf2d92ev9ou9gm0/DDPC.rar/file' }
        ],
        'hedon-b': [
            { text: 'Download Hedon: Bloodrite', url: 'https://www.mediafire.com/file/vjcw4o3ixc8918r/Hedon.Bloodrite.v2.4.2.zip/file' }
        ],
        'maximum-action': [
            { text: 'Download Maximum Action', url: 'https://www.mediafire.com/file/7k89sf8zim6a1pt' }
        ],
        'ziggurat': [
            { text: 'Download Ziggurat', url: 'http://go4up.com/dl/431fc3e47f4c/ppt-zigg.iso' }
        ],
        'powerwash-sim': [
            {
                text: 'Download PowerWash Simulator',
                parts: [
                    { text: 'Part 1', url: 'https://rapidshare.co/en/d/hpzZRgK2EhrCnf' },
                    { text: 'Part 2', url: 'https://rapidshare.co/en/d/f4R4STgh5MjGnk' },
                    { text: 'Part 3', url: 'https://rapidshare.co/en/d/Yw8ppRdHLPBZ9x' },
                    { text: 'Part 4', url: 'https://rapidshare.co/en/d/gPfaS53XQ1Snkk' },
                    { text: 'Part 5', url: 'https://rapidshare.co/en/d/bH8OirQIMAZpTW' }
                ]
            },
            { text: 'Download actualización v29.05.2025', url: 'https://www.mediafire.com/file/fnjsbc6ckom2g7a/Pow1erWa6shSi-Update29.05.2025-elamigos.rar/file' }
        ],
        'mafia-ii': [
            {
                text: 'Download Mafia II',
                parts: [
                    { text: 'Part 1', url: 'https://www.mediafire.com/file/b5vlxh753wt68gj/MIIPG.Update5.GamezFull.com.part01.rar/file' },
                    { text: 'Part 2', url: 'https://www.mediafire.com/file/gyngoc9ctowvvos/MIIPG.Update5.GamezFull.com.part02.rar/file' },
                    { text: 'Part 3', url: 'https://www.mediafire.com/file/8iilv1kqfy1p79x/MIIPG.Update5.GamezFull.com.part03.rar/file' },
                    { text: 'Part 4', url: 'https://www.mediafire.com/file/at9zhpebjfkrgmh/MIIPG.Update5.GamezFull.com.part04.rar/file' },
                    { text: 'Part 5', url: 'https://www.mediafire.com/file/k78bbxldr2307tn/MIIPG.Update5.GamezFull.com.part05.rar/file' },
                    { text: 'Part 6', url: 'https://www.mediafire.com/file/178yl2dv95cvwop/MIIPG.Update5.GamezFull.com.part06.rar/file' },
                    { text: 'Part 7', url: 'https://www.mediafire.com/file/xgg8gv1ssymioz4/MIIPG.Update5.GamezFull.com.part07.rar/file' },
                    { text: 'Part 8', url: 'https://www.mediafire.com/file/5jm37nxrjg5iyeb/MIIPG.Update5.GamezFull.com.part08.rar/file' },
                    { text: 'Part 9', url: 'https://www.mediafire.com/file/6wi420szsk3pdwv/MIIPG.Update5.GamezFull.com.part09.rar/file' }
                ]
            }
        ],
        'hitman-bm': [
            {
                text: 'Download Hitman: Blood Money',
                parts: [
                    { text: 'Part 1', url: 'https://www.mediafire.com/file/ry55hdmvtrjnte3/HBMPG.GamezFull.part1.rar' },
                    { text: 'Part 2', url: 'https://www.mediafire.com/file/01fiaobbb3l9qyk/HBMPG.GamezFull.part2.rar' },
                    { text: 'Part 3', url: 'https://www.mediafire.com/file/angujsh5kmw3br1/HBMPG.GamezFull.part3.rar' },
                    { text: 'Part 4', url: 'https://www.mediafire.com/file/m1w7c880a26trt4/HBMPG.GamezFull.part4.rar' },
                    { text: 'Part 5', url: 'https://www.mediafire.com/file/bi5newenlkuyyvj/HBMPG.GamezFull.part5.rar' },
                    { text: 'Part 6', url: 'https://www.mediafire.com/file/86xkr37ykor433x/HBMPG.GamezFull.part6.rar' }
                ]
            }
        ],
        'hitman-contracts': [
            { text: 'Download Hitman: Contracts', url: 'https://drive.usercontent.google.com/download?id=1ZK3wvkBZF95yrIgYUsnHI2aVW4T1jtzY&authuser=0' }
        ],
        'batman-as': [
            { text: 'Download Batman: Arkham Asylum', url: 'https://www.mediafire.com/file/13hn1c1digxt061/BAA2011PG1.1.GamezFullCOM.rar/file' }
        ],
        'turok-08': [
            {
                text: 'Download Turok (2008)',
                parts: [
                    { text: 'Part 1', url: 'https://www.mediafire.com/file/wenjq69q8btisr3/T2008PG.GamezFull.com.part01.rar/file' },
                    { text: 'Part 2', url: 'https://www.mediafire.com/file/lws7djotsqqkeka/T2008PG.GamezFull.com.part02.rar/file' },
                    { text: 'Part 3', url: 'https://www.mediafire.com/file/pzaz1z8qf46fhxs/T2008PG.GamezFull.com.part03.rar/file' },
                    { text: 'Part 4', url: 'https://www.mediafire.com/file/xchiz7lwdhm0ymx/T2008PG.GamezFull.com.part04.rar/file' },
                    { text: 'Part 5', url: 'https://www.mediafire.com/file/u60kdrrnq8vl6or/T2008PG.GamezFull.com.part05.rar/file' },
                    { text: 'Part 6', url: 'https://www.mediafire.com/file/fs8a05y2277kbwz/T2008PG.GamezFull.com.part06.rar/file' },
                    { text: 'Part 7', url: 'https://www.mediafire.com/file/a3knseipq5lhqng/T2008PG.GamezFull.com.part07.rar/file' },
                    { text: 'Part 8', url: 'https://www.mediafire.com/file/stasdgkp4inon2f/T2008PG.GamezFull.com.part08.rar/file' },
                    { text: 'Part 9', url: 'https://www.mediafire.com/file/3fjrhtx2rwcscig/T2008PG.GamezFull.com.part09.rar/file' },
                    { text: 'Part 10', url: 'https://www.mediafire.com/file/8pxa4yinqoi0ql9/T2008PG.GamezFull.com.part10.rar/file' },
                    { text: 'Part 11', url: 'https://www.mediafire.com/file/36ps24je5got4xt/T2008PG.GamezFull.com.part11.rar/file' },
                    { text: 'Part 12', url: 'https://www.mediafire.com/file/n5fdeycfi5usuo2/T2008PG.GamezFull.com.part12.rar/file' }
                ]
            }
        ],
        'crysis': [
            {
                text: 'Download Crysis',
                parts: [
                    { text: 'Part 1', url: 'https://www.mediafire.com/file/s2gw40w4qsz4hgy/C1PGGOG_GamezFull.part1.rar' },
                    { text: 'Part 2', url: 'https://www.mediafire.com/file/d77x7ir4aed7mzy/C1PGGOG_GamezFull.part2.rar' },
                    { text: 'Part 3', url: 'https://www.mediafire.com/file/uqour43opfi8rko/C1PGGOG_GamezFull.part3.rar' },
                    { text: 'Part 4', url: 'https://www.mediafire.com/file/07lo82a19s524is/C1PGGOG_GamezFull.part4.rar' },
                    { text: 'Part 5', url: 'https://www.mediafire.com/file/77jx88vw2ej92bp/C1PGGOG_GamezFull.part5.rar' },
                    { text: 'Part 6', url: 'https://www.mediafire.com/file/45qk97e1x3dd595/C1PGGOG_GamezFull.part6.rar' },
                    { text: 'Part 7', url: 'https://www.mediafire.com/file/gkywbm79k59d68m/C1PGGOG_GamezFull.part7.rar' },
                    { text: 'Part 8', url: 'https://www.mediafire.com/file/ntdd9a1qlei28uq/C1PGGOG_GamezFull.part8.rar' }
                ]
            }
        ],
        'hollow-knight-s': [
            { text: 'Download Hollow Knight: Silksong', url: 'https://www.mediafire.com/file/f8z87nzyo33fcw6/HKSPG2025.GamezFullCOM.rar/file' },
            { text: 'Download actualizaciones', url: 'https://www.mediafire.com/file/33cx3t80r79magl/+Updates2025-HKS.GamezFullCOM.rar/file' }
        ],
        'hollow-knight': [
            { text: 'Download Hollow Knight', url: 'https://www.mediafire.com/file/lgpu2jts8wya393/HKPG2021.v1.5.78.GamezFullCOM.rar/file' }
        ],
        'human-fall-flat': [
            { text: 'Download Human Fall Flat', url: 'https://www.mediafire.com/file/3xjyx96kxmywdwg/HFFPG2025.24.04.2025.gamezfull.com.rar/file' }
        ],
        'super-bunny-man': [
            { text: 'Download Super Bunny Man', url: 'https://www.mediafire.com/file/etg6r2fwaprvsvw' }
        ],
        'alan-wake': [
            {
                text: 'Download Alan Wake',
                parts: [
                    { text: 'Part 1', url: 'https://cdn2.steamgriddb.com/grid/eae7aadd02dfcc93a198d256ec0833ed.jpg' },
                    { text: 'Part 2', url: 'https://www.mediafire.com/file/y11tgfl4c676v4w/AWCCPG.GFZDCOMORG.part2.rar/file' },
                    { text: 'Part 3', url: 'https://www.mediafire.com/file/zy0u2koxiix358o/AWCCPG.GFZDCOMORG.part3.rar/file' },
                    { text: 'Part 4', url: 'https://www.mediafire.com/file/thxyajmkk87epk1/AWCCPG.GFZDCOMORG.part4.rar/file' },
                    { text: 'Part 5', url: 'https://www.mediafire.com/file/ednd1vn9r99bcf3/AWCCPG.GFZDCOMORG.part5.rar/file' }
                ]
            }
        ],
        'payday-th': [
            { text: 'Download PAYDAY: The Heist', url: 'https://www.mediafire.com/file/by5reo6kg1doimo/PD.TH.Wolfpack.v1.12.2..rar/file' }
        ],
        'bioshock': [
            { text: 'Download Bioshock', url: 'https://www.mediafire.com/file/h3246t5yl96chd9/B18Sh8ck_1.1.rar/file' }
        ],
        'shaun-white-skate': [
            { text: 'Download Shaun White Skateboarding', url: 'https://www.mediafire.com/file/2u0070h2dzd4mz1/Sh4un_Wh1t3_Sk4t3b84rd1ng.rar/file' }
        ],
        'minecraft-bedrock': [
            { text: 'Download Minecraft Bedrock Edition', url: 'https://www.mediafire.com/file/gpzlw9oleh6ccc0/M1necr4ft_Bedr8ck_Ed1t18n_v1.21.130.rar/file' }
        ],
        'rayman-rr': [
            { text: 'Download Rayman Raving Rabbids', url: 'https://www.mediafire.com/file/am36zltdx0ld5ay/R44ym44n.R44v1ng.R44bb1ds.G8G.rar/file' }
        ],
        'capcom-fc': [
            { text: 'Download Capcom Fighting Collection', url: 'https://www.mediafire.com/file/dot121cqf8atzvu/Ca4pc4om_F1ighti1ng_Co4lle3ct1i4n.rar/file' }
        ],
        'scott-pilgrim-vstw': [
            { text: 'Download Scott Pilgrim vs. The World', url: 'https://www.mediafire.com/file/4htg3fqykliscuk/v81ces38-sc8tt.p1lgr1m.vs.the.w8rld.rar/file' }
        ],
        'terminator2d': [
            { text: 'Download Terminator 2D: NO FATE', url: 'https://www.mediafire.com/file/1z23msazche4rgv/Term1n4t8r_2D_N8_F4te.rar/file' }
        ],
        'lord-of-rings-tq': [
            { text: 'Download El Señor de los Anillos: La Conquista', url: 'https://www.mediafire.com/file/igc2e2f1ozm7k8b/3l_S3%25C3%25B10r_d3_l0s_7n3ll0s_L7_C0nqu3st7.rar/file' }
        ],
        'dave-the-diver': [
            { text: 'Download Dave the Diver', url: 'https://www.mediafire.com/file/m7a0j89kgqff412/D4v3_th3_D1v3r_1.0.2.1214.rar/file' }
        ],
        'star-wars-bh': [
            { text: 'Download Star Wars: Bounty Hunter', url: 'https://www.mediafire.com/file/ihl4mijc3jvul61/St4r_W4rs_B8unty_Hunt3r_R3m4st3r.rar/file' }
        ],
        'freshly-frosted': [
            { text: 'Download Freshly Frosted', url: 'https://www.mediafire.com/file/1xk7yiucflhdv8m' }
        ],
        'dread-templar': [
            {
                text: 'Download Dread Templar',
                parts: [
                    { text: 'Part 1', url: 'https://www.mediafire.com/file/7cnafp4jkxop2bb/DTPG.v1.02b.GamezFull.com.part1.rar/file' },
                    { text: 'Part 2', url: 'https://www.mediafire.com/file/nthejlbv95vdprs/DTPG.v1.02b.GamezFull.com.part2.rar/file' },
                    { text: 'Part 3', url: 'https://www.mediafire.com/file/2j0zxiwz34g4v4r/DTPG.v1.02b.GamezFull.com.part3.rar/file' }
                ]
            }
        ],
        'ultrakill': [
            { text: 'Download Ultrakill', url: 'https://www.mediafire.com/file/1wrw2cu37dgdh18' }
        ],
        'mk1992': [
            { text: 'Download Mortal Kombat (1992)', url: 'https://www.mediafire.com/file/ksnpjbs025t3sg4/M8rt4l_K8mb4t_1.rar/file' }
        ],
        'mafia': [
            { text: 'Download Mafia', url: 'https://download938.mediafire.com/a90rvcgo9zfgZGhE25SISEPQGbIpUjcay5RAFfYBKMo4pZwyCn7fUgFEnZGjuDR3Je3VVahfvaLq2HG7IjEZu5gb2S208IFT6h0rH0Klbrra93TD044HJKkCSMLNC6mCxUBjY2ZUIqD0oOCFvjczma-S6vaxlb9lO1dSSOYMD-4-gw/h2qiku2rbm1nwu3/M7f17+1.rar' }
        ],
        'mk-deception': [
            { text: 'Download Mortal Kombat: Deception', url: 'https://www.mediafire.com/file/aa4wphwzq2lzyal/M8rt4l_K8mb4t_D3c3pti8n.rar/file' }
        ],
        'mk-unchained': [
            { text: 'Download Mortal Kombat: Unchained', url: 'https://www.mediafire.com/file/3rb0vmoy7wq6aj6/M8rt4l_K8mb4t_Unch4in3d_3mul4d8.rar/file', readMoreText: 'Esta versión es el "Mortal Kombat: Deception" pero con las siguientes características:\n\n- Nuevos personajes: Blaze, Frost, Jax y Kitana.\n- Modo Endurance (oleadas contínuas de oponentes).\n- Modo multijugador por red inalámbrica ad hoc.' }
        ],
        'pokemon-colleccion': [
            { text: 'Download Pokemón Colección', url: 'https://www.mediafire.com/file/v1b0s3cy3u6cjeu/P0ketVL1.Y2.rar/file', readMoreText: 'Contiene los siguientes títulos:\n\n- Pokemon Azul\n- Pokemon Rojo\n- Pokemon Verde (Inglés)\n- Pokemon Pinball\n- Pokemon Oro\n- Pokemon Plata\n- Pokemon Cristal\n- Pokemon Amarillo\n- Pokemon Puzzle Challenge\n- Pokemon Trading Card Game\n- Pokemon Rubi\n- Pokemon Zafiro\n- Pokemon Esmeralda\n- Pokemon Rojo Fuego\n- Pokemon Verde Hoja\n- Pokemon Mundo Misterioso\n- Pokemon Pinball RZ\n- Pokemon Stadium 1\n- Pokemon Stadium 2\n- Pokemon Snap\n- Pokemon – Edicion Perla\n- Pokemon – Edicion Diamante\n- Pokemon – Edicion Platino\n- Pokemon – Edicion Blanca\n- Pokemon – Edicion Negra\n- Pokemon – Edicion Blanca 2\n- Pokemon – Edicion Negra 2\n- Pokemon – Edicion Oro HeartGold\n- Pokemon – Edicion Plata SoulSilver\n- Pokemon Mundo Misterioso – Equipo de Rescate Azul\n- Pokemon Mundo Misterioso – Exploradores de la Oscuridad\n- Pokemon Mundo Misterioso – Exploradores del Tiempo\n- Pokemon Mundo Misterioso – Explotadores del Cielo\n- Pokemon Ranger – Sombras de Almia\n- Pokemon Ranger – Trazos de Luz\n- Pokemon Sol\n- Pokemon Luna\n- Pokemon Ultra Sol\n- Pokemon Ultra Luna\n- Pokemon X\n- Pokemon Y\n- Pokemon Rubi Omega\n- Pokemon Zafiro Alfa' }
        ],
        'mario-kart64': [
            { text: 'Download Mario Kart 64', url: 'https://www.mediafire.com/file/vgpp7iinb16cqlg/M4ari1o_K4rt_64.rar/file' }
        ],
        'pacman-af': [
            { text: 'Download Pac-Man y las Aventuras Fantasmales', url: 'https://www.mediafire.com/file/545l3zrqxwzasq9/Pa4c-M4n_a4nd_th3_Gh8stly_4dv4ntur4s.rar/file' }
        ],
        'real-bout-tn': [
            { text: 'Download Real Bout Fatal Fury 2: The Newcomers', url: 'https://www.mediafire.com/file/tp7trp0gcap0fc1/R34L.BOUT.F4T4L.FURY.2.TH3.N3WCOM3RS.Bu1ld.20035572.rar/file' }
        ],
        'beyond-tip2': [
            { text: 'Download Beyond the Ice Palace 2', url: 'https://www.mediafire.com/file/wnw3od2keqerakk/b3yond_th3_8c3_p4l4c3_2.rar/file' }
        ],
        'cs-source': [
            { text: 'Download Counter-Strike: Source', url: 'https://www.mediafire.com/file/048wx0szmr9w2c1/CSS_v3277112.rar/file' }
        ],
        'flatout-uc': [
            { text: 'Download FlatOut: Ultimate Carnage', url: 'https://www.mediafire.com/file/a93n8bpb8k75nl2/Fl4t8ut_Ult1m4t3_C4rn4g3._C8ll3ct8r%2527s_3d1t18n_%25282008%2529.rar/file' }
        ],
        'bridge-portal': [
            { text: 'Download Bridge Constructor Portal', url: 'https://www.mediafire.com/file/i4ly0urtgw752pw/Br1dg3_C8nstruct8r_P8rt4l_5.0.rar/file' }
        ],
        'balatro': [
            { text: 'Download Balatro', url: 'https://www.mediafire.com/file/3o0i9fqlu6y56q7/B4l4tr8_v1.0.18-FULL.rar/file' }
        ],
        'rayman-origins': [
            { text: 'Download Rayman Origins', url: 'https://www.mediafire.com/file/p1x6i26pwymk4vu/R4ym4n_Or8g8ns_1.0.32504.rar/file' }
        ],
        'toy-story2': [
            { text: 'Download Toy Story 2: Buzz Lightyear al Rescate!', url: 'https://www.mediafire.com/file/lnl4jgvsrsv4qjj/TOY2.rar/file' }
        ],
        'the-sims-medieval': [
            { text: 'Download The Sims Medieval', url: 'https://www.mediafire.com/file/utzej7l3qgqdtvw/Th3_S8ms_M3d83v4l_Ult8m4t3_3d8t8on.rar/file' }
        ],
        'silent-hill': [
            { text: 'Download Silent Hill', url: 'https://www.mediafire.com/file/ycl0tmeiggi2m85/S8l3nt_H8ll.rar/file' }
        ],
        'kung-fu-panda': [
            { text: 'Download Kung Fu Panda', url: 'https://www.mediafire.com/file/illz8sjyh3n5krn/P4ND4.rar/file' }
        ],
        'half-life-anthology': [
            { text: 'Download Half-Life Anthology', url: 'https://www.mediafire.com/file/w98hqba5o99vn1k/H4lf-L1fe_1_4nth8l8gy.rar/file', readMoreText: 'Contiene los siguientes títulos:\n\n- Half-Life: Opposing Force\n- Half-Life: Blue Shift\n- Half-Life: Source\n- Half-Life Deathmatch: Source' }
        ],
        'cs-cz': [
            { text: 'Download Counter-Strike: Condition Zero', url: 'https://www.mediafire.com/file/4i9wu83r2e6vqxa/C8unt3r_Str1k3_C8nd1t18n_Z3r8.rar/file' }
        ],
        'turok': [
            { text: 'Download Turok (1997)', url: 'https://www.mediafire.com/file/opdw4hhthzz58ax/Tur8k_D1n8s4ur_Hunt3r_%2528bu1ld_23.04.2025%2529.rar/file' }
        ],
        'turok2': [
            { text: 'Download Turok 2: Seeds of Evil', url: 'https://www.mediafire.com/file/dwds1gv193r439j/Tur8k_2_S33ds_8f_3v1l_R3m4st3r3d_%2528bu1ld_10.05.2023%2529.rar/file' }
        ],
        'turok3': [
            { text: 'Download Turok 3: Shadow of Oblivion', url: 'https://www.mediafire.com/file/ye0qix5yn2mzrcy/tur8k_3.rar/file' }
        ],
        'pvz-replanted': [
            { text: 'Download Plants vs. Zombies: Replanted', url: 'https://www.mediafire.com/file/hb5kg3etfsn8apr/Pl4ants_vs_Zo8mbi13es_R3epl4ante3d.rar/file' }
        ],
        'just-cause': [
            { text: 'Download Just Cause', url: 'https://www.mediafire.com/file/u53hyk4b3hx3kka/Just_C4use.rar/file' }
        ],
        'tloz-oft': [
            { text: 'Download The Legend of Zelda: Ocarina of Time', url: 'https://www.mediafire.com/file/tgw0icud59q94jo/Z3elda4_Oc4arin4_of_Ti1m3e.rar/file' }
        ],
        'motogp': [
            { text: 'Download MotoGP', url: 'https://www.mediafire.com/file/to7dv5jhw3pa1bo/M8t8GP_2000.rar/file' }
        ],
        'motogp2': [
            { text: 'Download MotoGP 2', url: 'https://www.mediafire.com/file/6ped66pmq65jm3t/M8t8GP_2.rar/file' }
        ],
        'motogp3': [
            { text: 'Download MotoGP 3', url: 'https://www.mediafire.com/file/sr8f0lkzbuwfdd1/M8t8GP_Ultim4t3_R4cing_T3chn8l8gy_3.rar/file' }
        ],
        'motogp07': [
            { text: 'Download MotoGP 07', url: 'https://www.mediafire.com/file/edrj3xuqrbcvft2/M8t8GP_07_MULTI5_-_F4irlight.rar/file' }
        ],
        'soldier-of-fortune': [
            { text: 'Download Soldier of Fortune', url: 'https://www.mediafire.com/file/hqmdn8ztntaymov/S8ld13r_8f_F8rtun3_Pl4t1num_3d1t18n.rar/file' }
        ],
        'mgs': [
            { text: 'Download Metal Gear Solid', url: 'https://www.mediafire.com/file/hjdslamv7xgqoo5/M3t7l_G37r_S0l1d.rar/file' }
        ],
        'battlefield1942': [
            { text: 'Download Battlefield 1942', url: 'https://www.mediafire.com/file/bmcz9kigazydlng/B7ttl3f13ld_1942.rar/file', readMoreText: 'Contiene DLCs:\n\n- Road to Rome\n- Secret Weapons of WWII' }
        ],
        'nfs-underground': [
            { text: 'Download Need for Speed: Underground', url: 'https://www.mediafire.com/file/giz1dym04i4d3b5/N33d_f0r_sp33d_und3rgr0und.rar/file' }
        ],
        'nfs-underground2': [
            { text: 'Download Need for Speed: Underground 2', url: 'https://www.mediafire.com/file/vpfl7pbk42ij32g/N33d_f0r_sp33d_und3rgr0und_2.rar/file' }
        ],
        'nfs-most-wanted': [
            { text: 'Download Need for Speed: Most Wanted', url: 'https://www.mediafire.com/file/abmgh8f40f4e261/N33d_f0r_sp33d_m0st_w7nt3d.rar/file' }
        ],
        'nfs-most-wanted-be': [
            { text: 'Download Need for Speed: Most Wanted Black Edition', url: 'https://www.mediafire.com/file/10k6ccit6gtff1q/N33d_f8r_Sp33d_M8st_W4nt3d_2005.rar/file' }
        ],
        'nfs-carbon': [
            { text: 'Download Need for Speed: Carbon', url: 'https://www.mediafire.com/file/w233rhgr8tl458n/N33d_f0r_sp33d_c7rb0n0.rar/file' }
        ],
        'nfs-high-stakes': [
            { text: 'Download Need for Speed High Stakes', url: 'https://www.mediafire.com/file/qurxo0ktsvpfdmh/n33d_f0r_sp33d_h1gh_st7k3s.rar/file' }
        ],
        'nfs-hot-pursuit2': [
            { text: 'Download Need for Speed: Hot Pursuit 2', url: 'https://www.mediafire.com/file/obcqe99za2055gg/N33d_f0r_Sp33d_H0t_Pursu1t_2.rar/file' }
        ],
        'chrome-specforce': [
            { text: 'Download Chrome: Specforce', url: 'https://www.mediafire.com/file/kypfnoaqm10a92i/Chr0m3_Sp3cF0rc3.rar/file' }
        ],
        'terrordrome': [
            { text: 'Download Terrordrome', url: 'https://www.mediafire.com/file/iimk44hd26riw4r/T3rr0rdr0m3.rar/file' }
        ],
        'chrome': [
            { text: 'Download Chrome', url: 'https://www.mediafire.com/file/tqgmcku3jz9dknn/Chr8m3_2003.rar/file' }
        ],
        'rome-total-war': [
            { text: 'Download Rome Total War', url: 'https://www.mediafire.com/file/r50rjibgawyxwcz/R0m3_T0t7l_W7r.rar/file' }
        ],
        'bb-miamitakedown': [
            { text: 'Download Bad Boys: Miami Takedown', url: 'https://www.mediafire.com/file/s1yfueoepe2en4g/B4d_B8ys_M14m1_T4k3d8wn.rar/file' }
        ],
        'pop-ww': [
            { text: 'Download Prince of Persia: Warrior Within', url: 'https://www.mediafire.com/file/2vv7vef09wh6cu8/Pr1nc3_0f_P3rs17_3l_7lm7_d3l_Gu3rr3r0.rar/file' }
        ],
        'battlefled2': [
            { text: 'Download Battlefield 2', url: 'https://www.mediafire.com/file/c1cz6zl09v0m8c6/B7tt3f13l_2.rar/file' }
        ],
        'flatout': [
            { text: 'Download FlatOut', url: 'https://www.mediafire.com/file/iba5scif69hdtlh/Fl4t-8ut1+PC.rar/file' }
        ],
        'flatout2': [
            { text: 'Download FlatOut 2', url: 'https://www.mediafire.com/file/6rj3q21rhi41wss/Fl7t0ut_t2.rar/file' }
        ],
        'flatout3': [
            { text: 'Download FlatOut 3: Chaos & Destruction', url: 'https://www.mediafire.com/file/mk81qn4sd8g119m/Fl7t0ut_3_Ch70s_7nd_D3struct10n_MULT18_-_PR0PH3T.rar/file' }
        ],
        'street-racing-syndicate': [
            { text: 'Download Street Racing Syndicate', url: 'https://www.mediafire.com/file/12xe520a8pi9xn3/Str33t_R7c3ng_synd3c7t3.rar/file' }
        ],
        'syberia': [
            { text: 'Download Syberia', url: 'https://www.mediafire.com/file/seakciy9tt1pggj/Syb3r14.rar/file' }
        ],
        'syberia2': [
            { text: 'Download Syberia 2', url: 'https://www.mediafire.com/file/tanzmsled6ftw6m/Syb3r14_2.rar/file' }
        ],
        'worms-3d': [
            { text: 'Download Worms 3D', url: 'https://www.mediafire.com/file/zs1msz8znmqv2u1/W8rms_3D.rar/fil' }
        ],
        'worms-revolution': [
            { text: 'Download Worms Revolution', url: 'https://www.mediafire.com/file/k0l6xz7dr5jxu7q/W0rms_R3v0lut30n_G0ld_3d3t30n_Pr0ph3t.rar/file' }
        ],
        'worms2-armageddon': [
            { text: 'Download Worms 2: Armageddon', url: 'https://www.mediafire.com/file/ns4dh8793nzah5b/W8rms_4rm4g3dd8n_v3.8.rar/file' }
        ],
        'worms-clan-wars': [
            { text: 'Download Worms Clan Wars', url: 'https://www.mediafire.com/file/s7banwql66m2zuv/W8rms_Cl4n_W4rs.rar/file' }
        ],
        'worms-reloaded': [
            { text: 'Download Worms: Reloaded', url: 'https://www.mediafire.com/file/p0mbea7sr5vprcn/W8rms_R3l84d3d.rar/file' }
        ],
        'worms-ultimate-mayhem': [
            { text: 'Download Worms Ultimate Mayhem', url: 'https://www.mediafire.com/file/2epwynvn9n9mbq4/W8rms_Ult1m4t3_M4yh3m.rar/file' }
        ],
        'worms-wmd': [
            { text: 'Download Worms W.M.D', url: 'https://www.mediafire.com/file/9s3wvknwer0omkn/W8rms_W.M.D.rar/file' }
        ],
        'diablo': [
            { text: 'Download Diablo', url: 'https://www.mediafire.com/file/m9yifx9a6tzuovd/D17bl0.rar/file' }
        ],
        'diablo2': [
            { text: 'Download Diablo II', url: 'https://www.mediafire.com/file/8bjva0c9byqlvbt/D17bl0_2.rar/file' }
        ],
        'battlefield-vietnam': [
            { text: 'Download Battlefield Vietnam', url: 'https://www.mediafire.com/file/whtea4z0khsgnu8/BF.V13tn4m.2004.rar/file' }
        ],
        'cmr04': [
            { text: 'Download Colin McRae Rally 04', url: 'https://www.mediafire.com/file/92a68xgexgf9z33/C0l1nMcR73R7lly04.rar/file' }
        ],
        'pes2012': [
            { text: 'Download Pro Evolution Soccer 2012', url: 'https://www.mediafire.com/file/xqrqjeuprynu5ge/P3S+2012.rar/file' }
        ],
        'pes2009': [
            { text: 'Download Pro Evolution Soccer 2009', url: 'https://www.mediafire.com/file/s8qbdexnobb7fcz/Pr8_3v8lut18n_S8cc3r_2009.rar/file' }
        ],
        'pes2008': [
            { text: 'Download Pro Evolution Soccer 2008', url: 'https://www.mediafire.com/file/xf6dhg0czroivhp/P3s_2008.rar/file' }
        ],
        'pes2007': [
            { text: 'Download Pro Evolution Soccer 2007', url: 'https://www.mediafire.com/file/dzx8fl98yrflwhl/P3S_7.rar/file' }
        ],
        'pes5': [
            { text: 'Download Pro Evolution Soccer 5', url: 'https://www.mediafire.com/file/5gd3lmjvoty5qgy/Pr8_3v8lut18n_S8cc3r_2005.rar/file' }
        ],
        'pes2010': [
            { text: 'Download Pro Evolution Soccer 2010', url: 'https://www.mediafire.com/file/41h06zda4x9nfhe/P3S2010.rar/file' }
        ],
        'pes2013': [
            { text: 'Download Pro Evolution Soccer 2013', url: 'https://www.mediafire.com/file/p5ls0753976n5e3/P3S_2013.rar/file', readMoreText: 'Serial: SHVY-3LE9-TMNH-7K5L-JN73' }
        ],
        'nba2004': [
            { text: 'Download NBA Live 2004', url: 'https://drive.google.com/file/d/1iTWv3m1Okj7NL3yCBfX-MhB9tA7HLA-F/view' }
        ],
        'nba08': [
            { text: 'Download NBA Live 08', url: 'https://www.mediafire.com/file/wy8829uawr0l89v/NB4_L1v3_2008.rar/file' }
        ],
        'nba2k10': [
            { text: 'Download NBA 2K10', url: 'https://www.mediafire.com/file/8srokwxtn7jsxqw/NB4_2K10_MULT15.rar/file' }
        ],
        'miami-vice': [
            { text: 'Download Miami Vice', url: 'https://www.mediafire.com/file/q9dog9l7638eqwi/MVPG.Www.GamezFull.com.rar' }
        ],
        'wwe-raw': [
            { text: 'Download WWE RAW', url: 'https://www.mediafire.com/file/3pvfbqfp97tmchb/WWERAW2002.Www.GamezFull.com.rar' }
        ],
        'spiderman2000': [
            { text: 'Download Spider-Man', url: 'https://www.mediafire.com/file/yobl74uyclv48os/Sp1d3r-M4n_2001.rar/file' }
        ],
        'spiderman-fof': [
            { text: 'Download Spider-Man: Amigo o Enemigo', url: 'https://www.mediafire.com/file/2leksgudqpyjct7/Sp1d3r-M4n_Fr13nd_8r_F83.rar/file' }
        ],
        'spiderman2-2004': [
            { text: 'Download Spider-Man 2', url: 'https://www.mediafire.com/file/f82ok56sbu5idx0/Sp1d3rM7n_2.rar/file' }
        ],
        'spiderman3-2007': [
            { text: 'Download Spider-Man 3', url: 'https://www.mediafire.com/file/4u58awb9hgw9g6l/Sp1d3rm7n+3.rar/file' }
        ],
        'spiderman-wos': [
            { text: 'Download Spider-Man: Web of Shadows', url: 'https://www.mediafire.com/file/6r7az54xd3ucjcs/Sp1d3r-M7n_W3b_0f_Sh7d0ws.rar/file' }
        ],
        'spiderman-sd': [
            { text: 'Download Spider-Man: Shattered Dimensions', url: 'https://www.mediafire.com/file/yw3gdjo091avw9x/Sp1d3r-M7n_Sh7tt3r3d_D1m3ns10ns.rar/file' }
        ],
        'wolfenstein': [
            { text: 'Download Wolfenstein', url: 'https://www.mediafire.com/file/vb2lc63wmhe6v7a/W0lf3nst31n_1.2.rar/file' }
        ],
        'wolfenstein-et': [
            { text: 'Download Wolfenstein: Enemy Territory', url: 'https://www.mediafire.com/file/g4w0ril684cbwg8/W0lf3nst31n_3n3my_T3rr1t0ry_2.60.rar/file' }
        ],
        'wolfenstein-return': [
            { text: 'Download Return to Castle Wolfenstein', url: 'https://www.mediafire.com/file/tlbiiqfzgvm2z43/R3turn_t0_C7stl3_W0lf3nst31n.rar/file' }
        ],
        'harry-potter-pf': [
            { text: 'Download Harry Potter y la Piedra Filosofal', url: 'https://www.mediafire.com/file/a90yrmkctp4mp85/H4rry_P8tt3r_y_l4_p13dr4_f1l8s8f4l.rar/file' }
        ],
        'harry-potter-cs': [
            { text: 'Download Harry Potter y La Cámara Secreta', url: 'https://www.mediafire.com/file/nyxjc7yxn7f4086/H4rry_P8tt3r_Y_L4_C4m4r4_S3cr3t4.rar/file' }
        ],
        'harry-potter-cf': [
            { text: 'Download Harry Potter y el Cáliz de Fuego', url: 'https://www.mediafire.com/file/miexlbybwqxmle2/H4rry_P8tt3r_y_3l_C4l1z_d3_Fu3g8.rar/file' }
        ],
        'harry-potter-qcm': [
            { text: 'Download Harry Potter: Quidditch Copa del Mundo', url: 'https://www.mediafire.com/file/idxioorkofb70z7/H4rry_P8tt3r_Qu1dd1tch_C8p4_d3l_Mund8.rar/file' }
        ],
        'harry-potter-of': [
            { text: 'Download Harry Potter y la Orden del Fénix', url: 'https://www.mediafire.com/file/vtwi4k9pacltfdp/H7rry_P0tt3r_7nd_th3_0rd3r_0f_th3_Ph03n1x.rar/file' }
        ],
        'harry-potter-rm': [
            { text: 'Download Harry Potter y las Reliquias de la Muerte', url: 'https://www.mediafire.com/file/howzbotp7igotod/H7rry_P0tt3r_7nd_th3_H7lf-Bl00d_Pr1nc3.rar/file' }
        ],
        'harry-potter-pda': [
            { text: 'Download Harry Potter y el prisionero de Azkaban', url: 'https://www.mediafire.com/file/8oievtoeqfp6ju0/H7rry_P0tt3r_7nd_th3_Pr1s0n3r_0f_7zk7b7n.rar/file' }
        ],
        'obscure': [
            { text: 'Download Obscure', url: 'https://www.mediafire.com/file/fd13wyn2xrqlnua/0bscur3.rar/file' }
        ],
        'obscure2': [
            { text: 'Download Obscure 2', url: 'https://www.mediafire.com/file/wdpd0bxnxabdl3c/0bscur32.rar/file' }
        ],
        'rage': [
            { text: 'Download Rage', url: 'https://www.mediafire.com/file/j3ju1dql8gvl3g4/R4g3_C8mpl3t3_3d1t18n_1.3.rar/file' }
        ],
        'harry-potter-mp': [
            { text: 'Download Harry Potter y el Misterio del Príncipe', url: 'https://www.mediafire.com/file/howzbotp7igotod/H7rry_P0tt3r_7nd_th3_H7lf-Bl00d_Pr1nc3.rar/file' }
        ],
        'midnight-club2': [
            { text: 'Download Midnight Club 2', url: 'https://www.mediafire.com/file/kjvr2ouiuvh739r/M1dn1ght_Club_2.rar/file' }
        ],
        'bully': [
            { text: 'Download Bully', url: 'https://www.mediafire.com/file/jm21v7b24oy46d7/Bully_-_Sch0l7rsh1p_3d1t10n.rar/file' }
        ],
        'delta-force': [
            { text: 'Download Delta Force', url: 'https://www.mediafire.com/file/dvoser3gx75jzop/D3lt7_f0rc3.rar/file' }
        ],
        'delta-force2': [
            { text: 'Download Delta Force 2', url: 'https://www.mediafire.com/file/ksia5uee46bz4cx/D3lt7_f0rc3_2.rar/file' }
        ],
        'delta-force-x': [
            { text: 'Download Delta Force Xtreme', url: 'https://www.mediafire.com/file/z2clq8eeb8b9v7b/D3lt7_f0rc3_xtr3m3.rar/file' }
        ],
        'delta-force-tsd': [
            { text: 'Download Delta Force: Task Force Dagger', url: 'https://www.mediafire.com/file/oroa5vjbay3pqk9/D3lt7_f0rc3_t7sk_f0rc3_d7gg3r.rar/file' }
        ],
        'delta-force-bhd': [
            { text: 'Download Delta Force: Black Hawk Down', url: 'https://www.mediafire.com/file/1m012tm38ipj4k4/D3lt7_f0rc3_bl7ck_h7wk_d0wn.rar/file' }
        ],
        'delta-force-lw': [
            { text: 'Download Delta Force: Land Warrior', url: 'https://www.mediafire.com/file/pcl9a7vapkdd758/D3lt7_f0rc3_l7nd_w7rr10r.rar/file' }
        ],
        'nosferatu-malachi': [
            { text: 'Download Nosferatu: The Wrath of Malachi', url: 'https://www.mediafire.com/file/n288q5ykjc8adc5/NWOMPG.Www.GamezFull.com.rar' }
        ],
        'land-of-the-dead': [
            { text: 'Download Land Of The Dead', url: 'https://www.mediafire.com/file/ksmdfu6q2sg3d65/L7nd_0f_Th3_D37d.rar/file' }
        ],
        'painkiller-had': [
            { text: 'Download Painkiller: Hell & Damnation', url: 'https://www.mediafire.com/file/fjjkeqxx1pm4fzi/P71nk1ll3r_H3ll_7nd_D7mn7t10n.rar/file' }
        ],
        'max-payne': [
            { text: 'Download Max Payne', url: 'https://www.mediafire.com/file/o3xcwpftsud7hci/M7x_P7yn3.rar/file' }
        ],
        'gta-chinatown': [
            { text: 'Download GTA: Chinatown Wars', url: 'https://www.mediafire.com/file/fndsipnccxfqxfq/Gt4_Ch1n4t8wn_W4rs.rar/file' }
        ],
        'mk4': [
            { text: 'Download Mortal Kombat 4', url: 'https://www.mediafire.com/file/2edptib063gsl21/M8rt4l_K8mb4t_4_%2528MK4%2529_%25E2%2580%2593_G8G.rar/file' }
        ],
        'mk-new-era': [
            { text: 'Download Mortal Kombat New Era (Mugen)', url: 'https://www.patreon.com/file?h=147400901&m=591451546' }
        ],
        'mk3': [
            { text: 'Download Mortal Kombat 3', url: 'https://www.mediafire.com/file/pszlnubxhc60mvs/M8rt4l_K8mb4t_3_%2528Mk3%2529_-_G8G.rar/file' }
        ],
        'mk2': [
            { text: 'Download Mortal Kombat 2', url: 'https://www.mediafire.com/file/235evedubhmlb3x/M8rt4l_K8mb4t_2_-_G8G.rar/file' }
        ],
        'mk-trilogy': [
            { text: 'Download Mortal Kombat Trilogy', url: 'https://www.mediafire.com/file/hza5zonejzar02l/M0rt7l_K0mb7t_Tr1l0gy.rar/file' }
        ],
        'mega-man-x4': [
            { text: 'Download Mega Man X4', url: 'https://www.mediafire.com/file/7322y9sk3xky79c/M3g4m4n_X4.rar/file' }
        ],
        'phoenix-wright-trilogy': [
            { text: 'Download Phoenix Wright: Ace Attorney Trilogy', url: 'https://www.mediafire.com/file/d47cql2r9u8zj1n/Ph8en1x.Wr1ght.4ce.4tt8rney.Tr1l8gy.MULT17-El4m1g8s.rar/file' }
        ],
        'contra-anniversary': [
            { text: 'Download Contra Anniversary Collection', url: 'https://www.mediafire.com/file/uwn4kwuhld9682w/C0ntr7_7nn1v3rs7ry_C0ll3ct10n.rar/file', readMoreText: 'Contiene los siguientes títulos:\n- Contra (Arcade)\n- Super Contra\n- Contra (NA)\n- Contra (JP)\n- Super C\n- Contra III: The Alien Wars\n- Operation C\n -Contra Hard Corps\n- Super Probotector Alien Rebels\n- Probotector' }
        ],
        'scribblenauts-nlimited': [
            { text: 'Download Scribblenauts Unlimited', url: 'https://www.mediafire.com/file/eighk65cs16qomc/Scr1bbl3n44uts_Unl1m1t3d.rar/file' }
        ],
        'madden-08': [
            { text: 'Download Madden NFL 08', url: 'https://www.mediafire.com/file/0iu51zium9hmqyp/M4dd3n_NFL_08.rar/file' }
        ],
        'wonder-boys-tdt': [
            { text: 'Download Wonder Boys: The Dragon\'s Trap', url: 'https://www.mediafire.com/file/dwqon30e04pawat/Wond3er_B8oy_-_The3_D4agons.rar/file' }
        ],
        'omerta-cog': [
            { text: 'Download Omerta: City of Gangsters', url: 'https://www.mediafire.com/file/lldwra5ix8q5sbd/8m3rt4_C1ty_8f_G4ngst3rs_1.07.rar/file' }
        ],
        'ballxpit': [
            { text: 'Download BALL x PIT', url: 'https://www.mediafire.com/file/9kgf8q4zr68hq3p/B4LL_x_P1T_b20625643.rar/file' }
        ],
        'super-mario-g2': [
            { text: 'Download Super Mario Galaxy 2', url: 'https://www.mediafire.com/file/46o75e5v8ngww8n/Sup3r_M4r18_G4l4xy_2_PC.rar/file' }
        ],
        'scribblenauts-unmasked': [
            { text: 'Download Scribblenauts Unmasked', url: 'https://www.mediafire.com/file/p5buctqhaksan2g/Scr1bbl3n44uts.Unm44sk3d.rar/file' }
        ],
        'mega-man-c2': [
            { text: 'Download Mega Man Legacy Collection 2', url: 'https://www.mediafire.com/file/43i29sptvtotnyk/M3g4_Ma4n_3egac1y_Coll3ction_2_Build_2844818.rar/file' }
        ],
        'blaster-master2': [
            { text: 'Download Blaster Master Zero 2', url: 'https://www.mediafire.com/file/gcmoj2t3me1yn3b/Bl4st3r.M4st3r.Z3ro.2.v6847890.rar/file' }
        ],
        'blaster-master3': [
            { text: 'Download Blaster Master Zero 3', url: 'https://www.mediafire.com/file/72irenip8m9r27y/Bl4st3r.M4st3r.Z3ro.3.rar/file' }
        ],
        'blaster-master': [
            { text: 'Download Blaster Master Zero', url: 'https://www.mediafire.com/file/nshbzlwtgo8i5x9/Bl4st3r.M4st3r.Z3r8.v6838219.rar/file' }
        ],
        '18-wheels-haulin': [
            { text: 'Download 18 Wheels of Steel Haulin', url: 'https://www.mediafire.com/file/fzo43div0tvoljl/18_Wh33ls_8f_St33l_H4ul1n.rar/file' }
        ],
        'stalker-trilogy': [
            { text: 'Download S.T.A.L.K.E.R. Trilogy', url: 'https://www.mediafire.com/file/0ao1497fg70o2ae/S.T.4.L.K.3.R._Tril8gy.rar/file', readMoreText: 'Contiene los siguientes títulos:\n- S.T.A.L.K.E.R.: Shadow of Chernobyl\n- S.T.A.L.K.E.R.: Clear Sky\n- S.T.A.L.K.E.R.: Call of Pripyat' }
        ],
        'scourge-outbreak': [
            { text: 'Download Scourge: Outbreak', url: 'https://www.mediafire.com/file/svtbusxxmag982o/Sc8urg3.8utbr34k.rar/file' }
        ],
        'castlevania-los': [
            { text: 'Download Castlevania: Lords of Shadow', url: 'https://www.mediafire.com/file/gfi1wdihryjfsqv/C7stl3v7n17_L0rds_0f_Sh7d0w.rar/file' }
        ],
        'heaven-dust2': [
            { text: 'Download Heaven Dust 2', url: 'https://www.mediafire.com/file/ubuuwi9010bhio6/H34v3n_Dust_2_bu1ld_12167776.rar/file' }
        ],
        'mercenary-kings': [
            { text: 'Download Mercenary Kings', url: 'https://www.mediafire.com/file/1sr3nxpb45o37yz/M3rc3n4ry.K1ngs-bu1ld.6029296.rar/file' }
        ],
        'dino-crisis-bundle': [
            { text: 'Download Dino Crisis Bundle', url: 'https://www.mediafire.com/file/pfv970zd8py39am/D1n8.Cr1s1s.v1.rar/file' }
        ],
        'dead-of-darkness': [
            { text: 'Download Dead of Darkness', url: 'https://www.mediafire.com/file/o3upbndp1d6exc1/D34d_8f_D4rkn3ss-T3N8K3.rar/file' }
        ],
        'battle-realms-ze': [
            { text: 'Download Battle Realms Zen Edition', url: 'https://www.mediafire.com/file/7vii7khh5lr56jm/B4ttl3.R34lms.Z3n.3d1t18n-Bu1ld.17150943.rar/file' }
        ],
        'blade-chimera': [
            { text: 'Download BLADE CHIMERA', url: 'https://www.mediafire.com/file/pnp3wqcbulsgnsx/Bl4d3_Ch1m3r4_v0.1.3.5.rar/file' }
        ],
        'intravenous2': [
            { text: 'Download Intravenous 2', url: 'https://www.mediafire.com/file/mk4lj7f29fn7e02/1ntr4v3n8us_2_v1.4.3.rar/file' }
        ],
        'delta-particles': [
            { text: 'Download Delta Particles', url: 'https://www.mediafire.com/file/jjih0bxuogzutz3/D3lt4_P4rt1cl3s_bu1ld_16812629.rar/file' }
        ],
        'spore': [
            { text: 'Download Spore', url: 'https://www.mediafire.com/file/1958va4cmidjsff/Sp8r3.rar/file' }
        ],
        'deus-ex-revision': [
            { text: 'Download Deus Ex: Revision', url: 'https://www.mediafire.com/file/fo2z36cud9sa21b/D3us.3x.R3v1s18n.rar/file' }
        ],
        'astra-ascent': [
            { text: 'Download Astral Ascent', url: 'https://www.mediafire.com/file/7p275fd6unyir94/4str4l.4sc3nt.th3.8ut3r.r34ch3s.rar/file' }
        ],
        'il2-sturmovik': [
            { text: 'Download IL-2 Sturmovik Ultimate Edition', url: 'https://www.mediafire.com/file/8gvfg0j4bta032f/1L-2.Sturm8v1k.1946.rar/file', readMoreText: 'Incluye lo siguiente:\n- IL-2 Sturmovik: Forgotten Battles\n- IL-2 Sturmovik: Forgotten Battles - Ace Expansion Pack\n- IL-2 Sturmovik 1946\n- Pacific Fighters' }
        ],
        'rollercoaster-tycoon-adventures': [
            { text: 'Download Rollercoaster Tycoon Adventures', url: 'https://www.mediafire.com/file/a08ublx6nwpepmk/R8ll3rc84st3r.Tyc88n.4dv3ntur3s-H88DLUM.rar/file' }
        ],
        'rollercoaster-tycoon3': [
            { text: 'Download RollerCoaster Tycoon 3', url: 'https://www.mediafire.com/file/35wiob9yjfk02qg/R8ll3r.C84st3r.Tyc88n.3_v3.2.5.13.rar/file', readMoreText: 'Contiene los siguientes títulos:\n- RollerCoaster Tycoon 3\n- RollerCoaster Tycoon 3: Soaked!\n- RollerCoaster Tycoon 3: Wild!' }
        ],
        'kof-2003': [
            { text: 'Download The King of Fighters 2003', url: 'https://www.mediafire.com/file/8shxngp6lbvc8dn/Th3_K1ng_8f_F1ght3rs_2003_-_G8G.rar/file' }
        ],
        'anima-gom': [
            { text: 'Download Anima: Gate of Memories', url: 'https://www.mediafire.com/file/q8lq7lrhen72jeu/4n1m4.g4t3.8f.m3m8r13s-%252816593%2529.rar/file' }
        ],
        'a-space-ft-unbound': [
            { text: 'Download A Space for the Unbound', url: 'https://www.mediafire.com/file/k2lifrrbf9l91xc/4_Sp4c3_f8r_th3_Unb8und_v1.0.35.0-T3N8K3.rar/file' }
        ],
        'snk-vs-capcom-svcc': [
            { text: 'Download SNK vs. Capcom SVC Chaos', url: 'https://www.mediafire.com/file/qyfkt3ipau47uv4/SNK_VS._C4PC8M_SVC_CH48S_%255BBu1ld_15003653%255D.rar/file' }
        ],
        'gestalt-stemacinder': [
            { text: 'Download Gestalt: Steam & Cinder', url: 'https://www.mediafire.com/file/b579ggq3gi5g3w0/G3st4lt_St34m_%2526_C1nd3r_v1.0.0.0.rar/file' }
        ],
        'blitzkrieg3': [
            { text: 'Download Blitzkrieg 3', url: 'https://www.mediafire.com/file/v6veg261gsu0f7o/B.3.D3.V21.02.2023.B10601228.rar/file' }
        ],
        'metal-slug-a-reloaded': [
            { text: 'Download Metal Slug Attack Reloaded', url: 'https://www.mediafire.com/file/v9maf2bayan2j5i/M3T4L_SLUG_4TT4CK_R3L84D3D_R31k4_f8r_L1b3rty_Bu1ld_16214511.rar/file' }
        ],
        'bia-collection': [
            { text: 'Download Brothers in Arms Collection', url: 'https://www.mediafire.com/file/47phrs0tdzc9gbc/Br8th3rs_1n_4rms_C8ll3ct18n.rar/file', readMoreText: 'Contiene los siguientes títulos:\n- Road to Hill 30\n- Earned in Blood\n- Hell’s Highway' }
        ],
        'wallachia-reign-dracula': [
            { text: 'Download Wallachia: Reign of Dracula', url: 'https://www.mediafire.com/file/hyqm1mvqwfd9fuz/W4ll4ch14.R31gn.8f.Dr4cul4-DRMFR33.rar/file' }
        ],
        'the-suffering-c': [
            { text: 'Download The Suffering Collection', url: 'https://www.mediafire.com/file/hxloiyupvlp19bg/Th3_Suff3r1ng_C8ll3ct18n.rar/file', readMoreText: 'Contiene los siguientes títulos:\n- The Suffering\n- The Suffering: Ties That Bind' }
        ],
        'xcom-enemy-unkown': [
            { text: 'Download XCOM: Enemy Unknown', url: 'https://www.mediafire.com/file/cot9khfaioa9l58/XC8M_3n3my_Unkn8wn_%252B_W1th1n.rar/file' }
        ],
        'adams-venture-c': [
            { text: 'Download Adam’s Venture Chronicles', url: 'https://www.mediafire.com/file/ey8g31me42sj4yr/4d4ms.V3ntur3.Chr8n1cl3s.MULT15-PR8PH3T.rar/file' }
        ],
        'top-racer-collection': [
            { text: 'Download Top Racer Collection', url: 'https://www.mediafire.com/file/v4y4dojf5rd5ew4/t8p.r4c3r.c8ll3ct18n.rar/file', readMoreText: 'Contiene los siguientes títulos:\n-  Top Racer\n-  Top Racer 2\n-  Top Racer 3000\n-  Top Racer Crossroads' }
        ],
        'lego-hobbit': [
            { text: 'Download LEGO The Hobbit', url: 'https://www.mediafire.com/file/hu1t89kc73urlhx/L3G8_Th3_H8bb1t_1.0.0.49534.rar/file' }
        ],
        'shadow-of-mordor': [
            {
                text: 'Download La Tierra Media: Sombras de Mordor',
                parts: [
                    { text: 'Part 1', url: 'https://www.mediafire.com/file/3p2jjz02i2g0qnf/Middl4_4arth_Shad8w_8f_M8rd8r.part1.rar/file' },
                    { text: 'Part 2', url: 'https://www.mediafire.com/file/ufa9ozsbbxbf647/Middl4_4arth_Shad8w_8f_M8rd8r.part2.rar/file' },
                    { text: 'Part 3', url: 'https://www.mediafire.com/file/236nbjbyqyijv2x/Middl4_4arth_Shad8w_8f_M8rd8r.part3.rar/file' },
                    { text: 'Part 4', url: 'https://www.mediafire.com/file/5oaamkhx135cqt5/Middl4_4arth_Shad8w_8f_M8rd8r.part4.rar/file' },
                    { text: 'Part 5', url: 'https://www.mediafire.com/file/iwc3oh7xck6ulmb/Middl4_4arth_Shad8w_8f_M8rd8r.part5.rar/file' },
                    { text: 'Part 6', url: 'https://www.mediafire.com/file/texn0g6427vcmza/Middl4_4arth_Shad8w_8f_M8rd8r.part6.rar/file' }
                ]
            },
            { text: 'Download Patch', url: 'https://d2.consoletarget.com/?y=798093de&x=Y9IUMSpqEb8axjvBtdSbBbZ7PJ49es%2B0FpGvEVgGb6g97AmcrY%2FMO9H%2F3AhguMj4P0xCn%2B6tJeJGLI7GLWreiWm2AUUufANiGX15AFWVaqe4WsWmOMg8iiEnDaThhLXw', readMoreText: 'El juego estará en inglés luego de aplicar el crack que tiene incluído. Para solucionar esto: descarga el Patch, aplícalo reemplazando los archivos originales, y asegúrate de que el parámetro "Language" del archivo "steam_api.ini" esté en "spanish", de manera que se vea así:\n"Language=spanish" sin las comillas.\n\nMuy probablemente el Patch sea marcado como virus o amenaza por tu navegador o tu antivirus. Asegúrate de permitir el archivo en tu sistema. No es dañino.' }
        ],
        'helicopter-simulator-sar': [
            { text: 'Download Helicopter Simulator 2014: Search & Rescue', url: 'https://www.mediafire.com/file/oq34au9hpcw6vgi/H3l1c8pt3r_S1mul4t8r_S34rch_%2526_R3scu3.rar/file' }
        ],
        'mother-russia': [
            { text: 'Download Mother Russia Bleeds', url: 'https://www.mediafire.com/file/zxoapwauwuow1sz/M8th3r_Russ14_Bl33ds_1.0.4.rar/file' }
        ],
        'zero-sievert': [
            { text: 'Download ZERO Sievert', url: 'https://www.mediafire.com/file/g4mcy4o1jc3sezq/Z3R8.S13v3rt.Bu1ld.16949520.rar/file' }
        ],
        'valfaris-mecha-therion': [
            { text: 'Download Valfaris: Mecha Therion', url: 'https://www.mediafire.com/file/7b9il0kwdjjmcsc/v4lf4r1s.m3ch4.th3r18n.v1.0.5.rar/file' }
        ],
        'shadow-complex': [
            { text: 'Download Shadow Complex', url: 'https://www.mediafire.com/file/zpcapj8ut2h263v/Sh4d8w_C8mpl3x_R3m4st3r3d.rar/file' }
        ],
        'insanely-tsp': [
            { text: 'Download Insanely Twisted Shadow Planet', url: 'https://www.mediafire.com/file/zcgwo0vp0w2x5sv/1ns4n3ly_Tw1st3d_Sh4d8w_Pl4n3t__Bu1ld_433415.rar/file' }
        ],
        'knights-and-guns': [
            { text: 'Download Knights & Guns', url: 'https://www.mediafire.com/file/3c9qongpvai3vjr/Kn1ghts4ndguns.rar/file' }
        ],
        'fear-and-hunger': [
            { text: 'Download Fear & Hunger', url: 'https://www.mediafire.com/file/uxw86kfpg6hqj0i/F34r_4nd_Hung3r.rar/file' }
        ],
        'fear-and-hunger2': [
            { text: 'Download Fear & Hunger 2: Termina', url: 'https://www.mediafire.com/file/shwymcvyby81v4v/F34r_4nd_Hung3r_2_T3rm1n4.rar/file' }
        ],
        'real-heroes-firefighter': [
            { text: 'Download Real Heroes: Firefighter', url: 'https://www.mediafire.com/file/b4fwee4os5jdhhk/R34l.h3r83s.fir3fight3r-%252845846%2529.rar/file' }
        ],
        'imperivm2': [
            { text: 'Download Imperivm II: La conquista de Hispania', url: 'https://www.mediafire.com/file/ahkbz1dxqqs5t00/Imp3rivm_II_L4_c8nquist4_d3_Hisp4ni4.rar/file' }
        ],
        'crypt-ot-necrodancer': [
            { text: 'Download Crypt of the NecroDancer', url: 'https://www.mediafire.com/file/pwbmpgjhxqt1b5z/Crypt_8f_th3_N3cr8D4nc3r_v4.1.0.rar/file' }
        ],
        'no-planb': [
            { text: 'Download No Plan B', url: 'https://www.mediafire.com/file/9ad3cg31jzwqmvg/N8.Pl4n.B.Bu1ld.13924503.rar/file' }
        ],
        'aeternoblade': [
            { text: 'Download AeternoBlade', url: 'https://www.mediafire.com/file/587mjb6g149ippf/43t3rn8Bl4d3_Bu1ld_5576930.rar/file' }
        ],
        'from-glory-goo': [
            { text: 'Download From Glory To Goo', url: 'https://www.mediafire.com/file/3why9qoe4ghmjb3/Fr8m_Gl8ry_T8_G88_v0_1b.rar/file' }
        ],
        'zed-zone': [
            { text: 'Download Zed Zone', url: 'https://www.mediafire.com/file/5tg5xxtvvlzx2us/Z3D.Z8N3.v0.62.6.0.8.rar/file' }
        ],
        'outcast': [
            { text: 'Download Outcast', url: 'https://www.mediafire.com/file/w13q0awhfcmz3ma/g4m3-8utc4st-%252819502%2529.rar/file' }
        ],
        'wrath-aeon-ruin': [
            { text: 'Download WRATH: Aeon of Ruin', url: 'https://www.mediafire.com/file/ughykthkpycpqy2/sr-wr4th438n8fruin.rar/file' }
        ],
        'zombie-night-terror': [
            { text: 'Download Zombie Night Terror', url: 'https://www.mediafire.com/file/5x7vw1cdg56ghs8/Z8mbi3_Night_T3rr8r_v1.5.2.rar/file' }
        ],
        'shadowgrounds': [
            { text: 'Download Shadowgrounds', url: 'https://www.mediafire.com/file/0zgsjrviza0jh11/Sh4d8wgr8unds_-_G8G.rar/file' }
        ],
        'war-tortoise': [
            { text: 'Download War Tortoise', url: 'https://www.mediafire.com/file/kj8pli7f1kpayhx/sr-w4rt8rt81s3.rar/file', readMoreText: '- Una vez instalado el juego, abre el archivo "steam_api.ini", y en el parámetro "Language", cambia "english" por "spanish" para tener el juego en español.\n- Recuerda bajar los gráficos dentro del juego si vas a jugarlo en una PC de bajos recursos.' }
        ],
        'rain-world': [
            { text: 'Download Rain World', url: 'https://www.mediafire.com/file/w6www32d2hmw6rn/R41n_W8rld_v1.10.0.rar/file' }
        ],
        'greed-black-border': [
            { text: 'Download Greed: Black Border', url: 'https://www.mediafire.com/file/8w0l5yrk98terxn/GR33D_-_Bl4ck_B8rd3r.rar/file' }
        ],
        'cliff-empire': [
            { text: 'Download Cliff Empire', url: 'https://www.mediafire.com/file/knpi0o8pmrolhqf/Cl1ff.3mp1r3.v1.34.rar/file' }
        ],
        'axiom-verge': [
            { text: 'Download Axiom Verge', url: 'https://www.mediafire.com/file/r96xuszpilwpmij/4x18m_V3rg3_1.48.rar/file' }
        ],
        'bloodstained-cotm': [
            { text: 'Download Bloodstained: Curse of the Moon', url: 'https://www.mediafire.com/file/flqausd672axruq/B0CRs3-PGM.rar/file' }
        ],
        'nhl06': [
            { text: 'Download NHL 06', url: 'https://www.mediafire.com/file/itsojf1uquu37en/NHL_06.rar/file' }
        ],
        'mega-city-police': [
            { text: 'Download Mega City Police', url: 'https://www.mediafire.com/file/mm43q3tkskm8jb4/m3g4.c1ty.p8l1c3.rar/file' }
        ],
        'lords-of-exile': [
            { text: 'Download Lords of Exile', url: 'https://www.mediafire.com/file/opa6cu87yyr9hkp/L8rds.8f.3x1l3.rar/file' }
        ],
        'travellers-rest': [
            { text: 'Download Travellers Rest', url: 'https://www.mediafire.com/file/7jgpg3j3tmqeypr/Tr4v3ll3rs.R3st.v0.6.3.12.rar/file' }
        ],
        'royal-marines-commando': [
            { text: 'Download The Royal Marines Commando', url: 'https://www.mediafire.com/file/8covxu2cbr8mkkz/Th3_R8y4l_M4r1n3s_C8mm4nd8_MULT16.rar/file' }
        ],
        'darkest-of-days': [
            { text: 'Download Darkest of Days', url: 'https://www.mediafire.com/file/eh7oujjqmdcvd8n/D4rk3st_8f_D4ys.rar/file' }
        ],
        'rayman-redemption': [
            { text: 'Download Rayman Redemption', url: 'https://www.mediafire.com/file/52pxquthhf8nshc/R4ym4n_R3d3mpt8on.rar/file' }
        ],
        'wots4': [
            { text: 'Download Way of the Samurai 4', url: 'https://www.mediafire.com/file/ip4gbpfuvy5ewj6/W4y.of.th3.S4mur48.4.v1.06.2.rar/file' }
        ],
        'wots3': [
            { text: 'Download Way of the Samurai 3', url: 'https://www.mediafire.com/file/drg5gi2ovepi0zb/W4y_of_th3_S4mur48_3.rar/file' }
        ],
        'venetica': [
            { text: 'Download Venetica', url: 'https://www.mediafire.com/file/3v361m52j41iofc/v3n3t8c4gold3d8t8on.rar/file' }
        ],
        'urban-trial-freestyle': [
            { text: 'Download Urban Trial Freestyle', url: 'https://www.mediafire.com/file/cz5nwolax8tfqri/Urb4n.Tr84l.Fr33styl3.rar/file' }
        ],
        'true-crime-sla': [
            { text: 'Download True Crime: Streets of LA', url: 'https://www.mediafire.com/file/jqqnfozmqsq6ag8/Tru3_Cr8m3_Str33ts_of_L.4.rar/file' }
        ],
        'tron-evolution': [
            { text: 'Download Tron Evolution', url: 'https://www.mediafire.com/file/fjx3d8i9ybarjju/Trron.3volut8on.rar/file' }
        ],
        'trapped-dead': [
            { text: 'Download Trapped Dead', url: 'https://www.mediafire.com/file/hlbo8lxiqp9nbew/Tr4pp3d_D34d.rar/file' }
        ],
        'the-inquisitor-book2': [
            { text: 'Download The Inquisitor Book II: The Village', url: 'https://www.mediafire.com/file/shtxb4tyb0w123t/Th3_8nqu8s8tor_Book_88.rar/file' }
        ],
        'the-final-station': [
            { text: 'Download The Final Station', url: 'https://www.mediafire.com/file/3ryier0u1l96daw/th3_f8n4l_st4t8on-%252819763%2529.rar/file' }
        ],
        'swag-and-sorcery': [
            { text: 'Download Swag and Sorcery', url: 'https://www.mediafire.com/file/8zu5zzvmhk8bull/Sw4g_4nd_Sorc3ry_1.024.rar/file' }
        ],
        'stolen': [
            { text: 'Download Stolen', url: 'https://www.mediafire.com/file/45e3cpwyu6kd9iz/Stol3n_PC.rar/file' }
        ],
        'sonic-riders': [
            { text: 'Download Sonic Riders', url: 'https://www.mediafire.com/file/0irqgfozz020zuv/Son8c_R8d3rs.rar/file' }
        ],
        'sim-city5': [
            { text: 'Download SimCity 5 (2013)', url: 'https://www.mediafire.com/file/5ph4ey969fs7g12/S8mC8ty_D3lux3_3d8t8on-3l4m8gos.rar/file' }
        ],
        'sid-meiers-pirates': [
            { text: 'Download Sid Meier’s Pirates!', url: 'https://www.mediafire.com/file/4erfusx8a9wgffd/S8d_M383rs_P8r4t3s.rar/file' }
        ],
        'rapala-pro-fishing': [
            { text: 'Download Rapala Pro Fishing', url: 'https://www.mediafire.com/file/rbj2paspfvfga10/R4p4l4_Pro_F8sh8ng.rar/file' }
        ],
        'planetbase': [
            { text: 'Download Planetbase', url: 'https://www.mediafire.com/file/wctzs2wglm7yu0r/Pl4netb4se.rar/file' }
        ],
        'moto-racer2': [
            { text: 'Download Moto Racer 2', url: 'https://www.mediafire.com/file/w1dmobsnqgekto8/M8t8_R4cer_2_G8G.rar/file' }
        ],
        'kottic': [
            { text: 'Download Knights of The Temple: Infernal Crusade', url: 'https://www.mediafire.com/file/4qeii0fzdta0kz4/Kn1ghts_8f_The_Temple_1nfern4l_Crus4de.rar/file' }
        ],
        'loki': [
            { text: 'Download Loki', url: 'https://www.mediafire.com/file/ckx75t72ssw4bsu/L8k1_MULT16_-_El4m1g8s.rar/file' }
        ],
        'igi2': [
            { text: 'Download I.G.I.-2: Covert Strike', url: 'https://www.mediafire.com/file/klic9xn1yltlp8u/1G1_2_-_C8vert_Str1ke.rar/file' }
        ],
        'hitman-codename47': [
            { text: 'Download Hitman: Codename 47', url: 'https://www.mediafire.com/file/p8rm87im85y3n7n/H1tm4n_C8den4me_47_-_G8G.rar/file' }
        ],
        'hidden-deep': [
            { text: 'Download Hidden Deep', url: 'https://www.mediafire.com/file/e5p3rsmqfkh9ai9/H1dden.Deep.Bu1ld.10387199.rar/file' }
        ],
        'homam3': [
            { text: 'Download Heroes of Might and Magic III', url: 'https://www.mediafire.com/file/kzkmavzjyokns1d/Her8es_8f_M1ght_4nd_M4g1c_111_HD_Ed1t18n_1.18.rar/file' }
        ]






























































































































































































































































































































    };

    const gameLinksData = [
        { "id": "halo-ce", "title": "Halo: Combat Evolved", "image": "https://cdn2.steamgriddb.com/grid/477aaa93492109be31a9c22df598c952.png" },
        { "id": "ion-fury", "title": "Ion Fury", "image": "https://cdn2.steamgriddb.com/grid/662a1f97fb9268eb285db95cb33ccfb2.png" },
        { "id": "dead-space", "title": "Dead Space", "image": "https://cdn2.steamgriddb.com/grid/26203c6ab63ff66fef12bbc3b8dad1c0.png" },
        { "id": "gta-vc", "title": "GTA: Vice City", "image": "https://cdn2.steamgriddb.com/grid/4eb6720c6cd70ee9e67ca6e4dc12e3df.png" },
        { "id": "gta-iii", "title": "GTA III", "image": "https://cdn2.steamgriddb.com/grid/b20ec67004afcac446e4ee3294b9695c.png" },
        { "id": "cuphead", "title": "Cuphead", "image": "https://cdn2.steamgriddb.com/grid/25dcf1554f13c36b512dfe907acc77d3.png" },
        { "id": "blood-knights", "title": "Blood Knights", "image": "https://cdn2.steamgriddb.com/grid/ccda8377acc099dda2c2e47d73514a3c.png" },
        { "id": "unmetal", "title": "Unmetal", "image": "https://cdn2.steamgriddb.com/grid/ee8cfaf92e87fba932724eccf668dcf2.png" },
        { "id": "portal", "title": "Portal", "image": "https://cdn2.steamgriddb.com/grid/60d58eafbef6da2e2bd56b40cd8835ed.png" },
        { "id": "portal2", "title": "Portal 2", "image": "https://cdn2.steamgriddb.com/grid/9ebc0e97da8e0e5083fea7203f194d2b.png" },
        { "id": "killing-floor", "title": "Killing Floor", "image": "https://cdn2.steamgriddb.com/grid/640e8c7fe8143afdfe975c20bedac4c9.png" },
        { "id": "brotato", "title": "Brotato", "image": "https://cdn2.steamgriddb.com/grid/37a09fd3225f46c08a85e19a60195ae7.png" },
        { "id": "vampire-survivors", "title": "Vampire Survivors", "image": "https://cdn2.steamgriddb.com/grid/b6c580b0ed08cf19c925be5a68475cd4.jpg" },
        { "id": "hct", "title": "Horizon Chase Turbo", "image": "https://cdn2.steamgriddb.com/grid/5be6828ba1f517ca9e6e249c5db867c5.png" },
        { "id": "barony", "title": "Barony", "image": "https://cdn2.steamgriddb.com/grid/28e4850dad41e594d059941017b06f94.png" },
        { "id": "dmc", "title": "DmC: Devil May Cry", "image": "https://cdn2.steamgriddb.com/grid/3e05d57b5e5f4626afc47277ac4527b0.png" },
        { "id": "cod", "title": "Call of Duty", "image": "https://cdn2.steamgriddb.com/grid/14c476fdd9017a7f45b7471ed5575503.jpg" },
        { "id": "dead-space2", "title": "Dead Space 2", "image": "https://cdn2.steamgriddb.com/grid/f5d589ab486178e83c95283826899b5f.png" },
        { "id": "dead-space3", "title": "Dead Space 3", "image": "https://cdn2.steamgriddb.com/grid/2873dd9672cab83302943cf8a4a24aaf.png" },
        { "id": "rcrdx", "title": "Retro City Rampage DX", "image": "https://cdn2.steamgriddb.com/grid/db7f2bf023263eb0a0a8247c5007f49a.png" },
        { "id": "into-the-breach", "title": "Into the Breach", "image": "https://cdn2.steamgriddb.com/grid/57cc6cf1085483203f401a3517b3b520.png" },
        { "id": "enter-the-gungeon", "title": "Enter the Gungeon", "image": "https://cdn2.steamgriddb.com/grid/a2a561ffc61849e2ba1ad94624ad4e0b.png" },
        { "id": "postal2", "title": "Postal 2", "image": "https://cdn2.steamgriddb.com/grid/e568b8f6bbb04a676a4f9f7dd79dc79f.jpg" },
        { "id": "cod4", "title": "Call of Duty 4: Modern Warfare", "image": "https://cdn2.steamgriddb.com/grid/b3049ee4f30b41fa9f41d88a0068f65c.png" },
        { "id": "lis", "title": "Life is Strange", "image": "https://cdn2.steamgriddb.com/grid/759bb631d23a3535c2b55dfd91c4807b.jpg" },
        { "id": "slendyt", "title": "Slendytubbies", "image": "https://cdn2.steamgriddb.com/grid/f9a2fcb91d78da31bbcf01df581afab6.png" },
        { "id": "slendyt2", "title": "Slendytubbies 2", "image": "https://cdn2.steamgriddb.com/grid/8140d508b90f84b11aa0331bcaec9000.png" },
        { "id": "slendyt3", "title": "Slendytubbies 3", "image": "https://cdn2.steamgriddb.com/grid/fba2686c791a2c6d39a93643e3df1c5d.png" },
        { "id": "fnaf", "title": "Five Nights at Freddy's", "image": "https://cdn2.steamgriddb.com/grid/c7e30c4f80e9452d40245385c6572936.png" },
        { "id": "fnaf2", "title": "Five Nights at Freddy's 2", "image": "https://cdn2.steamgriddb.com/grid/c4ad72391c45de1c5ffd124705a5fc74.png" },
        { "id": "fnaf3", "title": "Five Nights at Freddy's 3", "image": "https://cdn2.steamgriddb.com/grid/ee60c22e4bfe1543ac99218d9376d56f.png" },
        { "id": "fnaf4", "title": "Five Nights at Freddy's 4", "image": "https://cdn2.steamgriddb.com/grid/12cc97842f39de60ed91cd3740d551b2.png" },
        { "id": "fnaf5", "title": "Five Nights at Freddy's: Sister Location", "image": "https://cdn2.steamgriddb.com/grid/58672b837ee984722513f40096f5bd05.png" },
        { "id": "aoe", "title": "Age of Empires", "image": "https://cdn2.steamgriddb.com/grid/b14eabd61191efabe8de2687a8688783.png" },
        { "id": "cs16", "title": "Counter Strike 1.6", "image": "https://cdn2.steamgriddb.com/grid/cc4ec90b270b9f1de8dc2d8864425252.png" },
        { "id": "blur", "title": "Blur", "image": "https://cdn2.steamgriddb.com/grid/af7bfda169753ac14f7181f598f57d4e.png" },
        { "id": "conan04", "title": "Conan (2004)", "image": "https://cdn2.steamgriddb.com/grid/9175aca9b14f23149915ba07baac2c50.png" },
        { "id": "assassinscreed", "title": "Assassin's Creed", "image": "https://cdn2.steamgriddb.com/grid/3d23d15e2e861d31a4f265dc815a6047.png" },
        { "id": "cds", "title": "Conflict Desert Storm", "image": "https://cdn2.steamgriddb.com/grid/a99546f93372387485650d3aff7fc09a.png" },
        { "id": "cold-fear", "title": "Cold Fear", "image": "https://cdn2.steamgriddb.com/grid/53092d4becc58b3039fcfe86fdfb8923.jpg" },
        { "id": "combat-chess", "title": "Combat Chess", "image": "https://i.imgur.com/45lXWyp.png" },
        { "id": "combat-tf121", "title": "Combat: Task Force 121", "image": "https://i.imgur.com/IOmG9aQ.png" },
        { "id": "commandos-sf", "title": "Commandos: Strike Force", "image": "https://cdn2.steamgriddb.com/grid/a9ca4ff9b3fbbfd6b427ef5503cfeda4.png" },
        { "id": "stick-fight", "title": "Stick Fight: The Game", "image": "https://cdn2.steamgriddb.com/grid/e570e7bc1c2caf5d2431fabd203c0c36.png" },
        { "id": "lost-planet", "title": "Lost Planet", "image": "https://cdn2.steamgriddb.com/grid/3ffcb4b542b865433faaee496c519962.jpg" },
        { "id": "battleblock-theater", "title": "BattleBlock Theater", "image": "https://cdn2.steamgriddb.com/grid/0e66221beb8e0a06d4648ae151a52201.png" },
        { "id": "raft", "title": "Raft", "image": "https://cdn2.steamgriddb.com/grid/d400d21fe06a0bdaf825d2874f58dd63.png" },
        { "id": "garrys-mod", "title": "Garry's Mod", "image": "https://cdn2.steamgriddb.com/grid/a2a9894ca446f0fe0aac693516c52c4d.png" },
        { "id": "gta-sa", "title": "GTA: San Andreas", "image": "https://cdn2.steamgriddb.com/grid/c4e954b93dc03b0f846db4051a1e6d25.png" },
        { "id": "dusk", "title": "DUSK", "image": "https://cdn2.steamgriddb.com/grid/a297b230c0f9d1354283c802648f6c58.png" },
        { "id": "hrot", "title": "HROT", "image": "https://cdn2.steamgriddb.com/grid/0e81dae558c9d4cc8e4902fb1a6ed5d0.png" },
        { "id": "devil-daggers", "title": "Devil Daggers", "image": "https://cdn2.steamgriddb.com/grid/58dbbf81945ffec0b749f635dc03ca21.png" },
        { "id": "hedon-b", "title": "Hedon: Bloodrite", "image": "https://cdn2.steamgriddb.com/grid/83a876ca711860c7edd15e07bb287813.png" },
        { "id": "maximum-action", "title": "Maximum Action", "image": "https://cdn2.steamgriddb.com/grid/deca0dfedbe9079c56f00f469685198e.png" },
        { "id": "ziggurat", "title": "Ziggurat", "image": "https://cdn2.steamgriddb.com/grid/1f707a54cdca4a59599be287e5a60b49.png" },
        { "id": "powerwash-sim", "title": "PowerWash Simulator", "image": "https://cdn2.steamgriddb.com/grid/091ea661cbe960da9c8c1d30abf30fd2.png" },
        { "id": "mafia-ii", "title": "Mafia II", "image": "https://cdn2.steamgriddb.com/grid/187421133e23d65ecaec6e3d0ad616aa.png" },
        { "id": "hitman-bm", "title": "Hitman: Blood Money", "image": "https://cdn2.steamgriddb.com/grid/947681124aee4951c310b0dab1e91fea.png" },
        { "id": "hitman-contracts", "title": "Hitman: Contracts", "image": "https://cdn2.steamgriddb.com/grid/9ede30813e3c7500c9f11ba389cf5ae8.jpg" },
        { "id": "batman-as", "title": "Batman: Arkham Asylum", "image": "https://cdn2.steamgriddb.com/grid/69fd92bd85b2c2d1267e63ff1df624ae.jpg" },
        { "id": "turok-08", "title": "Turok (2008)", "image": "https://cdn2.steamgriddb.com/grid/8604b2a32fcb657a7a53917c2a5de324.png" },
        { "id": "crysis", "title": "Crysis", "image": "https://cdn2.steamgriddb.com/grid/e652d45ea3178f6c3b465daa32a9e71f.png" },
        { "id": "hollow-knight-s", "title": "Hollow Knight: Silksong", "image": "https://cdn2.steamgriddb.com/grid/352b19056ce934568b956d68cbcde3b5.png" },
        { "id": "hollow-knight", "title": "Hollow Knight", "image": "https://cdn2.steamgriddb.com/grid/d18c832e8c956b4ef8b92862e6bf470d.png" },
        { "id": "human-fall-flat", "title": "Human Fall Flat", "image": "https://cdn2.steamgriddb.com/grid/e210bdde657ce41b3bf96bc3a800a381.png" },
        { "id": "super-bunny-man", "title": "Super Bunny Man", "image": "https://cdn2.steamgriddb.com/grid/eae7aadd02dfcc93a198d256ec0833ed.jpg" },
        { "id": "alan-wake", "title": "Alan Wake", "image": "https://cdn2.steamgriddb.com/grid/ef95b846b1e8469e32e7831643ca00ef.png" },
        { "id": "payday-th", "title": "PAYDAY: The Heist", "image": "https://cdn2.steamgriddb.com/grid/750fc88ab0ae1a503a50472f3ecca0dc.png" },
        { "id": "bioshock", "title": "Bioshock", "image": "https://cdn2.steamgriddb.com/grid/9f3c7d34f039deea6e0b444c8c8a3bbc.png" },
        { "id": "shaun-white-skate", "title": "Shaun White Skateboarding", "image": "https://cdn2.steamgriddb.com/grid/1913b16fb72b4fb3300f4315acb1baa5.png" },
        { "id": "minecraft-bedrock", "title": "Minecraft Bedrock Edition", "image": "https://cdn2.steamgriddb.com/grid/5231fed2a3e7fca51e253b2b1c5f5705.png" },
        { "id": "rayman-rr", "title": "Rayman Raving Rabbids", "image": "https://cdn2.steamgriddb.com/grid/3e358c308368853e1ee163edf300472a.png" },
        { "id": "capcom-fc", "title": "Capcom Fighting Collection", "image": "https://cdn2.steamgriddb.com/grid/05d6df4853c84bbf38426f4b7a3350bd.png" },
        { "id": "scott-pilgrim-vstw", "title": "Scott Pilgrim vs. The World: The Game", "image": "https://cdn2.steamgriddb.com/grid/9ceda2e0d6fe0e52c4239c18032310d1.png" },
        { "id": "terminator2d", "title": "Terminator 2D: NO FATE", "image": "https://cdn2.steamgriddb.com/grid/ca1bd3e081bf1c80f71353ec393b2ff8.png" },
        { "id": "lord-of-rings-tq", "title": "El Señor de los Anillos: La Conquista", "image": "https://cdn2.steamgriddb.com/grid/f1c204756f75e95bd82b957bb9a2727e.png" },
        { "id": "dave-the-diver", "title": "Dave the Diver", "image": "https://cdn2.steamgriddb.com/grid/1d50a96e0e3d7b721de8aafbb246067d.png" },
        { "id": "star-wars-bh", "title": "Star Wars: Bounty Hunter", "image": "https://cdn2.steamgriddb.com/grid/ca9fb1d01fb6c899ef4095abc2d3ea13.png" },
        { "id": "freshly-frosted", "title": "Freshly Frosted", "image": "https://cdn2.steamgriddb.com/grid/949b3fc8eeaa2fc67ee6871ab78b86b0.png" },
        { "id": "dread-templar", "title": "Dread Templar", "image": "https://cdn2.steamgriddb.com/grid/a0ac2add5a34917d3bdd35058314000d.png" },
        { "id": "ultrakill", "title": "Ultrakill", "image": "https://cdn2.steamgriddb.com/grid/ce7ad904f4d18c8bd49abb3d55fb419f.png" },
        { "id": "mk1992", "title": "Mortal Kombat (1992)", "image": "https://cdn2.steamgriddb.com/grid/efaccf7dc6bc608f77c2aa43b06f46b6.png" },
        { "id": "mafia", "title": "Mafia", "image": "https://cdn2.steamgriddb.com/grid/20e72e85653ed994011d4c67a6fa7658.png" },
        { "id": "mk-deception", "title": "Mortal Kombat: Deception", "image": "https://cdn2.steamgriddb.com/grid/163b9c203b134b935159deb076f0aa92.png" },
        { "id": "mk-unchained", "title": "Mortal Kombat: Unchained", "image": "https://cdn2.steamgriddb.com/grid/867295ad46d479ba4b864f7e0ba2d46a.png" },
        { "id": "pokemon-colleccion", "title": "Pokemón Colección", "image": "https://i.imgur.com/SpEzAKx.png" },
        { "id": "mario-kart64", "title": "Mario Kart 64", "image": "https://cdn2.steamgriddb.com/grid/bc11db020cb9418782afa3d1e0a1209b.png" },
        { "id": "pacman-af", "title": "Pac-Man y las Aventuras Fantasmales", "image": "https://cdn2.steamgriddb.com/grid/8c64694ceb8b7694b11e8aaa082675e2.png" },
        { "id": "real-bout-tn", "title": "Real Bout Fatal Fury 2: The Newcomers", "image": "https://cdn2.steamgriddb.com/grid/890450ecb1c717f6a26028cefa7bddab.png" },
        { "id": "beyond-tip2", "title": "Beyond the Ice Palace 2", "image": "https://i.imgur.com/9ELDM4r.png" },
        { "id": "cs-source", "title": "Counter-Strike: Source", "image": "https://cdn2.steamgriddb.com/grid/0ba7e0f75158b6f7ead88fe8d7b1a25a.png" },
        { "id": "flatout-uc", "title": "FlatOut: Ultimate Carnage", "image": "https://cdn2.steamgriddb.com/grid/c977cc56493aead3ae02a7b9ea7a5ce5.png" },
        { "id": "bridge-portal", "title": "Bridge Constructor Portal", "image": "https://cdn2.steamgriddb.com/grid/f4f1383b477137cb744c1f693104a34d.png" },
        { "id": "balatro", "title": "Balatro", "image": "https://cdn2.steamgriddb.com/grid/704f72562168940fbfa7e9f01e0f84aa.jpg" },
        { "id": "rayman-origins", "title": "Rayman Origins", "image": "https://cdn2.steamgriddb.com/grid/cb1a716a70ad58a2f02792dcc8db2039.png" },
        { "id": "toy-story2", "title": "Toy Story 2: Buzz Lightyear al Rescate!", "image": "https://cdn2.steamgriddb.com/grid/b6faaff41560efbdefb1687a06a4c57b.png" },
        { "id": "the-sims-medieval", "title": "The Sims Medieval", "image": "https://cdn2.steamgriddb.com/grid/07935ea47181e0a1c618afed85ab49a8.png" },
        { "id": "silent-hill", "title": "Silent Hill", "image": "https://cdn2.steamgriddb.com/grid/1dcc077aab5503c56609968fc56e3f1b.png" },
        { "id": "kung-fu-panda", "title": "Kung Fu Panda", "image": "https://cdn2.steamgriddb.com/grid/580b5f2bca66d366242f14db9841046a.png" },
        { "id": "half-life-anthology", "title": "Half-Life Anthology", "image": "https://i.imgur.com/BIBtlga.png" },
        { "id": "cs-cz", "title": "Counter-Strike: Condition Zero", "image": "https://cdn2.steamgriddb.com/grid/4b98bd8c67e1df2302abdc630681569c.png" },
        { "id": "turok", "title": "Turok (1997)", "image": "https://cdn2.steamgriddb.com/grid/cab2c21a5ddf9cadd84abda4a0dfc034.png" },
        { "id": "turok2", "title": "Turok 2: Seeds of Evil", "image": "https://cdn2.steamgriddb.com/grid/1f51177fce3b2f33661803f9062eda1c.png" },
        { "id": "turok3", "title": "Turok 3: Shadow of Oblivion", "image": "https://cdn2.steamgriddb.com/grid/0309dcbea0ba783d3eda438ab16ab5e9.jpg" },
        { "id": "pvz-replanted", "title": "Plants vs. Zombies: Replanted", "image": "https://cdn2.steamgriddb.com/grid/73155bd3d595f1f47ea6e08ad6dcf313.png" },
        { "id": "just-cause", "title": "Just Cause", "image": "https://cdn2.steamgriddb.com/grid/9707fe6c04d0d1a0e611ad54ec908ceb.png" },
        { "id": "tloz-oft", "title": "The Legend of Zelda: Ocarina of Time", "image": "https://cdn2.steamgriddb.com/grid/ed89e6477ff6a465891a5f17f77948ae.png" },
        { "id": "motogp", "title": "MotoGP", "image": "https://cdn2.steamgriddb.com/grid/3891ef1785aff609271c6714e628372f.jpg" },
        { "id": "motogp2", "title": "MotoGP 2", "image": "https://cdn2.steamgriddb.com/grid/8c83e9c3e947ca22d83c16e31d11e06e.jpg" },
        { "id": "motogp3", "title": "MotoGP 3", "image": "https://cdn2.steamgriddb.com/grid/dea35a4936592a360c121f339a446a70.png" },
        { "id": "motogp07", "title": "MotoGP 07", "image": "https://cdn2.steamgriddb.com/grid/9424d25f102a72f5a7046ce7336ea9f8.jpg" },
        { "id": "soldier-of-fortune", "title": "Soldier of Fortune", "image": "https://i.imgur.com/D0fPEIk.png" },
        { "id": "mgs", "title": "Metal Gear Solid", "image": "https://cdn2.steamgriddb.com/grid/3ac4511ba0302570efea191ea1a2d0b4.jpg" },
        { "id": "battlefield1942", "title": "Battlefield 1942", "image": "https://cdn2.steamgriddb.com/grid/abb8eeeb99cdedd4021b338d796bc6ef.png" },
        { "id": "nfs-underground", "title": "Need for Speed: Underground", "image": "https://cdn2.steamgriddb.com/grid/0959494b92b81147796ce901ea4f9927.png" },
        { "id": "nfs-underground2", "title": "Need for Speed: Underground 2", "image": "https://cdn2.steamgriddb.com/grid/8e4374a54f3a61fa403d8d70c99bca08.png" },
        { "id": "nfs-most-wanted", "title": "Need for Speed: Most Wanted", "image": "https://cdn2.steamgriddb.com/grid/a86cc0b404ab003e0badb9ed96b55ace.png" },
        { "id": "nfs-most-wanted-be", "title": "Need for Speed: Most Wanted Black Edition", "image": "https://cdn2.steamgriddb.com/grid/b7d110ec87a207bf18ae6f3569dff3a2.jpg" },
        { "id": "nfs-carbon", "title": "Need for Speed: Carbon", "image": "https://cdn2.steamgriddb.com/grid/ca38ab71111cdaaf785c2042f9144106.png" },
        { "id": "nfs-high-stakes", "title": "Need for Speed High Stakes", "image": "https://cdn2.steamgriddb.com/grid/64fbbe8cba26f3d665e8af33ae3ead71.png" },
        { "id": "nfs-hot-pursuit2", "title": "Need for Speed: Hot Pursuit 2", "image": "https://cdn2.steamgriddb.com/grid/37f01ff25265859cf6a42ee30fbf321f.png" },
        { "id": "chrome-specforce", "title": "Chrome: Specforce", "image": "https://cdn2.steamgriddb.com/grid/76922c89884d1b9a048be7fb505f2eb5.png" },
        { "id": "terrordrome", "title": "Terrordrome", "image": "https://i.imgur.com/oUQTnCQ.png" },
        { "id": "chrome", "title": "Chrome", "image": "https://cdn2.steamgriddb.com/grid/68482ad368c7b9779cf50a7164815379.png" },
        { "id": "rome-total-war", "title": "Rome Total War", "image": "https://cdn2.steamgriddb.com/grid/5f6e016045d06bab7f37a045c0ea0603.png" },
        { "id": "bb-miamitakedown", "title": "Bad Boys: Miami Takedown", "image": "https://cdn2.steamgriddb.com/grid/82a14c06c73d4d9f57c8f720abaee4a0.jpg" },
        { "id": "pop-ww", "title": "Prince of Persia: Warrior Within", "image": "https://cdn2.steamgriddb.com/grid/531a377c94fa56202dbb7fd47ae217f5.png" },
        { "id": "battlefled2", "title": "Battlefield 2", "image": "https://cdn2.steamgriddb.com/grid/3345581248da49c7be54266867fd1be5.png" },
        { "id": "flatout", "title": "FlatOut", "image": "https://cdn2.steamgriddb.com/grid/017cdb1b373ff5c6060b6e51b9ccc4e0.png" },
        { "id": "flatout2", "title": "FlatOut 2", "image": "https://cdn2.steamgriddb.com/grid/23b6ccd661757295a41abd6a7ee3ac2d.jpg" },
        { "id": "flatout3", "title": "FlatOut 3: Chaos & Destruction", "image": "https://cdn2.steamgriddb.com/grid/0c541d7108149c1be78194c1115eb42a.png" },
        { "id": "street-racing-syndicate", "title": "Street Racing Syndicate", "image": "https://cdn2.steamgriddb.com/grid/32bbed5428609aaed89909d8a3206ffb.png" },
        { "id": "syberia", "title": "Syberia", "image": "https://cdn2.steamgriddb.com/grid/42a4bc0ab5c0df63a8e370f0130059c6.png" },
        { "id": "syberia2", "title": "Syberia 2", "image": "https://cdn2.steamgriddb.com/grid/1f0b2b76c879c52e827a4553f7d9d3cc.png" },
        { "id": "worms-3d", "title": "Worms 3D", "image": "https://cdn2.steamgriddb.com/grid/2c3704b997882270404d5380266826ec.png" },
        { "id": "worms-revolution", "title": "Worms Revolution", "image": "https://cdn2.steamgriddb.com/grid/f0508452fedcf6e35a39ff5dc1b3e218.jpg" },
        { "id": "worms2-armageddon", "title": "Worms 2: Armageddon", "image": "https://cdn2.steamgriddb.com/grid/dcd9d88bc4e54d6aaaec310696f34b16.png" },
        { "id": "worms-clan-wars", "title": "Worms Clan Wars", "image": "https://cdn2.steamgriddb.com/grid/98395fdd0314b312d24c9594e0c4ad72.png" },
        { "id": "worms-reloaded", "title": "Worms: Reloaded", "image": "https://cdn2.steamgriddb.com/grid/6fac37edfab3326bf484cb75c84948d3.png" },
        { "id": "worms-ultimate-mayhem", "title": "Worms Ultimate Mayhem", "image": "https://cdn2.steamgriddb.com/grid/0098df6528e402d2ee740ec568c27967.jpg" },
        { "id": "worms-wmd", "title": "Worms W.M.D", "image": "https://cdn2.steamgriddb.com/grid/87a6e8b2df778baa85aa4213b14196e2.png" },
        { "id": "diablo", "title": "Diablo", "image": "https://cdn2.steamgriddb.com/grid/a6d4d51e6f8bdf01d71bd895f07f9f1f.png" },
        { "id": "diablo2", "title": "Diablo II", "image": "https://cdn2.steamgriddb.com/grid/f1e513f02d2dbe70b939178cb7d4fbac.png" },
        { "id": "battlefield-vietnam", "title": "Battlefield Vietnam", "image": "https://cdn2.steamgriddb.com/grid/61f4e02257cfe0b56aea439bb54fec77.png" },
        { "id": "cmr04", "title": "Colin McRae Rally 04", "image": "https://cdn2.steamgriddb.com/grid/2a511f83cf2dd20b017ae99136aa4729.jpg" },
        { "id": "pes2012", "title": "Pro Evolution Soccer 2012", "image": "https://cdn2.steamgriddb.com/grid/178c94eb65530e8853445b53d865002e.png" },
        { "id": "pes2009", "title": "Pro Evolution Soccer 2009", "image": "https://cdn2.steamgriddb.com/grid/1eb1f92f4a70dc2a0a55a1de2ad51c5f.png" },
        { "id": "pes2008", "title": "Pro Evolution Soccer 2008", "image": "https://cdn2.steamgriddb.com/grid/bbd11731823ac112494795351402d406.png" },
        { "id": "pes2007", "title": "Pro Evolution Soccer 2007", "image": "https://cdn2.steamgriddb.com/grid/ef6f58d63e303f3472a1c5585ce1375c.png" },
        { "id": "pes5", "title": "Pro Evolution Soccer 5", "image": "https://i.imgur.com/kWPD7Rs.png" },
        { "id": "pes2010", "title": "Pro Evolution Soccer 2010", "image": "https://cdn2.steamgriddb.com/grid/9fd3c6b2cc0ed9853021d239bff94cfc.png" },
        { "id": "pes2013", "title": "Pro Evolution Soccer 2013", "image": "https://cdn2.steamgriddb.com/grid/084b41858fcafcc5f3ac4c3794fe2c8d.jpg" },
        { "id": "nba2004", "title": "NBA Live 2004", "image": "https://cdn2.steamgriddb.com/grid/396a5cfc158cc3ca34c9af8486790558.png" },
        { "id": "nba08", "title": "NBA Live 08", "image": "https://cdn2.steamgriddb.com/grid/6013f79524370db52bd6342b7a7d8083.png" },
        { "id": "nba2k10", "title": "NBA 2K10", "image": "https://cdn2.steamgriddb.com/grid/e5d77bc11323b8b14d4b9ca5e9cba621.png" },
        { "id": "miami-vice", "title": "Miami Vice", "image": "https://cdn2.steamgriddb.com/grid/db0f0b629efbd732ef86a2c94825fb28.png" },
        { "id": "wwe-raw", "title": "WWE RAW", "image": "https://i.imgur.com/wnqZg5v.png" },
        { "id": "spiderman2000", "title": "Spider-Man", "image": "https://cdn2.steamgriddb.com/grid/a5a05cfb6a67ef504abc480cea798fec.png" },
        { "id": "spiderman-fof", "title": "Spider-Man: Amigo o Enemigo", "image": "https://cdn2.steamgriddb.com/grid/9cfd241bb84b119e6f04274e0a712947.jpg" },
        { "id": "spiderman2-2004", "title": "Spider-Man 2", "image": "https://cdn2.steamgriddb.com/grid/11d9eeb2879bf6829d075c26fe111cd3.png" },
        { "id": "spiderman3-2007", "title": "Spider-Man 3", "image": "https://cdn2.steamgriddb.com/grid/e22bdaac9f690d6179a2da0c0d549f21.png" },
        { "id": "spiderman-wos", "title": "Spider-Man: Web of Shadows", "image": "https://cdn2.steamgriddb.com/grid/0fc85db957133bc497e287f3f8797c88.png" },
        { "id": "spiderman-sd", "title": "Spider-Man: Shattered Dimensions", "image": "https://cdn2.steamgriddb.com/grid/30981691f31e01cdfa432ae3d8e21a19.png" },
        { "id": "wolfenstein", "title": "Wolfenstein", "image": "https://cdn2.steamgriddb.com/grid/3b89c2f364807ea9a3ec95465ac8bffa.png" },
        { "id": "wolfenstein-et", "title": "Wolfenstein: Enemy Territory", "image": "https://cdn2.steamgriddb.com/grid/403e74e5cb3250dfd61f5df1c2b595c8.jpg" },
        { "id": "wolfenstein-return", "title": "Return to Castle Wolfenstein", "image": "https://cdn2.steamgriddb.com/grid/417cc09e93c5e73cdb8113473528ff5a.png" },
        { "id": "harry-potter-pf", "title": "Harry Potter y la Piedra Filosofal", "image": "https://cdn2.steamgriddb.com/grid/3bf0b0ab270ffde4815c5d38b17d1b80.png" },
        { "id": "harry-potter-cs", "title": "Harry Potter y La Cámara Secreta", "image": "https://cdn2.steamgriddb.com/grid/52953199231420f773349481b159fac2.png" },
        { "id": "harry-potter-cf", "title": "Harry Potter y el Cáliz de Fuego", "image": "https://cdn2.steamgriddb.com/grid/9764313a56bacfec78c4e427b7dd1701.png" },
        { "id": "harry-potter-qcm", "title": "Harry Potter: Quidditch Copa del Mundo", "image": "https://cdn2.steamgriddb.com/grid/35effc542dc36933a9c7ba0d56006380.png" },
        { "id": "harry-potter-of", "title": "Harry Potter y la Orden del Fénix", "image": "https://cdn2.steamgriddb.com/grid/819c46cd9742d2ed5cd2a9a5e4060375.png" },
        { "id": "harry-potter-rm", "title": "Harry Potter y las Reliquias de la Muerte", "image": "https://cdn2.steamgriddb.com/grid/a976698a613851bca07124d544864077.png" },
        { "id": "harry-potter-pda", "title": "Harry Potter y el prisionero de Azkaban", "image": "https://cdn2.steamgriddb.com/grid/a6ebfe17b351634e76d0455d123bcbb1.png" },
        { "id": "obscure", "title": "Obscure", "image": "https://cdn2.steamgriddb.com/grid/2c0f42a1d01e356647ce4f248a341c86.png" },
        { "id": "obscure2", "title": "Obscure 2", "image": "https://cdn2.steamgriddb.com/grid/aea1d6f516dac44d20b2943846c1a8eb.png" },
        { "id": "rage", "title": "Rage", "image": "https://cdn2.steamgriddb.com/grid/4c098b974a755062eab1bc4657b8bee4.png" },
        { "id": "harry-potter-mp", "title": "Harry Potter y el Misterio del Príncipe", "image": "https://cdn2.steamgriddb.com/grid/67702d634a924d5453e8bd58c10dce90.png" },
        { "id": "midnight-club2", "title": "Midnight Club 2", "image": "https://cdn2.steamgriddb.com/grid/c5080203c09b753e29266ec42d724f06.png" },
        { "id": "bully", "title": "Bully", "image": "https://cdn2.steamgriddb.com/grid/7ade52071e3d6841a7647a33ad49bf58.png" },
        { "id": "delta-force", "title": "Delta Force", "image": "https://cdn2.steamgriddb.com/grid/d175f2ef17ce146447db56d910b97677.png" },
        { "id": "delta-force2", "title": "Delta Force 2", "image": "https://cdn2.steamgriddb.com/grid/d79edd43344385d49e692a8b17e66d47.png" },
        { "id": "delta-force-x", "title": "Delta Force Xtreme", "image": "https://cdn2.steamgriddb.com/grid/99bb987fa827b87196dfae3e34f9c1ee.png" },
        { "id": "delta-force-tsd", "title": "Delta Force: Task Force Dagger", "image": "https://cdn2.steamgriddb.com/grid/76b87a785c16d0e2c95c0622a04124df.png" },
        { "id": "delta-force-bhd", "title": "Delta Force: Black Hawk Down", "image": "https://cdn2.steamgriddb.com/grid/85464fb225967f550d8de41f159b0953.png" },
        { "id": "delta-force-lw", "title": "Delta Force: Land Warrior", "image": "https://cdn2.steamgriddb.com/grid/a6868dfad904ec5bc97af9af0597aa52.png" },
        { "id": "nosferatu-malachi", "title": "Nosferatu: The Wrath of Malachi", "image": "https://cdn2.steamgriddb.com/grid/6c79b082e5ab45a46ba189931dc646c1.png" },
        { "id": "land-of-the-dead", "title": "Land Of The Dead", "image": "https://i.imgur.com/YPftbAG.png" },
        { "id": "painkiller-had", "title": "Painkiller: Hell & Damnation", "image": "https://cdn2.steamgriddb.com/grid/4d5df44046fa1356d46f9c097d4008d6.jpg" },
        { "id": "max-payne", "title": "Max Payne", "image": "https://cdn2.steamgriddb.com/grid/623e5a1136651b875b7124e55ce30f59.png" },
        { "id": "gta-chinatown", "title": "GTA: Chinatown Wars", "image": "https://cdn2.steamgriddb.com/grid/edcbb16417f7a00253240c23ef93dfb6.png" },
        { "id": "mk4", "title": "Mortal Kombat 4", "image": "https://cdn2.steamgriddb.com/grid/0556b2ec19f62cde67279441617d63e1.png" },
        { "id": "mk-new-era", "title": "Mortal Kombat New Era (Mugen)", "image": "https://i.imgur.com/dp9lfdJ.png" },
        { "id": "mk3", "title": "Mortal Kombat 3", "image": "https://cdn2.steamgriddb.com/grid/d1f86b3c8c863e8f83326600f148374d.png" },
        { "id": "mk2", "title": "Mortal Kombat 2", "image": "https://cdn2.steamgriddb.com/grid/cc8876475abade4d13f0abb81c146fe6.png" },
        { "id": "mk-trilogy", "title": "Mortal Kombat Trilogy", "image": "https://cdn2.steamgriddb.com/grid/6852aa253d45b3902baff6a8c08d0c1c.png" },
        { "id": "mega-man-x4", "title": "Mega Man X4", "image": "https://cdn2.steamgriddb.com/grid/1a8e3803ba73d4c2d88022c00c79cef7.png" },
        { "id": "phoenix-wright-trilogy", "title": "Phoenix Wright: Ace Attorney Trilogy", "image": "https://cdn2.steamgriddb.com/grid/f56fd81299f45d30fae410987983d000.jpg" },
        { "id": "contra-anniversary", "title": "Contra Anniversary Collection", "image": "https://cdn2.steamgriddb.com/grid/3a700241ca9e39c4cd9a48412b357433.png" },
        { "id": "scribblenauts-nlimited", "title": "Scribblenauts Unlimited", "image": "https://cdn2.steamgriddb.com/grid/b82d949cf4a38f15b1297f97b82d0a77.jpg" },
        { "id": "madden-08", "title": "Madden NFL 08", "image": "https://cdn2.steamgriddb.com/grid/53fc694a0c8cd965534729daf5ad6950.png" },
        { "id": "wonder-boys-tdt", "title": "Wonder Boys: The Dragon's Trap", "image": "https://cdn2.steamgriddb.com/grid/4798443501a54a147b4098b919f7b44c.png" },
        { "id": "omerta-cog", "title": "Omerta: City of Gangsters", "image": "https://cdn2.steamgriddb.com/grid/9878253904482726e741460a99adba86.jpg" },
        { "id": "ballxpit", "title": "BALL x PIT", "image": "https://cdn2.steamgriddb.com/grid/69ed042101c53dd867358c36f247be0a.png" },
        { "id": "super-mario-g2", "title": "Super Mario Galaxy 2", "image": "https://cdn2.steamgriddb.com/grid/e407ebda50100920810c87e64a79abd8.png" },
        { "id": "scribblenauts-unmasked", "title": "Scribblenauts Unmasked", "image": "https://cdn2.steamgriddb.com/grid/2c72d354d8bee2a9a345689ec0abd978.png" },
        { "id": "mega-man-c2", "title": "Mega Man Legacy Collection 2", "image": "https://cdn2.steamgriddb.com/grid/772742993e6897d9e985c5c5280d444a.png" },
        { "id": "blaster-master2", "title": "Blaster Master Zero 2", "image": "https://cdn2.steamgriddb.com/grid/b9789ecd2cd660e8674b7e3b387a9f25.jpg" },
        { "id": "blaster-master3", "title": "Blaster Master Zero 3", "image": "https://cdn2.steamgriddb.com/grid/5e0533556b4d8d4e774135ee06d557ab.png" },
        { "id": "blaster-master", "title": "Blaster Master Zero", "image": "https://cdn2.steamgriddb.com/grid/0f961d10d4aa9f20dd45c61291d166c8.png" },
        { "id": "18-wheels-haulin", "title": "18 Wheels of Steel Haulin", "image": "https://cdn2.steamgriddb.com/grid/df5ac49b760c9e24b52bf147c47ce0ea.png" },
        { "id": "stalker-trilogy", "title": "S.T.A.L.K.E.R. Trilogy", "image": "https://i.imgur.com/6C9domQ.png" },
        { "id": "scourge-outbreak", "title": "Scourge: Outbreak", "image": "https://cdn2.steamgriddb.com/grid/76f420f0f7c01e1146bd3bb354112f20.jpg" },
        { "id": "castlevania-los", "title": "Castlevania: Lords of Shadow", "image": "https://i.imgur.com/OcgZpA5.png" },
        { "id": "heaven-dust2", "title": "Heaven Dust 2", "image": "https://i.imgur.com/QGckPQm.png" },
        { "id": "mercenary-kings", "title": "Mercenary Kings", "image": "https://cdn2.steamgriddb.com/grid/89f6abbe600cc05f35d9e005379e7836.png" },
        { "id": "dino-crisis-bundle", "title": "Dino Crisis Bundle", "image": "https://i.imgur.com/ZmYerpN.png" },
        { "id": "dead-of-darkness", "title": "Dead of Darkness", "image": "https://i.imgur.com/ps4DhGk.png" },
        { "id": "battle-realms-ze", "title": "Battle Realms Zen Edition", "image": "https://i.imgur.com/Q97SBqD.png" },
        { "id": "blade-chimera", "title": "BLADE CHIMERA", "image": "https://cdn2.steamgriddb.com/grid/f381fdb9ba9b0e79efe40f498f3ec751.jpg" },
        { "id": "intravenous2", "title": "Intravenous 2", "image": "https://cdn2.steamgriddb.com/grid/6a16f834f1f49f896dee2a1e501c0b14.png" },
        { "id": "delta-particles", "title": "Delta Particles", "image": "https://cdn2.steamgriddb.com/grid/38ff5957dd30ad64b0a46e5feb2f3016.png" },
        { "id": "spore", "title": "Spore", "image": "https://cdn2.steamgriddb.com/grid/b3e6fdc36d0f16ef605f73a6ad7f89fb.png" },
        { "id": "deus-ex-revision", "title": "Deus Ex: Revision", "image": "https://cdn2.steamgriddb.com/grid/e2afceac9c51a3cd751b87eaf4cf0236.png" },
        { "id": "astra-ascent", "title": "Astral Ascent", "image": "https://cdn2.steamgriddb.com/grid/4b5537726565bca8039cf52e65dde9b1.png" },
        { "id": "il2-sturmovik", "title": "IL-2 Sturmovik Ultimate Edition", "image": "https://i.imgur.com/fFRhhW7.png" },
        { "id": "rollercoaster-tycoon-adventures", "title": "Rollercoaster Tycoon Adventures", "image": "https://cdn2.steamgriddb.com/grid/19ecb953e0330a64cd640e339b4d3348.png" },
        { "id": "rollercoaster-tycoon3", "title": "RollerCoaster Tycoon 3 Complete Edition", "image": "https://i.imgur.com/tsddBF1.png" },
        { "id": "kof-2003", "title": "The King of Fighters 2003", "image": "https://cdn2.steamgriddb.com/grid/d7e0fbc2585cad8bf1cf3bec701123ff.jpg" },
        { "id": "anima-gom", "title": "Anima: Gate of Memories", "image": "https://cdn2.steamgriddb.com/grid/c93dd2d2b2c73db807c3ccc503c44109.png" },
        { "id": "a-space-ft-unbound", "title": "A Space for the Unbound", "image": "https://cdn2.steamgriddb.com/grid/f39a47aff819f3aa1694e5d7ac4d58b7.jpg" },
        { "id": "snk-vs-capcom-svcc", "title": "SNK vs. Capcom SVC Chaos", "image": "https://cdn2.steamgriddb.com/grid/4431559bb36f34f947b308212773a705.png" },
        { "id": "gestalt-stemacinder", "title": "Gestalt: Steam & Cinder", "image": "https://cdn2.steamgriddb.com/grid/70289cab5c87c161d39adf673d5aaf87.png" },
        { "id": "blitzkrieg3", "title": "Blitzkrieg 3", "image": "https://cdn2.steamgriddb.com/grid/e6918c22b35e965bc5f83e6cde9379db.png" },
        { "id": "metal-slug-a-reloaded", "title": "Metal Slug Attack Reloaded", "image": "https://cdn2.steamgriddb.com/grid/f1ac4a2e174b0a964a821f3826c35be3.jpg" },
        { "id": "bia-collection", "title": "Brothers in Arms Collection", "image": "https://i.imgur.com/KlugGGv.png" },
        { "id": "wallachia-reign-dracula", "title": "Wallachia: Reign of Dracula", "image": "https://cdn2.steamgriddb.com/grid/31b170c769d49731015605ca1b028991.png" },
        { "id": "the-suffering-c", "title": "The Suffering Collection", "image": "https://i.imgur.com/WXSpBzo.png" },
        { "id": "xcom-enemy-unkown", "title": "XCOM: Enemy Unknown", "image": "https://cdn2.steamgriddb.com/grid/e6202b0662093fb1ff302e1d21c1fce3.png" },
        { "id": "adams-venture-c", "title": "Adam's Venture Chronicles", "image": "https://cdn2.steamgriddb.com/grid/7d7bf0d731adb7205c9c912e1f058161.jpg" },
        { "id": "top-racer-collection", "title": "Top Racer Collection", "image": "https://cdn2.steamgriddb.com/grid/137e5ff975d7dde0ce400a77b1834d0d.jpg" },
        { "id": "lego-hobbit", "title": "LEGO The Hobbit", "image": "https://cdn2.steamgriddb.com/grid/26efab7b1f849ac2fc9248e58ea37ad5.png" },
        { "id": "shadow-of-mordor", "title": "La Tierra Media: Sombras de Mordor", "image": "https://cdn2.steamgriddb.com/grid/7fee21a5a2378a1f76db9d1757346e6e.png" },
        { "id": "helicopter-simulator-sar", "title": "Helicopter Simulator 2014: Search & Rescue", "image": "https://cdn2.steamgriddb.com/grid/876eced205bfeaaebcdc0a1e9c046dca.png" },
        { "id": "mother-russia", "title": "Mother Russia Bleeds", "image": "https://cdn2.steamgriddb.com/grid/ba05853ae06855a1205030cfa9fb998e.jpg" },
        { "id": "zero-sievert", "title": "ZERO Sievert", "image": "https://cdn2.steamgriddb.com/grid/1ffad3dfc58d72e0414d14d15683d0c2.png" },
        { "id": "valfaris-mecha-therion", "title": "Valfaris: Mecha Therion", "image": "https://cdn2.steamgriddb.com/grid/3b4204353f6241bbc6805e4ea8aeb0c8.png" },
        { "id": "shadow-complex", "title": "Shadow Complex", "image": "https://cdn2.steamgriddb.com/grid/4f0c0b780223804e12d97832d172a363.jpg" },
        { "id": "insanely-tsp", "title": "Insanely Twisted Shadow Planet", "image": "https://cdn2.steamgriddb.com/grid/9c4aeb554e50817d65bd6ce883edb153.png" },
        { "id": "knights-and-guns", "title": "Knights & Guns", "image": "https://i.imgur.com/Y7V6hzc.png" },
        { "id": "fear-and-hunger", "title": "Fear & Hunger", "image": "https://cdn2.steamgriddb.com/grid/f90c8ed2e2558999a3db8f40ba5fcf2e.jpg" },
        { "id": "fear-and-hunger2", "title": "Fear & Hunger 2: Termina", "image": "https://cdn2.steamgriddb.com/grid/6b6bee01c95630a5840dd76f95e41408.jpg" },
        { "id": "real-heroes-firefighter", "title": "Real Heroes: Firefighter", "image": "https://cdn2.steamgriddb.com/grid/0d1a79a7a3bd6d1eba84915694e1bfe5.png" },
        { "id": "imperivm2", "title": "Imperivm II: La conquista de Hispania", "image": "https://i.imgur.com/oGWRzEh.png" },
        { "id": "crypt-ot-necrodancer", "title": "Crypt of the NecroDancer", "image": "https://cdn2.steamgriddb.com/grid/50159d1448c68b914982f1521cee930b.png" },
        { "id": "no-planb", "title": "No Plan B", "image": "https://cdn2.steamgriddb.com/grid/f2e34671e738f4f6359ff40c50da105c.png" },
        { "id": "aeternoblade", "title": "AeternoBlade", "image": "https://cdn2.steamgriddb.com/grid/3e03551b5561edc7e222e5dbb835f32a.png" },
        { "id": "from-glory-goo", "title": "From Glory To Goo", "image": "https://i.imgur.com/EV8SZAh.png" },
        { "id": "zed-zone", "title": "Zed Zone", "image": "https://cdn2.steamgriddb.com/grid/17d8cfb86e6f1507ddc481fa370bae11.jpg" },
        { "id": "outcast", "title": "Outcast", "image": "https://cdn2.steamgriddb.com/grid/5c56d38550e3a788971e74a683a53027.png" },
        { "id": "wrath-aeon-ruin", "title": "WRATH: Aeon of Ruin", "image": "https://cdn2.steamgriddb.com/grid/be896b7d155f97a56f2f791612358e30.jpg" },
        { "id": "zombie-night-terror", "title": "Zombie Night Terror", "image": "https://cdn2.steamgriddb.com/grid/05ba2fa1a3a92b4966cf495e5d82f973.jpg" },
        { "id": "shadowgrounds", "title": "Shadowgrounds", "image": "https://cdn2.steamgriddb.com/grid/162759a68a35649e7ee32494dcb21518.png" },
        { "id": "war-tortoise", "title": "War Tortoise", "image": "https://i.imgur.com/HTqQbuz.png" },
        { "id": "rain-world", "title": "Rain World", "image": "https://cdn2.steamgriddb.com/grid/838bea84b83eaf266eb26d4732d3b8ff.jpg" },
        { "id": "greed-black-border", "title": "Greed: Black Border", "image": "https://cdn2.steamgriddb.com/grid/60a27992bdb3a6ac7a1eeeb6123fbfa7.png" },
        { "id": "cliff-empire", "title": "Cliff Empire", "image": "https://i.imgur.com/xV0vDyJ.png" },
        { "id": "axiom-verge", "title": "Axiom Verge", "image": "https://cdn2.steamgriddb.com/grid/a422a18c93db2b5d4277c3ec048cc786.jpg" },
        { "id": "bloodstained-cotm", "title": "Bloodstained: Curse of the Moon", "image": "https://cdn2.steamgriddb.com/grid/82cf0712367108660c5339a4897a728e.png" },
        { "id": "nhl06", "title": "NHL 06", "image": "https://cdn2.steamgriddb.com/grid/ea8c38eff611cfebe64fe2e8a2eb2320.png" },
        { "id": "mega-city-police", "title": "Mega City Police", "image": "https://cdn2.steamgriddb.com/grid/3db2633444dfca7e4a68ec855732cb15.jpg" },
        { "id": "lords-of-exile", "title": "Lords of Exile", "image": "https://cdn2.steamgriddb.com/grid/7e9368f1f839435a2100cfb790258bbd.jpg" },
        { "id": "travellers-rest", "title": "Travellers Rest", "image": "https://cdn2.steamgriddb.com/grid/7fd6d36ae44765c9f6b7c86cbb87adaf.jpg" },
        { "id": "royal-marines-commando", "title": "The Royal Marines Commando", "image": "https://i.imgur.com/6oml31e.png" },
        { "id": "darkest-of-days", "title": "Darkest of Days", "image": "https://cdn2.steamgriddb.com/grid/7e07d99a704ed310140295332558885a.png" },
        { "id": "rayman-redemption", "title": "Rayman Redemption", "image": "https://cdn2.steamgriddb.com/grid/2964305ab056fa15b3edecae3f17d17a.png" },
        { "id": "wots4", "title": "Way of the Samurai 4", "image": "https://cdn2.steamgriddb.com/grid/01f6b8e7b4e803f8d95f00a4be3a7239.png" },
        { "id": "wots3", "title": "Way of the Samurai 3", "image": "https://cdn2.steamgriddb.com/grid/21c789095ff4e48a0a6c869b74f1e005.png" },
        { "id": "venetica", "title": "Venetica", "image": "https://cdn2.steamgriddb.com/grid/d24b5b45c12c52ba7ad088c4663cd5c8.png" },
        { "id": "urban-trial-freestyle", "title": "Urban Trial Freestyle", "image": "https://i.imgur.com/qYgvKW7.png" },
        { "id": "true-crime-sla", "title": "True Crime: Streets of LA", "image": "https://cdn2.steamgriddb.com/grid/261b748b7b993f6e8c5f2818928f671e.png" },
        { "id": "tron-evolution", "title": "Tron Evolution", "image": "https://cdn2.steamgriddb.com/grid/17fa24a1f9bbbb9f645c74a209e33254.png" },
        { "id": "trapped-dead", "title": "Trapped Dead", "image": "https://cdn2.steamgriddb.com/grid/c3e30ed7ac989117c7e1e719b4ac128f.png" },
        { "id": "the-inquisitor-book2", "title": "The Inquisitor Book II: The Village", "image": "https://i.imgur.com/BP7SK6L.png" },
        { "id": "the-final-station", "title": "The Final Station", "image": "https://cdn2.steamgriddb.com/grid/8fa991e05a3e4f5850929cc1f474de00.png" },
        { "id": "swag-and-sorcery", "title": "Swag and Sorcery", "image": "https://i.imgur.com/ZGEcrB3.png" },
        { "id": "stolen", "title": "Stolen", "image": "https://cdn2.steamgriddb.com/grid/592a0a28ee1ad9776faa83aadcbcb2cf.png" },
        { "id": "sonic-riders", "title": "Sonic Riders", "image": "https://cdn2.steamgriddb.com/grid/b19248e085200abb86c8c7284d1ed94b.png" },
        { "id": "sim-city5", "title": "SimCity 5 (2013)", "image": "https://cdn2.steamgriddb.com/grid/297c5d34ea49c4c89da2c1d7a7a62b06.png" },
        { "id": "sid-meiers-pirates", "title": "Sid Meier's Pirates!", "image": "https://cdn2.steamgriddb.com/grid/e6888a7dfb2292b6a0cfed7ff366963b.png" },
        { "id": "rapala-pro-fishing", "title": "Rapala Pro Fishing", "image": "https://cdn2.steamgriddb.com/grid/1d992c275d9866fa221d3b02f069f30c.png" },
        { "id": "planetbase", "title": "Planetbase", "image": "https://i.imgur.com/fwXZ9Xt.png" },
        { "id": "moto-racer2", "title": "Moto Racer 2", "image": "https://cdn2.steamgriddb.com/grid/0217c73e311815635a7320c489c09e13.png" },
        { "id": "kottic", "title": "Knights of The Temple: Infernal Crusade", "image": "https://i.imgur.com/N2MuewH.png" },
        { "id": "loki", "title": "Loki", "image": "https://cdn2.steamgriddb.com/grid/cdd8f56f9a5f73b49a0d0b3f64658fde.png" },
        { "id": "igi2", "title": "I.G.I.-2: Covert Strike", "image": "https://cdn2.steamgriddb.com/grid/56a8969e704734c58918deb27219f300.png" },
        { "id": "hitman-codename47", "title": "Hitman: Codename 47", "image": "https://cdn2.steamgriddb.com/grid/9c7f37f5c187f662eaf7d0df83ac8804.png" },
        { "id": "hidden-deep", "title": "Hidden Deep", "image": "https://i.imgur.com/nLlzXJi.png" },
        { "id": "homam3", "title": "Heroes of Might and Magic III", "image": "https://cdn2.steamgriddb.com/grid/fa9583c8719cec0d3ee3a5f008a4b54a.png" }
    ];

    let currentIndex = 0;

    function startCarousel() {
        const carousel = document.getElementById("carousel");
        const carouselContent = document.getElementById("carousel-content");
        const carouselContentDownloadButton = document.getElementById("carousel-content-download-button");

        function showNext() {
            const game = gameLinksData[Math.floor(Math.random() * gameLinksData.length)];

            carousel.style.backgroundImage = `url(${game.image})`;
            carouselContent.textContent = game.title;
            carouselContentDownloadButton.onclick = () => {
                openModal(game.id, game.title);

            }
        }

        showNext(); // show immediately on load, don't wait 5s first
        setInterval(showNext, 10000);
    }

    startCarousel();

    const imageCache = new Map();
    const imageCacheAccess = new Map();
    const MAX_CACHE_SIZE = 50;

    const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                loadImageOptimized(img);
                intersectionObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px',
        threshold: 0.1
    });

    function loadImageOptimized(img) {
        const src = img.dataset.src || img.src;


        if (imageCache.has(src)) {
            imageCacheAccess.set(src, Date.now());
            img.src = imageCache.get(src);
            img.style.opacity = '1';
            img.style.willChange = 'auto';
            return;
        }


        img.setAttribute('decoding', 'async');
        img.setAttribute('loading', 'lazy');


        const webpSrc = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
        const testImg = new Image();

        testImg.onload = () => {
            manageCacheSize();
            imageCache.set(src, webpSrc);
            imageCacheAccess.set(src, Date.now());
            img.src = webpSrc;
            img.style.opacity = '1';
            img.style.willChange = 'auto';
        };

        testImg.onerror = () => {
            manageCacheSize();
            imageCache.set(src, src);
            imageCacheAccess.set(src, Date.now());
            img.src = src;
            img.style.opacity = '1';
            img.style.willChange = 'auto';
        };

        testImg.src = webpSrc;
    }



    function manageCacheSize() {
        if (imageCache.size >= MAX_CACHE_SIZE) {

            let oldestKey = null;
            let oldestTime = Date.now();

            for (const [key, time] of imageCacheAccess) {
                if (time < oldestTime) {
                    oldestTime = time;
                    oldestKey = key;
                }
            }

            if (oldestKey) {
                imageCache.delete(oldestKey);
                imageCacheAccess.delete(oldestKey);
            }
        }
    }

    function updateImageLoadingPriority() {
        const visibleGameItems = [];
        gameItems.forEach(item => {
            const style = window.getComputedStyle(item);
            if (style.display !== 'none') {
                visibleGameItems.push(item);
            }
        });


        gameItems.forEach((item, index) => {
            const img = item.querySelector('img');
            if (!img) return;

            const isVisible = visibleGameItems.includes(item);
            const isInViewport = index < 12;

            if (isVisible && isInViewport) {

                img.removeAttribute('loading');
                if (img.dataset.src) {
                    loadImageOptimized(img);
                }
            } else if (isVisible) {

                img.setAttribute('loading', 'lazy');
                if (!img.dataset.observed) {
                    intersectionObserver.observe(img);
                    img.dataset.observed = 'true';
                }
            } else {

                img.setAttribute('loading', 'lazy');
                intersectionObserver.unobserve(img);
                img.dataset.observed = 'false';
            }
        });


        const criticalImages = visibleGameItems.slice(0, 18);
        criticalImages.forEach((item, index) => {
            if (index >= 12) {
                const img = item.querySelector('img');
                if (img && !imageCache.has(img.src)) {
                    const link = document.createElement('link');
                    link.rel = 'prefetch';
                    link.href = img.src;
                    document.head.appendChild(link);
                }
            }
        });
    }

    function openModal(gameId, gameName) {

        currentGameId = gameId;
        modalGameTitle.textContent = gameName;
        modalDownloadLinksList.innerHTML = '';

        if (gameId && gameDownloadLinksData[gameId]) {
            const links = gameDownloadLinksData[gameId];
            let hasAnyDetails = links.some(linkInfo => linkInfo.readMoreText);

            links.forEach((linkInfo, index) => {

                const listItem = document.createElement('li');


                if (linkInfo.parts && linkInfo.parts.length > 0) {

                    const partsButton = document.createElement('button');
                    partsButton.textContent = linkInfo.text;
                    partsButton.className = 'download-with-parts';


                    partsButton.addEventListener('click', () => {
                        openPartsModal(linkInfo.parts, gameId);
                    });

                    listItem.appendChild(partsButton);
                } else {

                    const anchor = document.createElement('a');
                    anchor.href = linkInfo.url;
                    anchor.textContent = linkInfo.text;
                    anchor.target = '_blank';

                    listItem.appendChild(anchor);
                }


                const anchor = listItem.querySelector('a');
                if (anchor) {

                }

                modalDownloadLinksList.appendChild(listItem);


                if (linkInfo.readMoreText) {
                    const readMoreContainer = document.createElement('div');
                    readMoreContainer.className = 'read-more-container';

                    const buttonsContainer = document.createElement('div');
                    buttonsContainer.className = 'modal-buttons-container';

                    const readMoreToggle = document.createElement('span');
                    readMoreToggle.className = 'read-more-toggle';
                    readMoreToggle.textContent = 'Details';


                    const detailsText = linkInfo.readMoreText;


                    readMoreToggle.addEventListener('click', function () {

                        detailsContent.textContent = detailsText;


                        detailsModal.classList.add('is-open');
                    });

                    buttonsContainer.appendChild(readMoreToggle);
                    readMoreContainer.appendChild(buttonsContainer);
                    listItem.appendChild(readMoreContainer);
                }
            });


        } else {
            const listItem = document.createElement('li');
            listItem.textContent = 'There are no download links available for this game.';
            modalDownloadLinksList.appendChild(listItem);
            console.warn('No se encontraron enlaces de descarga para el juego:', gameId);
        }
        document.body.classList.add('modal-blur-active');
        modal.classList.add('is-open');
    }


    updateImageLoadingPriority();

    function closeModal() {
        document.body.classList.remove('modal-blur-active');
        modal.classList.remove('is-open');
    }


    closeButton.addEventListener('click', closeModal);


    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });


    detailsCloseButton.addEventListener('click', () => {
        detailsModal.classList.remove('is-open');
    });


    detailsModal.addEventListener('click', (e) => {
        if (e.target === detailsModal) {
            detailsModal.classList.remove('is-open');
        }
    });


    partsCloseButton.addEventListener('click', closePartsModal);


    partsModal.addEventListener('click', (e) => {
        if (e.target === partsModal) {
            closePartsModal();
        }
    });


    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {

            if (partsModal.classList.contains('is-open')) {
                closePartsModal();
                event.stopPropagation();
                return;
            }

            if (detailsModal.classList.contains('is-open')) {
                detailsModal.classList.remove('is-open');

                event.stopPropagation();
                return;
            }

            if (modal.classList.contains('is-open')) {
                closeModal();
            }
        }
    });


    function sanitizeSearchTerm(term) {
        return term.toLowerCase().replace(/[^a-z0-9]/g, '');
    }


    searchBar.addEventListener('input', (event) => {
        const rawSearchTerm = event.target.value.trim();
        const sanitizedSearchTerm = sanitizeSearchTerm(rawSearchTerm);

        gameItems.forEach(item => {
            const rawGameTitle = item.querySelector('p').textContent;
            const sanitizedGameTitle = sanitizeSearchTerm(rawGameTitle);

            item.classList.toggle('hidden', !sanitizedGameTitle.includes(sanitizedSearchTerm));
        });

        updateImageLoadingPriority();

    });


    function initGallery() {
        const gameItems = document.querySelectorAll('.game-item');
        const hoverImageCache = new Map();


        gameItems.forEach(item => {

            if (item.dataset.listenersAdded) {
                return;
            }
            item.dataset.listenersAdded = 'true';

            const img = item.querySelector('img');
            const originalSrc = img.getAttribute('src');
            const hoverSrc = item.dataset.hoverSrc;
            let hoverTimer = null;
            let preloadController = new AbortController();
            let isHoverImageDisplayed = false;
            let isMouseOverContainer = false;


            img.setAttribute('decoding', 'async');
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }



            function processLoadedImage() {
                img.style.opacity = '1';

                const rect = img.getBoundingClientRect();
                const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
                if (!isInViewport && !imageCache.has(img.src)) {
                    img.style.willChange = 'auto';
                }
            }

            if (img.complete && img.naturalWidth > 0) {
                processLoadedImage();
            } else {
                img.addEventListener('load', processLoadedImage, { once: true });
                img.addEventListener('error', () => {
                    img.style.opacity = '1';
                    img.style.willChange = 'auto';
                }, { once: true });
            }


            item.addEventListener('mouseenter', () => {
                isMouseOverContainer = true;


                preloadController.abort();
                preloadController = new AbortController();


                if (hoverSrc && !hoverImageCache.has(hoverSrc)) {
                    const timeoutId = setTimeout(() => {
                        if (isMouseOverContainer && !preloadController.signal.aborted) {
                            const hoverImg = new Image();
                            hoverImg.onload = () => hoverImageCache.set(hoverSrc, true);
                            hoverImg.src = hoverSrc;
                        }
                    }, 300);


                    preloadController.signal.addEventListener('abort', () => {
                        clearTimeout(timeoutId);
                    });
                }

                if (hoverSrc) {
                    if (hoverTimer) clearTimeout(hoverTimer);
                    hoverTimer = setTimeout(() => {
                        if (item.matches(':hover') && hoverImageCache.has(hoverSrc)) {
                            img.src = hoverSrc;
                            isHoverImageDisplayed = true;
                        }
                    }, 800);
                }
            });

            item.addEventListener('mouseleave', () => {
                isMouseOverContainer = false;


                preloadController.abort();

                if (hoverTimer) {
                    clearTimeout(hoverTimer);
                    hoverTimer = null;
                }
                if (isHoverImageDisplayed) {
                    img.src = originalSrc;
                    isHoverImageDisplayed = false;
                }
            });


            item.addEventListener('click', (event) => {
                event.preventDefault();
                const gameId = item.dataset.gameId;
                const gameName = item.querySelector('p').textContent;
                if (gameId) {
                    openModal(gameId, gameName);
                }
            });
        });


        updateImageLoadingPriority();
        initAlphabetFilter();
    }
    window.initGallery = initGallery;

    function initAlphabetFilter() {
        const sortToggleBtn = document.getElementById('sortToggleBtn');
        const filterToggleBtn = document.getElementById('filterToggleBtn');
        const sortMenu = document.getElementById('sortMenu');
        const filterMenu = document.getElementById('filterMenu');
        const alphabetGrid = document.getElementById('alphabetGrid');

        const sortAscBtn = document.getElementById('sortAscBtn');
        const sortDescBtn = document.getElementById('sortDescBtn');
        const sortRecentBtn = document.getElementById('sortRecentBtn');

        if (!sortToggleBtn || !filterToggleBtn || !sortMenu || !filterMenu || !alphabetGrid) return;

        let activeLetter = null;
        let currentSortOrder = 'recent'; // 'recent', 'asc', 'desc'

        // Helper to close all menus
        function closeAllMenus() {
            sortMenu.classList.remove('is-open');
            filterMenu.classList.remove('is-open');
            sortToggleBtn.classList.remove('active');
            filterToggleBtn.classList.remove('active');
        }

        // Toggle Sort Menu
        sortToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (sortMenu.classList.contains('is-open')) {
                closeAllMenus();
            } else {
                closeAllMenus();
                sortMenu.classList.add('is-open');
                sortMenu.classList.remove('hidden');
                sortToggleBtn.classList.add('active');
            }
        });

        // Toggle Filter Menu
        filterToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (filterMenu.classList.contains('is-open')) {
                closeAllMenus();
            } else {
                closeAllMenus();
                filterMenu.classList.add('is-open');
                filterMenu.classList.remove('hidden');
                filterToggleBtn.classList.add('active');
            }
        });

        const hamBurgerMenu = document.getElementById('hamburger').querySelector('input');
        const openMenu = document.getElementById('phone-menu');

        hamBurgerMenu.addEventListener('click', () => {
            openMenu.classList.toggle('menu-open');
            console.log('Hamburger checkbox toggled, menu-open state switched');
            openMenu.appendChild(sortToggleBtn);
            openMenu.appendChild(filterToggleBtn);
        });

        // Close menu when clicking outside
        window.addEventListener('click', (e) => {
            if (!sortMenu.contains(e.target) && !filterMenu.contains(e.target) &&
                !sortToggleBtn.contains(e.target) && !filterToggleBtn.contains(e.target)) {
                closeAllMenus();
            }
        });

        // Sorting Logic
        const gameKeys = Object.keys(gameDownloadLinksData);
        // Map gameId -> index (higher index = more recent)
        const gameIndexMap = new Map(gameKeys.map((key, index) => [key, index]));

        function sortGames(order) {
            const galleryContainer = document.querySelector('.gallery-container');
            const items = Array.from(document.querySelectorAll('.game-item'));

            items.sort((a, b) => {
                const idA = a.dataset.gameId;
                const idB = b.dataset.gameId;
                const nameA = a.querySelector('p').textContent.trim().toLowerCase();
                const nameB = b.querySelector('p').textContent.trim().toLowerCase();

                if (order === 'recent') {
                    const indexA = gameIndexMap.has(idA) ? gameIndexMap.get(idA) : -1;
                    const indexB = gameIndexMap.has(idB) ? gameIndexMap.get(idB) : -1;
                    // Descending index
                    return indexB - indexA;
                } else if (order === 'asc') {
                    return nameA.localeCompare(nameB);
                } else if (order === 'desc') {
                    return nameB.localeCompare(nameA);
                }
            });

            // Re-append sorted items
            items.forEach(item => galleryContainer.appendChild(item));

            currentSortOrder = order;

            // Update UI buttons
            [sortAscBtn, sortDescBtn, sortRecentBtn].forEach(btn => btn.classList.remove('active'));
            if (order === 'asc') sortAscBtn.classList.add('active');
            if (order === 'desc') sortDescBtn.classList.add('active');
            if (order === 'recent') sortRecentBtn.classList.add('active');

            updateImageLoadingPriority();
        }

        sortAscBtn.addEventListener('click', () => sortGames('asc'));
        sortDescBtn.addEventListener('click', () => sortGames('desc'));
        sortRecentBtn.addEventListener('click', () => sortGames('recent'));


        // Alphabet Generation and Filtering
        const alphabet = '#ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        alphabetGrid.innerHTML = '';

        alphabet.forEach(letter => {
            const btn = document.createElement('button');
            btn.textContent = letter;
            btn.className = 'alphabet-btn';
            btn.onclick = () => {
                const gameItems = document.querySelectorAll('.game-item');

                if (activeLetter === letter) {
                    activeLetter = null;
                    btn.classList.remove('active');
                    // Show all
                    gameItems.forEach(item => item.classList.remove('hidden'));
                } else {
                    document.querySelectorAll('.alphabet-btn').forEach(b => b.classList.remove('active'));
                    activeLetter = letter;
                    btn.classList.add('active');

                    gameItems.forEach(item => {
                        const name = item.querySelector('p').textContent.trim();
                        const firstChar = name.charAt(0).toUpperCase();

                        let match = false;
                        if (letter === '#') {
                            match = !/^[A-Z]/.test(firstChar);
                        } else {
                            match = firstChar === letter;
                        }

                        if (match) {
                            item.classList.remove('hidden');
                        } else {
                            item.classList.add('hidden');
                        }
                    });
                }
                updateImageLoadingPriority();
            };
            alphabetGrid.appendChild(btn);
        });

        // Initial Sort
        sortGames('recent');
    }


    function optimizeViewport() {

        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
        }

    }

    const galleryFile = 'gallery-index.html';

    fetch(galleryFile)
        .then(response => response.text())
        .then(html => {

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const gallery = doc.querySelector('.gallery-container');
            if (gallery) {
                document.querySelector('.gallery-container').innerHTML = gallery.innerHTML;
            }


            optimizeViewport();
            window.initGallery();


            const searchBar = document.getElementById('searchBar');
            if (searchBar) {
                let searchTimeout;
                searchBar.addEventListener('input', (event) => {
                    clearTimeout(searchTimeout);
                    searchTimeout = setTimeout(() => {
                        const rawSearchTerm = event.target.value.trim();
                        const sanitizedSearchTerm = sanitizeSearchTerm(rawSearchTerm);


                        requestAnimationFrame(() => {
                            document.querySelectorAll('.game-item').forEach(item => {
                                const rawGameTitle = item.querySelector('p').textContent;
                                const sanitizedGameTitle = sanitizeSearchTerm(rawGameTitle);
                                item.classList.toggle('hidden', !sanitizedGameTitle.includes(sanitizedSearchTerm));
                            });
                            updateImageLoadingPriority();
                        });
                    }, 150);
                });
            }
        })
        .catch(error => {
            console.error('Error cargando la galería:', error);
        });

});
