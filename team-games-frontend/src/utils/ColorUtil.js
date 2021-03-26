
class ColorUtil {

    static cont = 0;
    
    static selectColor(index) {
        let id = index % 14;

        switch (id) {
            case 0:
                return 'blue';
            case 1:
                return 'green';
            case 2:
                return 'gray';
            case 3:
                return 'pink';
            case 4:
                return 'red';
            case 5:
                return 'orange';
            case 6:
                return 'indigo';
            case 7:
                return 'dark';
            case 8:
                return 'teal';
            case 9:
                return 'cyan';
            case 10:
                return 'purple';
            case 11:
                return 'light-blue';
            case 12:
                return 'secondary';
            case 13:
                return 'light';
            case 14:
                return 'yellow';
            default:
                return 'info';
        }
    }

}

export default ColorUtil;