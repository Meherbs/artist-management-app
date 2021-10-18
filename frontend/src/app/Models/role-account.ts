export class RoleAccount {
  key: number;
  value: string;
  data: string[];

  constructor(key: number, value: string, data: string[]) {
    this.key = key;
    this.value = value;
    this.data = data;
  }

  private arrayEquals(arr1: string[], arr2: string[]) {
    return (
      //this.length === arr2.length &&
      arr1.every((value, index) => value === arr2[index])
    );
  }
}

export namespace AccountLibrary {
  export const SUPER_ADMIN_KEY: number = 1;
  export const ADMIN_KEY: number = 2;

  export const SUPER_ADMIN_DATA: string[] = ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'];
  export const ADMIN_DATA: string[] = ['ROLE_ADMIN', 'ROLE_USER'];

  export const findRoleByData = (roleAccounts: RoleAccount[], data: string[]) => {
    var key: number;
    if (data.includes('ROLE_SUPER_ADMIN')) {
      return AccountLibrary.SUPER_ADMIN_KEY;
    } else {
      if (data.includes('ROLE_ADMIN')) {
        return AccountLibrary.ADMIN_KEY;
      } else {
        return 44;
      }
    }

  }

  export const findRoleDataByKey = (keyValue: number) => {
    switch (keyValue) {
      case AccountLibrary.ADMIN_KEY:
        return AccountLibrary.ADMIN_DATA;
        break;
      case AccountLibrary.SUPER_ADMIN_KEY:
        return AccountLibrary.SUPER_ADMIN_DATA;
        break;
      default:
        return null;
        break;
    }
  }

  export const getAvailableRoles = (): RoleAccount[] => {
    var r2 = new RoleAccount(AccountLibrary.ADMIN_KEY, "Utilisateur", AccountLibrary.ADMIN_DATA);
    var r3 = new RoleAccount(AccountLibrary.SUPER_ADMIN_KEY, "Administrateur", AccountLibrary.SUPER_ADMIN_DATA);
    var arr = [r2, r3];
    return arr;
  }

}