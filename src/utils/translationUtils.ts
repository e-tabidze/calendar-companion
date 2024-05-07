export const dynamicTranslateCities = (word: string, t: any) => {
  switch (word) {
    case 'თბილისი':
      return t('backend_cities.tbilisi')
    case 'ბათუმი':
      return t('backend_cities.batumi')
    case 'გორი':
      return t('backend_cities.gori')
    case 'ზუგდიდი':
      return t('backend_cities.zugdidi')
    case 'თელავი':
      return t('backend_cities.telavi')
    case 'ქუთაისი':
      return t('backend_cities.kutaisi')
    case 'რუსთავი':
      return t('backend_cities.rustavi')
    case 'კასპი':
      return t('backend_cities.kaspi')
    case 'ხაშური':
      return t('backend_cities.khashuri')
    case 'დედოფლისწყარო':
      return t('backend_cities.dedofliswyaro')
    case 'წალენჯიხა':
      return t('backend_cities.tsalenjikha')
    default:
      return word
  }
}
export const dynamicTranslateCategories = (word: string, t: any) => {
  switch (word) {
    case 'სედანი':
      return t('backend_categories.sedan')
    case 'ჯიპი':
      return t('backend_categories.jeep')
    case 'კუპე':
      return t('backend_categories.coupe')
    case 'პიკაპი':
      return t('backend_categories.pickup')
    case 'მინივენი':
      return t('backend_categories.minivan')
    case 'კაბრიოლეტი':
      return t('backend_categories.cabriolet')
    default:
      return word
  }
}
export const dynamicTranslateServices = (word: string, t: any) => {
  switch (word) {
    case 'ფასიანი მიწოდება':
      return t('backend_services.priced_supply')
    case 'ორი მძღოლი':
      return t('backend_services.two_drivers')
    case 'სამი მძღოლი':
      return t('backend_services.three_drivers')
    case 'მძღოლის მომსახურება':
      return t('backend_services.driver_service')
    default:
      return t(word)
  }
}
export const dynamicTranslateTag = (word: any, t: any) => {
  switch (word) {
    case 'ელექტრო':
      return t('backend_fuel_types.electric')
    case 'ჰიბრიდი':
      return t('backend_fuel_types.hybrid')
    case 'დატენვადი ჰიბრიდი':
      return t('backend_fuel_types.plug_in_hybrid')
    case 'ბენზინი':
      return t('backend_fuel_types.petrol')
    case 'დიზელი':
      return t('backend_fuel_types.diesel')
    case 'გაზი':
      return t('backend_fuel_types.gas')
    case 'წინა':
      return t('backend_drive_wheels.drive_front_wheels')
    case 'უკანა':
      return t('backend_drive_wheels.drive_rear_wheels')
    case 'ავტომატიკა':
      return t('backend_transmission.automatic')
    case 'მექანიკა':
      return t('backend_transmission.manual')
    default:
      return t(word)
  }
}

export const dynamicTranslateAdditionalParameters = (word: any, t: any) => {
  switch (word) {
    case 'სსმპ ადაპტირებული':
      return t('backend_additional_parameters.adapted_psn')
    case 'ეკონომიური':
      return t('backend_categories.economy')
    case 'პარკინგის სენსორი':
      return t('backend_additional_parameters.parking_control')
    case 'ცხოველების დაშვება':
      return t('backend_additional_parameters.animals_allowed')
    case '4 წამყვანი თვალი':
      return t('backend_additional_parameters.drive_wheels_4')
    case 'უკანა კამერა':
      return t('backend_additional_parameters.rear_view_camera')
    case 'სავარძლის გათბობა':
      return t('backend_additional_parameters.seat_heater')
    case 'USB პორტი':
      return t('backend_additional_parameters.usb_port')
    case 'Android Auto':
      return t('backend_additional_parameters.android_auto')
    case 'GPS':
      return t('backend_additional_parameters.gps')
    case 'USB დამტენი':
      return t('backend_additional_parameters.usb_charger')
    case 'Apple CarPlay':
      return t('backend_additional_parameters.apple_car_play')
    case 'Bluetooth':
      return t('backend_additional_parameters.bluetooth')
    case 'ზამთრის საბურავები':
      return t('backend_additional_parameters.winter_tires')
    case 'AUX პორტი':
      return t('backend_additional_parameters.aux_port')
    default:
      return word
  }
}
