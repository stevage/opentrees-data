function match(s, regex) {
    return s && String(s).match(regex);
}


function cleanTree(t) {
    t.genus = (t.genus || '').trim();
    t.species = t.species || '';
    t.variety = t.variety || '';
    t.scientific = (t.scientific || '').trim();


    // 'Remove vacant plantings'
    const notPresentRegex = /\b(vacant\b|no tree|removed|destroyed|proposed|planting site)/i;
    // may capture false positives, "to be removed"?
    if (['scientific','description','common','health'].find(field => match(t[field], notPresentRegex))) {
        t._del = true;
        return;
    }

    const unknownRegexp = /^(null$|Unidentified|Unknown|Not |To be|To define|not\b|tba|Ikke registreret|Não identificada|Autre espèce|Hedge start|Hedge end|var$)/i;
    if (match(t.scientific, unknownRegexp)) {
        t.description = t.scientific;
        t.scientific = t.genus = t.species = '';
    }
    if (match(t.genus, unknownRegexp)) {
        t.description = t.genus;
        t.scientific = t.genus = t.species = '';
    }
    if (match(t.species, unknownRegexp)) {
        t.species = '';
    }
    if (match(t.common, unknownRegexp)) {
        t.common = '';
    }

    //'Convert "Stump", "Natives - mixed" etc to descriptions'
    if (match(t.scientific, /^(Native|Ornamental|Stump)/i)) {
        t.description = t.scientific;
        t.scientific = t.genus = t.species = '';
    }

    if (match(t.scientific, /^(Rose |Fan Palm)/i)) {
        t.common = t.scientific;
        t.scientific = t.genus = t.species = '';
    }

    if (t.common && match(t.common, /^unknown|not specified|not listed/i)) {
        t.common='';
    }

    
    let parts = t.scientific.split(' ');
    //"Split scientific names into genus, species: Split 'Cedrus atlantica' -> Cedrus, atlantica"
    if (parts.length >= 2 && !t.genus) {
        t.genus = parts[0];
        if (parts[1].match(/[xX×]/)) {
            t.species = parts.slice(1).join(' ');
        } else {
            t.species = parts[1];
        }
    }


    //\echo "Process species identified as 'Sp.' or 'Spp'"
    //-- 'Sp.' means non-identified species, 'Spp.' technically means a mix of several unidentified species.
    if (t.species.trim().match(/^(sp|sp\.|spp|spp\.|species|unknown)$/i)) {
        t.species = '';
    }

    //\echo "Handle 'cultivar'"
    if (t.species.match(/^cultivar$/i)) {
        t.variety = t.species;
        t.species = '';
    }

    // variety incorrectly stored as species, eg Tristaniopsis 'Luscious'
    if (match(t.species, /^['"]/)) {
        t.variety = t.species;
        t.species = '';
    }

    // \echo "Handle subspecies, splitting any multi-part species name."
    let speciesParts = t.species.split(' ');
    if (speciesParts.length >= 2 && speciesParts[0].toLowerCase() !== 'x') {
        t.species = speciesParts[0];
        t.variety = speciesParts[1];
    }

    // \echo "If still no genus, make the scientific name the genus."
    if (t.scientific && !t.genus) {
        t.genus = t.scientific.trim();
    }
    

    //\echo "Set case"
    if (t.genus) {
        t.genus = t.genus[0].toUpperCase() + t.genus.slice(1).toLowerCase();
        t.species = t.species.toLowerCase();
    }


    // \echo "Botlebrush -> Bottlebrush"
    if (match(t.scientific, /Callistemon .?kings park special.?/i)) {
        if (t.common && t.common.match(/botle/)) {
            t.common = 'Red Bottlebrush';
        }
        t.genus = 'Callistemon';
        t.species = 'viminalis'; // or could be citrinus, who knows
        t.variety = "King's Park Special";
    }

    [
        [/Cordyline cordyline/i, 'Cordyline', 'Cordyline', ''],
        [/Eucalyptus leucoxylon euky dwar/i, 'Eucalyptus leucoxylon', 'Eucalyptus', 'leucoxylon'],
        [/Pyrua calleryana - capital/i, 'Pyrus calleryana', 'Pyrus', 'calleryana'], // "Capital" variety...e
        [/Fraxinus raywood(ii)?/i, 'Fraxinus angustifolia', 'Fraxinus', 'angustifolia', 'Raywoodii'],
        

    ].forEach(a => {
        const [scientificFrom, scientificTo, genusTo, speciesTo, varietyTo] = a;
        if (match(t.scientific, scientificFrom)) {
            t.scientific = scientificTo;
            t.genus = genusTo;
            t.species = speciesTo;
            if (varietyTo) {
                t.variety = varietyTo;
            }
        }        
    });

    [
        ['desmithiana', 'desmetiana'],
        ['linarifolia','linariifolia'], // argh, it could be either linearifolia or linariifolia
        ['linaifolia', 'linariifolia'],
        ['columellaris','columerauis'],
        ['bacculenta','bucculenta'],
        ['stypheliodes', 'styphelioides'],
        ['glaucophylla','glaucophyllus'],
        ['chanticleer','calleryana'], // tecnhically a cultivar of calleryana
        ['capital','calleryana'], // ditto
        ['gonyocalyx','goniocalyx'],
        ['nesophillia','nesophilia'],
        ['jorulensis','jorullensis'],
        ['blierana','x blireana'],
        ['monsplessulana', 'monspessulana'],
        ['angustigolia', 'angustifolia'],
        ['siedroxylon', 'sideroxylon'],
        ['usseriensis', 'ussuriensis'],
        ['blakleyi', 'blakelyi'],
        ['bignoniodes', 'bignonioides'],
        ['ferdinandii', 'ferdinandi', 'Glochidion'], // Sometimes ferdinandii is correct
        ['azederach', 'azedarach'],
        ['patersonii', 'patersonia', 'Lagunaria'],
        ['xblireana', 'x blireana'],
        ['cinera', 'cinerea'],
        ['salibris', 'salubris'],
        ['verticulata', 'verticillata'],

    ].forEach(a => {
        let [speciesFrom, speciesTo, genusFrom] = a;
        if (match(t.species, speciesFrom) && (!genusFrom || genusFrom === t.genus)) {
            t.species = speciesTo;
            t.scientific = '';
        }        
    });
    /*
    To ponder:
    - names like "Photinia robusta" which should actually be "Photinia x fraseri 'robusta'"
    */

    [
        ['Melalauca', 'Melaleuca'],
        ['Waterhousia','Waterhousea'],
        ['Robina','Robinia'],
        ['Sailx','Salix'],
        ['Poplus','Populus'],
        ['Photinea','Photinia'],
        ['Photina','Photinia'],
        ['Lophostermon','Lophostemon'],
        ['Leptosprmum','Leptospermum'],
        ['Qurecus','Quercus'],
        ['Angpohora','Angophora'],
        ['Pistachia','Pistacia'],
        ['Largerstromia', 'Largerstroemia'],
        ['Casurina', 'Casuarina'],
        ['Bizmarckia', 'Bismarckia'],
        ['Mag.', 'Magnolia'], // lazy! :)
        ['Quecus', 'Quercus'],
        ['Symcareia', 'Syncarpia'], //!
        ['Koelruteria','Koelreuteria'],
        ['Euonomys', 'Euonymus'],
    ].forEach(a => {
        let [genusFrom, genusTo] = a;
        if (t.genus === genusFrom) {
            t.genus = genusTo;
            t.scientific = '';
        }        
    });

    if (t.scientific === '' && t.genus !== '') {
        t.scientific = (t.genus + ' ' + t.species).trim();
    }


    /* TODO
    \echo "Flip genus, species of Pyrus, Eucalyptus, Dodonaea, Metrosideros"
    UPDATE alltrees
    SET species=lower(genus), genus=initcap(species), scientific = concat(initcap(species), ' ', lower(genus))
    WHERE lower(species) in ('pyrus', 'eucalyptus', 'dodonaea', 'metrosideros', 'buxus');
    */

    // \echo "Blank out non-assessed crown widths."
    
    for (let field of ['crown','dbh','height','planted']) {
        if (String(t[field]).match(/not assessed/i)) {
            t[field] = undefined;
        }
    }

    for (let field of ['health','maturity']) {
        if (String(t[field]).match(/^(Unassigned|Null|Unknown| |N\/A|NA$)$/i)) {
            t[field] = undefined;
        }
    }
    // TODO: titlecase fields, so FAIR => Fair ?
    
    // -- TODO: handle all the dbh's that are ranges in mm.
    // console.log(t.scientific);


    if (t.maturity) {
        let m = String(t.maturity);
        m = m[0].toUpperCase() + m.slice(1).toLowerCase();
        m = m.replace(/-/i, ' ').replace(/(Semi|Over) /, 'Semi-');
    }

    if (t.planted) {
        const m = match(t.planted, /(19|20)\d\d/);
        t.plantedYear = m && m[0];
    }

    


    return t;


    
}
module.exports = cleanTree;