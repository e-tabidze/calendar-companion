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

  postSaveProductImages(AccessToken = '', Logo: string, companyId: string | number) {
    return this.post(
      'https://test.static.my.ge',
      { Func: 'SaveShopLogo', SiteID: '39', Logo: Logo, SecKey: '$sprt7856^*3423242dmenio4', ShopId: companyId },
      AccessToken ? { Authorization: `${AccessToken}` } : {}
    )
  }
}

export default new StaticService()
