import { MenuData } from '@/constants/Menu';
import { Menu } from '@/models/menu.model';

export class MenuService {
    public getMenus() {
        return MenuData;
    }
}
