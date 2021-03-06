import { BaseController, Controller } from '@ctsy/request';


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
        return this._post('login', { [AuthModule.Fields.Account]: Account, [AuthModule.Fields.PWD]: PWD })
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
            [AuthModule.Fields.Account]: Account,
            [AuthModule.Fields.PWD]: PWD,
            [AuthModule.Fields.PUID]: PUID,
            [AuthModule.Fields.VCode]: VCode,
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
            [AuthModule.Fields.Account]: Account,
            [AuthModule.Fields.PWD]: PWD,
            [AuthModule.Fields.VCode]: VCode,
        })
    }
    /**
     * 设置新密码
     * @param OldPWD 
     * @param PWD 
     */
    reset(OldPWD: string, PWD: string) {
        return this._post('reset', { [AuthModule.Fields.PWD]: PWD, OldPWD: OldPWD })
    }
    /**
     * 三方登陆
     * @param Type 
     * @param Account 
     */
    alogin(Type: string, Account: string) {
        return this._post('alogin', { Type, Account })
    }
    /**
     * 三方登陆的绑定
     * @param Type 
     * @param Account 
     */
    abind(Type: string, Account: string) {
        return this._post('abind', { Type, Account })
    }
    /**
     * 三方登陆的解绑
     * @param Type 
     * @param Account 
     */
    aunbind(Type: string, Account: string) {
        return this._post('aunbind', { Type, Account })
    }
}
/**
 * 用户组
 */
export class Group extends Base {
    /**
     * 获取所有用户分组数据
     * @param Type 
     */
    all(Type: string = "tree") {
        return this._post('all', { Type });
    }
    /**
     * 添加分组
     * @param Title 分组名称
     * @param Memo 备注
     * @param Sort 排序
     * @param PUGID 父分组信息
     */
    add(Title: string, Memo: string, Sort: number, PUGID: number = 0) {
        return this._post('add', { Title, Memo, Sort, PUGID });
    }
    /**
     * 保存
     * @param UGID 
     * @param Data 
     */
    save(UGID: number, Data: { Title?: string, Memo?: string, Sort?: number, PUGID?: number }) {
        return this._post('save', { UGID, Data })
    }
    /**
     * 分组
     * @param UGID 
     * @param UIDs 
     */
    link(UGID: number, UIDs: number[]) {
        return this._post('link', { UGID, UIDs });
    }
    /**
     * 移除分组
     * @param UGID 
     * @param UIDs 
     */
    unlink(UGID: number, UIDs: number[]) {
        return this._post('unlink', { UGID, UIDs });
    }
    /**
     * 获取组内用户列表
     * @param UGID 
     * @param P 
     * @param N 
     */
    members(UGID: number, P: number, N: number) {
        return this._post('members', { UGID, P, N });
    }
}

export class Certification extends Base { }

export class User extends Base {
    pk = "UID";
}

export class Users extends Controller {
    pk = "UID";
    prefix = '_a';
}

export class Rule extends Controller {
    prefix = '_a';
}

export class RuleGroup extends Controller {
    prefix = '_a';
}

export const AuthModule = {
    Fields: {
        Account: 'Account',
        PWD: "PWD",
        VCode: "VCode",
        PUID: 'PUID'
    },
    Auth: new Auth('Auth'),
    Group: new Group('Group'),
    Certification: new Certification('Certification'),
    User: new User('User'),
    Users: new Users('Users'),
    Rule: new Rule('Rule'),
    RuleGroup: new RuleGroup('RuleGroup')
}

export default AuthModule;

declare let window: any
try {
    if (window) {
        window.AuthModule = AuthModule;
    }
} catch (error) {

}