import HttpService from './HttpService'

class StaticService extends HttpService {
  postUploadCompanyLogo(AccessToken = '', File: any) {
    return this.post(
      'https://test.static.my.ge',
      { Func: 'UploadCompLogo', UploadedFiles: 1, IP: '0.0.0.0', UserID: 'aquserid', SiteID: '39', File },
      AccessToken ? { Authorization: `${AccessToken}` } : {}
    )
  }

  postSaveCompanyLogo(AccessToken = '', Logo: string, companyId: string | number) {
    return this.post(
      'https://test.static.my.ge',
      { Func: 'SaveShopLogo', SiteID: '39', Logo: Logo, SecKey: '$sprt7856^*3423242dmenio4', ShopId: companyId },
      AccessToken ? { Authorization: `${AccessToken}` } : {}
    )
  }

  postUploadProductImages(AccessToken = '', files: any, count: number, userId: number) {
    return this.post(
      'https://test.static.my.ge',
      { Func: 'UploadPhotos', UploadedFiles: count, IP: '0.0.0.0', UserID: userId, SiteID: '39', 'Files[]': files },
      AccessToken ? { Authorization: `${AccessToken}` } : {}
    )
  }

  reverseAndFormatNumber(dir: number | string) {
    const reversedDigits = String(dir).split('').reverse().map(Number)
    const formattedResult = Array.from({ length: 5 }, (_, i) => reversedDigits[i] || 0).join('/')
    
    return formattedResult
  }
  postSaveProductImages(AccessToken = '', FilesList: string[], productId: string | number) {
    const mappedPhotos = FilesList?.map(photo => photo )

    return this.post(
      'save-photos',
      {
        Func: 'AddPhotos',
        'Photos[]': mappedPhotos,
        PrID: productId,
      },
      AccessToken ? { Authorization: `${AccessToken}` } : {}
    )
  }
}

export default new StaticService()
