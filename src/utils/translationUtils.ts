export const dynamicTranslateCities = (word: string, t: any) => {
    switch (word){
        case 'თბილისი':
            return t('backend_cities.tbilisi');
        case 'ბათუმი':
            return t('backend_cities.batumi');
        case 'გორი':
            return t('backend_cities.gori');
        case 'ზუგდიდი':
            return t('backend_cities.zugdidi');
        case 'თელავი':
            return t('backend_cities.telavi');
        case 'ქუთაისი':
            return t('backend_cities.kutaisi');
        case 'რუსთავი':
            return t('backend_cities.rustavi');
        case 'კასპი':
            return t('backend_cities.kaspi');
        case 'ხაშური':
            return t('backend_cities.khashuri');
        case 'დედოფლისწყარო':
            return t('backend_cities.dedofliswyaro');
        case 'წალენჯიხა':
            return t('backend_cities.tsalenjikha');
        default:
            return word
    }
}