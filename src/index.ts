import { BaseController } from '@ctsy/request';


class Base extends BaseController {
    prefix = "_a"
}
/**
 * 认证处理类
 */
export class Auth extends Base {
    /**
     * 登陆请求
     * @param Account 
     * @param PWD 
     */
    login(Account: string, PWD: string) {
        return this._post('login', { [AuthModules.Fields.Account]: Account, [AuthModules.Fields.PWD]: PWD })
    }
    /**
     * 检查登陆是否有效
     */
    relogin() {
        return this._post('relogin', '');
    }
    /**
     * 获取我的权限列表
     */
    getPermissions(): Promise<string[]> {
        return this._post('getPermissions', '')
    }
    /**
     * 获取我的登陆信息
     */
    info() {
        return this._post('info', '')
    }
    /**
     * 退出登录
     */
    logout(): Promise<boolean> {
        return this._post('logout', '')
    }
    /**
     * 注册账号
     * @param Account 账号
     * @param PWD 密码
     * @param VCode 验证码
     * @param PUID 推介人UID
     */
    regist(Account: string, PWD: string, VCode: string, PUID: number = 0) {
        return this._post('regist', {
            [AuthModules.Fields.Account]: Account,
            [AuthModules.Fields.PWD]: PWD,
            [AuthModules.Fields.PUID]: PUID,
            [AuthModules.Fields.VCode]: VCode,
        });
    }
    /**
     * 找回密码
     * @param Account 
     * @param PWD 
     * @param VCode 
     */
    forget(Account: string, PWD: string, VCode: string) {
        return this._post('forget', {
            [AuthModules.Fields.Account]: Account,
            [AuthModules.Fields.PWD]: PWD,
            [AuthModules.Fields.VCode]: VCode,
        })
    }
}
export class Group extends Base { }
export class Certification extends Base { }
export class User extends Base { }
export class Rule extends Base { }


const AuthModules = {
    Fields: {
        Account: 'Account',
        PWD: "PWD",
        VCode: "VCode",
        PUID: 'PUID'
    },
    Auth: new Auth('Auth'),
    Group: new Group('Group'),
    Certification: new Certification('Certification'),
    User: new User('User')
}
export default AuthModules;