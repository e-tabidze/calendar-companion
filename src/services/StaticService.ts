import HttpService from './HttpService'

class StaticService extends HttpService {
  postUploadCompanyLogo(AccessToken = '', File: any) {
    return this.post(
      'https://test.static.my.ge',
      { Func: 'UploadCompLogo', UploadedFiles: 1, IP: '0.0.0.0', UserID: 'aquserid', SiteID: '5', File },
      AccessToken ? { Authorization: `${AccessToken}` } : {}
    )
  }

  postSaveCompanyLogo(AccessToken = '', Logo: string) {
    return this.post(
      'https://test.static.my.ge',
      { Func: 'SaveCompLogo', SiteID: '5', Logo: Logo, SecKey: '$sprt7856^*3423242dmenio4' },
      AccessToken ? { Authorization: `${AccessToken}` } : {}
    )
  }
}

export default new StaticService()
